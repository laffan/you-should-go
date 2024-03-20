const sqlite3 = require('sqlite3').verbose();

// Initial database connection
const db = new sqlite3.Database('./data.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error('Database opening error: ', err);
    return; // Ensure not to proceed if the database connection fails
  }
  console.log('Database connected');

  db.run('CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, author TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, message TEXT)', err => {
    if (err) console.error('Error creating messages table:', err);
  });
  
  db.run('CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, name TEXT)', err => {
    if (err) console.error('Error creating users table:', err);
  });
});


module.exports = db;