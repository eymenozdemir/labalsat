const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var contractSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  company: {
    type: String,
  },
  instrument: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    default: "Maintenance",
  },
});

//Export the model
module.exports = mongoose.model("Contract", contractSchema);
