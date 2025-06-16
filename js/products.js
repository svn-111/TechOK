document.addEventListener('DOMContentLoaded', () => {
    // DEBUG: Log all products to verify data
    console.log('ALL PRODUCTS:', products);
});

// DOM Elements
const productsGrid = document.getElementById('products-grid');
const pagination = document.getElementById('pagination');
const sortSelect = document.getElementById('sort-by');
const priceRange = document.getElementById('price-range');
const maxPriceDisplay = document.getElementById('max-price');
const categoryLinks = document.querySelectorAll('.category-list a');
const subcategoryLists = document.querySelectorAll('.subcategory-list');
const currentCategory = document.getElementById('current-category');
const productsHeading = document.getElementById('products-heading');
const brandFilters = document.querySelectorAll('input[name="brand"]');

// Pagination variables
const productsPerPage = 8;
let currentPage = 1;
let filteredProducts = [...products];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Parse URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const subcategory = urlParams.get('subcategory');
    const searchQuery = urlParams.get('search');
    
    // Update UI based on URL parameters
    updateActiveCategory(category, subcategory);
    updateBreadcrumb(category, subcategory);
    
    // Filter products based on URL parameters
    if (searchQuery) {
        filteredProducts = searchProducts(searchQuery);
        productsHeading.textContent = `Search Results for "${searchQuery}"`;
    } else if (category) {
        filteredProducts = filterProducts(category, subcategory);
        updateProductsHeading(category, subcategory);
    } else {
        filteredProducts = [...products];
    }
    
    // Display products
    displayProducts();
    
    // Set up event listeners
    setupEventListeners();
});

// Filter products by category and subcategory
function filterProducts(category, subcategory) {
    // Show ALL products if no category or 'all' is selected
    if (!category || category === 'all') return [...products];
    
    // Filter by category (make comparison CASE-INSENSITIVE)
    let filtered = products.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
    );
    
    // Filter by subcategory if specified (case-insensitive)
    if (subcategory) {
        filtered = filtered.filter(product => 
            product.subcategory.toLowerCase() === subcategory.toLowerCase()
        );
    }
    
    return filtered;
}

// Search products by query
function searchProducts(query) {
    const searchTerm = query.toLowerCase();
    return products.filter(product => 
        product.title.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.subcategory.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm)
    );
}

// Update active category in sidebar
function updateActiveCategory(category, subcategory) {
    // Remove active class from all category links
    categoryLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to appropriate category
    if (!category) {
        document.querySelector('.category-list a[data-category="all"]').classList.add('active');
    } else {
        const categoryLink = document.querySelector(`.category-list a[data-category="${category}"]`);
        if (categoryLink) {
            categoryLink.classList.add('active');
        }
    }
    
    // Show/hide subcategories
    subcategoryLists.forEach(list => {
        list.style.display = 'none';
    });
    
    if (category) {
        const subcategoryList = document.getElementById(`${category}-subcategories`);
        if (subcategoryList) {
            subcategoryList.style.display = 'flex';
        }
    }
}

// Update breadcrumb navigation
function updateBreadcrumb(category, subcategory) {
    const breadcrumbItems = document.querySelectorAll('.breadcrumb li');
    
    if (!category) {
        currentCategory.textContent = 'All Products';
        return;
    }
    
    // Update category in breadcrumb
    const categoryNames = {
        mobile: 'Mobile Phones',
        laptop: 'Laptops',
        headphone: 'Headphones',
        smartwatch: 'Smart Watches',
        accessories: 'Accessories'
    };
    
    currentCategory.textContent = subcategory 
        ? subcategory.charAt(0).toUpperCase() + subcategory.slice(1)
        : categoryNames[category] || category;
}

// Update products heading
function updateProductsHeading(category, subcategory) {
    const categoryNames = {
        mobile: 'Mobile Phones',
        laptop: 'Laptops',
        headphone: 'Headphones',
        smartwatch: 'Smart Watches',
        accessories: '.'
    };
    
    if (subcategory) {
        productsHeading.textContent = `${subcategory.charAt(0).toUpperCase() + subcategory.slice(1)} ${categoryNames[category] || category}`;
    } else if (category) {
        productsHeading.textContent = categoryNames[category] || category;
    } else {
        productsHeading.textContent = 'All Products';
    }
}

// Display products with pagination
function displayProducts() {
    // Sort products
    sortProducts();
    
    // Apply price filter
    const maxPrice = parseInt(priceRange.value);
    let displayProducts = filteredProducts.filter(product => product.price <= maxPrice);
    
    // Apply brand filters
    const selectedBrands = Array.from(brandFilters)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);
    
    if (selectedBrands.length > 0) {
        displayProducts = displayProducts.filter(product => 
            selectedBrands.includes(product.brand)
        );
    }
    
    // Calculate pagination
    const totalPages = Math.ceil(displayProducts.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const paginatedProducts = displayProducts.slice(startIndex, startIndex + productsPerPage);
    
    // Display products
    productsGrid.innerHTML = paginatedProducts.map(product => `
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
                <a href="product-details.html?id=${product.id}" class="view-details">View Details</a>
            </div>
        </div>
    `).join('');
    
    // Display pagination
    displayPagination(totalPages);
    
    // Add event listeners to add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Sort products based on selected option
function sortProducts() {
    const sortValue = sortSelect.value;
    
    switch (sortValue) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'name-asc':
            filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'name-desc':
            filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
            break;
        default:
            // Default sorting (by ID or keep original order)
            filteredProducts.sort((a, b) => a.id - b.id);
    }
}

// Display pagination controls
function displayPagination(totalPages) {
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // Previous button
    paginationHTML += `<button class="pagination-btn ${currentPage === 1 ? 'disabled' : ''}" data-page="${currentPage - 1}">Previous</button>`;
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `<button class="pagination-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
    }
    
    // Next button
    paginationHTML += `<button class="pagination-btn ${currentPage === totalPages ? 'disabled' : ''}" data-page="${currentPage + 1}">Next</button>`;
    
    pagination.innerHTML = paginationHTML;
    
    // Add event listeners to pagination buttons
    document.querySelectorAll('.pagination-btn').forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('disabled')) return;
            currentPage = parseInt(button.getAttribute('data-page'));
            displayProducts();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

// Add to cart function (shared with homepage)
function addToCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    if (product) {
        // Check cart limit (5 unique products)
        const uniqueProducts = new Set(cart.map(item => `${item.id}-${item.color || 'default'}`));
        if (uniqueProducts.size >= 5 && !uniqueProducts.has(`${productId}-default`)) {
            alert('Maximum cart limit of 5 unique products reached!');
            return;
        }

        const existingItem = cart.find(item => item.id === productId && (!item.color || item.color === 'default'));
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1,
                color: 'default',
                shipping: 'standard'
            });
        }
        
        updateCart();
        
        // Show success message
        showToast(`${product.title} added to cart!`);
    }
}

// Show toast notification
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

// Update cart count (shared with homepage)
function updateCart() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('#cart-count, #mobile-cart-count').forEach(el => {
        el.textContent = totalItems;
    });
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Set up event listeners
function setupEventListeners() {
    // Sort select change
    sortSelect.addEventListener('change', () => {
        currentPage = 1;
        displayProducts();
    });
    
    // Price range change
    priceRange.addEventListener('input', () => {
        maxPriceDisplay.textContent = `$${priceRange.value}`;
        currentPage = 1;
        displayProducts();
    });
    
    // Brand filter change
    brandFilters.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            currentPage = 1;
            displayProducts();
        });
    });
    
    // Search form submission
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const searchTerm = document.getElementById('search-input').value.trim();
            if (searchTerm) {
                window.location.href = `products.html?search=${encodeURIComponent(searchTerm)}`;
            }
        });
    }
}