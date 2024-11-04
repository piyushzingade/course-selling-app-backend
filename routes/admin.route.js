
import express from "express";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { Admin } from "../models/admin.model.js";
import { adminAuth } from "../middlewares/middlewares.js";
export const adminRoute = express();


adminRoute.post('/signup', async (req, res) => {
  try{
  const schemaValidation = z.object({
    name: z.string().min(3).max(30),
    email: z.string().email(),
    password: z.string().min(6).max(30),
  });
  const parseData = schemaValidation.safeParse(req.body);
  if(! parseData.success) {
    return res.status(400).json({ message: parseData.error });
  }
  const { name, email, password } = req.body;

  const userAlready = await Admin.findOne({ email });
    if (userAlready) {
        return res.status(400).json({ message: 'User already exists' });
    }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const admin = await Admin.create({ 
    name, 
    email,
    password: hashedPassword 
  });
  res.status(201).json({
    success: true,
    message: 'User created successfully',
    admin 
  });
  }catch(error){
    console.log("Error in signup of Admin", error);
    res.status(400).json({ message: 'Error in signup' });
  }

})
adminRoute.post('/login', (req, res) => {})

adminRoute.post('/create-course', adminAuth ,  (req, res) => {})
adminRoute.delete('/delete-course', adminAuth , (req, res) => {})
adminRoute.put('/update-course-content', adminAuth , (req, res) => {})




