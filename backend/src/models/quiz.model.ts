import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    question:{
        type:String,
    },
    options:[String],
    correctAnswer:String,
    explanation:String
})

const quizSchema = new mongoose.Schema({
    user: {
        type:mongoose.Types.ObjectId,
        ref : "User"
    },
    number:{
        type:Number,
        required:true
    },
    questions:[questionSchema],
    topic:String,

})



const quizModel = mongoose.model("Quiz",quizSchema)

export default quizModel