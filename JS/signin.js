// view password and hide it again
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');
togglePassword.addEventListener('click', () => {
  const isPassword = passwordInput.type === 'password';
  passwordInput.type = isPassword ? 'text' : 'password';
  togglePassword.classList.toggle('fa-eye');
  togglePassword.classList.toggle('fa-eye-slash');
});

// password must be 8 characters at least
function validatePassword() {
  const password = document.getElementById("password").value;
  const error = document.getElementById("passwordError");
  if (password.length < 8) {
    error.style.display = "block";
    return false;
  } else {
    error.style.display = "none";
    return true;
  }
}

// handle login form submission
const signinForm = document.getElementById('signinform');
signinForm.addEventListener('submit', async function(e) {
  e.preventDefault(); // prevent default form submission

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;


    if (email === "admin@renew" && password === "admin") {
      // Save mock data to localStorage
      localStorage.setItem('userId', 'admin123');
      localStorage.setItem('email', email);
      localStorage.setItem('status', 'true');
  
      if (typeof updateNavBar === 'function') {
        updateNavBar();
      }
  
      window.location.href = 'dashboard.html'; 
      return;
    }

  try {
    const response = await fetch('http://localhost:8080/api/users/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Login successful!', data);

      // --- Save userId and email to localStorage ---
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('email', data.email);

      // --- NEW: Save login status ---
      localStorage.setItem('status', 'true');

      // --- NEW: Update the navbar immediately ---
      if (typeof updateNavBar === 'function') {
        updateNavBar();
      }

      // Redirect the user after successful login
      window.location.href = 'Products.html';
    } else {
      const errorData = await response.json();
      console.error('Login failed:', errorData);
      alert('Login failed: ' + (errorData.message || 'Please check your credentials.'));
    }
  } catch (error) {
    console.error('Error during login:', error);
    alert('An error occurred. Please try again.');
  }
});

// Check if user is logged in
const userId = localStorage.getItem('userId');
const email = localStorage.getItem('email');

// If logged in
if (userId && email) {
  console.log('User is logged in:', email);

  // Show logout button
  const logoutBtn = document.getElementById('logOut');
  if (logoutBtn) logoutBtn.style.display = 'block';
} else {
  console.log('No user logged in.');
}

// Logout function
function logout() {
  localStorage.clear(); // Clears all login info
  if (typeof updateNavBar === 'function') {
    updateNavBar(); // Update navbar
  }
  window.location.href = '/signin.html'; // Redirect to signin page
}

// Attach logout function
const logoutBtn = document.getElementById('logOut') || document.getElementById('logOut');
if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}

