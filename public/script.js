document.getElementById('car-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const make = document.getElementById('make').value;
    const model = document.getElementById('model').value;
  
    await fetch('/api/cars', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ make, model })
    });
  
    loadCars();
  });
  
  async function loadCars() {
    const res = await fetch('/api/cars');
    const cars = await res.json();
    const list = document.getElementById('cars-list');
    list.innerHTML = '';
    cars.forEach(car => {
      const li = document.createElement('li');
      li.textContent = `${car.make} ${car.model}`;
      list.appendChild(li);
    });
  }
  
  loadCars();