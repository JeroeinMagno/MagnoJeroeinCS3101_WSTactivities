// Animation configuration
const config = {
    particleCount: 30,
    particleSpeed: 0.8,
    fadeInDelay: 150,
    typeWriterSpeed: 40,
    glowIntensity: 0.8
};


function createParticleBackground() {
    const container = document.getElementById('particles');
    const particleCount = 50;

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random size between 2px and 5px
        const size = Math.random() * 3 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Random horizontal position
        particle.style.left = `${Math.random() * 100}%`;
        
        // Random animation duration between 15 and 25 seconds
        const duration = Math.random() * 10 + 15;
        particle.style.animation = `float-up ${duration}s linear infinite`;
        
        // Random delay so particles don't all start at the same time
        particle.style.animationDelay = `-${Math.random() * duration}s`;
        
        // Random opacity
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        container.appendChild(particle);
    }

    // Create initial particles
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }
}

// Fade in elements on page load with more dynamic effects
document.addEventListener('DOMContentLoaded', () => {
    createParticleBackground();

    const elements = [
        { selector: '.profile-image', effect: 'scale' },
        { selector: '.name', effect: 'slide-right' },
        { selector: '.tagline', effect: 'type' },
        { selector: '.about', effect: 'fade' },
        { selector: '.skills', effect: 'cascade' },
        { selector: '.hobbies', effect: 'cascade' },
        { selector: '.contact', effect: 'slide-up' }
    ];

    // Initialize elements with starting positions
    elements.forEach(({ selector, effect }) => {
        const element = document.querySelector(selector);
        if (!element) return;

        element.style.opacity = '0';
        switch (effect) {
            case 'scale':
                element.style.transform = 'scale(0.5)';
                break;
            case 'slide-right':
                element.style.transform = 'translateX(-50px)';
                break;
            case 'slide-up':
                element.style.transform = 'translateY(30px)';
                break;
            case 'cascade':
                const children = element.children;
                Array.from(children).forEach((child, i) => {
                    child.style.opacity = '0';
                    child.style.transform = 'translateY(20px)';
                    child.style.transition = 'all 0.5s ease';
                });
                break;
        }
    });

    // Animate elements
    elements.forEach(({ selector, effect }, index) => {
        const element = document.querySelector(selector);
        if (!element) return;

        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'none';

            if (effect === 'cascade') {
                Array.from(element.children).forEach((child, i) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, i * 100);
                });
            } else if (effect === 'type') {
                typeWriter(element, element.textContent);
            }
        }, index * config.fadeInDelay);
    });

    // Add floating animation to profile image
    floatingAnimation();
    
    // Add hover animations for skill items
    const skillItems = document.querySelectorAll('.skill-item, .hobby-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add smooth reveal animations for sections
    const revealElements = document.querySelectorAll('.timeline-item, .cert-item, .expertise-item');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    revealElements.forEach(element => {
        observer.observe(element);
    });
});

// Floating animation for profile image
function floatingAnimation() {
    const profileImage = document.querySelector('.profile-image');
    if (!profileImage) return;

    let startTime = Date.now();
    
    function animate() {
        const elapsed = Date.now() - startTime;
        const yOffset = Math.sin(elapsed * 0.002) * 10;
        const rotation = Math.sin(elapsed * 0.001) * 2;
        
        profileImage.style.transform = `translateY(${yOffset}px) rotate(${rotation}deg)`;
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Enhanced typing effect
function typeWriter(element, text, index = 0) {
    if (index === 0) element.textContent = '';
    
    if (index < text.length) {
        element.textContent += text.charAt(index);
        setTimeout(() => typeWriter(element, text, index + 1), 
            config.typeWriterSpeed + (Math.random() * 50)); // Random delay for more natural typing
    }
}

// Enhanced hover effects for skill and hobby items
document.querySelectorAll('.skill-item, .hobby-item').forEach(item => {
    item.addEventListener('mouseover', () => {
        item.style.transform = 'translateY(-10px) scale(1.1)';
        item.style.boxShadow = '0 10px 20px rgba(255, 111, 97, 0.4)';
        item.style.background = 'rgba(255, 255, 255, 0.15)';
    });

    item.addEventListener('mouseout', () => {
        item.style.transform = 'translateY(0) scale(1)';
        item.style.boxShadow = 'none';
        item.style.background = 'rgba(255, 255, 255, 0.1)';
    });
});

// Add ripple effect to contact items
document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('click', function(e) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        this.appendChild(ripple);

        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;
        
        const x = e.clientX - rect.left - size/2;
        const y = e.clientY - rect.top - size/2;
        
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        setTimeout(() => ripple.remove(), 600);
    });
});
