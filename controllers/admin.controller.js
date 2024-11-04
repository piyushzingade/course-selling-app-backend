import { Admin } from "../models/admin.model.js";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndCookies.js";

export const adminSignupController = async (req, res) => {
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

}

export const adminLoginController = async (req, res) => {
    try{
    const schemaValidation = z.object({
      email: z.string().email(),
      password: z.string().min(6).max(30),
    });
    const parseData = schemaValidation.safeParse(req.body);
    if (!parseData.success) {
      return res.status(400).json({ message: parseData.error });
    }
    const { email, password } = req.body;
    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    const token = generateTokenAndSetCookie(res , user.email);
    res.status(200).json({ success: true, message: "Login successful", token });
  }catch(error){
    console.log("Error in login of Admin", error);
    res.status(400).json({ message: "Error in login of Admin" });
  }
}