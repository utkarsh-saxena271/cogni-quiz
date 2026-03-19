import express from "express";
import { loginController, registerController } from "../controllers/auth.controllers.js";

const router = express.Router();



router.post('/register',registerController)
router.post('/login',loginController)
router.get('/me')
router.post('/logout')


export default router;