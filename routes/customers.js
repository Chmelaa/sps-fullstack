const express = require('express');
const router = express.Router();
const db = require('../database/db');

router.get('/', (req, res) => {
  db.all('SELECT * FROM customers', (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

router.post('/', (req, res) => {
  const { firstname, lastname, driver_license } = req.body;
  db.run('INSERT INTO customers (firstname, lastname, driver_license) VALUES (?, ?, ?)', [firstname, lastname, driver_license], function (err) {
    if (err) return res.status(500).json(err);
    res.json({ id: this.lastID });
  });
});

module.exports = router;