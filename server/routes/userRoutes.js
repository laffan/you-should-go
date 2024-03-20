const express = require('express');
const router = express.Router();
const db = require('../db'); // Assuming you have a separate module for your database connection

// Login endpoint
router.post('/login', (req, res) => {
  const { userId, name } = req.body;
  
  const query = `INSERT INTO users (id, name) VALUES (?, ?) ON CONFLICT(id) DO UPDATE SET name = excluded.name`;
  db.run(query, [userId, name], function(err) {
    if (err) {
      console.error('Error saving user:', err.message);
      res.status(500).send('Error saving user');
      return;
    }
    res.status(200).send('Login successful');
  });
});

// Username retrieval endpoint
router.get('/username', (req, res) => {
  const { userId } = req.query;
  
  const query = `SELECT name FROM users WHERE id = ?`;
  db.get(query, [userId], (err, row) => {
    if (err) {
      console.error('Error fetching user:', err.message);
      res.status(500).send('Error fetching user');
      return;
    }
    if (row) {
      res.json({ name: row.name });
    } else {
      res.status(404).send('User not found');
    }
  });
});

module.exports = router;
