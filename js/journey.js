document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded, initializing journey components");
    setupPathOfProgressFilter();
    initCommitmentBars();
    initAchievementPills();
    initStatementUnderline();
    addEducationalLinks();
    console.log("All journey components initialized");
});

// Function to add "Learn more" links to educational timeline cards
function addEducationalLinks() {
    const educationCards = document.querySelectorAll('#education .content-card');
    
    educationCards.forEach((card) => {
        if (!card.querySelector('.timeline-link')) {
            const link = document.createElement('a');
            link.className = 'timeline-link';
            link.href = '#';
            link.innerHTML = 'Learn more <i class="ph-fill ph-arrow-right"></i>';
            card.appendChild(link);
        }
    });
}

// Simple straightforward category filtering for Path of Progress
function setupPathOfProgressFilter() {
    console.log("Setting up Path of Progress filtering");
    
    // Make sure timeline line is visible
    const timelineLine = document.querySelector('.professional-timeline .timeline-line');
    if (timelineLine) {
        timelineLine.style.opacity = '1';
        timelineLine.style.visibility = 'visible';
    }
    
    // Handle filter button clicks
    document.getElementById('filter-personal').addEventListener('click', function() {
        filterTimeline('personal');
    });
    
    document.getElementById('filter-sports').addEventListener('click', function() {
        filterTimeline('sports');
    });
    
    document.getElementById('filter-music').addEventListener('click', function() {
        filterTimeline('music');
    });
    
    document.getElementById('filter-jobs').addEventListener('click', function() {
        filterTimeline('jobs');
    });
    
    document.getElementById('filter-academic').addEventListener('click', function() {
        filterTimeline('academic');
    });
    
    // Active default filter
    filterTimeline('personal');
}

function filterTimeline(category) {
    console.log(`Filtering timeline to category: ${category}`);
    
    // Update active button
    const allButtons = document.querySelectorAll('.filter-chip');
    allButtons.forEach(btn => btn.classList.remove('active'));
    document.getElementById(`filter-${category}`).classList.add('active');
    
    // Get all timeline blocks
    const allBlocks = document.querySelectorAll('.timeline-block');
    
    // Hide all blocks first
    allBlocks.forEach(block => {
        block.style.display = 'none';
    });
    
    // Show only blocks matching selected category
    const matchingBlocks = document.querySelectorAll(`.timeline-block[data-category="${category}"]`);
    console.log(`Found ${matchingBlocks.length} matching blocks`);
    
    matchingBlocks.forEach(block => {
        block.style.display = 'flex';
        
        // Restore left/right positioning
        if (block.classList.contains('left')) {
            block.style.paddingRight = '52%';
            block.style.justifyContent = 'flex-start';
        } else if (block.classList.contains('right')) {
            block.style.paddingLeft = '52%';
            block.style.justifyContent = 'flex-end';
        }
    });
}

// Animate commitment bars on scroll
function initCommitmentBars() {
    const commitmentBars = document.querySelectorAll('.bar-fill');
    let animated = false;
    
    const animateBars = () => {
        if (animated) return;
        
        const commitmentSection = document.querySelector('.commitment-section');
        if (!commitmentSection) return;
        
        const rect = commitmentSection.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        // If commitment section is in viewport
        if (rect.top <= windowHeight * 0.8 && rect.bottom >= 0) {
            commitmentBars.forEach(bar => {
                const width = bar.getAttribute('data-years') * 10 + '%';
                
                // Delay each bar animation slightly
                setTimeout(() => {
                    bar.style.width = width;
                }, 100 * Array.from(commitmentBars).indexOf(bar));
            });
            
            animated = true;
            window.removeEventListener('scroll', animateBars);
        }
    };
    
    // Initial check
    animateBars();
    
    // Check on scroll
    window.addEventListener('scroll', animateBars);
}

// Achievement Pill animations
function initAchievementPills() {
    const pills = document.querySelectorAll('.achievement-pill');
    
    pills.forEach(pill => {
        // Stagger the initial appearance
        setTimeout(() => {
            pill.style.opacity = '1';
        }, Math.random() * 1000);
        
        // Add interactive hover effects
        pill.addEventListener('mouseover', function() {
            // Random translation animation
            const randomX = (Math.random() - 0.5) * 10;
            const randomY = (Math.random() - 0.5) * 10;
            this.style.transform = `translateY(-5px) translateX(${randomX}px) scale(1.05)`;
            
            // Add glow effect
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 112, 255, 0.5)';
        });
        
        pill.addEventListener('mouseout', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
        
        // Click effect - show a ripple
        pill.addEventListener('click', function(e) {
            // Create ripple element
            const ripple = document.createElement('span');
            ripple.className = 'pill-ripple';
            this.appendChild(ripple);
            
            // Position the ripple where clicked
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size/2}px`;
            ripple.style.top = `${e.clientY - rect.top - size/2}px`;
            
            // Remove ripple after animation completes
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .achievement-pill {
            position: relative;
            overflow: hidden;
            opacity: 0;
            transition: opacity 0.5s ease, transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .pill-ripple {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.4);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Animate the statement underline
function initStatementUnderline() {
    const underline = document.querySelector('.statement-underline');
    if (!underline) return;
    
    const checkInView = () => {
        const rect = underline.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        // If underline is in viewport
        if (rect.top <= windowHeight * 0.8 && rect.bottom >= 0) {
            underline.classList.add('animate');
            window.removeEventListener('scroll', checkInView);
        }
    };
    
    // Initial check
    checkInView();
    
    // Check on scroll
    window.addEventListener('scroll', checkInView);
} 