// ===================================
// Mobile Navigation Toggle
// ===================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ===================================
// Smooth Scrolling
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Back to Top Button
// ===================================
const backToTopButton = document.getElementById('backToTop');

if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// Form Validation
// ===================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Clear error message
    function clearError(inputId) {
        const errorElement = document.getElementById(inputId + 'Error');
        if (errorElement) {
            errorElement.textContent = '';
        }
        const inputElement = document.getElementById(inputId);
        if (inputElement) {
            inputElement.style.borderColor = '';
        }
    }

    // Show error message
    function showError(inputId, message) {
        const errorElement = document.getElementById(inputId + 'Error');
        if (errorElement) {
            errorElement.textContent = message;
        }
        const inputElement = document.getElementById(inputId);
        if (inputElement) {
            inputElement.style.borderColor = '#f44336';
        }
    }

    // Validate individual field
    function validateField(field) {
        const value = field.value.trim();
        const fieldId = field.id;

        clearError(fieldId);

        switch (fieldId) {
            case 'name':
                if (value === '') {
                    showError(fieldId, 'Пожалуйста, введите ваше имя');
                    return false;
                }
                if (value.length < 2) {
                    showError(fieldId, 'Имя должно содержать минимум 2 символа');
                    return false;
                }
                break;

            case 'email':
                if (value === '') {
                    showError(fieldId, 'Пожалуйста, введите email');
                    return false;
                }
                if (!emailRegex.test(value)) {
                    showError(fieldId, 'Пожалуйста, введите корректный email');
                    return false;
                }
                break;

            case 'message':
                if (value === '') {
                    showError(fieldId, 'Пожалуйста, введите сообщение');
                    return false;
                }
                if (value.length < 10) {
                    showError(fieldId, 'Сообщение должно содержать минимум 10 символов');
                    return false;
                }
                break;

            case 'privacy':
                if (!field.checked) {
                    showError(fieldId, 'Необходимо согласие с политикой конфиденциальности');
                    return false;
                }
                break;
        }

        return true;
    }

    // Real-time validation
    const requiredFields = ['name', 'email', 'message'];
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('blur', () => validateField(field));
            field.addEventListener('input', () => {
                if (field.value.trim() !== '') {
                    clearError(fieldId);
                }
            });
        }
    });

    // Privacy checkbox validation
    const privacyCheckbox = document.getElementById('privacy');
    if (privacyCheckbox) {
        privacyCheckbox.addEventListener('change', () => validateField(privacyCheckbox));
    }

    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate all fields
        let isValid = true;
        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const messageField = document.getElementById('message');
        const privacyField = document.getElementById('privacy');

        if (!validateField(nameField)) isValid = false;
        if (!validateField(emailField)) isValid = false;
        if (!validateField(messageField)) isValid = false;
        if (!validateField(privacyField)) isValid = false;

        if (isValid) {
            // Get form data
            const formData = {
                name: nameField.value.trim(),
                email: emailField.value.trim(),
                phone: document.getElementById('phone').value.trim(),
                age: document.getElementById('age').value,
                format: document.getElementById('format').value,
                message: messageField.value.trim()
            };

            // In a real application, you would send this data to a server
            // For demonstration purposes, we're just showing a success message
            // Example: fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })
            
            // For development/debugging only:
            // console.log('Form submitted with data:', formData);

            // Show success message
            const successMessage = document.getElementById('formSuccess');
            if (successMessage) {
                successMessage.style.display = 'block';
            }

            // Reset form
            contactForm.reset();

            // Hide success message after 5 seconds
            setTimeout(() => {
                if (successMessage) {
                    successMessage.style.display = 'none';
                }
            }, 5000);

            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            // Scroll to first error
            const firstError = contactForm.querySelector('.error-message:not(:empty)');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
}

// ===================================
// Intersection Observer for Animations
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInElements = document.querySelectorAll('.service-card, .approach-item, .pricing-card, .faq-item');

if ('IntersectionObserver' in window) {
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeInElements.forEach(element => {
        fadeInObserver.observe(element);
    });
}

// ===================================
// Performance: Debounce Scroll Events
// ===================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handler if needed
const handleScroll = debounce(() => {
    // Any scroll-based functionality can be added here
}, 100);

window.addEventListener('scroll', handleScroll);

// ===================================
// Analytics (Placeholder)
// ===================================
// Add your analytics code here (Google Analytics, Yandex Metrica, etc.)
// Example:
// window.dataLayer = window.dataLayer || [];
// function gtag(){dataLayer.push(arguments);}
// gtag('js', new Date());
// gtag('config', 'YOUR-TRACKING-ID');

// ===================================
// Console Message
// ===================================
console.log('%c👋 Добро пожаловать на сайт Марии Глинской!', 'color: #6b8cae; font-size: 16px; font-weight: bold;');
console.log('%cДетский и подростковый психолог в Варшаве', 'color: #5a6c7d; font-size: 14px;');
