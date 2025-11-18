// Futuristic Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Custom Cursor (only on desktop)
    if (window.innerWidth > 768 && !('ontouchstart' in window)) {
        const cursor = document.createElement('div');
        cursor.className = 'cursor';
        document.body.appendChild(cursor);
        
        const cursorTrails = [];
        for (let i = 0; i < 3; i++) {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            document.body.appendChild(trail);
            cursorTrails.push(trail);
        }
        
        let mouseX = 0, mouseY = 0;
        let trailX = [], trailY = [];
        
        for (let i = 0; i < 3; i++) {
            trailX[i] = 0;
            trailY[i] = 0;
        }
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.left = mouseX - 10 + 'px';
            cursor.style.top = mouseY - 10 + 'px';
        });
        
        function updateTrails() {
            for (let i = cursorTrails.length - 1; i > 0; i--) {
                trailX[i] = trailX[i - 1];
                trailY[i] = trailY[i - 1];
            }
            trailX[0] = mouseX;
            trailY[0] = mouseY;
            
            cursorTrails.forEach((trail, index) => {
                trail.style.left = trailX[index] - 3 + 'px';
                trail.style.top = trailY[index] - 3 + 'px';
                trail.style.opacity = (3 - index) / 3 * 0.7;
            });
            
            requestAnimationFrame(updateTrails);
        }
        updateTrails();
    } else {
        // Remove cursor styles for mobile
        document.body.style.cursor = 'auto';
    }
    
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navbar.classList.toggle('active');
            document.body.style.overflow = navbar.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (menuToggle && navbar) {
                menuToggle.classList.remove('active');
                navbar.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const headerHeight = 70;
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active nav link highlighting
    function updateActiveNavLink() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    // Typing animation with futuristic effect
    const typingTexts = [
        "Full Stack Developer",
        "UI/UX Designer", 
        "Web Developer",
        "Python Developer",
        "Digital Innovator",
        "Freelancer"
    ];
    
    const aboutTypingTexts = [
        "passionate developer",
        "creative designer",
        "problem solver",
        "tech enthusiast",
        "startup founder"
    ];

    function typeWriter(element, texts, speed = 100) {
        if (!element) return;
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                element.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                element.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typeSpeed = isDeleting ? speed / 2 : speed;
            
            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 4000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }
            
            setTimeout(type, typeSpeed);
        }
        
        type();
    }

    // Initialize typing animations
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        typeWriter(typingElement, typingTexts);
    }
    
    const aboutTypingElement = document.getElementById('typing-text-2');
    if (aboutTypingElement) {
        setTimeout(() => {
            typeWriter(aboutTypingElement, aboutTypingTexts, 120);
        }, 1000);
    }

    // Animated Counter
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }

    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.stat-number[data-count]');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-count'));
                    animateCounter(counter, target);
                });
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // Observe stats counter
    const statsCounter = document.querySelector('.stats-counter');
    if (statsCounter) {
        counterObserver.observe(statsCounter);
    }

    // Parallax effect for background elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.tech-particle');
        
        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.1;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Dynamic particle generation
    function createDynamicParticle() {
        const particle = document.createElement('div');
        particle.className = 'tech-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        const colors = ['#00d4ff', '#8b5cf6', '#06ffa5'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = color;
        particle.style.boxShadow = `0 0 10px ${color}`;
        
        document.querySelector('.floating-particles').appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 20000);
    }

    // Generate particles periodically (only on desktop)
    if (window.innerWidth > 768) {
        setInterval(createDynamicParticle, 3000);
    }

    // Glowing effect on hover for interactive elements
    const interactiveElements = document.querySelectorAll('.neon-btn, .nav-link, .logo');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.2)';
            cursor.style.transform = 'scale(1.5)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1)';
            cursor.style.transform = 'scale(1)';
        });
    });

    // Code preview syntax highlighting animation
    const codeLines = document.querySelectorAll('.code-line');
    codeLines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            line.style.transition = 'all 0.5s ease';
            line.style.opacity = '1';
            line.style.transform = 'translateX(0)';
        }, index * 200 + 1000);
    });

    // Header scroll effect
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(10, 10, 15, 0.95)';
                header.style.backdropFilter = 'blur(25px)';
            } else {
                header.style.background = 'rgba(10, 10, 15, 0.8)';
                header.style.backdropFilter = 'blur(20px)';
            }
        });
    }

    // 3D tilt effect for cards (only on desktop)
    if (window.innerWidth > 768) {
        const cards = document.querySelectorAll('.hero-content, .code-preview, .service-card, .project-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 15;
                const rotateY = (centerX - x) / 15;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(5px)`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });
    }

    // Prevent horizontal scroll
    function preventHorizontalScroll() {
        document.body.style.overflowX = 'hidden';
        document.documentElement.style.overflowX = 'hidden';
    }

    preventHorizontalScroll();

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            if (menuToggle && navbar) {
                menuToggle.classList.remove('active');
                navbar.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
        preventHorizontalScroll();
    });

    // Testimonial slider functionality
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const navDots = document.querySelectorAll('.nav-dot');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.classList.toggle('active', i === index);
        });
        navDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
        });
    });
    
    // Auto-rotate testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }, 5000);
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Show success message
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #06ffa5, #00d4ff)';
            
            // Reset form
            setTimeout(() => {
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
            }, 3000);
        });
    }
    
    // Smooth reveal animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections for scroll animations
    document.querySelectorAll('section, .service-card, .project-card, .skill-category').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Performance optimization: Disable animations on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.body.classList.add('reduced-motion');
    }
    
    console.log('🚀 Futuristic Portfolio Loaded Successfully!');
    console.log('📱 Responsive design active');
    console.log('✨ All animations initialized');
});