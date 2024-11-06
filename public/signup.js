document.getElementById('signupForm').addEventListener('submit', function(event) {
  event.preventDefault();  // Prevent form from redirecting or refreshing the page
  
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const agree = document.getElementById('agree').checked;

  // Simple form validation
  if (username === '' || email === '' || password === '') {
    alert('Please fill out all fields.');
    return;
  }

  if (!agree) {
    alert('You must agree to the Terms of Service, Privacy Policy, and Content Policies.');
    return;
  }

  // If all validations pass, show success message
  alert('Account created successfully!');
  
  // Optionally, reset the form after successful submission
  document.getElementById('signupForm').reset();
});
