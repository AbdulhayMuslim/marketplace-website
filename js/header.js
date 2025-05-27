// Function to create header HTML
function createHeader() {
    const currentPage = window.location.pathname.split('/').pop();
    return `
    <header class="header">
        <div class="header-top">
            <div class="left-section">
                <div class="logo">
                    <a href="../2. Home Page/index.html">
                        <img src="../1. Header/media/logo round web.png" alt="لوگو" class="logo">
                    </a>
                </div>
                <div class="search-container tablet-search">
                    <div class="search-icon">
                        <i class="fas fa-search"></i>
                    </div>
                    <input type="text" placeholder="جستجوی محصولات..." class="search-input">
                </div>
            </div>
            
            <div class="center-section">
                <nav class="nav-menu">
                    <ul>
                        <li><a href="../2. Home Page/index.html" ${currentPage === 'index.html' ? 'class="active"' : ''}>صفحه اصلی</a></li>
                        <li><a href="../3. Products/products.html" ${currentPage === 'products.html' ? 'class="active"' : ''}>محصولات</a></li>
                        <li><a href="../4. Categories/categories.html" ${currentPage === 'categories.html' ? 'class="active"' : ''}>دسته‌بندی‌ها</a></li>
                        <li><a href="../5. Contact/contact.html" ${currentPage === 'contact.html' ? 'class="active"' : ''}>تماس با ما</a></li>
                    </ul>
                </nav>
            </div>
            
            <div class="right-section">
                <a href="../6. Cart/cart.html" class="cart-icon">
                    <i class="fas fa-shopping-cart"></i>
                    <span class="cart-badge">0</span>
                </a>
                <a href="../7. Profile/profile.html" class="profile-icon">
                    <i class="fas fa-user-circle"></i>
                </a>
                <button class="hamburger-menu">
                    <i class="fas fa-bars"></i>
                </button>
            </div>
        </div>
    </header>`;
}

// Function to load header
async function loadHeader() {
    try {
        // Get loading indicator
        const loadingDiv = document.getElementById('header-loading');
        
        // Create and insert header
        const headerHtml = createHeader();
        document.body.insertAdjacentHTML('afterbegin', headerHtml);
        
        // Initialize header functionality
        initializeHeader();
        
        // Hide loading indicator with animation
        if (loadingDiv) {
            loadingDiv.classList.add('hidden');
            // Remove the element after animation completes
            setTimeout(() => {
                loadingDiv.remove();
            }, 300);
        }
    } catch (error) {
        console.error('Error loading header:', error);
        // Show error message to user
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = 'padding: 1rem; background: #fee; color: #c00; text-align: center;';
        errorDiv.textContent = 'خطا در بارگذاری هدر. لطفا صفحه را رفرش کنید.';
        document.body.insertAdjacentElement('afterbegin', errorDiv);
    }
}

// Initialize header functionality
function initializeHeader() {
    // Add mobile menu toggle with improved functionality
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event from bubbling
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });

        // Close menu when clicking a nav link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Add search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const searchTerm = searchInput.value.trim();
                if (searchTerm) {
                    window.location.href = `../3. Products/search.html?q=${encodeURIComponent(searchTerm)}`;
                }
            }
        });
    }

    // Add scroll-based header visibility
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    if (header) {
        // Add transition class for smooth animations
        header.classList.add('header-transition');
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 80) {
                // Scrolling down and not at top
                header.classList.add('header-hidden');
            } else {
                // Scrolling up or at top
                header.classList.remove('header-hidden');
            }
            
            lastScrollTop = scrollTop;
        }, { passive: true });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', loadHeader); 