import {User} from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv  from 'dotenv'

dotenv.config()

export const register=async (req,res)=>{
    try {
        const {fullName,email,password}=req.body;
        if(!fullName || !email || !password){
            return res.status(403).json({
                success:false,
                message:"All field are required"
            })
        }
        const user=await User.findOne({email});
        if(user){
            return res.status(403).json({
                success:false,
                message:"This email Id is already registered"
            })
        }
        const hashPassword=await bcrypt.hash(password,10)
        await User.create({fullName,email,password:hashPassword})
        return res.status(201).json({
            success:true,
            message:"Account created Successfully"
        })
    } catch (err) {
        console.log(err)
    }
}


export const login =async (req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All field are required"
            })
        }
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Incorrect email or Password"
            })
        }
        const isPassword=await bcrypt.compare(password,user.password);
        if(!isPassword){
            return res.status(400).json({
                success:false,
                message:"Incorrect email or Password"
            })
        }

        const token=await jwt.sign({userId:user._id},process.env.SERECT_KEY,{expiresIn:'1d'})

        return res.status(200).cookie("token",token,{httpOnly:true,sameSite:"strict",maxAge:24*60*60*1000}).json({
            success:true,
            message:"Login successfully" 
        })
    } catch (error) {
        console.log(error)
    }
}

export const logout=async(req,res)=>{
    try {
       return res.status(200).cookie("token","",{maxAge:0}).json({
        success:true,
        message:"User logout successfully"
       }) 
    } catch (error) {
        console.log(error)
    }
}