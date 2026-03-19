import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        }
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    quizzes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Quiz",
        }
    ],

    stats: {
        totalQuizzes: {
            type: Number,
            default: 0,
        },
        totalScore: {
            type: Number,
            default: 0,
        },
        averageScore: {
            type: Number,
            default: 0,
        },
    },
},{
    timestamps:true
})


const userModel = mongoose.model("User", userSchema);


export default userModel;