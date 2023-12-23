import jwt from "jsonwebtoken"
import { User } from "./Models/users.js";
const checkJwt = async (req, res, next) => {
    // 1. Leggiamo il token dalla richiesta
    if (!req.headers.authorization) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = req.headers.authorization.split(" ")[1];

    // 2. Verifichiamo che il token sia valido
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(payload.id).select("-password")
        if (!req.user) {
            return res.status(404).json({ message: "User not found"})
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Unauthorized" });
    }
};

export default checkJwt;
