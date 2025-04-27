// view password and hide it again 
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');
togglePassword.addEventListener('click', () => {
const isPassword = passwordInput.type === 'password';
passwordInput.type = isPassword ? 'text' : 'password';
togglePassword.classList.toggle('fa-eye');
togglePassword.classList.toggle('fa-eye-slash');
});

// password must be 8ch at least
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

