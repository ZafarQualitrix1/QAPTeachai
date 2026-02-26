require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');

const app = express();

app.use(express.json());

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306
});

connection.connect((err) => {
  if (err) {
    console.error('DB connection error:', err);
  } else {
    console.log('Connected to TiDB MySQL DB');
  }
});

// API to create database (connect without database)
app.post('/api/create-database', (req, res) => {
  const tempConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 3306
  });
  tempConnection.connect((err) => {
    if (err) {
      return res.status(500).json({ error: 'Connection failed: ' + err.message });
    }
    const sql = 'CREATE DATABASE IF NOT EXISTS QAPTeachai';
    tempConnection.query(sql, (err, result) => {
      tempConnection.end();
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Database QAPTeachai created successfully' });
    });
  });
});

// API to add user
app.post('/api/users', (req, res) => {
  const { mobile, email } = req.body;
  if (!mobile || !email) {
    return res.status(400).json({ error: 'Mobile and email are required' });
  }
  const sql = 'INSERT INTO CheckTable (mobile, email) VALUES (?, ?)';
  connection.query(sql, [mobile, email], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'User added successfully', id: result.insertId });
  });
});

// API to get users
app.get('/api/users', (req, res) => {
  const sql = 'SELECT * FROM CheckTable';
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.get('/', (req, res) => res.send('Backend is running'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));