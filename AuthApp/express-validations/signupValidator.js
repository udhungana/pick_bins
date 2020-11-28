const { check, validationResult} = require("express-validator/check");

module.exports = {
  validateMeChecks: [
    check("first_name").exists().withMessage("This field is required"),
    check("last_name").exists().withMessage("This field is required"),
    check("email").isEmail().withMessage("Invalid email"),
    check("address").exists().withMessage("This field is required"),
    check("city").exists().withMessage("This field is required"),
    check("zip_code").exists().withMessage("This field is required"),
    check("country").exists().withMessage("This field is required"),
    check("isDriver").exists().withMessage("This field is required"),
    check("password")
      .isLength({ min: 4 })
      .withMessage("Password length should be atleast 4")
      .custom((value, { req, loc, path }) => {
        if (value !== req.body.password2) {
          return false;
        } else {
          return value;
        }
      })
      .withMessage("Password don't match"),
  ],
  errorFormatter: ({ location, msg, param, value, nestedErrors }) => {
    return {
      type: "Error",
      name: "Signup Failure",
      location: location,
      message: msg,
      param: param,
      value: value,
      nestedErrors: nestedErrors,
    };
  },
};
