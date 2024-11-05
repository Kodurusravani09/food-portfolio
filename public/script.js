document.addEventListener('DOMContentLoaded', async () => {
    const foodList = document.getElementById('food-list');
    const response = await fetch('http://localhost:5000/api/food');
    const foodItems = await response.json();
  
    foodItems.forEach(item => {
      const foodDiv = document.createElement('div');
      foodDiv.classList.add('food-item');
      foodDiv.innerHTML = `
        <img src="${item.image_url}" alt="${item.name}">
        <h2>${item.name}</h2>
        <p>${item.description}</p>
        <p><strong>Price:</strong> $${item.price}</p>
      `;
      foodList.appendChild(foodDiv);
    });
  });
  