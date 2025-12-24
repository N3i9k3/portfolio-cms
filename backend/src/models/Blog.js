const mongoose = require("mongoose");

const blogsSchema = new mongoose.Schema({
  blogs: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Blogs", blogsSchema);






