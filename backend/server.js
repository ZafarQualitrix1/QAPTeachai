require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');

const app = express();

app.use(express.json());

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'dummy'
});

connection.connect((err) => {
  if (err) {
    console.error('DB connection error:', err);
  } else {
    console.log('Connected to MySQL DB');
  }
});

app.get('/', (req, res) => res.send('Backend is running'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));