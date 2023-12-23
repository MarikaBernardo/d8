import mongoose,   { Schema, SchemaType } from "mongoose";

const ProductSchema = new Schema ({
name :  {
    type: String, 
    required: true,
},
description : {
    type : String,
    required : true,
},
brand : {
    type: Schema.Types.ObjectId,
    ref:"brands",
    required: true,
},
imageUrl : {
    type : String,
},
price : {
    type : Number,
    required : true,
},
}
);

export const Product = mongoose.model("products", ProductSchema);

