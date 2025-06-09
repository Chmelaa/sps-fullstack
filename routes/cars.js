const express = require('express');
const router = express.Router();
const db = require('../database/db');

router.get('/', (req, res) => {
  db.all('SELECT * FROM cars', (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

router.post('/', (req, res) => {
  const { make, model } = req.body;
  db.run('INSERT INTO cars (make, model) VALUES (?, ?)', [make, model], function (err) {
    if (err) return res.status(500).json(err);
    res.json({ id: this.lastID });
  });
});

module.exports = router;