// Typewriter Effect for Hero Section
class TypewriterEffect {
    constructor(element, words, options = {}) {
        this.element = element;
        this.words = words;
        this.options = {
            typeSpeed: options.typeSpeed || 150,
            deleteSpeed: options.deleteSpeed || 100,
            delayBetweenWords: options.delayBetweenWords || 2000,
            ...options
        };
        this.currentWordIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        
        this.start();
    }
    
    start() {
        this.type();
    }
    
    type() {
        const currentWord = this.words[this.currentWordIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentWord.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
        } else {
            this.element.textContent = currentWord.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
        }
        
        let speed = this.isDeleting ? this.options.deleteSpeed : this.options.typeSpeed;
        
        if (!this.isDeleting && this.currentCharIndex === currentWord.length) {
            speed = this.options.delayBetweenWords;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentCharIndex === 0) {
            this.isDeleting = false;
            this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
            speed = 500;
        }
        
        setTimeout(() => this.type(), speed);
    }
}

// Navigation functionality
class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navMenu = document.getElementById('nav-menu');
        this.hamburger = document.getElementById('hamburger');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        this.setupScrollEffect();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupActiveNavigation();
    }
    
    setupScrollEffect() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });
    }
    
    setupMobileMenu() {
        this.hamburger.addEventListener('click', () => {
            this.navMenu.classList.toggle('active');
            this.hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking on links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.navMenu.classList.remove('active');
                this.hamburger.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navbar.contains(e.target)) {
                this.navMenu.classList.remove('active');
                this.hamburger.classList.remove('active');
            }
        });
    }
    
    setupSmoothScrolling() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    setupActiveNavigation() {
        const sections = document.querySelectorAll('section');
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            this.navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
        });
    }
}

// Intersection Observer for animations
class AnimationObserver {
    constructor() {
        this.setupIntersectionObserver();
    }
    
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Trigger skills animation when skills section becomes visible
                    if (entry.target.id === 'skills') {
                        this.animateSkills();
                    }
                    
                    // Add entrance animation for experience section
                    if (entry.target.id === 'experience') {
                        entry.target.classList.add('animate');
                    }
                }
            });
        }, observerOptions);
        
        // Observe all sections
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            observer.observe(section);
        });
    }
    
    animateSkills() {
        const skillProgressBars = document.querySelectorAll('.skill-progress');
        
        skillProgressBars.forEach((bar, index) => {
            const width = bar.getAttribute('data-width');
            
            setTimeout(() => {
                bar.style.width = width + '%';
            }, index * 100);
        });
    }
}

// Contact Form Handler
class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.init();
    }
    
    init() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }
    
    handleSubmit() {
        const formData = new FormData(this.form);
        const formElements = this.form.elements;
        
        // Basic validation
        let isValid = true;
        for (let element of formElements) {
            if (element.required && !element.value.trim()) {
                isValid = false;
                element.style.borderColor = '#ff4444';
            } else {
                element.style.borderColor = '';
            }
        }
        
        if (isValid) {
            // Simulate form submission
            this.showSuccessMessage();
            this.form.reset();
        }
    }
    
    showSuccessMessage() {
        const button = this.form.querySelector('.btn-submit');
        const originalText = button.textContent;
        
        button.textContent = 'Message Sent!';
        button.style.background = '#48bb78';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 3000);
    }
}

// Smooth scrolling for footer back-to-top button
class ScrollToTop {
    constructor() {
        this.button = document.querySelector('.footer .btn-secondary');
        if (this.button) {
            this.init();
        }
    }
    
    init() {
        this.button.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Performance optimized scroll effects
class ScrollEffects {
    constructor() {
        this.ticking = false;
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            if (!this.ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    this.ticking = false;
                });
                this.ticking = true;
            }
        });
    }
    
    handleScroll() {
        const scrollY = window.scrollY;
        
        // Add subtle parallax effect to hero section
        const hero = document.querySelector('.hero');
        if (hero && scrollY < window.innerHeight) {
            const parallax = scrollY * 0.5;
            hero.style.transform = `translateY(${parallax}px)`;
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize typewriter effect
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const roles = ['Architect', 'Designer', '3D Visualizer', 'BIM Specialist'];
        new TypewriterEffect(typewriterElement, roles, {
            typeSpeed: 100,
            deleteSpeed: 50,
            delayBetweenWords: 2000
        });
    }
    
    // Initialize all components
    new Navigation();
    new AnimationObserver();
    new ContactForm();
    new ScrollToTop();
    new ScrollEffects();
// Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    // Fade in the page
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add resize handler for responsive adjustments
window.addEventListener('resize', () => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        const navMenu = document.getElementById('nav-menu');
        const hamburger = document.getElementById('hamburger');
        
        if (navMenu && hamburger) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const hamburger = document.getElementById('hamburger');
        
        if (navMenu && hamburger) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
});

// Add focus management for accessibility
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

// Trap focus in mobile menu when open
function trapFocus(element) {
    const focusables = element.querySelectorAll(focusableElements);
    const firstFocusable = focusables[0];
    const lastFocusable = focusables[focusables.length - 1];
    
    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Apply focus trap to mobile navigation
const mobileNav = document.getElementById('nav-menu');
if (mobileNav) {
    trapFocus(mobileNav);
}