const container = document.getElementById("orderContainer");
const emptyCartDiv = document.querySelector(".empty");
const orderDiv = document.querySelector(".order");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("close");
const itemsContainer = document.querySelector(".items");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Constants for shipping and discount
const SHIPPING_FEE = 500; // 500 EGP
const DISCOUNT = 1000; // 1000 EGP

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

function showOrderSummary() {
    // Clear previous items
    itemsContainer.innerHTML = "";
    
    // Calculate subtotal
    let subtotal = 0;
    
    // Add items to the order summary
    cart.forEach(item => {
        // Add item to the order summary
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("item");
        
        itemDiv.innerHTML = `
            <p class="name">${item.name}</p>
            <p class="price">${item.price} EGP</p>
        `;
        
        itemsContainer.appendChild(itemDiv);
        
        // Add to subtotal
        subtotal += parseFloat(item.price);
    });
    
    // Update subtotal in the modal
    document.querySelector(".subTotal p:last-child").textContent = `${subtotal} EGP`;
    
    // Update shipping fee
    document.querySelector(".shipping p:last-child").textContent = `${SHIPPING_FEE} EGP`;
    
    // Update discount
    document.querySelector(".discount p:last-child").textContent = `${DISCOUNT} EGP`;
    
    // Calculate and update total
    const total = subtotal + SHIPPING_FEE - DISCOUNT;
    document.querySelector(".total p:last-child").textContent = `${total} EGP`;
    
    // Show the modal
    modal.style.display = "flex";
}

// Close modal when clicking the close button
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Add event listener to order button
document.querySelector(".order").addEventListener("click", showOrderSummary);

// Initialize the cart display
renderCart();


// order summary

    document.getElementById("orderSummary").addEventListener("click", function () {
        document.getElementById("modal").style.display = "block";
    });
    

    document.getElementById("close").addEventListener("click", function () {
        document.getElementById("modal").style.display = "none";
    });