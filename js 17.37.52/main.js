document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initRoleRotator();
    initMobileMenu();
    initSectionAnimations();
    initStickyHeader();
    initTimelineAnimations();
    initSkillProgressBars();
    initLogoCarousel();
    initTestimonialCarousel();
    initCursorTrail();
    initDiscInsightCards();
    initSingleCardTimeline();
    initProfessionalTimeline();
    initStorySlider();
    
    // === Role Rotator ===
    function initRoleRotator() {
        const roleRotate = document.getElementById('role-rotate');
        if (roleRotate) {
            const roles = ['Trading', 'Technology', 'Fencing', 'Entrepreneurship', 'Storytelling'];
            let currentIndex = 0;
            
            const updateRole = () => {
                // Fade out
                roleRotate.style.opacity = '0';
                roleRotate.style.transform = 'translateY(10px)';
                
                setTimeout(() => {
                    // Change text
                    currentIndex = (currentIndex + 1) % roles.length;
                    roleRotate.textContent = roles[currentIndex];
                    
                    // Fade in
                    roleRotate.style.opacity = '1';
                    roleRotate.style.transform = 'translateY(0)';
                }, 500); // Half of the transition time
            };
            
            // Initial text
            roleRotate.textContent = roles[0];
            roleRotate.style.opacity = '1';
            roleRotate.style.transition = 'opacity 1s ease, transform 1s ease';
            
            // Rotate every 2 seconds
            setInterval(updateRole, 2000);
        }
    }
    
    // === Mobile Menu Toggle ===
    function initMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileLinks = document.querySelectorAll('.mobile-link');
        
        if (hamburger && mobileMenu) {
            hamburger.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
                document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
            });
            
            // Close menu when clicking a link
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
        }
    }
    
    // === Custom Cursor Trail ===
    function initCursorTrail() {
        // Load cursor trail script if it exists in the DOM
        if (document.querySelector('#cursor-trail')) {
            const script = document.createElement('script');
            script.src = 'js/cursor-trail.js';
            document.body.appendChild(script);
        }
    }
    
    // === Intersection Observer for Section Animations ===
    function initSectionAnimations() {
        const sections = document.querySelectorAll('section');
        const featuredLogos = document.querySelector('.featured-logos');
        
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1 // Trigger when 10% of the section is visible
        };
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Animate skill bars when services section becomes visible
                    if (entry.target.id === 'services') {
                        animateSkillBars();
                    }
                }
            });
        }, observerOptions);
        
        // Observe all sections
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
        
        // Observe logo section
        if (featuredLogos) {
            sectionObserver.observe(featuredLogos);
        }
        
        // Immediate animation for first visible section
        animateHeroSection();
        
        // Ensure gallery section only shows 3 items
        setupGallerySection();
    }
    
    // === Animate hero section on page load ===
    function animateHeroSection() {
        const hero = document.querySelector('.hero-section');
        if (hero) {
            setTimeout(() => {
                hero.classList.add('visible');
            }, 100);
        }
    }
    
    // === Sticky header ===
    function initStickyHeader() {
        const header = document.querySelector('.nav-header');
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add/remove class based on scroll direction and position
            if (scrollTop > 100) {
                header.classList.add('scrolled');
                
                if (scrollTop > lastScrollTop) {
                    // Scrolling down
                    header.classList.add('header-hidden');
                } else {
                    // Scrolling up
                    header.classList.remove('header-hidden');
                }
            } else {
                header.classList.remove('scrolled');
                header.classList.remove('header-hidden');
            }
            
            lastScrollTop = scrollTop;
        });
    }

    // === Experience Timeline Animations ===
    function initTimelineAnimations() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        const timelineLine = document.querySelector('.timeline-line');
        
        // Add animation class to the timeline line first
        if (timelineLine) {
            timelineLine.classList.add('animate-line');
        }
        
        // Set up observer for timeline items
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add delayed animation based on index
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, 300 * index); // Stagger the animations
                }
            });
        }, { threshold: 0.3 });
        
        // Observe each timeline item
        timelineItems.forEach(item => {
            observer.observe(item);
        });
        
        // Add hover effect interactions
        timelineItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                // Highlight the current item
                item.classList.add('active');
                
                // Dim other items
                timelineItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.add('dimmed');
                    }
                });
            });
            
            item.addEventListener('mouseleave', () => {
                // Reset all items
                item.classList.remove('active');
                timelineItems.forEach(otherItem => {
                    otherItem.classList.remove('dimmed');
                });
            });
        });
    }
    
    // === Skill Progress Bars Animation ===
    function initSkillProgressBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        // Reset all skill bars initially
        skillBars.forEach(bar => {
            bar.style.width = '0%';
        });
    }
    
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const targetWidth = bar.dataset.progress || '85%';
            
            // Reset to zero first
            bar.style.width = '0%';
            
            // Animate to target width
            setTimeout(() => {
                bar.style.transition = 'width 1.5s ease-in-out';
                bar.style.width = targetWidth;
            }, 300);
        });
    }
    
    // === Logo Carousel Initialization ===
    function initLogoCarousel() {
        const slider = document.querySelector('.logo-slider');
        if (!slider) return;

        // Clone the slider contents to create the infinite loop
        const slides = slider.querySelectorAll('.logo-slide');
        const sliderCopy = document.createElement('div');
        sliderCopy.className = 'logo-slider-copy';
        
        // Clone each logo slide into the copy container
        slides.forEach(slide => {
            const clone = slide.cloneNode(true);
            sliderCopy.appendChild(clone);
        });
        
        // Append the copy to the slider
        slider.appendChild(sliderCopy);
    }
    
    // === Setup Gallery Section ===
    function setupGallerySection() {
        // Ensure the gallery (Latest Insights) section only shows 3 items
        const gallerySections = document.querySelectorAll('.gallery-section');
        
        gallerySections.forEach(section => {
            const galleryItems = section.querySelectorAll('.gallery-item');
            
            // If there are more than 3 items, hide the extras
            if (galleryItems.length > 3) {
                for (let i = 3; i < galleryItems.length; i++) {
                    galleryItems[i].style.display = 'none';
                }
            }
            
            // Make sure the "Check More Pictures" button exists
            let centerLink = section.querySelector('.center-link');
            if (!centerLink) {
                centerLink = document.createElement('div');
                centerLink.className = 'center-link';
                
                const checkMoreBtn = document.createElement('a');
                checkMoreBtn.href = 'gallery.html';
                checkMoreBtn.className = 'btn secondary';
                checkMoreBtn.textContent = 'Check More Pictures';
                
                centerLink.appendChild(checkMoreBtn);
                section.querySelector('.container').appendChild(centerLink);
            }
        });
    }
    
    // === Testimonial Carousel ===
    function initTestimonialCarousel() {
        const slider = document.querySelector('.testimonial-slides');
        const prevBtn = document.querySelector('.testimonial-control.prev');
        const nextBtn = document.querySelector('.testimonial-control.next');
        const indicators = document.querySelectorAll('.testimonial-indicator');
        
        if (!slider || !prevBtn || !nextBtn) return;
        
        let currentSlide = 0;
        const slides = document.querySelectorAll('.testimonial-slide');
        const totalSlides = slides.length;
        
        // Update the active indicator
        function updateIndicators() {
            indicators.forEach((indicator, index) => {
                if (index === currentSlide) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }
        
        // Move to specified slide
        function goToSlide(index) {
            currentSlide = index;
            slider.style.transform = `translateX(-${currentSlide * 100}%)`;
            updateIndicators();
        }
        
        // Next slide
        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            goToSlide(currentSlide);
        }
        
        // Previous slide
        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            goToSlide(currentSlide);
        }
        
        // Event listeners
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        
        // Click on indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                goToSlide(index);
            });
        });
        
        // Auto-advance slides
        setInterval(nextSlide, 5000);
    }

    // === DISC Insight Cards Animation ===
    function initDiscInsightCards() {
        const discCards = document.querySelectorAll('.disc-insight-card');
        
        if (discCards.length === 0) return;
        
        // Add animation delay index to each card
        discCards.forEach((card, index) => {
            card.style.setProperty('--i', index);
        });
        
        // Create intersection observer to animate cards when they become visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        // Observe all cards
        discCards.forEach(card => {
            observer.observe(card);
        });
    }

    // === Single Card Timeline ===
    function initSingleCardTimeline() {
        const timelineContainer = document.querySelector('.timeline-scroll.single-card-view');
        if (!timelineContainer) return;

        const timelineItems = timelineContainer.querySelectorAll('.timeline-item');
        const prevBtn = document.querySelector('.timeline-navigation .prev');
        const nextBtn = document.querySelector('.timeline-navigation .next');
        const progressFill = document.querySelector('.timeline-progress-fill');
        
        if (!timelineItems.length || !prevBtn || !nextBtn) return;
        
        let currentIndex = 0;
        const totalItems = timelineItems.length;
        
        // Function to display the current timeline item
        function showCurrentItem() {
            // Hide all items
            timelineItems.forEach(item => {
                item.classList.remove('active');
            });
            
            // Show only the current item
            timelineItems[currentIndex].classList.add('active');
            
            // Update progress bar
            updateProgressBar();
        }
        
        // Show the previous card
        function showPreviousCard() {
            if (currentIndex > 0) {
                currentIndex--;
                showCurrentItem();
            }
        }
        
        // Show the next card
        function showNextCard() {
            if (currentIndex < totalItems - 1) {
                currentIndex++;
                showCurrentItem();
            }
        }
        
        // Update the progress bar at the bottom
        function updateProgressBar() {
            if (progressFill) {
                const progressPercentage = ((currentIndex + 1) / totalItems) * 100;
                progressFill.style.width = `${progressPercentage}%`;
            }
            
            // Update the button states
            if (currentIndex === 0) {
                prevBtn.classList.add('disabled');
            } else {
                prevBtn.classList.remove('disabled');
            }
            
            if (currentIndex === totalItems - 1) {
                nextBtn.classList.add('disabled');
            } else {
                nextBtn.classList.remove('disabled');
            }
        }
        
        // Event listeners for navigation buttons
        prevBtn.addEventListener('click', showPreviousCard);
        nextBtn.addEventListener('click', showNextCard);
        
        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                showPreviousCard();
            } else if (e.key === 'ArrowRight') {
                showNextCard();
            }
        });
        
        // Initialize the first item
        showCurrentItem();
    }

    // === Professional Timeline Animation ===
    function initProfessionalTimeline() {
        const timelineBlocks = document.querySelectorAll('.timeline-block');
        
        if (timelineBlocks.length === 0) return;
        
        // Add animation class to all blocks immediately
        timelineBlocks.forEach(block => {
            block.classList.add('animate');
        });
        
        // Create observer for additional animations on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });
        
        // Observe all timeline blocks
        timelineBlocks.forEach(block => {
            observer.observe(block);
        });
    }

    // === Story Slider ===
    function initStorySlider() {
        const sliderContainer = document.querySelector('.story-slider');
        if (!sliderContainer) return;
        
        const storyCards = sliderContainer.querySelectorAll('.story-card');
        const prevBtn = document.querySelector('.slider-nav-button.prev');
        const nextBtn = document.querySelector('.slider-nav-button.next');
        const progressFill = document.querySelector('.slider-progress-fill');
        
        if (!storyCards.length || !prevBtn || !nextBtn || !progressFill) return;
        
        let currentIndex = 0;
        const totalCards = storyCards.length;
        
        // Initialize: show first card, set progress
        function initSlider() {
            // Show first card
            storyCards[0].classList.add('active');
            
            // Set initial progress (first card = 1/totalCards)
            updateProgress();
            
            // Set initial button states
            updateButtonStates();
        }
        
        // Update progress bar fill width
        function updateProgress() {
            const progressPercent = ((currentIndex + 1) / totalCards) * 100;
            progressFill.style.width = `${progressPercent}%`;
        }
        
        // Update prev/next button states (disabled when at ends)
        function updateButtonStates() {
            // Enable/disable previous button
            if (currentIndex === 0) {
                prevBtn.classList.add('disabled');
            } else {
                prevBtn.classList.remove('disabled');
            }
            
            // Enable/disable next button
            if (currentIndex === totalCards - 1) {
                nextBtn.classList.add('disabled');
            } else {
                nextBtn.classList.remove('disabled');
            }
        }
        
        // Go to specific slide
        function goToSlide(index) {
            if (index < 0 || index >= totalCards || index === currentIndex) return;
            
            // Hide current card
            storyCards[currentIndex].classList.remove('active');
            
            // Show new card
            currentIndex = index;
            storyCards[currentIndex].classList.add('active');
            
            // Update progress and buttons
            updateProgress();
            updateButtonStates();
        }
        
        // Go to previous slide
        function goToPrev() {
            if (currentIndex > 0) {
                goToSlide(currentIndex - 1);
            }
        }
        
        // Go to next slide
        function goToNext() {
            if (currentIndex < totalCards - 1) {
                goToSlide(currentIndex + 1);
            }
        }
        
        // Event listeners
        prevBtn.addEventListener('click', goToPrev);
        nextBtn.addEventListener('click', goToNext);
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                goToPrev();
            } else if (e.key === 'ArrowRight') {
                goToNext();
            }
        });
        
        // Touch support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        sliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        sliderContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
        
        function handleSwipe() {
            const swipeThreshold = 50; // Minimum swipe distance
            
            if (touchStartX - touchEndX > swipeThreshold) {
                // Swiped left, go next
                goToNext();
            } else if (touchEndX - touchStartX > swipeThreshold) {
                // Swiped right, go prev
                goToPrev();
            }
        }
        
        // Initialize the slider
        initSlider();
    }

    // Add cursor trail toggle function
    function setupCursorTrailToggle() {
        // Check if cursor effect should be enabled based on localStorage
        const cursorEffectEnabled = localStorage.getItem('cursorEffectEnabled') !== 'false';
        
        // Apply initial state
        const cursorTrailContainer = document.querySelector('.cursor-trail-container');
        if (cursorTrailContainer) {
            cursorTrailContainer.style.display = cursorEffectEnabled ? 'block' : 'none';
        }
        
        // Create toggle button
        const toggleButton = document.createElement('button');
        toggleButton.className = 'cursor-toggle-btn';
        toggleButton.innerHTML = cursorEffectEnabled ? 
            '<i class="ph-fill ph-cursor"></i>' :
            '<i class="ph-fill ph-cursor-text"></i>';
        toggleButton.setAttribute('title', cursorEffectEnabled ? 'Disable cursor effect' : 'Enable cursor effect');
        toggleButton.style.position = 'fixed';
        toggleButton.style.bottom = '20px';
        toggleButton.style.right = '20px';
        toggleButton.style.zIndex = '10000';
        toggleButton.style.background = 'rgba(0, 0, 0, 0.5)';
        toggleButton.style.border = '1px solid rgba(0, 112, 255, 0.3)';
        toggleButton.style.borderRadius = '50%';
        toggleButton.style.width = '40px';
        toggleButton.style.height = '40px';
        toggleButton.style.display = 'flex';
        toggleButton.style.alignItems = 'center';
        toggleButton.style.justifyContent = 'center';
        toggleButton.style.color = '#fff';
        toggleButton.style.cursor = 'pointer';
        toggleButton.style.fontSize = '18px';
        toggleButton.style.transition = 'all 0.3s ease';
        
        // Add hover effect
        toggleButton.addEventListener('mouseover', () => {
            toggleButton.style.background = 'rgba(0, 112, 255, 0.4)';
            toggleButton.style.transform = 'scale(1.1)';
        });
        
        toggleButton.addEventListener('mouseout', () => {
            toggleButton.style.background = 'rgba(0, 0, 0, 0.5)';
            toggleButton.style.transform = 'scale(1)';
        });
        
        // Toggle functionality
        toggleButton.addEventListener('click', () => {
            const cursorTrailContainer = document.querySelector('.cursor-trail-container');
            if (cursorTrailContainer) {
                const isVisible = cursorTrailContainer.style.display !== 'none';
                cursorTrailContainer.style.display = isVisible ? 'none' : 'block';
                
                // Update button icon
                toggleButton.innerHTML = isVisible ? 
                    '<i class="ph-fill ph-cursor-text"></i>' : 
                    '<i class="ph-fill ph-cursor"></i>';
                toggleButton.setAttribute('title', isVisible ? 'Enable cursor effect' : 'Disable cursor effect');
                
                // Save preference to localStorage
                localStorage.setItem('cursorEffectEnabled', String(!isVisible));
            }
        });
        
        // Add to body
        document.body.appendChild(toggleButton);
    }

    // Call the setup function when the DOM is loaded
    setupCursorTrailToggle();
}); 