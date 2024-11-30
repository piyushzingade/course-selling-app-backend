import jwt from "jsonwebtoken"
import { JWT_ADMIN_PASSWORD } from "../config.js";


export const adminAuth = (req ,res , next)=>{
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD);
        req.admin = decoded;
        next();
    } catch (error) {
        console.log("Error in verifyToken ", error);
        return res.status(400).json({ success: false, message: "Server error" })
    }
};
