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

router.put('/:id', (req, res) => {
  const { firstname, lastname, driver_license } = req.body;
  db.run('UPDATE customers SET firstname = ?, lastname = ?, driver_license = ? WHERE id = ?', [firstname, lastname, driver_license, req.params.id], function (err) {
    if (err) return res.status(500).json(err);
    res.json({ updated: this.changes });
  });
});

router.delete('/:id', (req, res) => {
  db.run('DELETE FROM customers WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json(err);
    res.json({ deleted: this.changes });
  });
});

module.exports = router;