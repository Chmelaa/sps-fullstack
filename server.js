const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = require('./database/db');

const carsRouter = require('./routes/cars');
const customersRouter = require('./routes/customers');
const rentalsRouter = require('./routes/rentals');

app.use(express.json());
app.use(express.static('public'));

app.use('/api/cars', carsRouter);
app.use('/api/customers', customersRouter);
app.use('/api/rentals', rentalsRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});