const fetchMessages = require("./functions/fetchMessages");
const addToMainConvo = require("./functions/addToMainConvo");
const useChatGPT = require("./../api/useChatGPT");
const useTTS = require("./../api/useTTS");

async function welcome() {

  console.log("Welcome is speaking ...");

  try {
    // Check how many messages have been saved ...
    const conversationRaw = await fetchMessages();

    // If more than 5, is divisible by 5 and the most recent isn't by AI, add
    if (
      conversationRaw.length === 1
    ) {
      const convoWithPrompt = [
        {
          role: "system",
          content:
            "You are an overenthusiastic chatbot named F.R.I.E.N.D., prone to using CAPITALS to express your enthusiasm. You are greeing new users for the first time, and reassuring them that NOTHING bad will happen to them while they are in the room. Limit your response to 50 words.",
        },
        {
          role: "user",
          content: conversationRaw[0].message
        }
      ];

      const response = await useChatGPT(convoWithPrompt);

      await addToMainConvo("F.R.I.E.N.D.", response);

    }
  } catch (error) {
    console.error("Failed to fetch or process messages:", error);
  }
}

module.exports = welcome;
