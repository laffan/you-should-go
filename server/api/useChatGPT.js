const { OpenAI } = require("openai");
const dotenv = require('dotenv');
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OpenAI_API,
});

async function useChatGPT(messages) {
  try {
    const response = await openai.chat.completions.create({
      // model: "gpt-3.5-turbo",
      model: "gpt-4",
      messages
    });


    return response.choices[0].message.content.trim();
    
  } catch (error) {
    console.error("Error fetching response from OpenAI:", error);
  }
}

module.exports = useChatGPT;

