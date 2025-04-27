
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


// phone number must be 11ch && only number
const phoneInput = document.getElementById('phone');
const phoneError = document.getElementById('phoneError');
phoneInput.addEventListener('input', function(e) {
    this.value = this.value.replace(/\D/g, '');
        if (this.value.length === 11) {
        this.style.borderColor = '#4CAF50';
        phoneError.style.display = 'none';
    } else {
        this.style.borderColor = this.value.length > 0 ? '#8c0000' : '#ccc';
        phoneError.style.display = this.value.length > 0 ? 'block' : 'none';
    }
});
phoneInput.form?.addEventListener('submit', function(e) {
    if (phoneInput.value.length !== 11) {
        e.preventDefault();
        phoneError.style.display = 'block';
        phoneInput.style.borderColor = '#F44336';
        phoneInput.focus();
    }
});
