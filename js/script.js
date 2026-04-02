// Currency conversion rates (example rates, should be updated from an API)
const currencyRates = {
    USD: 75, // 1 USD = 75 AFN
    EUR: 82, // 1 EUR = 82 AFN
    AFN: 1
};

// Sample listings data (replace with actual data from your backend)
const recentListings = [
    {
        id: 1,
        title: 'تلیفون آیفون 17',
        price: 150000,
        currency: 'AFN',
        image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg',
        location: 'کابل',
        date: '3 ساعت پیش'
    },
    {
        id: 2,
        title: 'کمپیوتر لپ تاپ',
        price: 1200,
        currency: 'USD',
        image: 'https://images.pexels.com/photos/7974/pexels-photo.jpg',
        location: 'هرات',
        date: '۳ ساعت پیش'
    },
    {
        id: 3,
        title: 'تویوتا کرولا',
        price: 12000,
        currency: 'USD',
        image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg',
        location: 'مزار شریف',
        date: '۵ روز پیش'
    },
    {
        id: 4,
        title: 'ساعت هوشمند',
        price: 15000,
        currency: 'AFN',
        image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg',
        location: 'کندهار',
        date: '۶ ساعت پیش'
    },
    {
        id: 5,
        title: 'کمره کانن',
        price: 800,
        currency: 'USD',
        image: 'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg',
        location: 'کابل',
        date: '۱ ساعت پیش'
    },
    {
        id: 6,
        title: 'پلی استیشن ۵',
        price: 45000,
        currency: 'AFN',
        image: 'https://images.pexels.com/photos/12719161/pexels-photo-12719161.jpeg',
        location: 'هرات',
        date: '۴ ساعت پیش'
    },
    {
        id: 7,
        title: 'تلویزیون هوشمند',
        price: 25000,
        currency: 'AFN',
        image: 'https://images.pexels.com/photos/6976094/pexels-photo-6976094.jpeg',
        location: 'کندهار',
        date: '۲ ساعت پیش'
    },
    {
        id: 8,
        title: 'یخچال ال جی',
        price: 55000,
        currency: 'AFN',
        image: 'https://images.pexels.com/photos/5825371/pexels-photo-5825371.jpeg',
        location: 'کندهار',
        date: '۳ ساعت پیش'
    },
    {
        id: 9,
        title: 'موتر تویوتا',
        price: 15000,
        currency: 'USD',
        image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg',
        location: 'کابل',
        date: '۱ ساعت پیش'
    },
    {
        id: 10,
        title: 'لپ تاپ ایسر',
        price: 65000,
        currency: 'AFN',
        image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg',
        location: 'هرات',
        date: '۵ ساعت پیش'
    },
    {
        id: 11,
        title: 'آیفون 15',
        price: 65000,
        currency: 'AFN',
        image: 'https://images.pexels.com/photos/5741605/pexels-photo-5741605.jpeg',
        location: 'کندهار',
        date: '۲ ساعت پیش'
    },
    {
        id: 12,
        title: 'تبلت سامسونگ',
        price: 25000,
        currency: 'AFN',
        image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg',
        location: 'غور',
        date: '۴ ساعت پیش'
    },
    {
        id: 13,
        title: 'موتر مزدا',
        price: 18000,
        currency: 'USD',
        image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg',
        location: 'کابل',
        date: '۳ ساعت پیش'
    },
    {
        id: 14,
        title: 'ماکروویو پاناسونیک',
        price: 15000,
        currency: 'AFN',
        image: 'https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg',
        location: 'هرات',
        date: '۱ ساعت پیش'
    },
    {
        id: 15,
        title: 'بایسکل برقی',
        price: 45000,
        currency: 'AFN',
        image: 'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg',
        location: 'پروان',
        date: '۲ ساعت پیش'
    }
];

// Function to format price with currency
function formatPrice(price, currency) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'decimal',
        maximumFractionDigits: 0
    });

    const currencySymbols = {
        AFN: '؋',
        USD: '$',
        EUR: '€'
    };

    const formattedPrice = formatter.format(price);
    return `${formattedPrice} ${currencySymbols[currency]}`;
}

// Function to convert price to AFN
function convertToAFN(price, fromCurrency) {
    return price * currencyRates[fromCurrency];
}

// Function to convert Persian numbers to English
function formatTimeToEnglish(persianTime) {
    const persianToEnglish = {
        '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4',
        '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9'
    };
    
    return persianTime.replace(/[۰-۹]/g, digit => persianToEnglish[digit]);
}

// Function to create listing cards
function createListingCard(listing) {
    const formattedPrice = formatPrice(listing.price, listing.currency);
    const formattedTime = formatTimeToEnglish(listing.date);
    
    const card = document.createElement('a');
    card.href = `product.html?id=${listing.id}`;
    card.className = 'listing-card';
    card.dataset.id = listing.id;
    
    card.innerHTML = `
        <div class="listing-image">
            <img src="${listing.image}" alt="${listing.title}">
        </div>
        <div class="listing-info">
            <h3>${listing.title}</h3>
            <div class="price-container">
                <p class="listing-price">${formattedPrice}</p>
            </div>
            <div class="listing-meta">
                <div class="location">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${listing.location}</span>
                </div>
                <div class="date">
                    <span>${formattedTime}</span>
                </div>
            </div>
        </div>
        <button class="add-to-cart" title="افزودن به سبد خرید">
            <i class="fas fa-shopping-cart"></i>
        </button>
    `;
    
    return card;
}

// Function to get number of items based on screen width
function getNumberOfItems() {
    const width = window.innerWidth;
    if (width >= 1440) return 15;
    if (width >= 769) return 12;
    if (width >= 481) return 9;
    return 6;
}

// Initialize recent listings
function initializeRecentListings() {
    const listingsContainer = document.querySelector('.listings-grid');
    
    // Clear existing content
    listingsContainer.innerHTML = '';
    
    // Get number of items to show
    const numberOfItems = getNumberOfItems();
    
    // Add listing cards to container
    recentListings.slice(0, numberOfItems).forEach(listing => {
        listingsContainer.appendChild(createListingCard(listing));
    });

    // Add view all button after listings
    const viewAll = document.createElement('a');
    viewAll.href = 'listings.html';
    viewAll.className = 'view-all';
    viewAll.innerHTML = 'مشاهده همه آگهی‌ها <i class="fas fa-arrow-left"></i>';
    listingsContainer.appendChild(viewAll);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeRecentListings();
    initTheme();
    initCart();
    initFooter();
    
    // Preload images for the slider
    preloadImages();
    
    // Initialize slider
    initializeSlider();
    
    // Start slideshow
    startSlideShow();
});

// Update listings when window is resized
window.addEventListener('resize', () => {
    initializeRecentListings();
});

// Hero Slider functionality
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.nav-dot');
    let currentSlide = 0;
    let slideInterval;

    // Function to preload images
    function preloadImages() {
        slides.forEach(slide => {
            const bgUrl = slide.style.backgroundImage.slice(4, -1).replace(/"/g, "");
            const img = new Image();
            img.onerror = function() {
                // If image fails to load, set a fallback image
                slide.style.backgroundImage = `url('https://images.pexels.com/photos/3965557/pexels-photo-3965557.jpeg')`;
            };
            img.src = bgUrl;
        });
    }

    // Initialize first slide
    function initializeSlider() {
        if (slides.length > 0) {
            slides[0].classList.add('active');
            preloadImages();
        }
    }

    // Function to change slide
    function goToSlide(n) {
        if (!slides.length) return;
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // Auto advance slides
    function startSlideShow() {
        if (slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 5000); // Change slide every 5 seconds
    }

    // Add click handlers to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            goToSlide(index);
            startSlideShow();
        });
    });

    // Initialize and start the slideshow
    initializeSlider();
    startSlideShow();
});

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

// Cart Functionality
function initCart() {
    // Initialize cart from localStorage or create empty cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartBadge(cart.length);
    
    // Setup event delegation for add to cart buttons
    document.addEventListener('click', function(e) {
        if (e.target.closest('.add-to-cart')) {
            const button = e.target.closest('.add-to-cart');
            const card = button.closest('.listing-card');
            
            // Get product data
            const id = card.dataset.id || Math.random().toString(36).substr(2, 9);
            const title = card.querySelector('.listing-info h3').textContent;
            const price = card.querySelector('.listing-price').textContent;
            const image = card.querySelector('.listing-image img').src;
            
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
            
            // Prevent link navigation
            e.preventDefault();
            e.stopPropagation();
        }
    });
}

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

// Function to update copyright year dynamically
function updateCopyrightYear() {
    const copyrightEl = document.querySelector('.copyright');
    if (copyrightEl) {
        // Use hardcoded year as 1404 (Persian calendar)
        const year = "1404";
        
        // Update copyright text
        let copyrightText = copyrightEl.textContent;
        copyrightText = copyrightText.replace(/\d{4}/, year);
        copyrightEl.textContent = copyrightText;
    }
} 