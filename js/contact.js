// Form validation and submission
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const nameField = document.getElementById('name');
            const emailField = document.getElementById('email');
            const subjectField = document.getElementById('subject');
            const messageField = document.getElementById('message');
            
            // Validate fields
            let isValid = true;
            
            if (!nameField.value.trim()) {
                showError(nameField, 'لطفا نام خود را وارد کنید');
                isValid = false;
            } else {
                removeError(nameField);
            }
            
            if (!emailField.value.trim()) {
                showError(emailField, 'لطفا ایمیل خود را وارد کنید');
                isValid = false;
            } else if (!isValidEmail(emailField.value.trim())) {
                showError(emailField, 'لطفا یک ایمیل معتبر وارد کنید');
                isValid = false;
            } else {
                removeError(emailField);
            }
            
            if (!subjectField.value.trim()) {
                showError(subjectField, 'لطفا موضوع پیام را وارد کنید');
                isValid = false;
            } else {
                removeError(subjectField);
            }
            
            if (!messageField.value.trim()) {
                showError(messageField, 'لطفا پیام خود را وارد کنید');
                isValid = false;
            } else {
                removeError(messageField);
            }
            
            // If valid, show success message and reset form
            if (isValid) {
                // Simulate form submission
                const submitBtn = contactForm.querySelector('.submit-btn');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> در حال ارسال...';
                submitBtn.disabled = true;
                
                // Simulate API call with timeout
                setTimeout(() => {
                    // Show success message
                    showSuccessMessage(contactForm);
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }, 3000);
                }, 2000);
            }
        });
    }
}

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show error message for input field
function showError(inputElement, message) {
    // Remove any existing error
    removeError(inputElement);
    
    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = '#ff4444';
    errorElement.style.fontSize = '0.8rem';
    errorElement.style.marginTop = '0.5rem';
    
    // Add error styling to input
    inputElement.style.borderColor = '#ff4444';
    
    // Add error message after input
    inputElement.parentNode.appendChild(errorElement);
}

// Remove error message from input field
function removeError(inputElement) {
    // Reset input styling
    inputElement.style.borderColor = '';
    
    // Find and remove error message if exists
    const errorElement = inputElement.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

// Show success message
function showSuccessMessage(formElement) {
    // Create success message
    const successContainer = document.createElement('div');
    successContainer.className = 'success-message';
    successContainer.style.backgroundColor = 'rgba(40, 167, 69, 0.1)';
    successContainer.style.color = '#28a745';
    successContainer.style.padding = '1rem';
    successContainer.style.borderRadius = '8px';
    successContainer.style.marginTop = '1rem';
    successContainer.style.textAlign = 'center';
    successContainer.style.animation = 'fadeIn 0.5s ease-out';
    
    const icon = document.createElement('i');
    icon.className = 'fas fa-check-circle';
    icon.style.marginRight = '0.5rem';
    icon.style.fontSize = '1.1rem';
    
    const message = document.createTextNode('پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت.');
    
    successContainer.appendChild(icon);
    successContainer.appendChild(message);
    
    // Insert before submit button
    const submitBtn = formElement.querySelector('.submit-btn');
    formElement.insertBefore(successContainer, submitBtn.parentNode);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        if (successContainer.parentNode) {
            successContainer.style.animation = 'fadeOut 0.5s ease-out';
            setTimeout(() => {
                if (successContainer.parentNode) {
                    successContainer.remove();
                }
            }, 500);
        }
    }, 5000);
}

// Social media card animations
function initSocialCards() {
    const socialIcons = document.querySelectorAll('.social-icon-box');
    
    if (socialIcons.length) {
        socialIcons.forEach(icon => {
            icon.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
            });
            
            icon.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }
}

// Email card animations
function initEmailCards() {
    const emailLinks = document.querySelectorAll('.email a');
    
    if (emailLinks.length) {
        emailLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.color = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color');
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.color = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
            });
        });
    }
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

// Header Functionality
function initHeader() {
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
                    window.location.href = `../2. Home Page/search.html?q=${encodeURIComponent(searchTerm)}`;
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
            
            if (scrollTop > lastScrollTop) {
                // Scrolling down
                header.classList.add('header-hidden');
            } else {
                // Scrolling up
                header.classList.remove('header-hidden');
            }
            
            lastScrollTop = scrollTop;
        }, { passive: true });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initHeader();
    initContactForm();
    initSocialCards();
    initEmailCards();
}); 