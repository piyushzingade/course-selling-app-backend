import express from "express";
import { z } from "zod";
import {  userBuyACourse, userGetAllCourses, userLoginController,  userMyCourses,  userSignupController } from "../controllers/user.controller.js";
import { userAuth } from "../middlewares/middlewares.js";

export const userRoute = express();

userRoute.post("/signup", userSignupController);
userRoute.post("/login", userLoginController);

userRoute.post("/buy-a-course", userAuth ,userBuyACourse)
userRoute.get("/get-all-courses", userAuth ,userGetAllCourses)
userRoute.get("/my-courses", userAuth, userMyCourses)