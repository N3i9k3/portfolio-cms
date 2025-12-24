const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  experience: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Experience", experienceSchema);
