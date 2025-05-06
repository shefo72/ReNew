document.getElementById("imageUpload").addEventListener("change", function () {
    const preview = document.getElementById("preview");
    const files = Array.from(this.files);
    preview.innerHTML = ""; // Clear previous previews
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

document.getElementById("donationForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData();

    // Get values from form inputs
    formData.append("donorName", document.getElementById("donorName").value);
    formData.append("donorPhone", document.getElementById("donorPhone").value);
    formData.append("furnitureCondition", document.getElementById("furnitureCondition").value);
    formData.append("description", document.getElementById("Description").value);
    formData.append("furnitureType", document.getElementById("furnitureType").value);

    // Get email from localStorage
    const email = localStorage.getItem("email");
    if (!email) {
        alert("You must be logged in to submit a donation.");
        return;
    }
    formData.append("email", email);

    // Append uploaded images
    const files = document.getElementById("imageUpload").files;
    for (let i = 0; i < files.length; i++) {
        formData.append("imageUpload", files[i]);  // must match controller param name
    }

    try {
        const response = await fetch('http://localhost:8080/api/donations/submit', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const modal = document.getElementById("successModal");
            modal.style.display = "block";
        
            setTimeout(() => {
                window.location.href = "donate.html";
            }, 3000); 
        } else {
            const errorText = await response.text();
            alert("Submission failed: " + errorText);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Network error occurred.");
    }
});



document.getElementById("close").addEventListener("click", function () {
    document.getElementById("successModal").style.display = "none";
});

function selectCondition(button) {
    const buttons = document.querySelectorAll('.condition-btn');
    buttons.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
    document.getElementById('furnitureCondition').value = button.innerText;
}

const phoneInput = document.getElementById('donorPhone');
phoneInput.addEventListener('input', function (e) {
    this.value = this.value.replace(/\D/g, '');
    if (this.value.length === 11) {
        this.style.borderColor = 'green';
    } else {
        this.style.borderColor = '#8c0000';
        this.style.borderWidth = '2px';
    }
});
phoneInput.addEventListener('invalid', function (e) {
    if (this.validity.patternMismatch || this.validity.valueMissing) {
        this.setCustomValidity('Please enter exactly 11 digits for phone number');
    } else {
        this.setCustomValidity('');
    }
});
phoneInput.addEventListener('input', function (e) {
    this.setCustomValidity('');
});
