// document.addEventListener('DOMContentLoaded', async () => {
//     const foodList = document.getElementById('food-list');
//     const response = await fetch('http://localhost:5000/api/food');
//     const foodItems = await response.json();
  
//     foodItems.forEach(item => {
//       const foodDiv = document.createElement('div');
//       foodDiv.classList.add('food-item');
//       foodDiv.innerHTML = `
//         <img src="${item.image_url}" alt="${item.name}">
//         <h2>${item.name}</h2>
//         <p>${item.description}</p>
//         <p><strong>Price:</strong> $${item.price}</p>
//       `;
//       foodList.appendChild(foodDiv);
//     });
//   });
document.addEventListener('DOMContentLoaded', async () => {
  // Get the modal
  const modal = document.getElementById("loginModal");

  // Get the button that opens the modal
  const btn = document.getElementById("openLoginModal");

  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName("close")[0];

  // When the user clicks the button, open the modal 
  btn.onclick = function() {
      modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
      modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }

  // Fetch food items
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

  // Handle login form submission
  document.getElementById('login-form').addEventListener('submit', async (event) => {
      event.preventDefault();
      
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      // Construct the URL with query parameters
    // const url = http://localhost:5000/api/login?username=${username}&password=${password};
    const url = `http://localhost:5000/api/login?username=${username}&password=${password}`;


      const response = await fetch(url, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
      });

      const result = await response.json();
      const message = document.getElementById('login-message');

      if (response.ok && result.success) {
          message.style.color = 'green';
          message.textContent = 'Login successful!';
          modal.style.display = "none"; // Close modal on successful login
      } else {
          message.style.color = 'red';
          message.textContent = result.message || 'Login failed';
      }
  });
});