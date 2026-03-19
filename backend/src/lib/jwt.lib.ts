import type { Response } from "express";
import { config } from '../config/env.config.js'
import jwt from "jsonwebtoken";
import type { Types } from "mongoose";



export const generateToken = (userId:Types.ObjectId, res:Response) => {
  const token = jwt.sign({ userId }, config.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // prevent XSS attacks: cross-site scripting
    sameSite: "strict", // CSRF attacks
    secure: process.env.NODE_ENV === "development" ? false : true,
  });

  return token;
};