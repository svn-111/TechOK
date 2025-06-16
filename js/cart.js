document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const cartContainer = document.getElementById('cart-container');
    const subtotal = document.getElementById('subtotal');
    const shippingCost = document.getElementById('shipping-cost');
    const total = document.getElementById('total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const clearCartBtn = document.getElementById('clear-cart-btn');

    // Shipping cost mapping
    const shippingCosts = {
        standard: 5.00,
        express: 15.00,
        overnight: 25.00
    };

    // Display cart items
    function displayCart() {
        if (cart.length === 0) {
            cartContainer.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
            subtotal.textContent = '$0.00';
            shippingCost.textContent = '$0.00';
            total.textContent = '$0.00';
            checkoutBtn.disabled = true;
            clearCartBtn.disabled = true;
            return;
        }

        cartContainer.innerHTML = cart.map(item => `
            <div class="cart-item" data-id="${item.id}" data-color="${item.color}">
                <img src="${item.image}" alt="${item.title}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3>${item.title}</h3>
                    <p>Color: ${item.color}</p>
                    <p>Shipping: ${item.shipping.charAt(0).toUpperCase() + item.shipping.slice(1)}</p>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    <div class="quantity-selector">
                        <button class="quantity-btn decrease" aria-label="Decrease quantity">-</button>
                        <input type="number" class="quantity" value="${item.quantity}" min="1" aria-label="Quantity">
                        <button class="quantity-btn increase" aria-label="Increase quantity">+</button>
                    </div>
                    <button class="remove-btn" aria-label="Remove item">Remove</button>
                </div>
            </div>
        `).join('');

        // Update totals
        updateTotals();

        // Add event listeners for quantity changes and remove buttons
        document.querySelectorAll('.quantity-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const cartItem = e.target.closest('.cart-item');
                const productId = parseInt(cartItem.getAttribute('data-id'));
                const color = cartItem.getAttribute('data-color');
                const item = cart.find(i => i.id === productId && i.color === color);
                const input = cartItem.querySelector('.quantity');

                if (e.target.classList.contains('decrease') && item.quantity > 1) {
                    item.quantity -= 1;
                } else if (e.target.classList.contains('increase')) {
                    item.quantity += 1;
                }

                input.value = item.quantity;
                updateCart();
                updateTotals();
            });
        });

        document.querySelectorAll('.quantity').forEach(input => {
            input.addEventListener('input', (e) => {
                const cartItem = e.target.closest('.cart-item');
                const productId = parseInt(cartItem.getAttribute('data-id'));
                const color = cartItem.getAttribute('data-color');
                const item = cart.find(i => i.id === productId && i.color === color);
                const value = parseInt(e.target.value);

                if (value >= 1) {
                    item.quantity = value;
                } else {
                    e.target.value = 1;
                    item.quantity = 1;
                }

                updateCart();
                updateTotals();
            });
        });

        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const cartItem = e.target.closest('.cart-item');
                const productId = parseInt(cartItem.getAttribute('data-id'));
                const color = cartItem.getAttribute('data-color');
                cart = cart.filter(item => !(item.id === productId && item.color === color));
                updateCart();
                displayCart();
            });
        });

        // Enable clear cart button
        clearCartBtn.disabled = false;
    }

    // Update subtotal, shipping, and total
    function updateTotals() {
        const subtotalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const shippingAmount = cart.reduce((sum, item) => sum + (shippingCosts[item.shipping] || 0) * item.quantity, 0);
        const totalAmount = subtotalAmount + shippingAmount;

        subtotal.textContent = `$${subtotalAmount.toFixed(2)}`;
        shippingCost.textContent = `$${shippingAmount.toFixed(2)}`;
        total.textContent = `$${totalAmount.toFixed(2)}`;
        checkoutBtn.disabled = cart.length === 0;
    }

    // Clear cart
    clearCartBtn.addEventListener('click', () => {
        cart = [];
        updateCart();
        displayCart();
        showToast('Cart cleared!');
    });

    // Checkout button (simulated)
    checkoutBtn.addEventListener('click', () => {
        alert('Proceeding to checkout... (This is a demo)');
        // In a real application, this would redirect to a payment gateway
    });

    // Initialize cart display
    displayCart();
});