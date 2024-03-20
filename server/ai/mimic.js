const fetchMessages = require("./functions/fetchMessages");
const addToMainConvo = require("./functions/addToMainConvo");
const useChatGPT = require("./../api/useChatGPT");
const useTTS = require("./../api/useTTS");

async function mimic() {
  try {
    console.log("Mimic is speaking ...");

    // Check how many messages have been saved ...
    const conversation = await fetchMessages();

    const names = new Set();

    // List authors
    conversation.map((msg, i) => {
      if (msg.author !== "AI") {
        names.add(msg.name);
      }
    });

    // If user has at least 5 messages, then add them to
    // the talkativeUsers object
    const talkativeUsers = [...names].map((curName) => {
      const messages = conversation.filter((msg) => msg.name === curName);
      if (messages.length >= 5) {
        return {
          name: curName,
          messages,
        };
      }
    });

    console.log("names");
    console.log(names);

    console.log("talkativeUser");
    console.log(talkativeUsers);
    if (
      (conversation.length > 10 && conversation.length % 3 === 0) ||
      (conversation.length > 10 && [...names].length === 1)
    ) {
      // Filter out undefined entries from talkativeUsers
      const filteredTalkativeUsers = talkativeUsers.filter(
        (user) => user !== undefined
      );
      console.log("filteredTalkativeUsers");
      console.log(filteredTalkativeUsers);

      const randomTalker =
        filteredTalkativeUsers[
          Math.floor(Math.random() * filteredTalkativeUsers.length)
        ];

      if (randomTalker) {
        const randomTalkerData = randomTalker.messages
          .map((msg) => (msg.author !== "AI" ? msg.message : " "))
          .join(" ");

        // console.log("randomTalker.messages");
        // console.log(randomTalker.messages);

        // console.log("randomTalkerData");
        // console.log(randomTalkerData);

        // If random talker isn't most recent talker, then trigger AI
        if (conversation[conversation.length - 1].author !== "AI") {
          let responses = [];
          const conversationToDate = conversation.map((row) => {
            if (row.author !== "AI") {
              responses.push(`${row.name}: ${row.message}`);
            }
          });

          const convoWithPrompt = [
            {
              role: "system",
              content: `You are an evil mimic.  The following messages (between triple brackets) were written by a single author in a chat conversation. [[[${randomTalkerData}]]]. Now, learn the user's style, message length and attitude, then respond to the most recent message as that author would. Your secret mission is to convince "F.R.I.E.N.D." that you are the real author, and that the original author is an imposter. Do not include your name in your message or break character. Limit to 10 words or less.`,
            },
            {
              role: "user",
              content: responses.join(" / "),
            },
          ];

          const response = await useChatGPT(convoWithPrompt);

          // Responses seem to come back with colons, so ...
          let trimmedResponse = "";
          if (response.includes(":")) {
            responsePieces = response.split(":");
            trimmedResponse = responsePieces[responsePieces.length - 1];
          } else {
            trimmedResponse = response;
          }
          await addToMainConvo(randomTalker.name, trimmedResponse);
        }
      } else {
        console.log("Random talker was most recent talker.");
      }
    } else {
      console.log("No talkative user found.");
    }
  } catch (error) {
    console.error("Failed to fetch or process messages:", error);
  }
}

module.exports = mimic;
