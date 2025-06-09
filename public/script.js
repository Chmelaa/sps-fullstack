// CAR FORM
const carForm = document.getElementById('car-form');
const carList = document.getElementById('car-list');
carForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const make = document.getElementById('make').value;
  const model = document.getElementById('model').value;
  await fetch('/api/cars', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ make, model })
  });
  loadCars();
});

async function loadCars() {
  const res = await fetch('/api/cars');
  const cars = await res.json();
  carList.innerHTML = cars.map(c => `<li>ID ${c.id}: ${c.make} ${c.model}</li>`).join('');
}

// CUSTOMER FORM
const customerForm = document.getElementById('customer-form');
const customerList = document.getElementById('customer-list');
customerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const firstname = document.getElementById('firstname').value;
  const lastname = document.getElementById('lastname').value;
  const driver_license = document.getElementById('driver_license').value;
  await fetch('/api/customers', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ firstname, lastname, driver_license })
  });
  loadCustomers();
});

async function loadCustomers() {
  const res = await fetch('/api/customers');
  const customers = await res.json();
  customerList.innerHTML = customers.map(c => `<li>ID ${c.id}: ${c.firstname} ${c.lastname} (${c.driver_license})</li>`).join('');
}

// RENTAL FORM
const rentalForm = document.getElementById('rental-form');
const rentalList = document.getElementById('rental-list');
rentalForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const car_id = document.getElementById('car_id').value;
  const customer_id = document.getElementById('customer_id').value;
  const rental_date = document.getElementById('rental_date').value;
  const return_date = document.getElementById('return_date').value;
  await fetch('/api/rentals', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ car_id, customer_id, rental_date, return_date })
  });
  loadRentals();
});

async function loadRentals() {
  const res = await fetch('/api/rentals');
  const rentals = await res.json();
  rentalList.innerHTML = rentals.map(r => `<li>ID ${r.id}: Auto ${r.car_id} – Zákazník ${r.customer_id} (${r.rental_date} až ${r.return_date})</li>`).join('');
}

// Initial load
loadCars();
loadCustomers();
loadRentals();