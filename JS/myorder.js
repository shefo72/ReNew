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


// if cart is empty && control cart items
function renderCart() {
    container.innerHTML = "";
    if (cart.length === 0) {
        emptyCartDiv.style.display = "flex";
        orderDiv.style.display = "none";
    } else {
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

// remove items from cart
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

    cart.forEach(item => {
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

    // Update subtotal
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

// Confirm Order button
const confirmBtn = document.createElement("button");
confirmBtn.textContent = "Confirm Order";
confirmBtn.classList.add("summarybtn");
confirmBtn.addEventListener("click", submitOrder);
document.querySelector(".summary").appendChild(confirmBtn);

async function submitOrder() {
    const userId = localStorage.getItem("userId");
    if (!userId || cart.length === 0) {
        alert("Please log in and add items to your cart.");
        return;
    }

    const subtotal = cart.reduce((acc, item) => acc + parseFloat(item.price), 0);
    const SHIPPING_FEE = 600;
    const DISCOUNT = 200;
    const totalAmount = subtotal + SHIPPING_FEE - DISCOUNT;

    try {
        // 1. Create Order
        const orderResponse = await fetch("http://localhost:8080/api/orders/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId: parseInt(userId), totalAmount })
        });

        if (!orderResponse.ok) throw new Error("Failed to create order");

        const { orderId } = await orderResponse.json();

        // 2. Add Items to Order
        for (let item of cart) {
            await fetch(`http://localhost:8080/api/orders/${orderId}/items`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    productId: item.id, // ensure your cart includes `id`
                    quantity: item.quantity ||1
                })
            });
        }

        alert("Order submitted successfully!");
        cart = [];
        localStorage.removeItem("cart");
        renderCart();
        modal.style.display = "none";
    } catch (error) {
        console.error("Order submission failed:", error);
        alert("An error occurred. Please try again.");
    }
}