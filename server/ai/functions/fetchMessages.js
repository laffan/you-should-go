const sqlite3 = require("sqlite3").verbose();
const db = require("../../db");

function fetchMessages() {
  return new Promise((resolve, reject) => {
    db.all('SELECT name, author, message, timestamp FROM messages ORDER BY timestamp ASC', [], (err, rows) => {
      if (err) {
        console.error('Error fetching messages:', err);
        reject(err);
        return;
      }


      resolve(rows);
    });
  });
}


module.exports = fetchMessages;
