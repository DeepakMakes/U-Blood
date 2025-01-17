// Handle user registration
document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const response = await fetch('http://localhost:8080/api/users/register', { // Updated port
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });

  const result = await response.json();
  if (response.ok) {
    alert(result.message);
  } else {
    alert(`Error: ${result.error || 'Registration failed'}`);
  }
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const response = await fetch('http://localhost:8080/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    if (response.ok) {
      localStorage.setItem('token', result.token); // Save JWT token
      localStorage.setItem('role', result.role);  // Save user role

      // Redirect based on role
      if (result.role === 'admin') {
        window.location.href = '/admin-home.html';
      } else {
        window.location.href = '/home.html';
      }       
    } else {
      alert(`Error: ${result.error || 'Login failed'}`);
    }
  } catch (error) {
    console.error('Error logging in:', error);
    alert('An error occurred during login.');
  }
});

