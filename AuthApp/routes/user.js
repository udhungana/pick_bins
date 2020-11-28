const express = require("express");
const { check, validationResult } = require("express-validator/check");
const router = express.Router();
const validator = require("../express-validations/signupValidator");
const auth = require("../middleware/auth");
const User = require("../model/user");
/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

router.post("/signup", validator.validateMeChecks, async (req, res) => {
  console.log(req.body);
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
      fName: req.body.first_name,
      lName: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      street: req.body.address,
      city: req.body.city,
      zip: req.body.zip_code,
      country: req.body.country,
      isDriver: req.body.isDriver,
      isAdmin: req.body.isAdmin
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
  console.log(req.body);
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.findByCredentials(user, password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = await user.generateAuthToken();
    data = {
      "token": token,
      "isDriver": user.isDriver,
      "isAdmin": user.isAdmin
    }
    res.status(200).send(data);
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

module.exports = router;
