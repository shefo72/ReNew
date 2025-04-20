// add new item 
function addProductItem(imageSrc, name = " need edit ya negm " ,price = 5) {
    const productsDiv = document.querySelector('.All-Products');
    const productItem = document.createElement('div');
    productItem.classList.add('product-item');
    productItem.innerHTML = `
        <div class="img"><img src="${imageSrc}" alt="Furniture item"></div>
            <div class="details">
                <p class="price">${price} EGP</p>
                <p class="title">${name}</p>
            </div>
        <div class="button-group">
            <button class="add" onclick="addToCart('${imageSrc}', '${price}', '${name}')">Add to cart</button>
            <button class="buy">Buy Now!</button>
        </div>
    `;

    productsDiv.appendChild(productItem);
}

// call function and add items
addProductItem("Media/Products/image 1.png", "Vintage Armchair" , 5000)
addProductItem("Media/Products/image 2.png", "Vintage Armchair" , 6000)
addProductItem("Media/Products/image 3.png", "Vintage Armchair" , 4000)
addProductItem("Media/Products/image 4.jpg", "Vintage Armchair" , 6800)
addProductItem("Media/Products/image 5.jpg", "Vintage Armchair" , 6000)
addProductItem("Media/Products/image 6.jpg", "Vintage Armchair" , 6200)
addProductItem("Media/Products/image 3.png", "Vintage Armchair" , 6500)



// 
function addToCart(imageSrc, price, name) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ imageSrc, price, name });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert("Added to cart");
}

