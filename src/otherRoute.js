import express from "express";
import path from "path";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

const cloudinaryStorageInstance = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "test",
    },
});

const upload = multer({ storage: cloudinaryStorageInstance });

const otherRoute = express.Router();

otherRoute.patch("/multipart", upload.single("avatar"), (req, res, next) => {
    if (!req.file) {
        const error = new Error("Non hai inserito l'immagine");
        error.statusCode = 422;
        return next(error);
    }
    
    // L'immagine è stata caricata con successo su Cloudinary
    // Puoi fare ulteriori operazioni qui se necessario
    
    res.send("Immagine caricata con successo su Cloudinary.");
});

otherRoute.get("/download/:filename", (req, res, next) => {
    // In questo caso, è possibile fornire un link diretto all'immagine su Cloudinary
    // invece di cercare di servire l'immagine localmente
    const cloudinaryUrl = cloudinary.url(req.params.filename);
    res.redirect(cloudinaryUrl);
});

export default otherRoute;
