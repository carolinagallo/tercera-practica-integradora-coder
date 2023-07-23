import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
const userCollection = "users";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, unique: true, required: true },
  age: { type: Number, default: 18 },
  //role: { type: mongoose.Schema.Types.ObjectId, index: true, ref: "roles" },
  isAdmin: { type: Boolean, default: false },
  password: { type: String },
  //cart: { type: mongoose.Schema.Types.ObjectId, index: true, ref: "carts" },
});

userSchema.plugin(paginate);

//userSchema.pre("find", function () {
//  this.populate(["role"]);
//});
//
//userSchema.pre("findOne", function () {
//  this.populate(["role", "cart"]);
//});
//
//userSchema.pre("find", function () {
//  this.populate(["cart"]);
//});

export const userModel = mongoose.model(userCollection, userSchema);
