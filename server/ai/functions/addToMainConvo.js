const db = require("../../db");


function addToMainConvo(username, messageContent) {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO messages (name, author, message) VALUES (?, ?, ?)`;
    db.run(sql, [username, "AI", messageContent], function(err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID); 
    });
  });
}

module.exports = addToMainConvo;