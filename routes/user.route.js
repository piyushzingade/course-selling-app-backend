import express from "express";
import { z } from "zod";
import { signupController } from "../controllers/user.controller.js";
import { userAuth } from "../middlewares/middlewares.js";

export const userRoute = express();

userRoute.post("/signup", signupController);
userRoute.post("/login", (req, res) => {
  try {
    const schemaValidation = z.object({
      email: z.string().email(),
      password: z.string().min(6).max(30),
    });
    const parseData = schemaValidation.safeParse(req.body);
    if (!parseData.success) {
      return res.status(400).json({ message: parseData.error });
    }
  
  } catch (error) {
    console.log("Error in login", error);
    res.status(400).json({ message: "Error in login of User" });
  }
})

userRoute.post("/buy-a-course", userAuth ,(req, res) => {})
userRoute.get("/get-all-courses", userAuth ,(req, res) => {})
userRoute.get("/my-courses", userAuth, (req, res) => {})