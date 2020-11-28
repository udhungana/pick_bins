const mongoose = require("mongoose");
const LocationSchema = mongoose.Schema({
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    current_location: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("location", LocationSchema);