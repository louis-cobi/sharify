import mongoose from "mongoose";
import modelOptions from "./model.option.js";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
    password: {
      type: String,
      //required: true,
      select: false,
    },
  },
  modelOptions
);

const userModel = mongoose.model("User", userSchema, "users");

userSchema.methods.serializeUser = function() {
  return this._id;
};

userSchema.statics.deserializeUser = async function(id) {
  return await this.findById(id);
};

export default userModel;
