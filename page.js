const products = [
    { id: 1, name: "Dove Soap", price: 60, emoji: "🧼" },
    { id: 2, name: "Safeguard", price: 50, emoji: "🧴" },
    { id: 3, name: "Palmolive", price: 45, emoji: "🫧" },
    { id: 4, name: "Lux", price: 55, emoji: "🧼" },
    { id: 5, name: "Irish Spring", price: 70, emoji: "🌿" },
    { id: 6, name: "Johnson's Baby Soap", price: 65, emoji: "👶" }
];

let cart = [];

// DISPLAY PRODUCTS
function displayProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach(product => {
        const inCart = cart.find(item => item.id === product.id);

        productList.innerHTML += `
            <div class="card">
                <h2>${product.emoji}</h2>
                <h3>${product.name}</h3>
                <p>₱${product.price}</p>
                <button onclick="addToCart(${product.id})" ${inCart ? "disabled" : ""}>
                    ${inCart ? "Already in Cart" : "Add to Cart"}
                </button>
            </div>
        `;
    });
}

// ADD TO CART
function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push({ ...product, qty: 1 });
    updateCart();
}

// UPDATE CART
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const totalDisplay = document.getElementById("total");
    const countDisplay = document.getElementById("cart-count");

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Cart is empty</p>";
    }

    let total = 0;
    let count = 0;

    cart.forEach(item => {
        const subtotal = item.price * item.qty;
        total += subtotal;
        count += item.qty;

        cartItems.innerHTML += `
            <div class="cart-item">
                <strong>${item.name}</strong><br>
                ₱${item.price} x ${item.qty} = ₱${subtotal}<br>
                <button class="small" onclick="changeQty(${item.id}, -1)">-</button>
                <button class="small" onclick="changeQty(${item.id}, 1)">+</button>
                <button class="small" onclick="removeItem(${item.id})">Remove</button>
            </div>
        `;
    });

    totalDisplay.textContent = total;
    countDisplay.textContent = count;

    displayProducts();
}

// CHANGE QUANTITY
function changeQty(id, change) {
    const item = cart.find(i => i.id === id);
    item.qty += change;

    if (item.qty <= 0) {
        removeItem(id);
    } else {
        updateCart();
    }
}

// REMOVE ITEM
function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// CLEAR CART
function clearCart() {
    cart = [];
    updateCart();
}

// INIT
displayProducts();