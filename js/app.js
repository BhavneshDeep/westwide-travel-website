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
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-list');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Icon change logic
            if (navLinks.classList.contains('active')) {
                mobileMenuBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            } else {
                mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
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
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if(mobileMenuBtn) mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
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

    // --- 9. Currency Converter ---
    const currencySelect = document.getElementById('currency-select');
    const currencyResult = document.getElementById('currency-result');
    if (currencySelect && currencyResult) {
        const fetchRates = async () => {
            try {
                const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                
                window.exchangeRates = data.rates;
                updateCurrency();
            } catch (error) {
                console.error('Error fetching currency rates:', error);
                currencyResult.innerText = 'Error';
            }
        };

        const updateCurrency = () => {
            if (!window.exchangeRates) return;
            const selectedCurrency = currencySelect.value;
            const pkrRate = window.exchangeRates.PKR;
            const selectedRate = window.exchangeRates[selectedCurrency];
            
            if (pkrRate && selectedRate) {
                const converted = pkrRate / selectedRate;
                currencyResult.innerText = converted.toFixed(2) + ' PKR';
            }
        };

        currencySelect.addEventListener('change', updateCurrency);
        fetchRates();
    }

    // --- 10. Lead Generation Pop-up (After 30 seconds) ---
    const leadPopup = document.getElementById('leadPopup');
    const closeLeadPopup = document.getElementById('closeLeadPopup');
    const leadPopupForm = document.getElementById('leadPopupForm');
    
    if (leadPopup) {
        setTimeout(() => {
            if (!sessionStorage.getItem('leadPopupShown')) {
                leadPopup.classList.add('show');
                sessionStorage.setItem('leadPopupShown', 'true');
            }
        }, 30000);

        if (closeLeadPopup) {
            closeLeadPopup.addEventListener('click', () => {
                leadPopup.classList.remove('show');
            });
        }

        if (leadPopupForm) {
            leadPopupForm.addEventListener('submit', (e) => {
                e.preventDefault(); // Prevent page refresh
                
                // Collect Data
                const inputs = leadPopupForm.querySelectorAll('input');
                const name = inputs[0].value.trim();
                const phone = inputs[1].value.trim();
                
                // Form Validation
                if (name && phone) {
                    // Construct URL
                    const message = `Hi West Wide Travel, I need a tourist visa quote.\n*Name:* ${name}\n*Phone:* ${phone}`;
                    const whatsappUrl = `https://wa.me/923053033023?text=${encodeURIComponent(message)}`;
                    
                    // Redirect
                    window.open(whatsappUrl, '_blank');
                    
                    // UI Feedback
                    const btn = leadPopupForm.querySelector('button[type="submit"]');
                    const originalText = btn.innerText;
                    btn.innerHTML = '<i class="fa-solid fa-check"></i> Redirecting...';
                    btn.style.backgroundColor = '#25d366';
                    
                    setTimeout(() => {
                        leadPopup.classList.remove('show');
                        btn.innerHTML = originalText;
                        btn.style.backgroundColor = '#003399';
                        leadPopupForm.reset();
                    }, 2000);
                }
            });
        }
    }

    // --- 11. Visa Data & Requirements Modal ---
    const visaData = {
        "Saudi Arabia": ["Original Passport with at least 6 months validity", "1 Passport size photo", "Polio Vaccine Certificate", "Biometric verification", "National ID Card"],
        "UAE": ["Original Passport with at least 6 months validity", "1 Passport Size Photo (White Background)", "National ID Card Copy", "Travel Itinerary", "Hotel Reservation", "Previous Visas (if any)"],
        "Turkey": ["Original Passport with at least 6 months validity", "Account Maintenance Certificate (Original with Bank Sign/Stamp)", "Closing balance: 6 Lac per person", "Employment Letter / NTN", "Polio Vaccination Certificate", "Travel Insurance", "Hotel & Flight Booking"],
        "Azerbaijan": ["Original Passport with at least 6 months validity", "National ID Card Copy"],
        "USA": ["Passport (Original with 6 months validity)", "Education History (Month and year wise)", "Phone Numbers (Used in the last five years)", "Email Addresses (Used in the last five years)", "Family/Relatives in USA (Details of any family member or relative living there)", "Source of Income (Business Letterhead / Employment Letter)", "Monthly Income (Approximate monthly earnings)", "Travel History (Details of previous international trips)", "Expected Traveling Dates", "Previous Rejections (Any visa rejection history)", "CNIC Copy", "Target State (Which US state you plan to visit)"],
        "United Kingdom": ["Original Passport with at least 6 months validity", "Old & Previous Passports", "Account Maintenance Certificate with 2 Million PKR closing balance per person", "Source of Income Proof", "Tax Returns (Last 3 Years)", "Family Registration Certificate", "Property Documents", "Hotel/Flight Reservation", "Travel History documents", "Invitation Letter"],
        "Schengen Area": ["Original Passport with at least 6 months validity", "Old & Previous Passports", "Account Maintenance Certificate with 2 Million PKR closing balance per person", "Source of Income Proof", "Tax Returns (Last 3 Years)", "Family Registration Certificate", "Property Documents", "Hotel/Flight Reservation", "Travel History documents", "Invitation Letter", "Travel Insurance"],
        "Australia": ["Original Passport with at least 6 months validity", "Old & Previous Passports", "Account Maintenance Certificate with 2 Million PKR closing balance per person", "Source of Income Proof", "Tax Returns (Last 3 Years)", "Family Registration Certificate", "Property Documents", "Hotel/Flight Reservation", "Travel History documents", "Invitation Letter"],
        "Thailand": ["Original Passport with at least 6 months validity", "National ID Copy", "Photo with White Background", "6 Month Bank Statement", "Account Maintenance Certificate", "Flight Confirmation", "Hotel Reservation"],
        "Singapore": ["Original Passport with at least 6 months validity", "National ID Copy", "2 Passport Size Photos", "Flight Confirmation", "Hotel Reservation"],
        "Cambodia": ["Original Passport with at least 6 months validity", "National ID Copy", "1 Photo", "Bank Statement (Last 3-6 months)", "Flight Confirmation", "Hotel Reservation"],
        "Indonesia": ["Original Passport with at least 6 months validity", "National ID Copy", "2 Passport Size Photos", "Bank Statement with Maintenance Certificate", "Closing balance: 6 Lac", "Flight Confirmation", "Hotel Reservation"],
        "Kenya": ["Original Passport with at least 6 months validity", "Photo", "ID Card Copy"],
        "Sri Lanka": ["Original Passport with at least 6 months validity", "ID Card Copy"],
        "default": ["Original Passport with at least 6 months validity", "National ID Copy", "2 Passport Size Photos", "Bank Statement (Last 3-6 months)", "Flight Confirmation", "Hotel Reservation"]
    };

    const viewReqBtns = document.querySelectorAll('.view-req-btn');
    const visaReqPopup = document.getElementById('visaReqPopup');
    const closeVisaReqPopup = document.getElementById('closeVisaReqPopup');
    const reqCountryName = document.getElementById('reqCountryName');
    const reqList = document.getElementById('reqList');

    if (viewReqBtns.length > 0 && visaReqPopup) {
        viewReqBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const card = e.target.closest('.country-card');
                const country = card.querySelector('.country-name').innerText;
                
                reqCountryName.innerText = country + " Requirements";
                reqList.innerHTML = '';
                
                const requirements = visaData[country] || visaData["default"];
                requirements.forEach(req => {
                    const li = document.createElement('li');
                    li.innerHTML = '<i class="fa-solid fa-check" style="color: #E69138; margin-right: 10px;"></i>' + req;
                    li.style.marginBottom = '10px';
                    li.style.fontSize = '1.05rem';
                    reqList.appendChild(li);
                });

                visaReqPopup.classList.add('show');
            });
        });

        if (closeVisaReqPopup) {
            closeVisaReqPopup.addEventListener('click', () => {
                visaReqPopup.classList.remove('show');
            });
        }
    }

    // --- 12. Smart Search functionality for Visa Cards ---
    const visaSearchInput = document.getElementById('visaSearchInput');
    const visaCards = document.querySelectorAll('#visaCountryGrid .country-card');

    if (visaSearchInput && visaCards.length > 0) {
        visaSearchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            
            visaCards.forEach(card => {
                const countryName = card.querySelector('.country-name').innerText.toLowerCase();
                const textContent = card.innerText.toLowerCase();
                
                if (countryName.includes(searchTerm) || textContent.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    // --- 13. Simulated Visa Approval Notifications ---
    const visaNotification = document.getElementById('visa-notification');
    const notificationText = document.getElementById('notification-text');

    if (visaNotification && notificationText) {
        const names = ["Zubair", "Mehak", "Farhan", "Dr. Sameer", "Mrs. Khan", "Bilal", "Ayesha", "Rajesh", "Haris", "Usman", "Sara", "Ali"];
        const locations = ["Karachi", "Lahore", "Islamabad", "Multan", "Faisalabad", "Peshawar", "Quetta"];
        const countries = ["UK", "USA", "Turkey", "Azerbaijan", "Thailand", "UAE", "Saudi Arabia", "Malaysia", "Schengen"];
        
        // Realistic time frameworks
        const freshTimes = ['Just Now', '4 mins ago', '12 mins ago'];
        const earlierTodayTimes = ['3 hours ago', 'Today, 11:15 AM'];
        const yesterdayTimes = ['Yesterday', 'Yesterday afternoon', '20 hours ago'];
        const pastDaysTimes = ['2 days ago', 'Last Tuesday', '48 hours ago'];
        const allTimeFrames = [...freshTimes, ...earlierTodayTimes, ...yesterdayTimes, ...pastDaysTimes];

        const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

        const triggerNotification = () => {
            const timeAgo = getRandomElement(allTimeFrames);
            const name = getRandomElement(names);
            const location = getRandomElement(locations);
            const country = getRandomElement(countries);

            notificationText.innerText = `${name} from ${location} - ${country} Visa Approved (${timeAgo})`;
            
            // Show Notification
            visaNotification.style.transform = 'translateX(0)';

            // Hide after 6 seconds
            setTimeout(() => {
                visaNotification.style.transform = 'translateX(-150%)';
            }, 6000);
        };

        // Trigger first notification after 5 seconds, then randomly every 30 to 60 seconds
        setTimeout(() => {
            triggerNotification();
            setInterval(() => {
                triggerNotification();
            }, Math.floor(Math.random() * 30000) + 30000);
        }, 5000);
    }

    // --- 14. Auto-Slider for Premium Packages ---
    function startSlider(slider) {
        const slides = slider.querySelectorAll('.slider-img');
        const total = slides.length;
        if (total < 2) return;
        let current = 0;
        setInterval(() => {
            slides[current].classList.remove('active');
            current = (current + 1) % total; // Cycles 0 -> 1 -> 2 -> 0 without skipping
            slides[current].classList.add('active');
        }, 2000); // 2 seconds interval
    }

    document.querySelectorAll('.package-slider').forEach(startSlider);
});