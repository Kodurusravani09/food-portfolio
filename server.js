const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Sravani#1818',
  database: 'food_portfolio'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to the database');
});

// Login route
app.get('/api/login', (req, res) => {
  const { username, password } = req.query; // Read from query parameters
  const query = 'SELECT * FROM users WHERE username = ?';

  db.query(query, [username], (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      const user = results[0];
      // Compare passwords (plain-text for this example)
      if (user.password === password) { // Replace this with bcrypt for production
        res.json({ success: true, message: 'Login successful' });
      } else {
        res.status(401).json({ success: false, message: 'Invalid password' });
      }
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  });
});


// Start the server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
