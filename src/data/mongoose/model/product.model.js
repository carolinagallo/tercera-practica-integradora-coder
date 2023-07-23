import mongoose, { Schema } from "mongoose";
const productCollection = "products";

const productSchema = new Schema({
  title: { type: Schema.Types.String },
  description: { type: Schema.Types.String },
  price: { type: Schema.Types.Number },
  thumbnail: { type: Schema.Types.String },
  code: { type: Schema.Types.String },
  stock: { type: Schema.Types.Number },
  category: { type: Schema.Types.String },
});

export const productModel = mongoose.model(productCollection, productSchema);
