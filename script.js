let cart = [];
let orders = [];
let orderId = 1;

function showSection(sectionId) {
    document.querySelectorAll('section').forEach(section => section.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
}

function addToCart(productName, productPrice) {
    const existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }
    updateCart();
    showSection('cart');
}

function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>$${itemTotal.toFixed(2)}</td>
            <td><button onclick="removeFromCart('${item.name}')">Remove</button></td>
        `;
        cartItems.appendChild(row);
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    showSection('checkout');
}

function processCheckout() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const payment = document.getElementById('payment').value;

    if (name && email && address && payment) {
        const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const order = {
            id: orderId++,
            products: cart.map(item => `${item.name} (x${item.quantity})`).join(', '),
            total: `$${totalAmount.toFixed(2)}`,
            date: new Date().toLocaleDateString()
        };
        orders.push(order);
        updateOrders();

        alert(`Order placed successfully!\nName: ${name}\nEmail: ${email}\nPayment Method: ${payment}`);
        cart = [];
        updateCart();
        showSection('catalog');
    } else {
        alert('Please fill out all fields!');
    }
}

function updateOrders() {
    const orderList = document.getElementById('orderList');
    orderList.innerHTML = '';

    orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.products}</td>
            <td>${order.total}</td>
            <td>${order.date}</td>
        `;
        orderList.appendChild(row);
    });
}
