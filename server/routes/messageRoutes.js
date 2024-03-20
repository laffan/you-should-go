const express = require("express");
const router = express.Router();
const db = require("../db");
const friend = require("./../ai/friend");
const mimic = require("./../ai/mimic");
const welcome = require("./../ai/welcome");

// Helper function to support async/await in Express route handlers
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      res.status(500).send(error.message);
      console.error(error.message);
    }
  };
}

router.post(
  "/message",
  asyncHandler(async (req, res) => {
    const { name, message } = req.body;
    const sql = `INSERT INTO messages (name, author, message) VALUES (?, ?, ?)`;

    db.run(sql, [name, "human", message], async function (err) {
      if (err) {
        console.error(err.message);
        res.status(500).send("Error saving the message");
        return;
      }
      res.status(200).send("Message saved");

      // After each message is saved, check to see if the AI
      // should add something.
      try {

        await welcome();
        await friend();
        await mimic();
        
      } catch (error) {
        console.error("Failed to fetch or process messages:", error);

      }
    });
  })
);

// In your Express server
router.get("/messages", (req, res) => {
  db.all(
    "SELECT name, author, message, timestamp FROM messages ORDER BY timestamp ASC",
    [],
    (err, rows) => {
      if (err) {
        console.error("Error fetching messages:", err);
        res.status(500).send("Error fetching messages");
        return;
      }
      res.json(rows);
    }
  );
});

module.exports = router;
