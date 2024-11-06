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
      // Compare passwords (using bcrypt for secure password checking)
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          res.json({ success: true, message: 'Login successful' });
        } else {
          res.status(401).json({ success: false, message: 'Invalid password' });
        }
      });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  });
});

// Sign-up route
app.post('/api/signup', (req, res) => {
  const { username, password, email } = req.body; // Read from request body

  // Check if all fields are provided
  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide all fields (username, email, password)' });
  }

  // Hash the password before storing it
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) throw err;

    // Insert the new user into the database
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(query, [username, email , hashedPassword], (err, results) => {
      if (err) {
        // Check for duplicate username or email
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ success: false, message: 'Username or email already exists' });
        }
        throw err;
      }

      res.status(201).json({ success: true, message: 'User registered successfully' });
    });
  });
});

// Start the server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
