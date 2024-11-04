
import express from "express";


import { adminAuth } from "../middlewares/admin.middleware.js";
import { adminSignupController , adminLoginController ,  adminCreateCourseController , adminDeleteCourseController , adminUpdateCourseController  } from "../controllers/admin.controller.js";
export const adminRoute = express();


adminRoute.post('/signup', adminSignupController)
adminRoute.post('/login', adminLoginController)

adminRoute.post('/create-course', adminAuth ,  adminCreateCourseController)
adminRoute.delete('/delete-course', adminAuth ,adminDeleteCourseController)
adminRoute.put('/update-course-content', adminAuth , adminUpdateCourseController)




