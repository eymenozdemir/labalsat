const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    shippingInfo: {
      firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      },
      address: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      country: {
        type: String,
        required: true
      },
      pincode: {
        type: Number,
      },
      other: {
        type: String,
      },
      description: {
        type: String,
      }
    },
    orderedItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },
        quantity: {
          type: Number,
          required: true
        },
        price: {
          type: Number,
          required: true
        },
        setup: {
          type: Boolean,
          default: false
        },
        service: {
          type: Boolean,
          default: false
        },
      },
    ],
    paidAt: {
      type: Date,
      default: Date.now(),
    },
    currency: {
      type: String,
      required: true,
      default: "USD",
    },
    totalPrice: {
      type: Number,
      required: true
    },
    orderStatus: {
      type: String,
      default: "Ordered"
    }
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Order", orderSchema);
