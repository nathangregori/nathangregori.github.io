document.addEventListener('DOMContentLoaded', () => {
    loadGalleryImages('fencing'); // Show fencing images by default
    initGalleryFilters();
    initLightbox();
    initStripScrolling();
    initGalleryAnimation();
});

// Gallery filtering functionality
function initGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const selectedFilter = button.getAttribute('data-filter');
            if (selectedFilter === 'fencing' || selectedFilter === 'other' || selectedFilter === 'design' || selectedFilter === 'certifications') {
                loadGalleryImages(selectedFilter);
            } else {
                // fallback to default
                loadGalleryImages('fencing');
            }
        });
    });
}

// Lightbox functionality
function initLightbox() {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption').querySelector('h3');
    const closeButton = document.querySelector('.close-lightbox');
    const prevButton = document.querySelector('.lightbox-prev');
    const nextButton = document.querySelector('.lightbox-next');
    const viewButtons = document.querySelectorAll('.view-btn');
    
    let currentIndex = 0;
    const galleryCards = document.querySelectorAll('.gallery-card');
    
    // Open lightbox when clicking view button
    viewButtons.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = index;
            openLightbox(currentIndex);
        });
    });
    
    // Also open lightbox when clicking on gallery card
    galleryCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            currentIndex = index;
            openLightbox(currentIndex);
        });
    });
    
    // Close lightbox when clicking close button
    closeButton.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close lightbox when clicking outside the content
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Navigate to previous image
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + galleryCards.length) % galleryCards.length;
        updateLightbox(currentIndex);
    });
    
    // Navigate to next image
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % galleryCards.length;
        updateLightbox(currentIndex);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        
        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + galleryCards.length) % galleryCards.length;
            updateLightbox(currentIndex);
        }
        
        if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % galleryCards.length;
            updateLightbox(currentIndex);
        }
    });
    
    // Function to open lightbox
    function openLightbox(index) {
        updateLightbox(index);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Function to update lightbox content
    function updateLightbox(index) {
        const card = galleryCards[index];
        const image = card.querySelector('img');
        const title = card.querySelector('h3').textContent;
        
        lightboxImage.src = image.src;
        lightboxCaption.textContent = title;
        
        // Add a loading indicator
        lightboxImage.style.opacity = '0';
        
        // When image loads, fade it in
        lightboxImage.onload = () => {
            lightboxImage.style.transition = 'opacity 0.3s ease';
            lightboxImage.style.opacity = '1';
        };
    }
}

// Strip scrolling
function initStripScrolling() {
    const stripScroll = document.querySelector('.strip-scroll');
    let isDown = false;
    let startX;
    let scrollLeft;
    
    stripScroll.addEventListener('mousedown', (e) => {
        isDown = true;
        stripScroll.style.cursor = 'grabbing';
        startX = e.pageX - stripScroll.offsetLeft;
        scrollLeft = stripScroll.scrollLeft;
    });
    
    stripScroll.addEventListener('mouseleave', () => {
        isDown = false;
        stripScroll.style.cursor = 'grab';
    });
    
    stripScroll.addEventListener('mouseup', () => {
        isDown = false;
        stripScroll.style.cursor = 'grab';
    });
    
    stripScroll.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - stripScroll.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed
        stripScroll.scrollLeft = scrollLeft - walk;
    });
}

// Gallery cards animation
function initGalleryAnimation() {
    const galleryCards = document.querySelectorAll('.gallery-card');
    
    // Set initial state
    galleryCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        // Animate in sequence
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + (index * 100));
    });
    
    // Animate when scrolling into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    galleryCards.forEach(card => {
        observer.observe(card);
    });
}

function loadGalleryImages(category) {
    const galleryGrid = document.querySelector('.gallery-grid');
    galleryGrid.innerHTML = '';
    let images = [];
    if (category === 'fencing') {
        images = [
            'img/fencing/1.JPG','img/fencing/2.JPG','img/fencing/3.jpg','img/fencing/4.jpg','img/fencing/5.jpg','img/fencing/6.jpg','img/fencing/7.jpg','img/fencing/8.png','img/fencing/9.jpg','img/fencing/10.JPG','img/fencing/11.jpg','img/fencing/12.jpg','img/fencing/13.jpg','img/fencing/14.jpg','img/fencing/15.png','img/fencing/16.jpg','img/fencing/17.JPG','img/fencing/18.JPG','img/fencing/19.jpg','img/fencing/20.jpg','img/fencing/21.jpeg'
        ];
    } else if (category === 'other') {
        images = [
            'img/Other/1.jpg','img/Other/2.jpg','img/Other/3.jpeg','img/Other/4.jpg','img/Other/5.jpg','img/Other/6.JPG',
            'img/Other/7.jpg','img/Other/8.jpg','img/Other/9.jpg','img/Other/10.jpg',
            'img/Other/11.JPG','img/Other/12.JPG','img/Other/13.PNG','img/Other/14.jpeg','img/Other/15.jpeg','img/Other/16.jpeg','img/Other/17.jpeg'
        ];
    } else if (category === 'design') {
        images = [
            'img/Design/1.png','img/Design/2.png','img/Design/3.png','img/Design/4.png','img/Design/5.png','img/Design/6.png','img/Design/7.png','img/Design/8.png','img/Design/9.png','img/Design/10.png','img/Design/11.png','img/Design/12.png','img/Design/13.png','img/Design/14.png','img/Design/15.png','img/Design/17.png','img/Design/18.png','img/Design/19.png','img/Design/20.png','img/Design/21.jpg','img/Design/22.jpeg','img/Design/23.png','img/Design/16.jpg'
        ];
    } else if (category === 'certifications') {
        images = [
            'img/certification/1.JPG','img/certification/2.JPG','img/certification/3.JPG','img/certification/4.JPG','img/certification/5.JPG','img/certification/6.jpg','img/certification/7.png','img/certification/8.png','img/certification/9.png','img/certification/10.png','img/certification/11.jpg','img/certification/12.jpg','img/certification/13.jpg','img/certification/14.jpg','img/certification/15.png','img/certification/16.png','img/certification/17.png','img/certification/18.png'
        ];
    }
    images.forEach((src) => {
        const card = document.createElement('div');
        card.className = 'gallery-card';
        card.setAttribute('data-category', category);
        card.innerHTML = `
            <div class="card-image">
                <img src="${src}" alt="">
            </div>
        `;
        galleryGrid.appendChild(card);
    });
    // Add click event to open lightbox for all images
    const galleryCards = document.querySelectorAll('.gallery-card');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    let currentIndex = 0;
    galleryCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            currentIndex = index;
            lightboxImage.src = card.querySelector('img').src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    // Update prev/next for new images
    const prevButton = document.querySelector('.lightbox-prev');
    const nextButton = document.querySelector('.lightbox-next');
    prevButton.onclick = () => {
        currentIndex = (currentIndex - 1 + galleryCards.length) % galleryCards.length;
        lightboxImage.src = galleryCards[currentIndex].querySelector('img').src;
    };
    nextButton.onclick = () => {
        currentIndex = (currentIndex + 1) % galleryCards.length;
        lightboxImage.src = galleryCards[currentIndex].querySelector('img').src;
    };
    // Close button
    const closeButton = document.querySelector('.close-lightbox');
    closeButton.onclick = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    };
    // Click outside to close
    lightbox.onclick = (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    };
    // Keyboard navigation
    document.onkeydown = (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + galleryCards.length) % galleryCards.length;
            lightboxImage.src = galleryCards[currentIndex].querySelector('img').src;
        }
        if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % galleryCards.length;
            lightboxImage.src = galleryCards[currentIndex].querySelector('img').src;
        }
    };
} 