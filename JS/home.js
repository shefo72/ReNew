// Delay items in refresh
window.addEventListener('load', function() {
    const main = document.querySelector('.main');
    main.classList.remove('hidden');
    main.classList.add('show');
});

// Change button --> from sign in to product depend on sign in status
document.getElementById('home').addEventListener('click', function () {
    const status = localStorage.getItem('status');
    if (status === 'true') {
        window.location.href = 'Products.html';
    } else {
        window.location.href = 'signin.html';
    }
});