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

// API to create table (optional, for setup)
app.post('/api/create-table', (req, res) => {
  const sql = `CREATE TABLE IF NOT EXISTS CheckTable (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mobile VARCHAR(15) NOT NULL,
    email VARCHAR(100) NOT NULL
  )`;
  connection.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Table created successfully' });
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