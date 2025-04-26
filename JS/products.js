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
            <button class="add" onclick="addToCart('${imageSrc}', '${price}', '${name}')">Add to cart <i class="fa-solid fa-cart-plus"></i></button>
        </div>
    `;

    productsDiv.appendChild(productItem);
}

// call function and add items
addProductItem("Media/Products/1.jpg", "Industrial Side Table", 4500);
addProductItem("Media/Products/2.jpg", "Vintage Desk", 4000);
addProductItem("Media/Products/3.jpg", "Armchair", 5000);
addProductItem("Media/Products/4.jpg", "Armchair Chair", 3000);
addProductItem("Media/Products/5.jpg", "Rustic Dining Table", 3500);
addProductItem("Media/Products/6.jpg", "Wing chair", 7000);
addProductItem("Media/Products/7.jpg", "Vintage Armchair", 4500);
addProductItem("Media/Products/8.jpg", "Modern Bookshelf", 4000);
addProductItem("Media/Products/9.jpg", "Modern Sofa", 9000);
addProductItem("Media/Products/10.jpg", "Bedside Table", 4500);
addProductItem("Media/Products/11.jpg", "Rustic Chair", 6000);
addProductItem("Media/Products/12.jpg", "Wardrobe", 9000);
addProductItem("Media/Products/13.jpg", "Buffet", 4000);
addProductItem("Media/Products/14.jpg", "Classic TV Stand", 6000);
addProductItem("Media/Products/15.jpg", "Industrial Side Table", 3500);
addProductItem("Media/Products/16.jpg", "Sideboard", 5500);
addProductItem("Media/Products/17.jpg", "Armchair, Nordla green", 7500);
addProductItem("Media/Products/18.jpg", "Nightstand", 6500);
addProductItem("Media/Products/19.jpg", "Bedside table", 3000);
addProductItem("Media/Products/20.jpg", "Dining Chairs", 6000);
addProductItem("Media/Products/21.jpg", "Minimalist Bookshelf", 4500);






// store data for my order page
function addToCart(imageSrc, price, name) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ imageSrc, price, name });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert("Added to cart");
}

