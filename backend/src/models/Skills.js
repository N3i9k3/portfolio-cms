const mongoose = require("mongoose");

const skillsSchema = new mongoose.Schema({
  skills: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Skills", skillsSchema);
