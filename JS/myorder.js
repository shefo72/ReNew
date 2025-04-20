const container = document.getElementById("orderContainer");
let cart = JSON.parse(localStorage.getItem("cart")) || [];


function renderCart() {
    container.innerHTML = ""; 
    cart.forEach((item, index) => {
    const card = document.createElement("div");
    card.classList.add("image-card");

    card.innerHTML = `
    <div class="imge">
        <img src="${item.imageSrc}" alt="${item.name}">
    </div>
    <div class="details">
        <p class="price">${item.price} EGP</p>
        <p class="title">${item.name}</p>
    </div>
    <button class="remove" onclick="removeItem(${index})"">Remove</button>
    `;

    container.appendChild(card);
});
}

function removeItem(index) {
    cart.splice(index, 1); 
    localStorage.setItem("cart", JSON.stringify(cart)); 
    renderCart(); 
}

renderCart(); 