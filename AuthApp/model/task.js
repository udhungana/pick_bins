const mongoose = require("mongoose");
const TaskSchema = mongoose.Schema({
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  path: [
    {
      address: String,
      time: Number,
    },
  ],
});

module.exports = mongoose.model("task", TaskSchema);
