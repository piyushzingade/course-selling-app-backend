import jwt from "jsonwebtoken";
import { JWT_USER_PASSWORD } from "../config.js";

export const userToken = (res, email) => {
    if (!JWT_USER_PASSWORD) {
        throw new Error("JWT_USER_PASSWORD is not defined in environment variables");
    }

    const token = jwt.sign({ email }, JWT_USER_PASSWORD, {
        expiresIn: "7d",
    });

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return token;
};
