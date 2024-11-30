import jwt from "jsonwebtoken"
import { JWT_USER_PASSWORD } from "../config.js";
import { NextFunction, Request, Response } from "express";

export const userAuth = (req : Request, res : Response, next : NextFunction) => {
    const token =  req.headers.token;
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
      //@ts-ignore

      const decoded = jwt.verify(token, JWT_USER_PASSWORD);
      //@ts-ignore

      req.user = decoded;
      //@ts-ignore

      console.log("Decoded token:", req.user); // Log to confirm userId is present
      next();
    } catch (error) {
        console.error("Error in verifyToken:", error);
        return res.status(400).json({ success: false, message: "Invalid or expired token" });
    }
};