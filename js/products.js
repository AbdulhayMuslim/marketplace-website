// Sample product data (replace with actual data from your backend)
const products = [
    {
        id: 1,
        title: "موتر تویوتا کورولا",
        price: "25000",
        currency: "AFN",
        image: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg",
        badge: "جدید",
        location: "کابل",
        date: "۲ روز پیش"
    },
    {
        id: 2,
        title: "لپ تاپ لنوو",
        price: "1200",
        currency: "USD",
        image: "https://images.pexels.com/photos/7974/pexels-photo.jpg",
        badge: "جدید",
        location: "کابل",
        date: "۳ روز پیش"
    },
    {
        id: 3,
        title: "گوشی سامسونگ",
        price: "1100",
        currency: "EUR",
        image: "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg",
        location: "کابل",
        date: "۵ روز پیش"
    }
];

// Generate more sample products with meaningful names
const productNames = [
    "موتر تویوتا کورولا", "لپ تاپ لنوو", "گوشی سامسونگ", "تلویزیون سونی",
    "ماشین لباسشویی", "یخچال سامسونگ", "میز ناهارخوری", "صندلی راحتی",
    "کتابخانه", "میز کار", "کمد دیواری", "مبل راحتی", "پارکت چوبی",
    "پرده", "فرش دستباف", "لوستر", "چراغ مطالعه", "ساعت دیواری",
    "گلدان", "تابلو نقاشی", "آینه", "شومینه", "پنکه سقفی",
    "کولر گازی", "ماشین ظرفشویی", "مایکروویو", "توستر", "قهوه‌ساز",
    "مخلوط کن", "آبمیوه‌گیری", "جاروبرقی", "اتو", "سشوار",
    "ماشین خیاطی", "دوچرخه", "اسکوتر", "کفش ورزشی", "کیف دستی"
];

const currencies = ["AFN", "USD", "EUR"];

// Generate 97 more sample products
for (let i = 4; i <= 100; i++) {
    const randomName = productNames[Math.floor(Math.random() * productNames.length)];
    const randomCurrency = currencies[Math.floor(Math.random() * currencies.length)];
    const price = Math.floor(Math.random() * 100000).toString();
    
    products.push({
        id: i,
        title: randomName,
        price: price,
        currency: randomCurrency,
        image: `https://picsum.photos/400/300?random=${i}`,
        badge: Math.random() > 0.7 ? "جدید" : null,
        location: "کابل",
        date: `${Math.floor(Math.random() * 30)} روز پیش`
    });
}

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Get currency symbol
function getCurrencySymbol(currency) {
    switch (currency) {
        case "AFN":
            return "؋";
        case "USD":
            return "$";
        case "EUR":
            return "€";
        default:
            return "";
    }
}

// Format price with currency
function formatPrice(price, currency) {
    const formattedPrice = formatNumber(price);
    const symbol = getCurrencySymbol(currency);
    
    // Always show symbol on the left side with a space
    return symbol + ' ' + formattedPrice;
}

// State management
let currentView = 'grid';
let currentSort = 'newest';
let currentPage = 1;
let isLoading = false;

// DOM Elements
const productsGrid = document.getElementById('products-grid');
const loadMoreContainer = document.getElementById('load-more-container');
const loadMoreBtn = document.getElementById('load-more-btn');
const paginationContainer = document.getElementById('pagination');
const gridViewBtn = document.querySelector('.grid-view');
const listViewBtn = document.querySelector('.list-view');
const sortSelect = document.querySelector('.sort-select');
const themeToggle = document.getElementById('theme-toggle');

// Viewport breakpoints
const breakpoints = {
    mobile: 480,
    tablet: 768,
    laptop: 1439,
    desktop: 1440
};

// Get items per page based on viewport width
function getItemsPerPage() {
    const width = window.innerWidth;
    if (width <= breakpoints.mobile) return 20;
    if (width <= breakpoints.tablet) return 30;
    if (width <= breakpoints.laptop) return 40;
    return 50;
}

// Get visible page range based on screen width
function getVisiblePageRange() {
    const width = window.innerWidth;
    if (width <= breakpoints.mobile) return 3; // Show 3 pages on mobile
    if (width <= breakpoints.tablet) return 5; // Show 5 pages on tablet
    return 7; // Show 7 pages on larger screens
}

// Convert Persian numbers to English numbers
function convertToEnglishNumbers(text) {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return text.replace(/[۰-۹]/g, match => persianDigits.indexOf(match).toString());
}

// Create a product card
function createProductCard(product) {
    const formattedPrice = formatPrice(product.price, product.currency);
    // Convert date to English numbers
    const englishDate = convertToEnglishNumbers(product.date);
    
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.id = product.id;
    
    // Build product card HTML
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.title}" loading="lazy">
            ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.title}</h3>
            <div class="product-price">${formattedPrice}</div>
            <div class="product-meta">
                <span class="location"><i class="fas fa-map-marker-alt"></i> ${product.location}</span>
                <span class="date"><i class="fas fa-clock"></i> ${englishDate}</span>
            </div>
        </div>
        <button class="add-to-cart" title="افزودن به سبد خرید">
            <i class="fas fa-shopping-cart"></i>
        </button>
    `;
    
    // Add event listener to view product details
    card.addEventListener('click', (e) => {
        // If the click is on the add to cart button, don't navigate
        if (!e.target.closest('.add-to-cart')) {
            window.location.href = `product-details.html?id=${product.id}`;
        }
    });
    
    return card;
}

// Sort products
function sortProducts(products, sortBy) {
    const sortedProducts = [...products];
    switch (sortBy) {
        case 'price-asc':
            sortedProducts.sort((a, b) => parseInt(a.price) - parseInt(b.price));
            break;
        case 'price-desc':
            sortedProducts.sort((a, b) => parseInt(b.price) - parseInt(a.price));
            break;
        case 'popular':
            sortedProducts.sort((a, b) => Math.random() - 0.5); // Replace with actual popularity logic
            break;
        default: // newest
            sortedProducts.sort((a, b) => b.id - a.id);
    }
    return sortedProducts;
}

// Display products based on current filters and sort options
function displayProducts() {
    if (isLoading) return;
    
    isLoading = true;
    productsGrid.innerHTML = '<div class="spinner"></div>';
    
    setTimeout(() => {
        // Get current items per page based on screen size
        const itemsPerPage = getItemsPerPage();
        
        // Sort products
        const sortedProducts = [...products].sort((a, b) => {
            switch (currentSort) {
                case 'price-asc':
                    return a.price - b.price;
                case 'price-desc':
                    return b.price - a.price;
                case 'popular':
                    return b.rating - a.rating;
                case 'newest':
                default:
                    return new Date(b.date) - new Date(a.date);
            }
        });
        
        // Calculate pagination
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const productsToShow = sortedProducts.slice(startIndex, endIndex);
        
        // Clear products grid
        productsGrid.innerHTML = '';
        
        // Add products to grid
        if (productsToShow.length > 0) {
            productsToShow.forEach(product => {
                productsGrid.appendChild(createProductCard(product));
            });
        } else {
            // Show no results message
            productsGrid.innerHTML = '<div class="no-results">هیچ محصولی یافت نشد!</div>';
        }
        
        // Update pagination
        updatePagination(sortedProducts.length, itemsPerPage);
        
        // Set the grid/list view
        if (currentView === 'list') {
            productsGrid.classList.add('list-view');
        } else {
            productsGrid.classList.remove('list-view');
        }
        
        // Hide load more button, ensure pagination is visible
        loadMoreContainer.style.display = 'none';
        paginationContainer.style.display = 'flex';
        
        isLoading = false;
    }, 500); // Simulating network delay
}

// Create pagination controls
function updatePagination(totalItems, itemsPerPage) {
    // Calculate total number of pages
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    // Calculate the range of items being displayed
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);
    
    // Clear existing pagination
    paginationContainer.innerHTML = '';
    
    // Create pagination info div
    const paginationInfo = document.createElement('div');
    paginationInfo.className = 'pagination-info';
    paginationInfo.innerHTML = `نمایش <strong>${startItem}</strong> تا <strong>${endItem}</strong> محصول از <strong>${totalItems}</strong> محصول`;
    paginationContainer.appendChild(paginationInfo);
    
    // Don't show pagination controls if there's only one page
    if (totalPages <= 1) {
        return;
    }
    
    // Create pagination controls container
    const paginationControls = document.createElement('div');
    paginationControls.className = 'pagination-controls';
    paginationContainer.appendChild(paginationControls);
    
    // Add "Previous" button
    const prevButton = document.createElement('button');
    prevButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
    prevButton.className = currentPage === 1 ? 'disabled' : '';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayProducts();
            // Scroll to top of products
            productsGrid.scrollIntoView({ behavior: 'smooth' });
        }
    });
    paginationControls.appendChild(prevButton);
    
    // Get number of visible pages based on screen width
    const visiblePages = getVisiblePageRange();
    
    // Calculate start and end page numbers to show
    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(totalPages, startPage + visiblePages - 1);
    
    // Adjust startPage if we're near the end of the page list
    if (endPage - startPage + 1 < visiblePages) {
        startPage = Math.max(1, endPage - visiblePages + 1);
    }
    
    // Add first page if we're not starting from the first page
    if (startPage > 1) {
        const firstPageBtn = document.createElement('button');
        firstPageBtn.textContent = '1';
        firstPageBtn.addEventListener('click', () => {
            currentPage = 1;
            displayProducts();
            productsGrid.scrollIntoView({ behavior: 'smooth' });
        });
        paginationControls.appendChild(firstPageBtn);
        
        // Add ellipsis if there's a gap
        if (startPage > 2) {
            const ellipsis = document.createElement('span');
            ellipsis.textContent = '...';
            ellipsis.className = 'ellipsis';
            paginationControls.appendChild(ellipsis);
        }
    }
    
    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.textContent = i;
        if (i === currentPage) {
            pageBtn.className = 'active';
        }
        pageBtn.addEventListener('click', () => {
            currentPage = i;
            displayProducts();
            productsGrid.scrollIntoView({ behavior: 'smooth' });
        });
        paginationControls.appendChild(pageBtn);
    }
    
    // Add last page if we're not ending at the last page
    if (endPage < totalPages) {
        // Add ellipsis if there's a gap
        if (endPage < totalPages - 1) {
            const ellipsis = document.createElement('span');
            ellipsis.textContent = '...';
            ellipsis.className = 'ellipsis';
            paginationControls.appendChild(ellipsis);
        }
        
        const lastPageBtn = document.createElement('button');
        lastPageBtn.textContent = totalPages;
        lastPageBtn.addEventListener('click', () => {
            currentPage = totalPages;
            displayProducts();
            productsGrid.scrollIntoView({ behavior: 'smooth' });
        });
        paginationControls.appendChild(lastPageBtn);
    }
    
    // Add "Next" button
    const nextButton = document.createElement('button');
    nextButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
    nextButton.className = currentPage === totalPages ? 'disabled' : '';
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayProducts();
            productsGrid.scrollIntoView({ behavior: 'smooth' });
        }
    });
    paginationControls.appendChild(nextButton);
}

// Initialize cart
function initCart() {
    // Initialize cart from localStorage or create empty cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartBadge(cart.length);
    
    // Setup event delegation for add to cart buttons
    document.addEventListener('click', function(e) {
        if (e.target.closest('.add-to-cart')) {
            const button = e.target.closest('.add-to-cart');
            const card = button.closest('.product-card');
            
            // Get product data
            const id = card.dataset.id;
            const title = card.querySelector('.product-title').textContent;
            const price = card.querySelector('.product-price').textContent;
            const image = card.querySelector('.product-image img').src;
            
            // Create product object
            const product = {
                id,
                title,
                price,
                image,
                quantity: 1
            };
            
            // Check if product is already in cart
            const existingProductIndex = cart.findIndex(item => item.id === id);
            
            if (existingProductIndex > -1) {
                // Product exists, increase quantity
                cart[existingProductIndex].quantity++;
            } else {
                // Add new product to cart
                cart.push(product);
            }
            
            // Save cart to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Update cart badge
            updateCartBadge(cart.length);
            
            // Show animation
            button.classList.add('added');
            setTimeout(() => {
                button.classList.remove('added');
            }, 700);
            
            // Prevent default behavior
            e.preventDefault();
            e.stopPropagation();
        }
    });
}

// Update cart badge
function updateCartBadge(count) {
    const badge = document.querySelector('.cart-badge');
    if (badge) {
        badge.textContent = count;
        
        // Add animation if count is greater than 0
        if (count > 0) {
            badge.classList.add('has-items');
        } else {
            badge.classList.remove('has-items');
        }
    }
}

// Initialize
function init() {
    // Remove loading state from header
    const header = document.querySelector('.header');
    if (header) {
        // Reset header to its initial state
        header.className = 'header';
        header.style.cssText = `
            display: block;
            visibility: visible;
            opacity: 1;
            transform: translateY(0);
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
        `;
        
        // Ensure header content is visible
        const headerContent = header.querySelector('.header-top');
        if (headerContent) {
            headerContent.style.display = 'flex';
            headerContent.style.visibility = 'visible';
            headerContent.style.opacity = '1';
        }
    }
    
    // Display products with pagination
    displayProducts();
    
    // Event Listeners
    gridViewBtn.addEventListener('click', () => {
        currentView = 'grid';
        productsGrid.classList.remove('list-view');
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
    });
    
    listViewBtn.addEventListener('click', () => {
        currentView = 'list';
        productsGrid.classList.add('list-view');
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
    });
    
    sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        currentPage = 1; // Reset to first page when sorting changes
        displayProducts();
    });
}

// Theme Toggle Functionality
function initTheme() {
    const themeToggleContainer = document.getElementById('theme-toggle');
    const sunIcon = themeToggleContainer.querySelector('.fa-sun');
    const moonIcon = themeToggleContainer.querySelector('.fa-moon');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Get theme from localStorage or system preference
    const currentTheme = localStorage.getItem('theme') || 
                        (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Handle sun icon click (switch to light mode)
    sunIcon.addEventListener('click', () => {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    });
    
    // Handle moon icon click (switch to dark mode)
    moonIcon.addEventListener('click', () => {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    });
    
    // Update theme when system preference changes
    prefersDarkScheme.addEventListener('change', (e) => {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // If screen size changes, recalculate items per page and refresh
        displayProducts();
    }, 250);
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initTheme();
    
    // Initialize cart
    initCart();
    
    // Add initial styles to header
    const header = document.querySelector('.header');
    if (header) {
        // Reset header to its initial state
        header.className = 'header';
        header.style.cssText = `
            display: block;
            visibility: visible;
            opacity: 1;
            transform: translateY(0);
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
        `;
        
        // Ensure header content is visible
        const headerContent = header.querySelector('.header-top');
        if (headerContent) {
            headerContent.style.display = 'flex';
            headerContent.style.visibility = 'visible';
            headerContent.style.opacity = '1';
        }
    }
    
    // Call init after a small delay
    setTimeout(init, 100);
});

// Footer functionality
function initFooter() {
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Here you would typically send the email to your server
                // For now, we'll just show an alert
                alert('با تشکر از ثبت‌نام شما در خبرنامه خورجین!');
                emailInput.value = '';
            }
        });
    }

    // Smooth scroll to top when clicking on logo
    const footerLogo = document.querySelector('.footer-logo img');
    if (footerLogo) {
        footerLogo.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Social media link hover animations
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.6s ease-in-out';
        });
        
        icon.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });
    
    // Update copyright year
    updateCopyrightYear();
}

// Update copyright year
function updateCopyrightYear() {
    const copyright = document.querySelector('.copyright');
    if (copyright) {
        const year = new Date().getFullYear();
        const persianYear = year + 621; // Convert to Persian calendar (approximate)
        copyright.innerHTML = copyright.innerHTML.replace(/\d{4}/, persianYear);
    }
}

// Initialize footer when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize footer
    initFooter();
    
    // Other initialization code will remain intact
}); 