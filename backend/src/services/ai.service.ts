import Groq from "groq-sdk";
import { config } from "../config/env.config.js"

const groq = new Groq({
    apiKey:config.GROQ_API
});

// export async function main() {
//   const completion = await getGroqChatCompletion();
//   console.log(completion.choices[0]?.message?.content || "");
// }

export const getGroqChatCompletion = async (prompt : string) => {
  return groq.chat.completions.create({
    messages: [
      // Set an optional system message. This sets the behavior of the
      // assistant and can be used to provide specific instructions for
      // how it should behave throughout the conversation.
      {
        role: "system",
        content: "You are a professor of the given subject, and you have to give 10 questions of the topic asked",
      },
      // Set a user message for the assistant to respond to.
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "openai/gpt-oss-20b",
  });
};

// main();