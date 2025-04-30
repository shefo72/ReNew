// navber
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (mainNav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mainNav.contains(event.target) && !mobileMenuBtn.contains(event.target) && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});


// log out
document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logOut');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('email');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userId');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('status');
            console.log('User logged out.');
            updateNavBar();
            window.location.href = 'signin.html';
        });
    }
});



// updating the navbar based on login status
function updateNavBar() {
    const status = localStorage.getItem('status');
    const nav = document.getElementById('mainNav');
    if (status === 'true') {
        nav.innerHTML = `
            <ul class="no-bullets">
                <li><a href="/index.html">Home</a></li>
                <li><a href="/Products.html">Products</a></li>
                <li><a href="/donate.html">Donation</a></li>
                <li><a href="/myorder.html">My Orders</a></li>
                <li><a href="/payment.html">Payment</a></li>
                <li><a href="/aboutus.html">About Us</a></li>
                <li><button id="logOut">Log Out <i class="fa-solid fa-arrow-right-from-bracket"></i></button></li>
            </ul>
        `;
        const logOutBtn = document.getElementById('logOut');
        if (logOutBtn) {
            logOutBtn.addEventListener('click', logout);
        }

    } else {
        nav.innerHTML = `
            <ul class="no-bullets">
                <li><a href="/index.html">Home</a></li>
                <li><a href="/Products.html">Products</a></li>
                <li><a href="/aboutus.html">About Us</a></li>
                <li><a href="/signin.html">Sign In</a></li>
                <li><a href="/signup.html">Sign Up</a></li>
            </ul>
        `;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    updateNavBar();
});

function logout() {
    localStorage.clear();
    updateNavBar();
    window.location.href = '/signin.html';
}

// added Footer 
const footer = document.getElementById("footer");
footer.innerHTML = `
    <div class="logo-container">
        <img src="Media/logo-footer.png" alt="logo" class="image"/>
    </div>
    <div class="ps">
        <p><i class="fa-solid fa-phone"></i> Phone : +123456789</p>
        <p><i class="fa-solid fa-map-pin"></i> Location : Alexandria, Egypt</p>
        <p>Giving old Furniture a new life through creativity and sustainability</p>
    </div>
`;