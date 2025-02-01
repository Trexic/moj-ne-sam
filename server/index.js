const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Настройка подключения к базе данных PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Получение всех заявок пользователя
app.get('/api/user/orders', async (req, res) => {
  try {
    const userId = req.query.user_id; // Получаем ID пользователя из параметров запроса
    if (!userId) {
      return res.status(400).send('User ID is required');
    }

    const result = await pool.query('SELECT * FROM orders WHERE user_id = $1', [userId]);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Создание новой заявки
app.post('/api/orders', async (req, res) => {
  const { type, size, frequency, user_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO orders (type, size, frequency, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [type, size, frequency, user_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});