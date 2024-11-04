
import express from "express";


import { adminAuth } from "../middlewares/user.middlewares.js";
import { adminSignupController , adminLoginController } from "../controllers/admin.controller.js";
export const adminRoute = express();


adminRoute.post('/signup', adminSignupController)
adminRoute.post('/login', adminLoginController)

adminRoute.post('/create-course', adminAuth ,  (req, res) => {})
adminRoute.delete('/delete-course', adminAuth , (req, res) => {})
adminRoute.put('/update-course-content', adminAuth , (req, res) => {})




