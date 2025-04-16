
// password view 
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');
togglePassword.addEventListener('click', () => {
const isPassword = passwordInput.type === 'password';
passwordInput.type = isPassword ? 'text' : 'password';
togglePassword.classList.toggle('fa-eye');
togglePassword.classList.toggle('fa-eye-slash');
});




// Terms desplay
const modal = document.getElementById("termsModal");
const btn = document.getElementById("openModal");
const closeBtn = document.querySelector(".close");
btn.onclick = function(e) {
e.preventDefault();
modal.style.display = "block";
}
closeBtn.onclick = function() {
modal.style.display = "none";
}
window.onclick = function(event) {
if (event.target == modal) {
    modal.style.display = "none";
}
}

// Password must be 8ch at least
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