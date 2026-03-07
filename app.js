document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Header Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = 'var(--shadow-md)';
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.backdropFilter = 'blur(15px)';
            } else {
                navbar.style.boxShadow = 'var(--shadow-sm)';
                navbar.style.background = 'rgba(255, 255, 255, 0.9)';
                navbar.style.backdropFilter = 'blur(10px)';
            }
        });
    }

    // --- 2. Mobile Navigation Toggle ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            const isActive = navLinks.classList.contains('active-mobile');

            if (isActive) {
                navLinks.classList.remove('active-mobile');
                navLinks.style.display = '';
                mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
            } else {
                navLinks.classList.add('active-mobile');
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = '#ffffff';
                navLinks.style.padding = '2rem';
                navLinks.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)';
                navLinks.style.gap = '1.5rem';
                navLinks.style.alignItems = 'flex-start';
                mobileMenuBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            }
        });
    }

    // --- 3. Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                if (navLinks && navLinks.classList.contains('active-mobile')) {
                    navLinks.classList.remove('active-mobile');
                    navLinks.style.display = '';
                    mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
                }

                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- 4. Contact Form Submission ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;

            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                contactForm.reset();
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;

                const successMsg = document.getElementById('formSuccess');
                if (successMsg) {
                    successMsg.style.display = 'block';
                    setTimeout(() => {
                        successMsg.style.display = 'none';
                    }, 5000);
                }
            }, 1500);
        });
    }

    // --- 5. FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                item.classList.toggle('active');
            });
        });
    }

    // --- 6. Search Bar Interactivity ---
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const inputs = document.querySelectorAll('.search-bar input, .search-bar select');
            let hasInput = false;
            inputs.forEach(input => {
                if (input.value.trim() !== '') hasInput = true;
            });

            if (hasInput) {
                searchBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Searching...';
                setTimeout(() => {
                    window.location.href = 'services.html';
                }, 800);
            } else {
                searchBtn.style.transform = 'translateX(5px)';
                setTimeout(() => searchBtn.style.transform = 'translateX(-5px)', 100);
                setTimeout(() => searchBtn.style.transform = 'translateX(5px)', 200);
                setTimeout(() => searchBtn.style.transform = 'translateX(0)', 300);
            }
        });
    }

    // --- 7. Scroll Animations ---
    if (!('IntersectionObserver' in window)) {
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    } else {
        const observerOptions = { threshold: 0.1 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    // --- 8. Hero Image Slider (SPEED OPTIMIZED) ---
    const slides = document.querySelectorAll('.hero-slider .slide');
    const dots = document.querySelectorAll('.hero-slider .dot');
    const prevBtn = document.querySelector('.hero-slider .prev-btn');
    const nextBtn = document.querySelector('.hero-slider .next-btn');

    if (slides.length > 0) {
        let currentSlide = 0;
        let slideInterval;

        const showSlide = (index) => {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            slides[index].classList.add('active');
            dots[index].classList.add('active');
        };

        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        };

        const prevSlide = () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        };

        // Yahan 3000 ka matlab 3 seconds hai (Tez transition)
        const startSlider = () => {
            slideInterval = setInterval(nextSlide, 3000);
        };

        const resetSlider = () => {
            clearInterval(slideInterval);
            startSlider();
        };

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetSlider();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetSlider();
            });
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
                resetSlider();
            });
        });

        startSlider();
    }
});