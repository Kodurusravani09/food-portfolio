document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  


    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // Construct the URL with query parameters
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
    } else {
      message.style.color = 'red';
      message.textContent = result.message || 'Login failed';
    }
  });
  