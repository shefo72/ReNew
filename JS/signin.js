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

document.getElementById('signinform').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const messageBox = document.getElementById('message');

  messageBox.textContent = ''; // clear old messages

  if (email === "admin@renew" && password === "admin") {
    localStorage.setItem('userId', 'admin123');
    localStorage.setItem('email', email);
    localStorage.setItem('status', 'true');
    if (typeof updateNavBar === 'function') updateNavBar();
    window.location.href = 'dashboard.html';
    return;
  }

  const storedUser = localStorage.getItem(`user_${email}`);

  if (storedUser) {
    const userData = JSON.parse(storedUser);

    if (userData.password === password) {
      localStorage.setItem('userId', email);
      localStorage.setItem('email', email);
      localStorage.setItem('status', 'true');

      if (typeof updateNavBar === 'function') updateNavBar();
      window.location.href = 'Products.html';
    } else {
      messageBox.textContent = 'Incorrect password.';
    }
  } else {
    messageBox.textContent = 'User not found. Please register first.';
  }
});
