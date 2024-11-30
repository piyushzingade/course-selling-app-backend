import jwt from "jsonwebtoken";
import { JWT_ADMIN_PASSWORD } from "../config.js";


export const adminToken = (res, email) => {
    
    if (!JWT_ADMIN_PASSWORD) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    console.log("11")
    const token = jwt.sign({ email },JWT_ADMIN_PASSWORD, {
        expiresIn: "7d",
    });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "development",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return token;
};
