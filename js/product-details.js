document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const productImage = document.getElementById('product-image');
    const productTitle = document.getElementById('product-title');
    const productRatingStars = document.getElementById('product-rating-stars');
    const productRatingValue = document.getElementById('product-rating-value');
    const productPrice = document.getElementById('product-price');
    const productDescription = document.getElementById('product-description');
    const colorOptions = document.getElementById('color-options');
    const quantityInput = document.getElementById('quantity');
    const decreaseQuantity = document.getElementById('decrease-quantity');
    const increaseQuantity = document.getElementById('increase-quantity');
    const shippingOptions = document.getElementById('shipping-options');
    const addToCartBtn = document.getElementById('add-to-cart');
    const buyNowBtn = document.getElementById('buy-now');
    const currentProduct = document.getElementById('current-product');
    const productCategory = document.getElementById('product-category');
    const productSubcategory = document.getElementById('product-subcategory');

    // Category names mapping
    const categoryNames = {
        mobile: 'Mobile Phones',
        laptop: 'Laptops',
        headphone: 'Headphones',
        smartwatch: 'Smart Watches'
    };

    // Mock color options (can be extended in products-data.js if needed)
    const colors = ['Black', 'Silver', 'Gold', 'Blue'];

    // Parse URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = products.find(p => p.id === productId);

    if (product) {
        // Update page content
        productImage.src = product.image;
        productImage.alt = product.title;
        productTitle.textContent = product.title;
        productRatingStars.innerHTML = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
        productRatingValue.textContent = `(${product.rating})`;
        productPrice.textContent = `$${product.price.toFixed(2)}`;
        productDescription.textContent = product.description;
        currentProduct.textContent = product.title;

        // Update breadcrumb
        productCategory.innerHTML = `<a href="products.html?category=${product.category}">${categoryNames[product.category] || product.category}</a>`;
        productSubcategory.innerHTML = `<a href="products.html?category=${product.category}&subcategory=${product.subcategory}">${product.subcategory.charAt(0).toUpperCase() + product.subcategory.slice(1)}</a>`;

        // Populate color options
        colorOptions.innerHTML = colors.map(color => `
            <label class="color-option">
                <input type="radio" name="color" value="${color.toLowerCase()}" ${color === 'Black' ? 'checked' : ''}>
                <span>${color}</span>
            </label>
        `).join('');

        // Quantity controls
        decreaseQuantity.addEventListener('click', () => {
            let value = parseInt(quantityInput.value);
            if (value > 1) {
                quantityInput.value = value - 1;
            }
        });

        increaseQuantity.addEventListener('click', () => {
            quantityInput.value = parseInt(quantityInput.value) + 1;
        });

        quantityInput.addEventListener('input', () => {
            if (quantityInput.value < 1) {
                quantityInput.value = 1;
            }
        });

        // Add to Cart
        addToCartBtn.setAttribute('data-id', productId);
        addToCartBtn.addEventListener('click', () => {
            // Check cart limit
            const uniqueProducts = new Set(cart.map(item => `${item.id}-${item.color}`));
            if (uniqueProducts.size >= 5 && !uniqueProducts.has(`${productId}-${document.querySelector('input[name="color"]:checked').value}`)) {
                alert('Maximum cart limit of 5 unique products reached!');
                return;
            }

            const quantity = parseInt(quantityInput.value);
            const selectedColor = document.querySelector('input[name="color"]:checked').value;
            const selectedShipping = shippingOptions.value;

            const existingItem = cart.find(item => item.id === productId && item.color === selectedColor);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({
                    ...product,
                    quantity,
                    color: selectedColor,
                    shipping: selectedShipping
                });
            }

            updateCart();
            showToast(`${product.title} added to cart!`);
        });

        // Buy Now (simulates checkout, redirects to cart)
        buyNowBtn.addEventListener('click', () => {
            // Check cart limit
            const uniqueProducts = new Set(cart.map(item => `${item.id}-${item.color}`));
            if (uniqueProducts.size >= 5 && !uniqueProducts.has(`${productId}-${document.querySelector('input[name="color"]:checked').value}`)) {
                alert('Maximum cart limit of 5 unique products reached!');
                return;
            }

            const quantity = parseInt(quantityInput.value);
            const selectedColor = document.querySelector('input[name="color"]:checked').value;
            const selectedShipping = shippingOptions.value;

            const existingItem = cart.find(item => item.id === productId && item.color === selectedColor);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({
                    ...product,
                    quantity,
                    color: selectedColor,
                    shipping: selectedShipping
                });
            }

            updateCart();
            window.location.href = 'cart.html';
        });
    } else {
        // Handle product not found
        productTitle.textContent = 'Product Not Found';
        productDescription.textContent = 'Sorry, the product you are looking for does not exist.';
        productCategory.style.display = 'none';
        productSubcategory.style.display = 'none';
    }

    // Update cart count on page load
    updateCart();
});