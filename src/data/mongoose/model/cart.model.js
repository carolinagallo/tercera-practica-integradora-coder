import mongoose from "mongoose";

const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
  products: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        ref: "products",
      },
      quantity: { type: Number },
    },
  ],
});

cartSchema.pre("findOne", function () {
  this.populate("products");
});

cartSchema.pre("find", function () {
  this.populate("products");
});

export const cartModel = mongoose.model(cartCollection, cartSchema);
