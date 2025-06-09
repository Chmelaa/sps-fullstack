const express = require('express');
const router = express.Router();
const db = require('../database/db');

router.get('/', (req, res) => {
  db.all('SELECT * FROM rentals', (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

router.post('/', (req, res) => {
  const { car_id, customer_id, rental_date, return_date } = req.body;
  db.run('INSERT INTO rentals (car_id, customer_id, rental_date, return_date) VALUES (?, ?, ?, ?)', [car_id, customer_id, rental_date, return_date], function (err) {
    if (err) return res.status(500).json(err);
    res.json({ id: this.lastID });
  });
});

module.exports = router;