// send product ifo to product page
document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const imageInput = document.getElementById("image");
    const category = document.getElementById("category").value.toLowerCase().replace(/\s/g, '-');
    const file = imageInput.files[0];
    if (!file) return alert("Please select an image.");
    const reader = new FileReader();
    reader.onload = function (e) {
        const imageSrc = e.target.result;
        const existingProducts = JSON.parse(localStorage.getItem("products")) || [];
        existingProducts.push({ imageSrc, name, price, category });
        localStorage.setItem("products", JSON.stringify(existingProducts));
        alert("Product added!");
        document.querySelector("form").reset();
    };
    reader.readAsDataURL(file);
});

// only num in price
const price = document.getElementById('price');
price.addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, ''); 
});