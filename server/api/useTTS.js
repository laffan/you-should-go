const path = require("path");
const fs = require("fs");
const { OpenAI } = require("openai");
const dotenv = require('dotenv');

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OpenAI_API,
});


const mp3Dir = "/Users/nate/Documents/local-repos/290A-CMPM-Poetics/you-should-leave/site/public/mp3s"

async function useTTS(voice, input, filename) {
  const speechFile = path.resolve(`${mp3Dir}/${filename}`);


// voices : alloy, echo, fable, onyx, nova, and shimmer
//---------------------------------------------------------------
// alloy and shimmer are indistinguishable
// fable is british
// onyx is deep male narrator
// nova female telecaster
// shimmer for president


  async function main() {
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: voice,
      input: input,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    await fs.promises.writeFile(speechFile, buffer);

  }
  main();
}

module.exports = useTTS;

