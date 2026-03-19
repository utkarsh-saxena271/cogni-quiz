import 'dotenv/config'


if(!process.env.MONGO_URI){
    throw new Error("Environment variable for MONGO URI does not exist")
}else if(!process.env.GROQ_API){
    throw new Error("Environment variable for GROQ_API does not exist")
}else if(!process.env.PORT){
    throw new Error("Environment variable for PORT does not exist")
}else if(!process.env.JWT_SECRET){
    throw new Error("Environment variable for JWT_SECRET does not exist")
}

export const config = {
    PORT:process.env.PORT,
    MONGO_URI : process.env.MONGO_URI,
    GROQ_API : process.env.GROQ_API,
    JWT_SECRET : process.env.JWT_SECRET
}