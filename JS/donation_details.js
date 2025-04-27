    document.getElementById("imageUpload").addEventListener("change", function () {
        const preview = document.getElementById("preview");
        const files = Array.from(this.files);
        files.forEach(file => {
        if (file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = function (e) {
            const img = document.createElement("img");
            img.src = e.target.result;
            img.style.cssText = `
                width: 100px;
                height: 100px;
                margin: 5px;
                object-fit: cover;
                border-radius: 8px;
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
            `;
            preview.appendChild(img);
            };
            reader.readAsDataURL(file);
        }
        });
    });
    

    document.getElementById("donationForm").addEventListener("submit", async function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        try {
        const response = await fetch('https://your-api.com/submit', {
            method: 'POST',
            body: formData
        });
    
        if (response.ok) {
            document.getElementById("successModal").style.display = "block";
        } else {
            alert("There was a problem submitting the form.");
        }
    
        } catch (error) {
        console.error("Error:", error);
        alert("Network error occurred.");
        }
    });
    
    // close massage
    document.getElementById("close").addEventListener("click", function () {
        document.getElementById("successModal").style.display = "none";
    });


    // to select one condition for furniture 
    function selectCondition(button) {
        const buttons = document.querySelectorAll('.condition-btn');
        buttons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
    }


    // make sure that phone number == 11ch
    const phoneInput = document.getElementById('phone-number');
    phoneInput.addEventListener('input', function(e) {
    this.value = this.value.replace(/\D/g, '');
    if (this.value.length === 11) {
        this.style.borderColor = 'green';
    } else {
        this.style.borderColor = '#8c0000';
        this.style.borderWidth = '2px';
    }
    });
    phoneInput.addEventListener('invalid', function(e) {
    if (this.validity.patternMismatch || this.validity.valueMissing) {
        this.setCustomValidity('Please enter exactly 11 digits for phone number');
    } else {
        this.setCustomValidity('');
    }
    });
    phoneInput.addEventListener('input', function(e) {
    this.setCustomValidity('');
    });