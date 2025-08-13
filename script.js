
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

class MenuCarousel {
  constructor() {
    this.carousel = document.querySelector('.menu-carousel');
    this.items = Array.from(document.querySelectorAll('.menu-item'));
    if (!this.carousel || !this.items.length) return;

    this.currentIndex = 0;
    this.itemsPerView = this.getItemsPerView();
    this.totalItems = this.items.length;
    this.maxIndex = Math.max(0, this.totalItems - this.itemsPerView);
    this.isTransitioning = false;
    this.autoplayInterval = null;

    this.init();
  }

  getItemsPerView() {
    const width = window.innerWidth;
    if (width <= 480) return 1;
    if (width <= 768) return 2;
    if (width <= 1024) return 3;
    return 4;
  }

  init() {
    this.wrapMenuItems();
    this.setupTouchEvents();
    this.updateCarousel();
    this.startAutoplay();

    // Optional: Resize recalculation
    window.addEventListener('resize', () => {
      const newItemsPerView = this.getItemsPerView();
      if (newItemsPerView !== this.itemsPerView) {
        this.itemsPerView = newItemsPerView;
        this.maxIndex = Math.max(0, this.totalItems - this.itemsPerView);
        this.currentIndex = Math.min(this.currentIndex, this.maxIndex);
        this.updateCarousel();
      }
    });
  }

  wrapMenuItems() {
    this.items.forEach(item => {
      if (!item.querySelector('.menu-item-inner')) {
        const inner = document.createElement('div');
        inner.className = 'menu-item-inner';
        inner.innerHTML = item.innerHTML;
        item.innerHTML = '';
        item.appendChild(inner);
      }
    });
  }

  setupTouchEvents() {
    let startX = 0, currentX = 0, isDragging = false, startTransform = 0;

    this.carousel.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
      this.pauseAutoplay();
      const transform = this.carousel.style.transform;
      startTransform = transform ? parseFloat(transform.match(/-?\d+(\.\d+)?/)) || 0 : 0;
      this.carousel.style.transition = 'none';
    }, { passive: true });

    this.carousel.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      currentX = e.touches[0].clientX;
      const diff = currentX - startX;
      const dragPercent = (diff / this.carousel.offsetWidth) * 100;
      const newTransform = startTransform + dragPercent;
      this.carousel.style.transform = `translateX(${newTransform}%)`;
    }, { passive: true });

    this.carousel.addEventListener('touchend', () => {
      if (!isDragging) return;
      isDragging = false;
      this.carousel.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      const diff = currentX - startX;
      const threshold = 50;

      if (Math.abs(diff) > threshold) {
        if (diff < 0 && this.currentIndex < this.maxIndex) {
          this.currentIndex++;
        } else if (diff > 0 && this.currentIndex > 0) {
          this.currentIndex--;
        }
      }
      this.updateCarousel();
      this.startAutoplay();
    }, { passive: true });
  }

  updateCarousel() {
    const itemWidth = 100 / this.itemsPerView;
    const translateX = -this.currentIndex * itemWidth;
    this.carousel.style.transform = `translateX(${translateX}%)`;
  }

  startAutoplay() {
    this.pauseAutoplay();
    this.autoplayInterval = setInterval(() => {
      if (this.currentIndex >= this.maxIndex) {
        this.currentIndex = 0;
      } else {
        this.currentIndex++;
      }
      this.updateCarousel();
    }, 3000);
  }

  pauseAutoplay() {
    clearInterval(this.autoplayInterval);
    this.autoplayInterval = null;
  }
}


// REPLACE the old menu carousel code with this:
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the new menu carousel
    new MenuCarousel();
    
    // Add swipe indicator to showcase section if not present
    const menuShowcase = document.querySelector('.menu-showcase .container');
    if (menuShowcase && !menuShowcase.querySelector('.swipe-indicator')) {
        const swipeIndicator = document.createElement('div');
        swipeIndicator.className = 'swipe-indicator';
        swipeIndicator.textContent = '← Swipe to see more items →';
        menuShowcase.appendChild(swipeIndicator);
    }
});

// KEEP all your existing JavaScript code below this point:
// Mobile Navigation Toggle, Smooth scrolling, Navbar background change, etc.
// Just REMOVE or COMMENT OUT the old menu carousel code

// Mobile Navigation Toggle (KEEP THIS)
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Smooth scrolling for navigation links (KEEP THIS)
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

// Navbar background change on scroll (KEEP THIS)
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    }
});

// Intersection Observer for fade-in animations (KEEP THIS)
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

// Observe elements for animation (KEEP THIS)
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.menu-item, .about-content, .passion-content, .reservation-content');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Button click effects (KEEP THIS)
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

// Add ripple effect CSS (KEEP THIS)
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
`;
document.head.appendChild(style);

// Parallax effect for hero section (KEEP THIS)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Active navigation link highlighting (KEEP THIS)
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

// Add active link styles (KEEP THIS)
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

// Menu exploration button functionality (KEEP THIS)
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

// Smooth reveal animation for sections (KEEP THIS)
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

// Add reveal animation styles (KEEP THIS)
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

// Add hover effects for all contact items including address (KEEP THIS)
document.querySelectorAll('.contact-item, .address-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(5px)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
    });
});

console.log('LA CAFE website loaded successfully with fixed menu carousel!');

