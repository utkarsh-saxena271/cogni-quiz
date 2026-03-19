import express from 'express'
import { getGroqChatCompletion } from './services/ai.service.js';
import connectDB from './config/db.config.js';
import authRouter from './routes/auth.routes.js'
import quizRouter from './routes/quiz.routes.js'
import { config } from './config/env.config.js'

const app = express();
app.use(express.json());


app.use('/api/auth',authRouter)
app.use('/api/quiz',quizRouter)


app.post('/quiz',async (req,res) => {
    const {prompt} = req.body;
    if(!prompt){
        return res.status(400).json({
            message : "prompt not fount"
        })
    }
    try {
        const response = await getGroqChatCompletion(prompt);
        if(!response){
            return res.status(401).json({
                message: "retry, respone not generated"
            })
        }
        res.status(200).json({
            message:response.choices[0]?.message?.content
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
})

connectDB()


app.listen(config.PORT,()=>{
    console.log(`Server is running on PORT : ${config.PORT}`)
})