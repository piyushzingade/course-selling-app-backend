import jwt from "jsonwebtoken";
import { JWT_USER_PASSWORD } from "../config.js";
import {  Response } from "express";

export const userToken = (res : Response, user : any) => {
    if (!JWT_USER_PASSWORD) {
        throw new Error("JWT_USER_PASSWORD is not defined in environment variables");
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_USER_PASSWORD, {
        expiresIn: "7d",
    });
    //@ts-ignore
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return token;
};
