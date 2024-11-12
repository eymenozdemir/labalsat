const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      default: "USD",
    },
    price: {
      type: Number,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: String,
        url: String,
      },
    ],
    color: [],
    tags: String,
    ratings: [
      {
        star: Number,
        comment: String,
        postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    totalrating: {
      type: String,
      default: 0,
    },
    setupPrice: {
      type: Number,
      default: 0,
    },
    setupBool: {
      type: Boolean,
      default: false,
    },
    setupAsked: {
      type: Boolean,
      default: false,
    },
    servicePrice: {
      type: Number,
      default: 0,
    },
    serviceBool: {
      type: Boolean,
      default: false,
    },
    serviceAsked: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: "offered",
    },
    location: {
      type: String,
      required: true,
    },
    condition: {
      type: String,
      required: true,
      default: "",
    },
    age: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      default: "",
    },
    model: {
      type: String,
      default: "",
    },
    submodel: {
      type: String,
      default: "",
    }
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Product", productSchema);
