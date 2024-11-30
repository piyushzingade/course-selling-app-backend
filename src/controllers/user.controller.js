
import { z } from "zod";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import { userToken } from "../utils/userToken.js";
import { Course } from "../models/courses.model.js";
import { PurchasedCourse } from "../models/purchasedCourse.model.js";

export const userSignupController = async(req, res) => {
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

  const userAlready = await User.findOne({ email });
    if (userAlready) {
        return res.status(400).json({ message: 'User already exists' });
    }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({ 
    name, 
    email,
    password: hashedPassword 
  });
  res.status(201).json({
    success: true,
    message: 'User created successfully',
    user 
  });
  }catch(error){
    console.log("Error in signup", error);
    res.status(400).json({ message: 'Error in signup of User' });
  }

}

export const userLoginController = async (req, res) => {
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
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    const token = userToken(res , user.email);
    res.status(200).json({ success: true, message: "Login successful", token });
  }catch(error){
    console.log("Error in login of User", error);
    res.status(400).json({ message: "Error in login of User" });
  }
}


export const userGetAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({ success: true, message: "Courses retrieved successfully", courses });
  } catch (error) {
    console.log("Error in getting all courses ", error);
    res.status(400).json({ message: "Error in getting all courses" });
  }
}

export const userBuyACourse = async (req, res) => {
    try {
        const schemaValidation = z.object({
            title: z.string().min(6).max(30),
        });
        const parseData = schemaValidation.safeParse(req.body);
        if (!parseData.success) {
            return res.status(400).json({
                success: false,
                message: parseData.error,
            });
        }

        const { title } = req.body;
        const course = await Course.findOne({ title });
        if (!course) {
            return res.status(400).json({
                success: false,
                message: "Course not found",
            });
        }

        console.log("User ID from req.user:", req.user.userId); // Log to check userId
        
        const purchase = await PurchasedCourse.create({
            courseId: course._id,
            userId: req.user.userId, // Ensure userId is passed correctly here
            purchaseDate: new Date(),
        });

        res.status(201).json({
            success: true,
            message: 'Course purchased successfully',
            purchase,
        });
    } catch (error) {
        console.log("Error in buying a course", error);
        res.status(400).json({ message: "Error in buying a course" });
    }
};


export const userMyCourses = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
}