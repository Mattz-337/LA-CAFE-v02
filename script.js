// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Menu Carousel Functionality (Infinite Loop like Kites Cafe)
const menuCarousel = document.querySelector('.menu-carousel');
let menuItems = Array.from(document.querySelectorAll('.menu-item'));
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let itemsPerView = window.innerWidth > 768 ? 4 : window.innerWidth > 480 ? 2 : 1;
let currentIndex = itemsPerView;
let autoplayInterval = null;
let isTransitioning = false;

function cloneMenuItems() {
    // First, get all original menu items and store them
    const originalItems = Array.from(document.querySelectorAll('.menu-item'));
    const total = originalItems.length;
    
    if (total === 0) return; // Safety check
    
    // Clear the carousel
    menuCarousel.innerHTML = '';
    
    // Clone last itemsPerView and add to beginning
    for (let i = total - itemsPerView; i < total; i++) {
        const clone = originalItems[i].cloneNode(true);
        clone.classList.add('clone');
        menuCarousel.appendChild(clone);
        menuCarousel.insertBefore(clone, menuCarousel.firstChild);
    }
    
    // Add all original items
    originalItems.forEach(item => {
        menuCarousel.appendChild(item);
    });
    
    // Clone first itemsPerView and add to end
    for (let i = 0; i < itemsPerView; i++) {
        const clone = originalItems[i].cloneNode(true);
        clone.classList.add('clone');
        menuCarousel.appendChild(clone);
    }
    
    // Update the menuItems array with all items (including clones)
    menuItems = Array.from(menuCarousel.children);
}

function setCarouselTransition(enable) {
    menuCarousel.style.transition = enable ? 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none';
}

function updateCarousel() {
    setCarouselTransition(true);
    const translateX = -currentIndex * (100 / itemsPerView);
    menuCarousel.style.transform = `translateX(${translateX}%)`;
}

function nextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex++;
    updateCarousel();
}

function prevSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex--;
    updateCarousel();
}

function handleTransitionEnd() {
    const totalOriginal = menuItems.length - 2 * itemsPerView;
    
    // If we're at the end clones, jump to real first items
    if (currentIndex >= totalOriginal + itemsPerView) {
        setCarouselTransition(false);
        currentIndex = itemsPerView;
        const translateX = -currentIndex * (100 / itemsPerView);
        menuCarousel.style.transform = `translateX(${translateX}%)`;
    }
    
    // If we're at the beginning clones, jump to real last items
    if (currentIndex < itemsPerView) {
        setCarouselTransition(false);
        currentIndex = totalOriginal + itemsPerView - 1;
        const translateX = -currentIndex * (100 / itemsPerView);
        menuCarousel.style.transform = `translateX(${translateX}%)`;
    }
    
    setTimeout(() => {
        setCarouselTransition(true);
        isTransitioning = false;
    }, 20);
}

function startAutoplay() {
    if (autoplayInterval) clearInterval(autoplayInterval);
    autoplayInterval = setInterval(() => {
        nextSlide();
    }, 4000); // 4 seconds like Kites Cafe
}

// Button event listeners
if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        prevSlide();
        startAutoplay(); // Reset autoplay timer
    });
    nextBtn.addEventListener('click', () => {
        nextSlide();
        startAutoplay(); // Reset autoplay timer
    });
}

// Responsive handling
window.addEventListener('resize', () => {
    const newItemsPerView = window.innerWidth > 768 ? 4 : window.innerWidth > 480 ? 2 : 1;
    if (newItemsPerView !== itemsPerView) {
        itemsPerView = newItemsPerView;
        currentIndex = itemsPerView;
        cloneMenuItems();
        setCarouselTransition(false);
        updateCarousel();
        setTimeout(() => setCarouselTransition(true), 20);
    }
});

// Touch/swipe support for mobile
let startX = 0;
let currentX = 0;
let isDragging = false;

menuCarousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    setCarouselTransition(false);
});

menuCarousel.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    const translateX = -currentIndex * (100 / itemsPerView) + (diff / menuCarousel.offsetWidth) * 100;
    menuCarousel.style.transform = `translateX(${translateX}%)`;
});

menuCarousel.addEventListener('touchend', () => {
    if (!isDragging) return;
    isDragging = false;
    setCarouselTransition(true);
    
    const diff = currentX - startX;
    if (Math.abs(diff) > 50) { // Minimum swipe distance
        if (diff > 0) {
            prevSlide();
        } else {
            nextSlide();
        }
    } else {
        updateCarousel(); // Return to original position
    }
    startAutoplay();
});

// Transition end listener
menuCarousel.addEventListener('transitionend', handleTransitionEnd);

// Initialize carousel
document.addEventListener('DOMContentLoaded', () => {
    cloneMenuItems();
    if (menuItems.length > 0) {
        setCarouselTransition(false);
        updateCarousel();
        setTimeout(() => setCarouselTransition(true), 20);
        startAutoplay();
    } else {
        console.log('No menu items found for carousel');
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.menu-item, .about-content, .passion-content, .reservation-content');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Button click effects
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect CSS
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .menu-carousel {
        display: flex;
        transition: transform 0.5s ease;
        gap: 2rem;
    }
    
    .menu-item {
        flex: 0 0 calc(25% - 1.5rem);
        min-width: 250px;
    }
    
    @media (max-width: 768px) {
        .menu-item {
            flex: 0 0 calc(50% - 1rem);
        }
    }
    
    @media (max-width: 480px) {
        .menu-item {
            flex: 0 0 100%;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add active link styles
const activeLinkStyle = document.createElement('style');
activeLinkStyle.textContent = `
    .nav-link.active {
        color: #8B4513 !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(activeLinkStyle);



// Menu exploration button functionality
document.querySelectorAll('.btn-secondary').forEach(btn => {
    if (btn.textContent.includes('Explore Menu')) {
        btn.addEventListener('click', () => {
            const menuSection = document.querySelector('#menu-showcase');
            if (menuSection) {
                menuSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});

// Smooth reveal animation for sections
const revealSections = () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('revealed');
        }
    });
};

window.addEventListener('scroll', revealSections);
window.addEventListener('load', revealSections);

// Add reveal animation styles
const revealStyle = document.createElement('style');
revealStyle.textContent = `
    section {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s ease;
    }
    
    section.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .hero {
        opacity: 1;
        transform: none;
    }
`;
document.head.appendChild(revealStyle);

// Add hover effects for menu items
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
});

// Add hover effects for all contact items including address
document.querySelectorAll('.contact-item, .address-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(5px)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
    });
});

// Add typing effect for hero text
const heroText = document.querySelector('.hero-text h1');
if (heroText) {
    const text = heroText.textContent;
    heroText.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing effect when page loads
    window.addEventListener('load', () => {
        setTimeout(typeWriter, 1000);
    });
}

console.log('LA CAFE website loaded successfully!'); 