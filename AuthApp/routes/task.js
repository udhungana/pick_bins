const { Console } = require("console");
const { response } = require("express");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../model/user");
const { route } = require("./user");
const fetch = require('node-fetch');

const googleMapsClient = require("@google/maps").createClient({
  key: "AIzaSyAJwZsfn11D8zVEscm8te2ZsygB4deaFk0",
});
// function get_nearest_location(driver_location, user_location, fn) {
//   googleMapsClient.distanceMatrix(
//     {
//       origins: driver_location,
//       destinations: user_location,
//       units: "imperial",
//     },
//     function callback(status, response) {
//       result_list = [];
//       result_list = response.json.rows[0].elements;
//       console.log(result_list);
//       distance_dict = {};
//       for (i = 0; i < result_list.length; i++) {
//         //console.log(result_list[i])
//         str_distance = result_list[i].distance.text;
//         num_distance = str_distance.replace(" mi", "");
//         distance_dict[i] = parseFloat(num_distance);
//       }
//       //console.log(distance_dict);
//       //return min distance from dic
//       min_value = Object.keys(distance_dict).reduce(function (a, b) {
//         return distance_dict[a] < distance_dict[b] ? a : b;
//       });
//       //return_list = []
//       //return_list.push(user_location[min_value])
//       //console.log(min_value);
//       //console.log(user_location[min_value]);
//       //fn(return_list);
//       fn(user_location[min_value]);
//     }

//   );
// }
//a = [];
function get_nearest_location(driver_location, user_location, fn, a) {
  
  //console.log(a);
  if (user_location.length == 0) {
    fn(a);
    //console.log(a);
  } else {
    googleMapsClient.distanceMatrix(
      {
        origins: driver_location,
        destinations: user_location,
        units: "imperial",
      },
      function callback(status, response) {
        result_list = [];
        result_list = response.json.rows[0].elements;
        //console.log(result_list);
        distance_dict = {};
        for (i = 0; i < result_list.length; i++) {
          //console.log(result_list[i])
          str_distance = result_list[i].distance.text;
          num_distance = str_distance.replace(" mi", "");
          distance_dict[i] = parseFloat(num_distance);
        }
        //console.log(distance_dict);
        //return min distance from dic
        min_value = Object.keys(distance_dict).reduce(function (a, b) {
          return distance_dict[a] < distance_dict[b] ? a : b;
        });

        //console.log(user_location);
        d_location = user_location[min_value];
        a.push(d_location);
        user_location.splice(min_value, 1);
        get_nearest_location(d_location, user_location, fn, a);
      }
    );
  }
}
router.get("/getTask", async (req, res) => {
  driver = await User.findOne({ email: "driver1@pickbins.com" });
  const street = driver.street;
  const city = driver.city;
  const zip = driver.zip;
  const country = driver.country;
  const driver_location = street + "," + city + "," + zip + "," + country;
  //console.log(driver_location)

  user_list = await User.find({ isDriver: false });
  user_location = [];
  for (i = 0; i < user_list.length; i++) {
    const street = user_list[i].street;
    const city = user_list[i].city;
    const zip = user_list[i].zip;
    const country = user_list[i].country;
    const location = street + "," + city + "," + zip + "," + country;
    user_location.push(location);
  }
  //console.log(user_location)
  get_nearest_location(driver_location, user_location, function (result) {
    res.send(result)
  },[]);
});

module.exports = router;
