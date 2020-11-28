const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../model/user");
const Task = require("../model/task");
const Location = require("../model/location");
const DriverCustomerList = require("../model/driverCustomerList");

const googleMapsClient = require("@google/maps").createClient({
  key: "AIzaSyAJwZsfn11D8zVEscm8te2ZsygB4deaFk0",
});

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
          str_time = result_list[i].duration.text;
          num_distance = parseFloat(str_distance.replace(" mi", ""));
          num_time = parseFloat(str_time.replace(" mins", ""));
          b = [];
          b.push(num_distance);
          b.push(num_time);
          distance_dict[i] = b;
        }
        //console.log(distance_dict);
        //return min distance from dic
        min_value = Object.keys(distance_dict).reduce(function (a, b) {
          return distance_dict[a][0] < distance_dict[b][0] ? a : b;
        });

        //console.log(user_location);
        d_location = user_location[min_value];
        x = [];
        x.push(d_location);
        x.push(distance_dict[min_value][1]);
        //a[d_location] = distance_dict[min_value][1];
        a.push(x);
        user_location.splice(min_value, 1);
        get_nearest_location(d_location, user_location, fn, a);
      }
    );
  }
}
router.get("/generateTask", async (req, res) => {
  const dcList = await DriverCustomerList.findOne({
    driver: req.body.driverID,
  });
  //find driver location
  const driver = await User.findOne({ _id: dcList.driver });
  const street = driver.street;
  const city = driver.city;
  const zip = driver.zip;
  const country = driver.country;
  const driver_location = street + "," + city + "," + zip + "," + country;

  //Get user location associated with the driver
  const users = dcList.customers;
  user_location = [];
  for (i = 0; i < users.length; i++) {
    const user = await User.findOne({ _id: users[i] });
    const street = user.street;
    const city = user.city;
    const zip = user.zip;
    const country = user.country;
    const location = street + "," + city + "," + zip + "," + country;
    user_location.push(location);
  }
  const doc = await Task.findOne({ driver: req.body.driverID });
  if (!doc) {
    const task = new Task({
      driver: req.body.driverID,
    });
    await task.save();
  }

  //find optimal routes and store it in task collection
  get_nearest_location(
    driver_location,
    user_location,
    async function (result) {
      Task.findOneAndUpdate(
        { driver: req.body.driverID },
        { path: [] },
        { upsert: true },
        function (err, doc) {
          //console.log(doc);
        }
      );
      //console.log(result);
      for (i = 0; i < result.length; i++) {
        var address = result[i][0];
        var time = result[i][1];
        Task.findOneAndUpdate(
          { driver: req.body.driverID },
          {
            $push: {
              path: {
                address: address,
                time: time,
              },
            },
          },
          function (err, success) {
            if (err) {
              //console.log(err);
            } else {
              //console.log(success);
            }
          }
        );
        //res.status(200);
      }
    },
    []
  );
  res.send("task created");
});

router.get("/getTask", auth, async (req, res) => {
  const task_list = await Task.findOne({ driver: req.user._id });
  //console.log(task_list);
  res.send(task_list);
});

router.get("/getSchedule", auth, async (req, res) => {
  const user = await User.findOne({ _id: req.user._id });
  const street = user.street;
  const city = user.city;
  const zip = user.zip;
  const country = user.country;
  const location = street + "," + city + "," + zip + "," + country;
  const driver = await DriverCustomerList.findOne({ customers: req.user._id });
  //console.log(driver);
  task_list = await Task.findOne({ driver: driver.driver });
  //console.log(task_list);
  var index = 0;
  for (i = 0; i < task_list.path.length; i++) {
    if (task_list.path[i].address === location) {
      index = i;
      break;
    }
  }
  var time = 0;
  //Find driver location to estimate time
  object1 = await Location.find();
  driver_location = object1[0].current_location;
  driver_index = 0;
  for (i = 0; i < task_list.path.length; i++) {
    if (
      driver_location !== "1608 Blue Danube St,Arlington,76015,USA" &&
      driver_location === task_list.path[i].address
    ) {
      driver_index = i;
      break;
    }
  }
  var i = 0;
  if (
    driver_index == 0 &&
    driver_location === "1608 Blue Danube St,Arlington,76015,USA"
  ) {
    i = driver_index;
  } else {
    i = driver_index + 1;
  }
  for (i; i <= index; i++) {
    time += task_list.path[i].time;
  }
  data = {
    duration: time,
    location: location,
    firstName: user.fName,
  };
  //console.log(time);
  //console.log(location);
  res.send(data);
});

router.post("/updateDriverLocation", auth, async (req, res) => {
  task_list = await Task.find({ driver: req.user._id });
  //console.log(task_list);
  const path_list = task_list[0].path;
  //console.log(path_list);
  last_location = path_list[path_list.length - 1].address;
  let doc;
  if (req.body.current_location === last_location) {
    const hasLocation = await Location.findOne({ driver: req.user._id });
    if (!hasLocation) {
      const new_driver = new Location({ driver: req.user._id });
      await new_driver.save();
    }
    //starting location for a driver is location they use during sign up.
    // In other words, it can be their home address.
    const temp_driver = await User.findOne({ _id: req.user._id });
    const street = temp_driver.street;
    const city = temp_driver.city;
    const zip = temp_driver.zip;
    const country = temp_driver.country;
    const location = street + "," + city + "," + zip + "," + country;

    doc = await Location.findOneAndUpdate(
      { driver: req.user._id },
      { current_location: location },
      { new: true }
    );
  } else {
    doc = await Location.findOneAndUpdate(
      { driver: req.user._id },
      { current_location: req.body.current_location },
      { new: true }
    );
  }
  await doc.save();
  res.send(doc);
});
module.exports = router;
