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

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { make, model } = req.body;
  db.run('UPDATE cars SET make = ?, model = ? WHERE id = ?', [make, model, id], function (err) {
    if (err) return res.status(500).json(err);
    res.json({ updated: this.changes });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM cars WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json(err);
    res.json({ deleted: this.changes });
  });
});

module.exports = router;