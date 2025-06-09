document.addEventListener('DOMContentLoaded', () => {
    const carList = document.getElementById('carList');
    const addCarForm = document.getElementById('addCarForm');
  
    const loadCars = async () => {
      const res = await fetch('/api/cars');
      const cars = await res.json();
      carList.innerHTML = '';
      cars.forEach(car => {
        const li = document.createElement('li');
        li.textContent = `${car.make} ${car.model}`;
        carList.appendChild(li);
      });
    };
  
    addCarForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const make = addCarForm.make.value;
      const model = addCarForm.model.value;
      await fetch('/api/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ make, model })
      });
      addCarForm.reset();
      loadCars();
    });
  
    loadCars();
  });