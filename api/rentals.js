const express = require('express');
const router = express.Router();
const db = require('../database/db');

router.get('/', (req, res) => {
  db.all(`SELECT rentals.id, customers.firstname || ' ' || customers.lastname AS customer,
                 cars.make || ' ' || cars.model AS car,
                 rental_date, return_date
          FROM rentals
          JOIN customers ON rentals.customer_id = customers.id
          JOIN cars ON rentals.car_id = cars.id`, (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

router.post('/', (req, res) => {
  const { customer_id, car_id, rental_date, return_date } = req.body;
  db.run('INSERT INTO rentals (customer_id, car_id, rental_date, return_date) VALUES (?, ?, ?, ?)',
    [customer_id, car_id, rental_date, return_date],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ id: this.lastID });
    });
});

router.delete('/:id', (req, res) => {
  db.run('DELETE FROM rentals WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json(err);
    res.json({ deleted: this.changes });
  });
});

module.exports = router;