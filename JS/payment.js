// Get user ID from localStorage
const userId = localStorage.getItem('userId');

// Add event listener to the payment button
document.querySelector('.paynow button').addEventListener('click', function(event) {
    event.preventDefault(); // Prevents any default submit/reload
    submitPayment(); // Call submitPayment instead of finishPayment
});

function finishPayment() {
    alert("Payment done successfully!");
    window.location.href = "/index.html";
}

function submitPayment() {
    // Get payment details
    const cardNumber = document.getElementById('cardNumber').value;
    const expirationDate = document.getElementById('expirationDate').value;
    const cvv = document.getElementById('cvvNumber').value;

    // Validate inputs
    if (!cardNumber || cardNumber.length !== 16) {
        alert("Please enter a valid 16-digit card number");
        return;
    }

    if (!expirationDate) {
        alert("Please enter a valid expiration date");
        return;
    }

    if (!cvv || cvv.length !== 3) {
        alert("Please enter a valid 3-digit CVV");
        return;
    }

    if (!userId) {
        alert("User ID not found. Please log in again.");
        window.location.href = "signin.html";
        return;
    }

    console.log("Sending payment request...");
    console.log("User ID:", userId);
    console.log("Card Number:", cardNumber);
    console.log("Expiration Date:", expirationDate);
    console.log("CVV:", cvv);

    // Format the date to match LocalDate.parse() format (YYYY-MM-DD)
    // Assuming expirationDate is in MM/YYYY format from input
    let formattedDate = expirationDate;
    if (expirationDate.includes('/')) {
        const [month, year] = expirationDate.split('/');
        // Set to last day of the month for expiration
        formattedDate = `${year}-${month.padStart(2, '0')}-01`;
    }

    // Create form data for sending
    const formData = new FormData();
    formData.append('Id', userId);
    formData.append('cardNumber', cardNumber);
    formData.append('expirationDate', formattedDate);
    formData.append('cvv', cvv);

    // Send payment request
    fetch('http://localhost:8080/api/payments/Payment', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Payment request failed with status: ' + response.status);
            }
            return response.text();
        })
        .then(data => {
            console.log("Server responded:", data);
            if (data.includes("Payment successful")) {
                finishPayment(); // Call finishPayment after successful payment
            } else {
                alert(data); // Show error message from server
            }
        })
        .catch(err => {
            console.error('Payment error:', err);
            alert('An error occurred during payment processing: ' + err.message);
        });
}

// Check card number
const cardNumberInput = document.getElementById('cardNumber');
const cardError = document.getElementById('cardError');
if (cardNumberInput) {
    cardNumberInput.addEventListener('input', function(e) {
        this.value = this.value.replace(/\D/g, '');
        if (this.value.length === 16) {
            this.style.borderColor = '#4CAF50';
            if (cardError) cardError.style.display = 'none';
        } else {
            this.style.borderColor = this.value.length > 0 ? '#F44336' : '#ccc';
            if (cardError) cardError.style.display = this.value.length > 0 ? 'block' : 'none';
        }
    });

    if (cardNumberInput.form) {
        cardNumberInput.form.addEventListener('submit', function(e) {
            if (cardNumberInput.value.length !== 16) {
                e.preventDefault();
                if (cardError) cardError.style.display = 'block';
                cardNumberInput.style.borderColor = '#F44336';
                cardNumberInput.focus();
            }
        });
    }
}

// CVV check
const cvvInput = document.getElementById('cvvNumber');
const cvvError = document.getElementById('cvvError');
if (cvvInput) {
    cvvInput.addEventListener('input', function(e) {
        this.value = this.value.replace(/\D/g, '');

        if (this.value.length === 3) {
            this.style.borderColor = '#4CAF50';
            if (cvvError) cvvError.style.display = 'none';
        } else {
            this.style.borderColor = this.value.length > 0 ? '#F44336' : '#ccc';
            if (cvvError) cvvError.style.display = this.value.length > 0 ? 'block' : 'none';
        }
    });

    if (cvvInput.form) {
        cvvInput.form.addEventListener('submit', function(e) {
            if (cvvInput.value.length !== 3) {
                e.preventDefault();
                if (cvvError) cvvError.style.display = 'block';
                cvvInput.style.borderColor = '#F44336';
                cvvInput.focus();
            }
        });
    }
}

// Check if the user is logged in when page loads
document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('status');

    if (!isLoggedIn || isLoggedIn !== 'true') {
        // Not logged in? Redirect to login page
        alert('You must be logged in to access the payment page.');
        window.location.href = 'signin.html'; // Redirect to your login page
    }
});