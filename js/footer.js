// Footer Functionality
document.addEventListener('DOMContentLoaded', function() {
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
    
    // Add animation keyframes
    if (!document.querySelector('#footer-animations')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'footer-animations';
        styleSheet.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(styleSheet);
    }
});

// Function to update copyright year dynamically
function updateCopyrightYear() {
    const copyrightEl = document.querySelector('.copyright');
    if (copyrightEl) {
        // Use hardcoded year as 1404 with English numerals
        const year = "1404";
        
        // Update copyright text
        let copyrightText = copyrightEl.textContent;
        copyrightText = copyrightText.replace(/\d{4}/, year);
        copyrightEl.textContent = copyrightText;
    }
}

// Call functions
document.addEventListener('DOMContentLoaded', function() {
    updateCopyrightYear();
}); 