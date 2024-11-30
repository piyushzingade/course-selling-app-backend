import { Admin } from "../models/admin.model.js";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { Course } from "../models/courses.model.js";
import { adminToken } from "../utils/adminToken.js";

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
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }
    console.log("1")
    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    console.log("2")
    const token =  adminToken(res , admin.email);
    res.status(200).json({ success: true, message: "Login successful", token });
  }catch(error){
    console.log("Error in login of Admin", error);
    res.status(400).json({ message: "Error in login of Admin" });
  }
}

export const adminCreateCourseController = async (req , res) => {
    try {
        const schemaValidation = z.object({
            title : z.string().min(6).max(30),
            description : z.string().min(10).max(100),
            price : z.number()
        })

        const parseData = schemaValidation.safeParse(req.body);
        if(!parseData){
            return res.status(402).json({
                success : false,
                message :parseData.error
            })
        }

        const { title , description , price} = req.body;
        const isCourseAlready =  await Course.findOne({ title })

        if(isCourseAlready){
            return res.status(402).json({
                success :false,
                message : " Course already There!!"
            })
        }

        const course = await Course.create( { 
            title , 
            description,
            price
        })

        res.status(201).json({
            success: true,
            message: 'Course created successfully',
            course 
        });
    } catch (error) {
        console.log("Error in Creating Course of Admin", error);
        res.status(400).json({ message: 'Error in Creating Course of Admin' });
    }
}

export const adminDeleteCourseController = async (req , res) => {
    try{
     const { title } = req.body;
     const course = await Course.deleteOne( { title }) 
     if(!course){
      res.status(400).json({
        success:true,
        message:"Course not found"
      })
     }
     res.status(200).json({
      success :true, 
      message : "COurse deleted successfully",
      course
     })
    }catch(error){
      console.log("Error in COurse deletion route" + error);
      res.status(401),json({
        success:false,
        message:"Error in Deletion route"
      })
    }
}

export const adminUpdateCourseController = async (req , res) => {
    try {
      
    } catch (error) {
      
    }
}