// DOM Elements (shared across pages)
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const cartCountElements = document.querySelectorAll('#cart-count, #mobile-cart-count');
const logoutBtn = document.getElementById('logout-btn');
const mobileLogoutBtn = document.getElementById('mobile-logout-btn');

// Cart data (shared across pages)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// ======================
// 1. MOBILE MENU TOGGLE 
// (Works on all pages)
// ======================
mobileMenuButton?.addEventListener('click', () => {
    const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
    mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.setAttribute('aria-hidden', isExpanded);
    mobileMenu.classList.toggle('active');
});

// ======================
// 2. SEARCH FUNCTIONALITY
// (Works on all pages)
// ======================
searchForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        window.location.href = `products.html?search=${encodeURIComponent(searchTerm)}`;
    }
});

// ======================
// 3. CART FUNCTIONS
// (Shared across pages)
// ======================
function addToCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    if (product) {
        // Check cart limit (5 unique products)
        const uniqueProducts = new Set(cart.map(item => `${item.id}-${item.color || 'default'}`));
        if (uniqueProducts.size >= 5 && !uniqueProducts.has(`${productId}-default`)) {
            showToast('Maximum cart limit of 5 unique products reached!');
            return;
        }

        const existingItem = cart.find(item => item.id === productId && (!item.color || item.color === 'default'));
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1,
                color: 'default', // Default color for index.html and products.html
                shipping: 'standard' // Default shipping
            });
        }
        
        updateCart();
        showToast(`${product.title} added to cart!`);
    }
}

function updateCart() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElements.forEach(el => {
        el.textContent = totalItems;
    });
    localStorage.setItem('cart', JSON.stringify(cart));
}

// ======================
// 4. LOGOUT FUNCTIONALITY
// (Works on all pages with navigation)
// ======================
function logout() {
    localStorage.removeItem('loggedInUser');
    showToast('Logged out successfully!');
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
}

if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        logout();
    });
}

if (mobileLogoutBtn) {
    mobileLogoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        logout();
    });
}

// ======================
// 5. HOMEPAGE-SPECIFIC CODE
// (Only runs on homepage)
// ======================
const featuredProductsContainer = document.getElementById('featured-products-container');

if (featuredProductsContainer) {
    // Display Featured Products (Homepage Only)
    function displayFeaturedProducts() {
        const featuredProducts = products.length <= 4 ? products : products.slice(0, 4);
        
        featuredProductsContainer.innerHTML = featuredProducts.map(product => `
            <div class="product-card" data-id="${product.id}">
                <img src="${product.image}" alt="${product.title}" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <div class="product-rating">
                        ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
                        <span>(${product.rating})</span>
                    </div>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `).join('');

        // Add cart event listeners to buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }

    // Initialize Homepage
    document.addEventListener('DOMContentLoaded', () => {
        displayFeaturedProducts();
        updateCart();
    });
}

// Initialize Cart on Other Pages
if (!featuredProductsContainer) {
    document.addEventListener('DOMContentLoaded', updateCart);
}

// Toast notification function
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}