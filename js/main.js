/* ============================================
   RudrAI Solutions — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Preloader ----
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.getElementById('preloader').classList.add('hidden');
        }, 800);
    });

    // ---- Initialize AOS Animations ----
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100,
    });

    // ---- Navbar Scroll Effect ----
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        if (scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // ---- Mobile Menu ----
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ---- Typing Effect ----
    const typedTextEl = document.getElementById('typed-text');
    const words = [
        'Stunning Websites.',
        'WhatsApp Bots.',
        'AI Chatbots.',
        'Mobile Apps.',
        'CRM Solutions.',
        'AI Tools.',
        'Cloud Systems.',
        'Your Digital Future.'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function typeEffect() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typedTextEl.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typedTextEl.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 300;
        }

        setTimeout(typeEffect, typeSpeed);
    }

    typeEffect();

    // ---- Counter Animation ----
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersStarted = false;

    function animateCounters() {
        statNumbers.forEach(num => {
            const target = +num.getAttribute('data-count');
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    num.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    num.textContent = target;
                }
            };

            updateCounter();
        });
    }

    // Intersection Observer for counters
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersStarted) {
                    countersStarted = true;
                    animateCounters();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }

    // ---- Video Modal ----
    const demoModal = document.getElementById('demoModal');
    const closeModal = document.getElementById('closeModal');
    const demoVideo = document.getElementById('demoVideo');
    const playDemoBtn = document.getElementById('playDemoBtn');

    function openVideoModal(videoUrl) {
        demoVideo.src = videoUrl + '?autoplay=1';
        demoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeVideoModal() {
        demoVideo.src = '';
        demoModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Demo reel now links to demo-reel.html

    if (closeModal) {
        closeModal.addEventListener('click', closeVideoModal);
    }

    if (demoModal) {
        demoModal.querySelector('.modal-overlay').addEventListener('click', closeVideoModal);
    }

    // Service demo play buttons
    document.querySelectorAll('.play-btn[data-video]').forEach(btn => {
        btn.addEventListener('click', () => {
            openVideoModal(btn.getAttribute('data-video'));
        });
    });

    // ---- Portfolio Filter ----
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            portfolioCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ---- Smooth Scroll for all anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ---- Contact Form ----
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simple form validation visual feedback
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalHTML = btn.innerHTML;

            btn.innerHTML = '<i class="fas fa-check"></i> Enquiry Sent Successfully!';
            btn.style.background = '#25D366';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = '';
                btn.disabled = false;
                contactForm.reset();
            }, 3000);
        });
    }

    // ---- Active Nav Link Highlight ----
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ---- Chatbot typing animation ----
    const delayedMessages = document.querySelectorAll('.bot-msg.delayed');
    delayedMessages.forEach(msg => {
        msg.style.display = 'none';
        setTimeout(() => {
            msg.style.display = 'block';
            msg.style.animation = 'fadeInUp 0.3s ease';
        }, 2500);
    });

    // ---- Parallax effect for floating shapes ----
    document.addEventListener('mousemove', (e) => {
        const shapes = document.querySelectorAll('.shape');
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 10;
            shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });

    // ---- Keyboard Escape for modals ----
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeVideoModal();
        }
    });

    // ---- Service cards entrance animation ----
    const serviceDetails = document.querySelectorAll('.service-detail');
    const serviceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    serviceDetails.forEach(detail => {
        serviceObserver.observe(detail);
    });
});

// ---- CSS Animation Keyframe (added via JS for fadeInUp) ----
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

