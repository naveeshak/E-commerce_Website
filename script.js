// Product Data - Array of objects containing all available products
const products = [
    {
        id: 1,
        name: "Women's Vintage Floral Dress",
        description: "Elegant vintage-inspired dress with delicate floral lace details and 2/3 sleeves, perfect for bridesmaids, cocktail parties, or special occasions.",
        price: 54.99,
        category: "clothing",
        image: "assests/images/frock.jpg"
    },
    {
        id: 2,
        name: "Samsung Galaxy Tab S6 Lite",
        description: "Slim 10.4-inch Android tablet with included S Pen, perfect for productivity, gaming, and entertainment with long battery life.",
        price: 249.99,
        category: "electronics",
        image: "assests/images/tablet.jpg"
    },
    {
        id: 3,
        name: "Women's Floral Midi Skirt",
        description: "Trendy boho-style skirt with ruched high waist and breathable mesh fabric, perfect for summer outfits.",
        price: 26.99,
        category: "clothing",
        image: "assests/images/skirt.jpg"
    },
    {
        id: 4,
        name: "Premium Olive Oil",
        description: "Light and flavorful 100% pure olive oil, perfect for cooking, dressings, and dipping. 16.9 fl oz bottle.",
        price: 7.38,
        category: "food",
        image: "assests/images/oliveoil.jpg"
    },
    {
        id: 5,
        name: "Men's Casual Button-Down Shirt",
        description: "Comfortable stretch fabric dress shirt with wrinkle-free technology, ideal for both casual and professional settings.",
        price: 24.99,
        category: "clothing",
        image: "assests/images/shirt.jpg"
    },
    {
        id: 6,
        name: "Samyang Hot Chicken Ramen",
        description: "Authentic Korean spicy ramen with intense flavor. 1.55 lb package of the famous buldak-style noodles.",
        price: 13.70,
        category: "food",
        image: "assests/images/spicybuldakramen.jpg"
    },
    {
        id: 7,
        name: "1080P Webcam with Microphone",
        description: "Crystal-clear 1080p video with dual microphones for professional video calls, streaming, and conferencing.",
        price: 29.99,
        category: "electronics",
        image: "assests/images/webcam.jpg"
    },
    {
        id: 8,
        name: "Baby Food Maker",
        description: "All-in-one steamer and blender for preparing fresh, healthy baby food with self-cleaning function and touch controls.",
        price: 89.99,
        category: "food",
        image: "assests/images/babyfoodmaker.jpg"
    },
    {
        id: 9,
        name: "Women's Cloud Sneakers",
        description: "Ultra-lightweight fashion sneakers with memory foam insoles for all-day comfort and stylish non-slip platform design.",
        price: 45.90,
        category: "clothing",
        image: "assests/images/sneakers.jpg"
    },
    {
        id: 10,
        name: "Fitbit Versa 4 Smartwatch",
        description: "Advanced fitness tracker with GPS, heart rate monitoring, 40+ exercise modes, and sleep tracking in a stylish blue/platinum design.",
        price: 149.95,
        category: "electronics",
        image: "assests/images/smartwatch.jpg"
    }
];

// DOM Elements - Cache frequently accessed elements
const searchBar = document.getElementById('search-bar');
const searchButton = document.getElementById('search-button');
const productsGrid = document.getElementById('products-grid');
const cartCount = document.getElementById('cart-count');
const checkoutSection = document.getElementById('checkout-section');
const cartItems = document.getElementById('cart-items');
const totalAmount = document.getElementById('total-amount');
const paymentSection = document.getElementById('payment-section');
const orderConfirmation = document.getElementById('order-confirmation');
const categoryTitle = document.getElementById('category-title');

// Navigation Links
const homeLink = document.getElementById('home-link');
const electronicsLink = document.getElementById('electronics-link');
const clothingLink = document.getElementById('clothing-link');
const foodLink = document.getElementById('food-link');
const cartLink = document.getElementById('cart-link');

// Buttons
const proceedCheckout = document.getElementById('proceed-checkout');
const paynow = document.getElementById('pay-now');
const cancelCheckout = document.getElementById('cancel-checkout');
const continueShopping = document.getElementById('continue-shopping');

// Initialize cart from localStorage or create empty cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Display all products initially
displayProducts(products);

// Event Listeners for navigation
homeLink.addEventListener('click', (e) => {
    e.preventDefault();
    displayProducts(products);
    updateCategoryTitle('All Products');
    showProductsSection();
});

electronicsLink.addEventListener('click', (e) => {
    e.preventDefault();
    const electronicsProducts = products.filter(product => product.category === 'electronics');
    displayProducts(electronicsProducts);
    updateCategoryTitle('Electronics');
    showProductsSection();
});

clothingLink.addEventListener('click', (e) => {
    e.preventDefault();
    const clothingProducts = products.filter(product => product.category === 'clothing');
    displayProducts(clothingProducts);
    updateCategoryTitle('Clothing');
    showProductsSection();
});

foodLink.addEventListener('click', (e) => {
    e.preventDefault();
    const food = products.filter(product => product.category === 'food');
    displayProducts(food);
    updateCategoryTitle('Food');
    showProductsSection();
});

cartLink.addEventListener('click', (e) => {
    e.preventDefault();
    updateCategoryTitle('Cart');
    displayCart();
});

searchButton.addEventListener('click', performSearch);
searchBar.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

// Proceed to checkout button handler
proceedCheckout.addEventListener('click', () => {
    checkoutSection.classList.add('hidden');
    paymentSection.classList.remove('hidden');
});

// Pay now button handler with form validation
paynow.addEventListener('click', (e) => {
    e.preventDefault();

    if (validatePaymentForm()) {
         paymentSection.classList.add('hidden');
         orderConfirmation.classList.remove('hidden');
         
         // Clear cart after successful payment
         cart = [];
         localStorage.setItem('cart', JSON.stringify(cart));
         updateCartCount();
    }
});

cancelCheckout.addEventListener('click', () => {
    paymentSection.classList.add('hidden');
    checkoutSection.classList.remove('hidden');
});

continueShopping.addEventListener('click', () => {
    orderConfirmation.classList.add('hidden');
    displayProducts(products);
    updateCategoryTitle('Featured Products');
    showProductsSection();
});

// Function to display products in the grid
function displayProducts(productsToDisplay) {
    productsGrid.innerHTML = '';
    
    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        // Check if product is already in cart
        const inCart = cart.find(item => item.id === product.id);
        const buttonText = inCart ? 'Added to Cart' : 'Add to Cart';
        const buttonClass = inCart ? 'add-to-cart added' : 'add-to-cart';
        
        // Create product card HTML
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-description">${product.description}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-category">${formatCategory(product.category)}</div>
                <button class="${buttonClass}" data-id="${product.id}">${buttonText}</button>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
    
    // Add event listeners to all add-to-cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
            e.target.textContent = 'Added to Cart';
            e.target.classList.add('added');
        });
    });
}

// Function to format category name for display
function formatCategory(category) {
    return category.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

function performSearch() {
    const searchTerm = searchBar.value.trim().toLowerCase();
    
    if (searchTerm) {
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) || 
            product.description.toLowerCase().includes(searchTerm)
        );
        
        displayProducts(filteredProducts);
        updateCategoryTitle(`Search Results for "${searchTerm}"`);
        showProductsSection();
    }
}

// Function to add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if exists
    } else {
        cart.push({  // Add new item to cart
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    // Update localStorage and cart count
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Function to display cart contents
function displayCart() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your shopping cart is empty.</p>';
        totalAmount.textContent = '0.00';
    } else {
        let total = 0;
        
        // Create cart item elements for each product in cart
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn increase" data-id="${item.id}">+</button>
                        <span class="remove-item" data-id="${item.id}">Remove</span>
                    </div>
                </div>
            `;
            
            cartItems.appendChild(cartItem);
        });
        
        totalAmount.textContent = total.toFixed(2);
        
        // Add event listeners to quantity buttons
        document.querySelectorAll('.decrease').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.getAttribute('data-id'));
                updateQuantity(productId, -1);
            });
        });
        
        document.querySelectorAll('.increase').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.getAttribute('data-id'));
                updateQuantity(productId, 1);
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.getAttribute('data-id'));
                removeFromCart(productId);
            });
        });
    }
    
    showCheckoutSection();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.id !== productId);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        displayCart();
        
        const productButton = document.querySelector(`.add-to-cart[data-id="${productId}"]`);
        if (productButton) {
            if (item.quantity > 0) {
                productButton.textContent = 'Added to Cart';
                productButton.classList.add('added');
            } else {
                productButton.textContent = 'Add to Cart';
                productButton.classList.remove('added');
            }
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
    
    // Update the product grid button if on products page
    const productButton = document.querySelector(`.add-to-cart[data-id="${productId}"]`);
    if (productButton) {
        productButton.textContent = 'Add to Cart';
        productButton.classList.remove('added');
    }
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
}

function showProductsSection() {
    productsGrid.classList.remove('hidden');
    checkoutSection.classList.add('hidden');
    paymentSection.classList.add('hidden');
    orderConfirmation.classList.add('hidden');
}

function showCheckoutSection() {
    productsGrid.classList.add('hidden');
    checkoutSection.classList.remove('hidden');
    paymentSection.classList.add('hidden');
    orderConfirmation.classList.add('hidden');
}

function updateCategoryTitle(title) {
    categoryTitle.querySelector('h2').textContent = title;
}

// Function to validate payment form fields
function validatePaymentForm() {
    const form = document.getElementById('payment-form');
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        input.classList.remove('error');
        const errorMsg = input.nextElementSibling;
        if (errorMsg && errorMsg.classList.contains('error-message')) {
            errorMsg.remove();
        }
    });

    // Validate each field
    inputs.forEach(input => {
        if (!input.value.trim()) {
            showError(input, 'This field is required');
            isValid = false;
        } else if (input.id === 'email' && !isValidEmail(input.value)) {
            showError(input, 'Please enter a valid email');
            isValid = false;
        } else if (input.id === 'card' && !isValidCard(input.value)) {
            showError(input, 'Please enter a valid card number');
            isValid = false;
        } else if (input.id === 'expiry' && !isValidExpiry(input.value)) {
            showError(input, 'Please enter a valid expiry date (MM/YY)');
            isValid = false;
        } else if (input.id === 'cvv' && !isValidCVV(input.value)) {
            showError(input, 'Please enter a valid CVV (3 or 4 digits)');
            isValid = false;
        }
    });

    return isValid;
}

function showError(input, message) {
    input.classList.add('error');
    const errorMsg = document.createElement('div');
    errorMsg.className = 'error-message';
    errorMsg.style.color = 'red';
    errorMsg.style.fontSize = '12px';
    errorMsg.style.marginTop = '5px';
    errorMsg.textContent = message;
    input.parentNode.insertBefore(errorMsg, input.nextSibling);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidCard(card) {
    // Simple card validation - just checks for numbers and spaces
    return /^[0-9\s]{13,19}$/.test(card);
}

function isValidExpiry(expiry) {
    // Check format MM/YY
    if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(expiry)) return false;
    
    // Check if card is expired
    const [month, year] = expiry.split('/');
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    
    return (+year > currentYear) || 
           (+year === currentYear && +month >= currentMonth);
}

function isValidCVV(cvv) {
    return /^[0-9]{3,4}$/.test(cvv);
}

// Initialize cart count on page load
updateCartCount();