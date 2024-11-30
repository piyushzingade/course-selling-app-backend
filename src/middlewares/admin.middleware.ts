import jwt from "jsonwebtoken"
import { JWT_ADMIN_PASSWORD } from "../config.js";
import { NextFunction, Request, Response } from "express";


export const adminAuth = (req : Request ,res : Response , next : NextFunction)=>{
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
      //@ts-ignore
      const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD);
      //@ts-ignore

      req.admin = decoded;
      next();
    } catch (error) {
        console.log("Error in verifyToken ", error);
        return res.status(400).json({ success: false, message: "Server error" })
    }
};
