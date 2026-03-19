import userModel from "../models/user.model.js";
import bcrypt from 'bcrypt'
import z from "zod";
import { type RequestHandler } from "express";
import { generateToken } from "../lib/jwt.lib.js";


export const registerController:RequestHandler = async (req,res) => {
    try{
        const reqbody = z.object({
            fullName:z.object({
                firstName:z.string(),
                lastName:z.string()
            }),
            email:z.email(),
            password:z.string()
        })

        const parsed = reqbody.safeParse(req.body)
        if(!parsed.success){
            return res.status(400).json({
                success:false,
                message:"Invalid inputs."
            })
        }
        const {fullName:{firstName, lastName},email,password} = parsed.data;

        const userExist = await userModel.findOne({email:email})
        if(userExist){
            return res.status(400).json({
                success:false,
                message:"User already exists, please login or create account with different email."
            })
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password,salt);

        const user = await userModel.create({
            fullName:{
                firstName,lastName
            },
            email,
            password:hashPass

        })

        return res.status(200).json({
            success:true,
            data:{
                fullName:{
                    firstName:user.fullName?.firstName,
                    lastName:user.fullName?.lastName
                },
                email
            }
        })



    }catch(e){
        console.log(e);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

export const loginController:RequestHandler = async (req,res) => {
    try {
        const reqBody = z.object({
            email:z.email(),
            password:z.string()
        })
        const parsed = reqBody.safeParse(req.body);
        if(!parsed.success){
            return res.status(400).json({
                success:false,
                message:"Invalid Inputs"
            })
        }
        const {email, password} = parsed.data;
        const userExist = await userModel.findOne({email:email});
        if(!userExist){
            return res.status(400).json({
                success:false,
                message:"Invalid email or password"
            })
        }
        const isPasswordValid = await bcrypt.compare(password, userExist.password);
        if(!isPasswordValid){
            return res.status(400).json({
                success:false,
                message:"Invalid password or email"
            })
        }
        const token = generateToken(userExist._id, res);
        res.status(200).json({
            success:true,
            data:{
                token,
                user:{
                    id: userExist._id,
                    email: userExist.email,
                    fullName: userExist.fullName
                }
            }
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}



