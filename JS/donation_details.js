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

document.getElementById("donationForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const donorName = document.getElementById("donorName").value;
    const donorPhone = document.getElementById("donorPhone").value;
    const furnitureCondition = document.getElementById("furnitureCondition").value;
    const description = document.getElementById("Description").value;
    const furnitureType = document.getElementById("furnitureType").value;

    // Validate that data is filled
    if (!donorName || !donorPhone || !furnitureCondition || !description || !furnitureType) {
        alert("Please fill in all fields.");
        return;
    }

    // Get email from localStorage
    const email = localStorage.getItem("email");
    if (!email) {
        alert("You must be logged in to submit a donation.");
        return;
    }

    // Prepare payment data (without backend call)
    const donationData = {
        donorName,
        donorPhone,
        furnitureCondition,
        description,
        furnitureType,
        email,
        // Get uploaded images as base64 from FileReader
        images: []
    };

    // Get uploaded images
    const files = document.getElementById("imageUpload").files;
    for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = function (e) {
            donationData.images.push(e.target.result);
            
            // Check if all images are processed and then store data
            if (donationData.images.length === files.length) {
                localStorage.setItem('donationData', JSON.stringify(donationData));

                console.log("Data saved to localStorage:", donationData);

                // Show success modal
                const modal = document.getElementById("successModal");
                modal.style.display = "block";

                setTimeout(() => {
                    window.location.href = "donate.html"; // Redirect after 3 seconds
                }, 3000);
            }
        };
        reader.readAsDataURL(files[i]);
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
