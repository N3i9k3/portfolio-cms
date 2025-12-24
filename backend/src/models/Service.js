const mongoose = require("mongoose");

const servicesSchema = new mongoose.Schema({
  services: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Services", servicesSchema);
