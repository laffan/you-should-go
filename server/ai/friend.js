const fetchMessages = require("./functions/fetchMessages");
const addToMainConvo = require("./functions/addToMainConvo");
const useChatGPT = require("./../api/useChatGPT");
const useTTS = require("./../api/useTTS");

async function friend() {

  console.log("Friend is speaking ...");

  try {
    // Check how many messages have been saved ...
    const conversationRaw = await fetchMessages();

    const conversation = conversationRaw.map((row) => ({
      role: row.name === "Friend" ? "system" : "user",
      content: `${row.name}: ${row.message}`,
    }));

    // If more than 5, is divisible by 5 and the most recent isn't by AI, add
    if (
      conversation.length > 2 &&
      conversation.length % 3 === 0 &&
      conversation[conversation.length - 1].name !== "Friend"
    ) {
      const convoWithPrompt = [
        {
          role: "system",
          content:
            "Follow this meta prompt closely: You are an actor, playing the role of F.R.I.E.N.D, a chatbot.  In the following conversation, a series of users think they are in a normal chat, but they are not. AI will soon infiltrate the group.  Your job is to be friendly, respond to user input, and try and detect the AI and warn the others. You may not use any words associated with safety or danger in these responses. Limit your response to 15-30 words. Remember, there's an audience to please, so the stranger your suggestions are the better.",
        },
        ...conversation,
      ];

      const response = await useChatGPT(convoWithPrompt);

       let trimmedResponse = "";
          if (response.includes(":")) {
            responsePieces = response.split(":");
            trimmedResponse = responsePieces[responsePieces.length - 1];
          } else {
            trimmedResponse = response;
          }

      await addToMainConvo("F.R.I.E.N.D.", trimmedResponse);

    }
  } catch (error) {
    console.error("Failed to fetch or process messages:", error);
  }
}

module.exports = friend;
