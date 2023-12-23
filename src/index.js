import express from "express";
import mongoose from "mongoose";
import Route from "./Route.js";
import otherRoute from "./otherRoute.js";
import productRoute from "./productsRoute.js";
import newRoute from "./newRoute.js";
import passport from "passport";
import { genericError } from "./middlewares/genericError.js";
import googleStrategy from "./oauth/google.js";






const server = express();


const port = 3000;

server.use(express.json());

passport.use(googleStrategy)

server.use("/gnort", Route);
server.use("/prodotti", productRoute);
server.use("/altro", otherRoute);
server.use("/nuovo", newRoute);






server.use(otherRoute);
server.use(genericError);

mongoose
  .connect(
    "mongodb+srv://Patt01:Nonnt01@cluster0.vgnijnf.mongodb.net/nuovi"
  )
  .then(() => {
    server.listen(port, () => {
      console.log("Server avviato sulla porta " + port);
    });
  })
  .catch((error) => {
    console.error("Errore di connessione al DB:", error);
  });

