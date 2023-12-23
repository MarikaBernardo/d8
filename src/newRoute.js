import express from "express";
import bcrypt from "bcrypt";
import { User } from "./Models/Users.js";
import passport from "passport";




const newRoute = express.Router();

newRoute.post("/", async (req, res) =>{
    
    const password = await bcrypt.hash(req.body.password, 10)
    const newUser = await new User.create({...req.body, password,});
    await newUser.save();
    
    res.status(201).send(newUser);
});


newRoute.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        // Trova l'utente tramite email
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        // Verifica la corrispondenza della password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        
        // Autenticazione perenne
        const payload = { id: user._id }
        
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn : "1h"})
        // Utente autenticato con successo
        res.status(200).json({ token });
    } catch (error) {
        next(error); // Inoltra l'errore al middleware di gestione degli errori
    }
});


newRoute.get(
    "/oauth-google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
        prompt: "select_account",
    })
    );
    
    newRoute.get(
        "/oauth-callback",
        passport.authenticate("google", {
            failureRedirect: "/", // Corretto il nome della proprietà 'failureRedirect'
            session: false, // Rimossa la virgola errata e corretto il nome della proprietà 'session'
        }),
        async (req, res) => { // Corretta la sintassi per la dichiarazione della funzione
            try {
                const payload = { id: req.user._id }; // Corretto l'uso del carattere '=' invece di ':'
                const token = jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: "1h",
                });
                res.redirect(`http://localhost:3000?token=${token}&userId=${req.user._id}`); // Corretta la sintassi per la generazione dell'URL
            } catch (err) {
                res.redirect("/"); // Gestione degli errori, reindirizza alla homepage in caso di errore
            }
        }
        );
        
        

        export default newRoute;