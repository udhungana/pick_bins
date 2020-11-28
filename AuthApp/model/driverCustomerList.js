const mongoose = require("mongoose");

const listSchema = mongoose.Schema({
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  customers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  ],
});

module.exports = mongoose.model("DriverCustomerList", listSchema);
