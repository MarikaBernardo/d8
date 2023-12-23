import express, { Router } from "express";
import mongoose from "mongoose";
import {genericError} from "./middlewares/genericError.js";
import {checkAuth} from "./middlewares/checkAuth.js";
const Route = express.Router();



// Route.use(checkAuth);

Route.get("/", checkAuth, async (req,res, next) => {
try {
const users = await User.find({})
res.json(users)
} catch (error) {
error.statusCode = 400;
next(error);
}

});

Route.get("/piccolo", async (req, res, next) => {
try {
const user = await User.findById("656a00fdbfd29ec02b159215");
res.json(user);
} catch (error) {
next(error);
}

});

Route.get("/:id", async (req,res) =>{

const { id } = req.params;
const user = await User.findById(id);
if (!user) {
    return res.status(404).send();
}
res.json(user);
});

Route.post("/", async (req, res) =>{
try {
const newUser = new User(req.body);
await newUser.save();

res.status(201).send(newUser);
} catch (error) {
next(error);
}

});

Route.put("/:id", async (req,res) => {

try {  const UpdatedUser = await User.findByIdAndUpdate (req.params.id, req.body, { new : true} )
res.json (UpdatedUser);
    
} catch (error) {
    next(error);
    
}
});

Route.delete("/:id", async (req,res) => {
const deletedDocument = await User.findByIdAndDelete (req.params.id);
if (!deletedDocument) {
res.status(404).send()
}
else {
res.status(204).send();
}
});

export default Route;
