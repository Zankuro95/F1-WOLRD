// ============================
// NAVIGATION
// ============================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.getElementById('header');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        
        // Update active state
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Header scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.querySelector('.navbar').classList.add('scrolled');
    } else {
        header.querySelector('.navbar').classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ============================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Only prevent default for same-page anchors
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
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

// ============================
// ANIMATED COUNTERS
// ============================
const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = Math.floor(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
};

// Intersection Observer for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ============================
// SCROLL ANIMATIONS
// ============================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to elements
const animateElements = document.querySelectorAll('.timeline-item, .team-card, .news-card, .stat-card, .record-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ============================
// CUSTOM AOS (ANIMATE ON SCROLL)
// ============================
const aosElements = document.querySelectorAll('[data-aos]');

const aosObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const animation = entry.target.getAttribute('data-aos');
            const delay = entry.target.getAttribute('data-aos-delay') || 0;
            
            setTimeout(() => {
                entry.target.classList.add('aos-animate');
            }, delay);
            
            aosObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

aosElements.forEach(el => {
    aosObserver.observe(el);
});

// Add CSS for AOS animations
const style = document.createElement('style');
style.textContent = `
    [data-aos] {
        opacity: 0;
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    [data-aos].aos-animate {
        opacity: 1;
    }
    
    [data-aos="fade-up"] {
        transform: translateY(50px);
    }
    
    [data-aos="fade-up"].aos-animate {
        transform: translateY(0);
    }
    
    [data-aos="fade-right"] {
        transform: translateX(-50px);
    }
    
    [data-aos="fade-right"].aos-animate {
        transform: translateX(0);
    }
    
    [data-aos="fade-left"] {
        transform: translateX(50px);
    }
    
    [data-aos="fade-left"].aos-animate {
        transform: translateX(0);
    }
    
    [data-aos="zoom-in"] {
        transform: scale(0.8);
    }
    
    [data-aos="zoom-in"].aos-animate {
        transform: scale(1);
    }
    
    [data-aos="flip-up"] {
        transform: perspective(1000px) rotateX(-90deg);
    }
    
    [data-aos="flip-up"].aos-animate {
        transform: perspective(1000px) rotateX(0);
    }
`;
document.head.appendChild(style);

// ============================
// PARALLAX EFFECT
// ============================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ============================
// INITIALIZE ON PAGE LOAD
// ============================
document.addEventListener('DOMContentLoaded', () => {
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // Set current year in footer if exists
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        yearElement.innerHTML = yearElement.innerHTML.replace('2024', new Date().getFullYear());
    }
});

// ============================
// PERFORMANCE OPTIMIZATION
// ============================
// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
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

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(() => {
    // Scroll-based effects here
}, 10));

console.log('🏎️ Site F1 chargé avec succès!');
