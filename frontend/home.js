document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Unauthorized access. Please log in.');
    window.location.href = 'index.html';
    return;
  }

  try {
    // Fetch user details
    const userResponse = await fetch('http://localhost:8080/api/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const user = await userResponse.json();

    if (userResponse.ok) {
      document.getElementById('userName').textContent = user.name;
      document.getElementById('displayName').textContent = user.name;
    } else {
      console.error('Failed to fetch user details:', user);
      alert('Failed to fetch user details.');
    }
  } catch (error) {
    console.error('Error loading data:', error);
    alert('An error occurred while loading the page.');
  }
});

  
  // Handle donor registration
    document.getElementById('donorForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Unauthorized access. Please log in.');
      window.location.href = 'index.html';
      return;
    }
  
    const bloodGroup = document.getElementById('bloodGroup').value;
    const location = document.getElementById('location').value;
    const lastDonationDate = document.getElementById('lastDonationDate').value;
  
    try {
      const response = await fetch('http://localhost:8080/api/donors/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bloodGroup, location, lastDonationDate }),
      });
  
      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        document.getElementById('donorForm').reset();
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error registering donor:', error);
      alert('An error occurred while registering as a donor.');
    }
  });
  
  // Logout functionality
  document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
  });
  
  // Handle blood bank search
  document.getElementById('searchForm').addEventListener