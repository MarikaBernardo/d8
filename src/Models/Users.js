import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
  name: {
    type: String,
    required: [true, ' is required']
  },
  email: {
    type: String,
    required: [true, 'email is required']
  },
  passwoord: {
    type: String,
    required: [true, 'password is required']
  },
});

export const User = mongoose.model("users", userSchema);
