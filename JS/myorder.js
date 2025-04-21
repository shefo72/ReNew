const container = document.getElementById("orderContainer");
const emptyCartDiv = document.querySelector(".empty");
const orderDiv = document.querySelector(".order");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
    container.innerHTML = "";
    
    // Check if cart is empty
    if (cart.length === 0) {
        // Show empty cart message and hide order button
        emptyCartDiv.style.display = "flex";
        orderDiv.style.display = "none";
    } else {
        // Hide empty cart message and show order button
        emptyCartDiv.style.display = "none";
        orderDiv.style.display = "flex";
        
        // Render cart items
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
            <button class="remove" onclick="removeItem(${index})">Remove</button>
            `;
            
            container.appendChild(card);
        });
    }
}

function removeItem(index) {
    cart.splice(index, 1);
    
    localStorage.setItem("cart", JSON.stringify(cart));
    
    renderCart();
}

renderCart();