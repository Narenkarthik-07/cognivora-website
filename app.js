// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initPortfolioFilter();
    initTestimonialsCarousel();
    initContactForm();
    initAnimatedCounters();
    initScrollAnimations();
});

// Navigation Functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');

    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show');
        });
    }

    // Close mobile menu
    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show');
        });
    }

    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('show');
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerOffset = 70;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.getBoundingClientRect().top + window.pageYOffset - 100;
            const sectionId = current.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.nav__link[href*=${sectionId}]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    });
}

// Scroll Effects
function initScrollEffects() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Portfolio Filter
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(button => button.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all') {
                    item.classList.remove('hidden');
                    item.style.display = 'block';
                } else {
                    const category = item.getAttribute('data-category');
                    if (category === filterValue) {
                        item.classList.remove('hidden');
                        item.style.display = 'block';
                    } else {
                        item.classList.add('hidden');
                        item.style.display = 'none';
                    }
                }
            });
        });
    });
}

// Testimonials Carousel - Fixed previous button functionality
function initTestimonialsCarousel() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('testimonials-prev');
    const nextBtn = document.getElementById('testimonials-next');
    let currentTestimonial = 0;

    // Show first testimonial by default
    if (testimonialCards.length > 0) {
        testimonialCards[0].classList.add('active');
    }

    function showTestimonial(index) {
        // Remove active class from all cards
        testimonialCards.forEach(card => card.classList.remove('active'));
        
        // Ensure index is within bounds
        if (index < 0) {
            currentTestimonial = testimonialCards.length - 1;
        } else if (index >= testimonialCards.length) {
            currentTestimonial = 0;
        } else {
            currentTestimonial = index;
        }
        
        // Show the current testimonial
        if (testimonialCards[currentTestimonial]) {
            testimonialCards[currentTestimonial].classList.add('active');
        }
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            showTestimonial(currentTestimonial - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            showTestimonial(currentTestimonial + 1);
        });
    }

    // Auto-play testimonials
    let autoPlayInterval = setInterval(() => {
        showTestimonial(currentTestimonial + 1);
    }, 5000);

    // Pause autoplay when user interacts with controls
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(() => {
                showTestimonial(currentTestimonial + 1);
            }, 5000);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(() => {
                showTestimonial(currentTestimonial + 1);
            }, 5000);
        });
    }
}

// Contact Form - Fixed service dropdown issue
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const serviceSelect = document.getElementById('service');

    // Ensure service dropdown maintains its selection
    if (serviceSelect) {
        serviceSelect.addEventListener('change', function() {
            // The browser should handle this automatically, but we'll ensure it works
            this.setAttribute('data-selected', this.value);
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const service = formData.get('service');
            const message = formData.get('message');

            // Basic validation
            if (!name || !email || !message) {
                showFormStatus('error', 'Please fill in all required fields.');
                return;
            }

            if (!isValidEmail(email)) {
                showFormStatus('error', 'Please enter a valid email address.');
                return;
            }

            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // Simulate API call
            setTimeout(() => {
                showFormStatus('success', 'Thank you for your message! We\'ll get back to you soon.');
                
                // Reset form but preserve any selected values temporarily for user feedback
                const selectedService = serviceSelect ? serviceSelect.value : '';
                contactForm.reset();
                
                // Restore service selection briefly to show it was captured
                if (serviceSelect && selectedService) {
                    serviceSelect.value = selectedService;
                    setTimeout(() => {
                        serviceSelect.selectedIndex = 0; // Reset to default after showing selection
                    }, 2000);
                }
                
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }

    function showFormStatus(type, message) {
        if (formStatus) {
            formStatus.className = `form-status ${type}`;
            formStatus.textContent = message;
            formStatus.style.display = 'block';
            
            // Hide status after 5 seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Animated Counters
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.stat__number');
    let counterAnimated = false;

    function animateCounters() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const current = parseInt(counter.textContent);
            const increment = target / 100;
            
            if (current < target) {
                counter.textContent = Math.ceil(current + increment);
                setTimeout(() => animateCounter(counter), 20);
            } else {
                counter.textContent = target;
            }
        });
    }

    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const current = parseInt(counter.textContent);
        const increment = target / 100;
        
        if (current < target) {
            counter.textContent = Math.ceil(current + increment);
            setTimeout(() => animateCounter(counter), 20);
        } else {
            counter.textContent = target;
        }
    }

    // Trigger animation when stats section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counterAnimated) {
                counterAnimated = true;
                animateCounters();
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.about__stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

// Scroll Animations
function initScrollAnimations() {
    const animationElements = document.querySelectorAll('.service-card, .portfolio-item, .team-card, .testimonial-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animationElements.forEach(element => {
        observer.observe(element);
    });
}

// Utility Functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Smooth scroll polyfill for older browsers
function smoothScrollPolyfill() {
    if (!window.CSS || !CSS.supports || !CSS.supports('scroll-behavior', 'smooth')) {
        const script = document.createElement('script');
        script.src = 'https://polyfill.io/v3/polyfill.min.js?features=smoothscroll';
        document.head.appendChild(script);
    }
}

// Initialize polyfill
smoothScrollPolyfill();

// Add loading class removal
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Handle resize events
window.addEventListener('resize', debounce(() => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        const navMenu = document.getElementById('nav-menu');
        if (navMenu) {
            navMenu.classList.remove('show');
        }
    }
}, 250));

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        if (navMenu && navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
        }
    }
    
    // Add keyboard support for testimonial navigation
    const testimonialSection = document.querySelector('.testimonials');
    if (testimonialSection && isElementInViewport(testimonialSection)) {
        const prevBtn = document.getElementById('testimonials-prev');
        const nextBtn = document.getElementById('testimonials-next');
        
        if (e.key === 'ArrowLeft' && prevBtn) {
            prevBtn.click();
        } else if (e.key === 'ArrowRight' && nextBtn) {
            nextBtn.click();
        }
    }
});

// Helper function to check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Performance optimization: Lazy loading for images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading if needed
initLazyLoading();

// Error handling for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Hide broken images gracefully
            this.style.display = 'none';
            console.warn('Failed to load image:', this.src);
        });
    });
});