const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routes/user"); //new addition
const task = require("./routes/task")
const admin = require("./routes/admin");
const InitiateMongoServer = require("./config/db");
const { urlencoded } = require("body-parser");
const User = require("./model/user");
const socket = require("socket.io");
const mongoose = require("mongoose")

// Initiate Mongo Server
InitiateMongoServer();

const app = express();

// PORT
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */
app.use("/user", user);
app.use(task);
app.use(admin);

var server = app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});

//Socket setup
// var io = socket(server);
// mongoose.set('useFindAndModify', false);
// io.on("connection", function (socket) {
//   console.log("connected successfully");
//   socket.on("patientData", (data) => {
//     //console.log(data);
//     PatientData.findOneAndUpdate(
//       { user: data.user },
//       {
//         deviceID: data.deviceID,
//         appData: {
//           Date: data.appData.Date,
//           totalEpisode: data.appData.totalEpisode,
//           totalDuration: data.appData.totalDuration,
//         },
//         rawData: {
//           sensor1: data.rawData.sensor1,
//           sensor2: data.rawData.sensor2,
//           sensor3: data.rawData.sensor3,
//           sensor4: data.rawData.sensor4,
//         },
//       },
//       {
//         returnOriginal: false,
//       },
//       function (err) {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log('Data saved to MongoDB');
//         }
//       }
//     );
//   });
// });
