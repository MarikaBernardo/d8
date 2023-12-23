import mongoose, { Schema } from "mongoose";


const brandSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export const Brand = mongoose.model("brands", brandSchema);
