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

// =========================================================
// DYNAMIC TRAVEL GUIDE LOGIC
// =========================================================

const countryData = {
    "dubai": {
        "visaAlert": "🇦🇪 <b>UAE (Dubai) Visa Alert:</b> Pakistani travelers can now apply for a 30-day or 60-day tourist visa with processing times as fast as 48-72 hours. Digital bank statements are accepted.",
        "itinerary": `
            <div class="itinerary-item">
                <div class="itinerary-node"><div class="node-icon"><i class="fa-solid fa-plane-arrival"></i></div><div class="node-line"></div></div>
                <div class="itinerary-content"><div class="itinerary-day">Day 1</div><h4>Arrival & Dhow Cruise</h4><p>Arrive in Dubai, transfer to hotel. Evening Marina Dhow Cruise with dinner.</p></div>
            </div>
            <div class="itinerary-item">
                <div class="itinerary-node"><div class="node-icon"><i class="fa-solid fa-city"></i></div><div class="node-line"></div></div>
                <div class="itinerary-content"><div class="itinerary-day">Day 2</div><h4>Dubai City Tour & Burj Khalifa</h4><p>Visit Jumeirah Mosque, Burj Al Arab, and 124th floor of Burj Khalifa.</p></div>
            </div>
            <div class="itinerary-item">
                <div class="itinerary-node"><div class="node-icon"><i class="fa-solid fa-sun"></i></div><div class="node-line"></div></div>
                <div class="itinerary-content"><div class="itinerary-day">Day 3</div><h4>Desert Safari Adventure</h4><p>Afternoon 4x4 dune bashing, camel riding, and BBQ dinner at desert camp.</p></div>
            </div>
            <div class="itinerary-item">
                <div class="itinerary-node"><div class="node-icon"><i class="fa-solid fa-water"></i></div><div class="node-line"></div></div>
                <div class="itinerary-content"><div class="itinerary-day">Day 4</div><h4>Atlantis Aquaventure & Mall</h4><p>Full day at Aquaventure Waterpark followed by shopping at Dubai Mall.</p></div>
            </div>
            <div class="itinerary-item itinerary-item--last">
                <div class="itinerary-node"><div class="node-icon node-icon--last"><i class="fa-solid fa-plane-departure"></i></div></div>
                <div class="itinerary-content"><div class="itinerary-day">Day 5</div><h4>Departure</h4><p>Breakfast at hotel and transfer to airport for departure.</p></div>
            </div>`,
        "weather": `
            <tr><td>Nov – Mar</td><td>15°C – 28°C</td><td><span class="status-badge status-peak">✦ Best Time</span></td></tr>
            <tr><td>Apr – Oct</td><td>28°C – 42°C</td><td><span class="status-badge status-off">Very Hot</span></td></tr>`
    },
    "turkey": {
        "visaAlert": "🇹🇷 <b>Turkey Visa Alert:</b> E-visa is available for those with valid US/UK/Schengen visas. Others require sticker visas. Processing takes approx 15-20 working days.",
        "itinerary": `
            <div class="itinerary-item">
                <div class="itinerary-node"><div class="node-icon"><i class="fa-solid fa-mosque"></i></div><div class="node-line"></div></div>
                <div class="itinerary-content"><div class="itinerary-day">Day 1</div><h4>Arrival in Istanbul</h4><p>Transfer to Sultanahmet area. Evening walk at Sultanahmet Square.</p></div>
            </div>
            <div class="itinerary-item">
                <div class="itinerary-node"><div class="node-icon"><i class="fa-solid fa-landmark"></i></div><div class="node-line"></div></div>
                <div class="itinerary-content"><div class="itinerary-day">Day 2</div><h4>Classic Istanbul Tour</h4><p>Blue Mosque, Hagia Sophia, Topkapi Palace and Grand Bazaar.</p></div>
            </div>
            <div class="itinerary-item">
                <div class="itinerary-node"><div class="node-icon"><i class="fa-solid fa-ship"></i></div><div class="node-line"></div></div>
                <div class="itinerary-content"><div class="itinerary-day">Day 3</div><h4>Bosphorus Cruise & Galata</h4><p>Boat tour between Europe and Asia. Visit Galata Tower and Istiklal Street.</p></div>
            </div>
            <div class="itinerary-item">
                <div class="itinerary-node"><div class="node-icon"><i class="fa-solid fa-wind"></i></div><div class="node-line"></div></div>
                <div class="itinerary-content"><div class="itinerary-day">Day 4</div><h4>Cappadocia Flight</h4><p>Short flight to Cappadocia. Evening Turkish Night show.</p></div>
            </div>
            <div class="itinerary-item itinerary-item--last">
                <div class="itinerary-node"><div class="node-icon node-icon--last"><i class="fa-solid fa-hot-air-balloon"></i></div></div>
                <div class="itinerary-content"><div class="itinerary-day">Day 5</div><h4>Balloon Ride & Departure</h4><p>Sunrise Balloon Ride. Cave tours and evening flight back.</p></div>
            </div>`,
        "weather": `
            <tr><td>Apr – May</td><td>15°C – 25°C</td><td><span class="status-badge status-peak">✦ Spring (Best)</span></td></tr>
            <tr><td>Sep – Oct</td><td>18°C – 28°C</td><td><span class="status-badge status-peak">✦ Autumn (Best)</span></td></tr>
            <tr><td>Jun – Aug</td><td>25°C – 35°C</td><td><span class="status-badge status-shoulder">Summer</span></td></tr>`
    },
    "thailand": {
        "visaAlert": "🇹🇭 <b>Thailand Visa Alert:</b> Tourist visas take 10-15 working days. Bank statement with 6 months history to be provided (Min 2-3 Lac balance).",
        "itinerary": `
            <div class="itinerary-item">
                <div class="itinerary-node"><div class="node-icon"><i class="fa-solid fa-temple"></i></div><div class="node-line"></div></div>
                <div class="itinerary-content"><div class="itinerary-day">Day 1</div><h4>Bangkok Arrival</h4><p>Transfer to hotel. Evening Chao Phraya Dinner Cruise.</p></div>
            </div>
            <div class="itinerary-item">
                <div class="itinerary-node"><div class="node-icon"><i class="fa-solid fa-masks-theater"></i></div><div class="node-line"></div></div>
                <div class="itinerary-content"><div class="itinerary-day">Day 2</div><h4>Safari World & Marine Park</h4><p>Full day tour with lunch. Evening at hotel or shopping.</p></div>
            </div>
            <div class="itinerary-item">
                <div class="itinerary-node"><div class="node-icon"><i class="fa-solid fa-car"></i></div><div class="node-line"></div></div>
                <div class="itinerary-content"><div class="itinerary-day">Day 3</div><h4>Pattaya Transfer</h4><p>Drive to Pattaya. Visit Sanctuary of Truth. Evening Alcazar Show.</p></div>
            </div>
            <div class="itinerary-item">
                <div class="itinerary-node"><div class="node-icon"><i class="fa-solid fa-umbrella-beach"></i></div><div class="node-line"></div></div>
                <div class="itinerary-content"><div class="itinerary-day">Day 4</div><h4>Coral Island Tour</h4><p>Speedboat trip to Coral Island (Koh Larn). Water sports and lunch.</p></div>
            </div>
            <div class="itinerary-item itinerary-item--last">
                <div class="itinerary-node"><div class="node-icon node-icon--last"><i class="fa-solid fa-plane-departure"></i></div></div>
                <div class="itinerary-content"><div class="itinerary-day">Day 5</div><h4>Return Flight</h4><p>Drive back to Bangkok airport for departure.</p></div>
            </div>`,
        "weather": `
            <tr><td>Nov – Feb</td><td>22°C – 30°C</td><td><span class="status-badge status-peak">✦ Peak Season</span></td></tr>
            <tr><td>Mar – May</td><td>28°C – 35°C</td><td><span class="status-badge status-shoulder">Hot Season</span></td></tr>`
    },
    "malaysia": {
        "visaAlert": "🇲🇾 <b>Malaysia Visa Alert:</b> E-visa is available for Pakistani citizens. Processing time 48-72 hours. Digital bank statement required.",
        "itinerary": `
            <div class="itinerary-item">
                <div class="itinerary-node"><div class="node-icon"><i class="fa-solid fa-tower-observation"></i></div><div class="node-line"></div></div>
                <div class="itinerary-content"><div class="itinerary-day">Day 1</div><h4>Kuala Lumpur Arrival</h4><p>Transfer to hotel. Evening visit to Petronas Twin Towers.</p></div>
            </div>
            <div class="itinerary-item">
                <div class="itinerary-node"><div class="node-icon"><i class="fa-solid fa-mountain"></i></div><div class="node-line"></div></div>
                <div class="itinerary-content"><div class="itinerary-day">Day 2</div><h4>Batu Caves & Genting Highlands</h4><p>Day trip with cable car ride and indoor/outdoor theme parks.</p></div>
            </div>
            <div class="itinerary-item">
                <div class="itinerary-node"><div class="node-icon"><i class="fa-solid fa-sun-plant-wilt"></i></div><div class="node-line"></div></div>
                <div class="itinerary-content"><div class="itinerary-day">Day 3</div><h4>Sunway Lagoon Theme Park</h4><p>Full day fun at 6 adventure zones. Evening shopping at Bukit Bintang.</p></div>
            </div>
            <div class="itinerary-item">
                <div class="itinerary-node"><div class="node-icon"><i class="fa-solid fa-plane"></i></div><div class="node-line"></div></div>
                <div class="itinerary-content"><div class="itinerary-day">Day 4</div><h4>Langkawi Flight</h4><p>Transfer to Langkawi. Evening at Cenang Beach.</p></div>
            </div>
            <div class="itinerary-item itinerary-item--last">
                <div class="itinerary-node"><div class="node-icon node-icon--last"><i class="fa-solid fa-water"></i></div></div>
                <div class="itinerary-content"><div class="itinerary-day">Day 5</div><h4>Island Hopping & Departure</h4><p>Morning boat tour. Transfer to airport for return flight.</p></div>
            </div>`,
        "weather": `
            <tr><td>Dec – Feb</td><td>24°C – 32°C</td><td><span class="status-badge status-peak">✦ Best Time</span></td></tr>
            <tr><td>Mar – Nov</td><td>23°C – 33°C</td><td><span class="status-badge status-shoulder">Humid/Rainy</span></td></tr>`
    },
    "singapore": {
        "visaAlert": "🇸🇬 <b>Singapore Visa Alert:</b> E-visa available via authorized agents. Processing time 3-5 working days. Return ticket and hotel booking mandatory.",
        "itinerary": `
            <div class="itinerary-item">
                <div class="itinerary-node"><div class="node-icon"><i class="fa-solid fa-tree"></i></div><div class="node-line"></div></div>
                <div class="itinerary-content"><div class="itinerary-day">Day 1</div><h4>Arrival & Gardens by the Bay</h4><p>Arrival, transfer to hotel. Evening visit to Cloud Forest and Flower Dome.</p></div>
            </div>
            <div class="itinerary-item">
                <div class="itinerary-node"><div class="node-icon"><i class="fa-solid fa-film"></i></div><div class="node-line"></div></div>
                <div class="itinerary-content"><div class="itinerary-day">Day 2</div><h4>Universal Studios Singapore</h4><p>Full day at Sentosa Island's premier theme park.</p></div>
            </div>
            <div class="itinerary-item itinerary-item--last">
                <div class="itinerary-node"><div class="node-icon node-icon--last"><i class="fa-solid fa-plane-departure"></i></div></div>
                <div class="itinerary-content"><div class="itinerary-day">Day 3</div><h4>City Tour & Departure</h4><p>Merlion Park, Little India, and transfer to Changi Airport.</p></div>
            </div>`,
        "weather": `
            <tr><td>Year Round</td><td>25°C – 31°C</td><td><span class="status-badge status-peak">✦ Tropical</span></td></tr>`
    },
    "egypt": {
        "visaAlert": "🇪🇬 <b>Egypt Visa Alert:</b> Sticker visa required for Pakistani citizens. Processing takes 3-4 weeks. Bank statement needed.",
        "itinerary": `
            <div class="itinerary-item">
                <div class="itinerary-node"><div class="node-icon"><i class="fa-solid fa-landmark-dome"></i></div><div class="node-line"></div></div>
                <div class="itinerary-content"><div class="itinerary-day">Day 1</div><h4>Cairo Arrival</h4><p>Transfer to hotel. Evening Nile River Dinner Cruise with Tanoura dance.</p></div>
            </div>
            <div class="itinerary-item itinerary-item--last">
                <div class="itinerary-node"><div class="node-icon node-icon--last"><i class="fa-solid fa-pyramid"></i></div></div>
                <div class="itinerary-content"><div class="itinerary-day">Day 2</div><h4>Pyramids of Giza</h4><p>Full day visit to Great Pyramids, Sphinx, and Egyptian Museum.</p></div>
            </div>`,
        "weather": `
            <tr><td>Oct – Apr</td><td>15°C – 25°C</td><td><span class="status-badge status-peak">✦ Winter (Best)</span></td></tr>
            <tr><td>May – Sep</td><td>25°C – 38°C</td><td><span class="status-badge status-off">Summer</span></td></tr>`
    },
    "srilanka": {
        "visaAlert": "🇱🇰 <b>Sri Lanka Visa Alert:</b> ETA (Electronic Travel Authorization) can be obtained online. Instant approval usually.",
        "itinerary": `
            <div class="itinerary-item">
                <div class="itinerary-node"><div class="node-icon"><i class="fa-solid fa-leaf"></i></div><div class="node-line"></div></div>
                <div class="itinerary-content"><div class="itinerary-day">Day 1</div><h4>Colombo to Kandy</h4><p>Drive to Kandy, visit Pinnewala Elephant Orphanage on the way.</p></div>
            </div>
            <div class="itinerary-item itinerary-item--last">
                <div class="itinerary-node"><div class="node-icon node-icon--last"><i class="fa-solid fa-umbrella-beach"></i></div></div>
                <div class="itinerary-content"><div class="itinerary-day">Day 2</div><h4>Bentota Beach</h4><p>Transfer to Bentota. Enjoy water sports and river safari.</p></div>
            </div>`,
        "weather": `
            <tr><td>Dec – Mar</td><td>26°C – 30°C</td><td><span class="status-badge status-peak">✦ West Coast Peak</span></td></tr>
            <tr><td>Apr – Sep</td><td>26°C – 32°C</td><td><span class="status-badge status-shoulder">East Coast Peak</span></td></tr>`
    }
};

function showCountryGuide(countryName) {
    const resultArea = document.getElementById('guide-result');
    if (!resultArea) return;

    const searchTerm = countryName.toLowerCase().trim();
    const data = countryData[searchTerm];

    // Smooth hide if visible
    resultArea.classList.remove('visible', 'animated');

    setTimeout(() => {
        if (data) {
            resultArea.innerHTML = `
                <div class="guide-country-header">
                    <h2><i class="fa-solid fa-map-location-dot"></i> ${countryName.toUpperCase()} Travel Guide</h2>
                    <button class="guide-close-btn" onclick="document.getElementById('guide-result').classList.remove('visible','animated')"><i class="fa-solid fa-xmark"></i></button>
                </div>
                <div class="guide-result-body">
                    <div class="visa-alert-box">
                        <div class="visa-alert-icon"><i class="fa-solid fa-bell"></i></div>
                        <div class="visa-alert-content">
                            ${data.visaAlert}
                        </div>
                    </div>
                    
                    <h3 class="post-subheading"><i class="fa-solid fa-clock-rotate-left" style="color:#E69138;"></i> Day-wise Itinerary</h3>
                    <div class="itinerary-timeline">
                        ${data.itinerary}
                    </div>

                    <h3 class="post-subheading"><i class="fa-solid fa-cloud-sun" style="color:#E69138;"></i> Weather & Best Time to Visit</h3>
                    <div class="weather-table-wrapper">
                        <table class="weather-table">
                            <thead>
                                <tr>
                                    <th><i class="fa-regular fa-calendar"></i> Month</th>
                                    <th><i class="fa-solid fa-temperature-half"></i> Temperature</th>
                                    <th><i class="fa-solid fa-chart-line"></i> Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${data.weather}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="blog-whatsapp-cta">
                    <div class="cta-inner">
                        <div class="cta-text-area">
                            <h3>Ready to visit ${countryName}?</h3>
                            <p class="cta-subtitle">Get a personalized quote for your trip including visa, tickets, and hotels.</p>
                        </div>
                        <a href="https://wa.me/923053033023?text=Hi%20Westwide!%20I'm%20interested%20in%20a%20trip%20to%20${countryName}.%20Please%20guide%20me." target="_blank" class="cta-whatsapp-btn">
                            <i class="fa-brands fa-whatsapp"></i> Book This ${countryName} Trip Now
                        </a>
                    </div>
                </div>
            `;
        } else {
            resultArea.innerHTML = `
                <div class="guide-not-found">
                    <i class="fa-solid fa-earth-africa"></i>
                    <h3>Destination Not Found</h3>
                    <p>We currently don't have a guide for "${countryName}" on the website, but we still offer full travel and visa services for it!</p>
                    <a href="https://wa.me/923053033023?text=Hi%20Westwide!%20I%20am%20looking%20for%20information%20regarding%20a%20trip%20to%20${countryName}." target="_blank" class="nf-whatsapp-btn">
                        <i class="fa-brands fa-whatsapp"></i> Contact Us on WhatsApp
                    </a>
                </div>
            `;
        }

        resultArea.classList.add('visible');
        setTimeout(() => resultArea.classList.add('animated'), 10);
        
        // Scroll to results
        resultArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
}

// Wire up search bar listeners
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('guideSearchInput');
    const searchBtn = document.getElementById('guideSearchBtn');

    if (searchInput && searchBtn) {
        const handleSearch = () => {
            const val = searchInput.value.trim();
            if (val) {
                searchBtn.classList.add('loading');
                searchBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Finding...';
                
                setTimeout(() => {
                    showCountryGuide(val);
                    searchBtn.classList.remove('loading');
                    searchBtn.innerHTML = '<i class="fa-solid fa-arrow-right"></i> Search';
                }, 600);
            }
        };

        searchBtn.addEventListener('click', handleSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSearch();
        });
    }
});