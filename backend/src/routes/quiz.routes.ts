import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
const router = express.Router();

// create
router.post('/create',authMiddleware)
// join
router.post('/join/:id',authMiddleware)
// get all quizes
router.get('/',authMiddleware)


export default router;