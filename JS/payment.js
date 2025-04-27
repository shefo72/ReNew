document.querySelector('.paynow button').addEventListener('click', function() {
    submitPayment();
});

function submitPayment() {
    const cardName = document.querySelector('.cardbox').value;
    const cardNumber = document.querySelectorAll('.cardbox')[1].value;
    const expirationDate = document.getElementById('expirationDate').value;
    const cvv = document.getElementById('cvvNumber').value;
    
    console.log("Sending payment request...");
    
    fetch('http://localhost:7070/api/payment/payments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            cardName, 
            cardNumber, 
            expirationDate, 
            cvv,
            saveCard: document.getElementById('save').checked
        })
    })
    .then(res => res.text())
    .then(data => {
        console.log("Server responded:", data);
        alert(data);
    })
    .catch(err => {
        console.error('Payment error:', err);
        alert('An error occurred during payment processing.');
    });
}



// check card number
const cardNumberInput = document.getElementById('cardNumber');
const cardError = document.getElementById('cardError');
cardNumberInput.addEventListener('input', function(e) {
    this.value = this.value.replace(/\D/g, '');
    if (this.value.length === 16) {
        this.style.borderColor = '#4CAF50';
        cardError.style.display = 'none';
    } else {
        this.style.borderColor = this.value.length > 0 ? '#F44336' : '#ccc';
        cardError.style.display = this.value.length > 0 ? 'block' : 'none';
    }
});
cardNumberInput.form?.addEventListener('submit', function(e) {
    if (cardNumberInput.value.length !== 16) {
        e.preventDefault();
        cardError.style.display = 'block';
        cardNumberInput.style.borderColor = '#F44336';
        cardNumberInput.focus();
    }
});

// cvv check 

        const cvvInput = document.getElementById('cvvNumber');
        const cvvError = document.getElementById('cvvError');
        cvvInput.addEventListener('input', function(e) {
            this.value = this.value.replace(/\D/g, '');
            
            if (this.value.length === 3) {
                this.style.borderColor = '#4CAF50';
                cvvError.style.display = 'none';
            } else {
                this.style.borderColor = this.value.length > 0 ? '#F44336' : '#ccc';
                cvvError.style.display = this.value.length > 0 ? 'block' : 'none';
            }
        });

        cvvInput.form?.addEventListener('submit', function(e) {
            if (cvvInput.value.length !== 3) {
                e.preventDefault();
                cvvError.style.display = 'block';
                cvvInput.style.borderColor = '#F44336';
                cvvInput.focus();
            }
        });