const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var enqSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
  },
  comment: {
    type: String,
  },
  status: {
    type: String,
    default: "Submitted",
    enum: ["Submitted", "Contacted", "In Progress", "Resolved", "MAIL LIST"],
  },
});

//Export the model
module.exports = mongoose.model("Enquiry", enqSchema);
