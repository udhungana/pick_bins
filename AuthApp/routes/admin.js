const express = require("express");
const router = express.Router();

const User = require("../model/user");
const DriverCustomer = require("../model/driverCustomerList");

router.get("/getDriver", async (req, res) => {
  const drivers = await User.find({ isDriver: true, isAdmin: false });
  res.send(drivers);
});

router.get("/getCustomer", async (req, res) => {
  const drivers = await User.find({ isDriver: false, isAdmin: false });
  res.send(drivers);
});

router.post("/categorizeCustomer", async (req, res) => {
  //Takes request which has driver location. Find the list
  //of user which has same city as driver's city. And categorize those
  // user in driver's list.
  const doc = await DriverCustomer.findOne({driver:req.body.driverID});
  if(!doc){
    const driverCustomerList = new DriverCustomer({
        driver: req.body.driverID,
        //customers: null
    })
    await driverCustomerList.save();
  }
  
  const driver_location = req.body.location;
  const users = await User.find({ city: driver_location, isDriver: false, isAdmin: false });
  //console.log(users);
  for (i = 0; i < users.length; i++) {
      userID = users[i]._id;
      DriverCustomer.findOneAndUpdate(
          {driver:req.body.driverID},
          {$addToSet: {customers:userID}},  
          function (err,success){
              if(err){
                console.log(err);
              }else{
                console.log(success);
              }
          }
      )
  }
  res.send("Data inserted");
});

module.exports = router;
