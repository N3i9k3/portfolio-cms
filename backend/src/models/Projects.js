const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projects: [
    {
      title: String,
      description: String,
      link: String,
    },
  ],
});

module.exports = mongoose.model("Projects", projectSchema);
