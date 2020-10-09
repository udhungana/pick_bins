const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../model/user");

const googleMapsClient = require("@google/maps").createClient({
  key: "AIzaSyAJwZsfn11D8zVEscm8te2ZsygB4deaFk0",
});

User.findOne({ email: "driver1@pickbins.com" }).then(function (driver) {
  const street = driver.street;
  const city = driver.city;
  const zip = driver.zip;
  const country = driver.country;
  const driver_location = street + "," + city + "," + zip + "," + country;
  //console.log(driver_location)

  User.find({ isDriver: false }).then(function (user_list) {
    //console.log(user_list)
    user_location = [];
    for (i = 0; i < user_list.length; i++) {
      const street = user_list[i].street;
      const city = user_list[i].city;
      const zip = user_list[i].zip;
      const country = user_list[i].country;
      const location = street + "," + city + "," + zip + "," + country;
      //user_location.push(location);
    }
    googleMapsClient.distanceMatrix(
      {
        origins: driver_location,
        destinations: user_location,
        units: "imperial",
      },
      function (error, response) {
        result_list.push = response.json.rows[0].elements;
        //console.log(result_list);
        console.log(response);
        
      }
    );
  });
});

module.exports = router;
