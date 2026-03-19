import type { RequestHandler } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { config } from "../config/env.config.js";
import userModel from "../models/user.model.js";

declare global{
    namespace Express{
        interface Request{
            user? : {
                userId : string,
            }
        }
    }
}

export const authMiddleware: RequestHandler = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({
                message: "unauthorized",
            });
        }

        const decoded = jwt.verify(token, config.JWT_SECRET) as JwtPayload;

        const user = await userModel.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({
                message: "user not found",
            });
        }

        req.user = {
            userId : user._id.toString()
        }
        next();
    } catch (e) {
        return res.status(401).json({
            message: "invalid token",
        });
    }
};