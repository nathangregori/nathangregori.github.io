document.addEventListener('DOMContentLoaded', () => {
    // Initialize project filtering
    initProjectFiltering();
    
    // Initialize flip cards
    initFlipCards();
    
    // Initialize expandable cards
    initExpandableCards();
    
    // Initialize timeline points
    initTimelinePoints();
    
    // Initialize tool heatmap
    initToolHeatmap();
});

// Project Category Filtering
function initProjectFiltering() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const projectSections = document.querySelectorAll('.projects-grid-section');
    
    // Show the Finance section by default (first section)
    projectSections[0].style.display = 'block';
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const selectedCategory = button.dataset.category;
            
            // Hide all sections first
            projectSections.forEach(section => {
                section.style.display = 'none';
            });
            
            // Show appropriate section based on category
            if (selectedCategory === 'finance') {
                projectSections[0].style.display = 'block';
            } else if (selectedCategory === 'individual') {
                projectSections[1].style.display = 'block';
            } else if (selectedCategory === 'research') {
                projectSections[2].style.display = 'block';
            } else if (selectedCategory === 'design') {
                projectSections[3].style.display = 'block';
            }
            
            // Get cards in the visible section
            const visibleSection = document.querySelector('.projects-grid-section[style*="display: block"]');
            const projectCards = visibleSection.querySelectorAll('.project-card');
            
            // Animate cards with staggered delay
            projectCards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50 + (index * 100));
            });
        });
    });
    
    // Initial animation for the first (Finance) section
    const financeCards = projectSections[0].querySelectorAll('.project-card');
    financeCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + (index * 100));
    });
}

// Initialize Flip Cards
function initFlipCards() {
    const flipCards = document.querySelectorAll('.flip-card');
    
    flipCards.forEach(card => {
        // Make sure all flip cards have proper dimensions
        if(getComputedStyle(card).height === '0px' || getComputedStyle(card).display === 'none') {
            card.style.height = '350px';
            card.style.display = 'block';
        }
        
        // Add click event for mobile devices
        card.addEventListener('click', function() {
            const cardInner = this.querySelector('.card-inner');
            if (cardInner.style.transform === 'rotateY(180deg)') {
                cardInner.style.transform = 'rotateY(0deg)';
            } else {
                cardInner.style.transform = 'rotateY(180deg)';
            }
        });
    });
}

// Expandable Cards
function initExpandableCards() {
    const expandButtons = document.querySelectorAll('.expand-btn');
    
    expandButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering flip card click
            
            // Find closest expandable content
            const card = button.closest('.project-card');
            if (card) {
                card.classList.toggle('expanded');
                
                if (card.classList.contains('expanded')) {
                    button.innerHTML = 'Collapse <i class="ph-light ph-caret-up"></i>';
                    
                    // When expanded, make sure content is visible
                    const cardText = card.querySelector('.card-back p');
                    if (cardText) {
                        cardText.style.webkitLineClamp = 'unset';
                        cardText.style.overflow = 'visible';
                        cardText.style.display = 'block';
                        
                        // Ensure the card shows the full content
                        const cardBack = card.querySelector('.card-back');
                        if (cardBack) {
                            cardBack.style.overflowY = 'auto';
                        }
                    }
                } else {
                    button.innerHTML = 'Expand <i class="ph-light ph-caret-down"></i>';
                    
                    // Reset to collapsed state
                    const cardText = card.querySelector('.card-back p');
                    if (cardText) {
                        cardText.style.webkitLineClamp = '4';
                        cardText.style.overflow = 'hidden';
                        cardText.style.display = '-webkit-box';
                        
                        // Reset card overflow
                        const cardBack = card.querySelector('.card-back');
                        if (cardBack) {
                            cardBack.style.overflowY = 'hidden';
                        }
                    }
                }
            }
        });
    });
}

// Timeline Points
function initTimelinePoints() {
    const timelinePoints = document.querySelectorAll('.timeline-point');
    
    timelinePoints.forEach(point => {
        point.addEventListener('click', () => {
            // Remove active class from all points
            timelinePoints.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked point
            point.classList.add('active');
        });
    });
}

// Tool Heatmap
function initToolHeatmap() {
    const heatmapItems = document.querySelectorAll('.heatmap-item');
    
    heatmapItems.forEach(item => {
        item.addEventListener('click', () => {
            const tool = item.textContent.trim();
            
            // You could filter projects by tool here
            // For now, let's just add a pulse animation
            
            item.classList.add('pulse');
            setTimeout(() => {
                item.classList.remove('pulse');
            }, 1000);
        });
    });
} 