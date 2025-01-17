document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Unauthorized access. Please log in.');
      window.location.href = 'index.html';
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8080/api/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const user = await response.json();
      if (response.ok && user.role === 'admin') {
        document.getElementById('adminName').textContent = user.name;
      } else {
        alert('Access denied.');
        window.location.href = 'index.html';
      }
    } catch (error) {
      console.error('Error loading admin data:', error);
      alert('An error occurred while loading the admin dashboard.');
    }
  });
  
  // Logout functionality
  document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
  });
  
  