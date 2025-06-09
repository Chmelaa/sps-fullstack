const db = require('../database/db');

const seed = () => {
  db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS cars (id INTEGER PRIMARY KEY, make TEXT, model TEXT)');
    db.run('CREATE TABLE IF NOT EXISTS customers (id INTEGER PRIMARY KEY, firstname TEXT, lastname TEXT, driver_license TEXT)');
    db.run('CREATE TABLE IF NOT EXISTS rentals (id INTEGER PRIMARY KEY, car_id INTEGER, customer_id INTEGER, rental_date TEXT, return_date TEXT, FOREIGN KEY(car_id) REFERENCES cars(id), FOREIGN KEY(customer_id) REFERENCES customers(id))');

    db.run('DELETE FROM cars');
    db.run('DELETE FROM customers');
    db.run('DELETE FROM rentals');

    db.run('INSERT INTO cars (make, model) VALUES ("Škoda", "Octavia"), ("Toyota", "Corolla")');
    db.run('INSERT INTO customers (firstname, lastname, driver_license) VALUES ("Jan", "Novák", "ABC123"), ("Petr", "Svoboda", "XYZ456")');
  });
};

seed();