const express = require("express");
const { check, validationResult } = require("express-validator/check");
const router = express.Router();
const validator = require("../express-validations/signupValidator");
const auth = require("../middleware/auth");
const async = require('async');
const crypto = require('crypto');
const User = require("../model/user");
router.use(express.static(__dirname + "./uploads/"));
/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

router.post("/signup", validator.validateMeChecks, async (req, res) => {
  const errors = validationResult(req).formatWith(validator.errorFormatter);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({
        msg: "User Already Exists",
      });
    }

    user = new User({
      fName: req.body.fName,
      lName: req.body.lName,
      email: req.body.email,
      password: req.body.password,
      street: req.body.street,
      city: req.body.city,
      zip: req.body.zip,
      country: req.body.country,
      isDriver: req.body.isDriver
    });
    await user.save();

    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in Saving");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.findByCredentials(user, password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = await user.generateAuthToken();
    res.status(200).send({ token });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.post("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

// router.get("/profile", auth, async (req, res) => {
//   console.log(req.user._id);
//   try {
//     profile = await UserProfile.findOne({ user: req.user._id });
//     res.status(200).send({ profile });
//   } catch (e) {
//     res.status(500).send(e);
//   }
// });

// router.put("/updateProfile", auth, async (req, res) => {
//   UserProfile.findOneAndUpdate(
//     { user: req.user._id },
//     {
//       fName: req.body.fName,
//       lName: req.body.lName,
//       bio: req.body.bio,
//       address:

//       {   street: req.body.address.street,
//           unitNo: req.body.address.unitNo,
//           city: req.body.address.city,
//           state: req.body.address.state,
//           zip: req.body.address.zip
//     },
//       dob: req.body.dob,
//       gender: req.body.gender,
//     },
//     {
//       returnOriginal:false
//     },
//     function (err, result) {
//       if (err) {
//         res.send(err);
//       } else {
//         res.send(result);
//       }
//     }
//   );
// });

// router.put("/uploadImage", auth, UploadImage, async(req,res) => {
//     if(req.file){
//       UserProfile.findOneAndUpdate(
//         { user: req.user._id },
//         {
//           picture: req.file.filename
//         },
//         {
//           returnOriginal:false
//         },
//         function (err, result) {
//           if (err) {
//             res.send(err);
//           } else {
//             res.send(result);
//           }
//         }
//       )
//     }else{res.status(500).json({
//       message: "Please select a file to upload",
//     });
//   }
// });

// router.post('/forgotpassword', function (req, res, next)  {
//   async.waterfall([
//     function(done) {
//       crypto.randomBytes(20, function(err, buf) {
//         var token = buf.toString('hex');
//         done(err, token);
//       });
//     },
//     function(token, done) {
//       User.findOne({ email: req.body.email }, function(err, user) {
//         if (!user) {
//           return res.status(400).json({ message: "Invalid email" });
//         }

//         user.resetPasswordToken = token;
//         user.resetPasswordExpires = Date.now() + 1800000;//Email vaid for half an hour

//           user.save(function(err) {
//           done(err, token, user);
//         });
//       });
//     },
//      function(token, user, done) {
//       var transport = nodemailer.createTransport({
//       host: 'smtp.mailtrap.io',
//       port: 2525,
//       auth: {
//        user: 'b313c5a451f408' ,
//        pass: '2a5501a82abb70'
//           }
//       });
//       var mailOptions = {
//         to: user.email,
//         from: 'passwordreset@bruxAway.com',
//         subject: 'Password Reset',
//         text: 'You are receiving this because you have requested the reset of the password for your account.\n\n' +
//           'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
//           'http://' + req.headers.host + '/reset/' + token + '\n\n' + 'This link is valid for half an hour' + '\n\n'
//       };
//         transport.sendMail(mailOptions, function(err) {
//         res.json({ message: "Reset link sent successfully" });
//         done(err, 'done');
//       });
//     }
//   ], function(err) {
//     if (err) return next(err);
//     res.redirect('/forgot');
//   });
// });

// router.put('/reset/:token', function(req, res) {
//   async.waterfall([
//     function(done) {
//       User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() }}, function(err, user)
//       {
//         if (!user) {
//           return res.status(400).json({ message: "Invalid Token" });
//           //return res.redirect('back');
//         }

//         user.password = req.body.password;
//         user.resetPasswordToken = null,
//         user.resetPasswordExpires = null;

//         user.save(function(err) {
//           done(err, user);
//       });
//     });
//   },
//     function(user, done) {
//       var transport = nodemailer.createTransport({
//       host: 'smtp.mailtrap.io',
//       port: 2525,
//       auth: {
//        user: 'b313c5a451f408' ,
//        pass: '2a5501a82abb70'
//           }
//       });
//       var mailOptions = {
//         to: user.email,
//         from: 'passwordreset@bruxAway.com',
//         subject: 'Password Reset Successfull',
//         text: 'Hello,\n\n\n' +
//               'your password has been changed successfully\n\n'
//       };
//         transport.sendMail(mailOptions, function(err) {
//         return res.status(200).send('Password Reset Successfully');;
//         done(err);
//       });
//     }
//   ], function(err) {
//     res.redirect('/');
//   });
// });
// router.post('/deleteProfile', auth, function (req, res) {
//     async.waterfall([
//         function (callback) {
//             PatientData.deleteOne(
//                 { user: req.user._id },
//                 function (err, patientData) {
//                     if (err) callback(err);
//                     callback(null);
//                 });
//               },

//         function (callback) {
//                 UserProfile.deleteOne({ user: req.user._id },
//                 function (err, res) {
//                 if (err) callback(err);
//                 callback(null);
//             });
//           },
//         function (callback) {
//                   User.deleteOne({ _id: req.user._id },
//                   function (err, res) {
//                   if (err) callback(err);
//                   callback(null);
//               });
//             },

// ],      function (err, result) {
//         if (err) throw err;
//         res.json({message: "Deleted successfully"});
//       });
// });
module.exports = router;
