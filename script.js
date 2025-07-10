
// Variables for carousel functionality
let currentSlide = 0;
let totalSlides = 0;

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
    initializeCarousel();
    initializeEventListeners();
    initializeObserver();
});

// Initialize gallery section
function initializeGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    
    if (galleryImages && galleryGrid) {
        galleryImages.forEach((image, index) => {
            const imageCard = createImageCard(image, index);
            galleryGrid.appendChild(imageCard);
        });
    }
}

// Initialize carousel section
function initializeCarousel() {
    const carouselTrack = document.getElementById('carouselTrack');
    
    if (carouselImages && carouselTrack) {
        totalSlides = carouselImages.length;
        
        carouselImages.forEach(image => {
            const slide = createCarouselSlide(image);
            carouselTrack.appendChild(slide);
        });
        
        // Start auto-advance carousel
        setInterval(nextSlide, 5000);
    }
}

// Create image card element
function createImageCard(image, index) {
    const card = document.createElement('div');
    card.className = 'image-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
        <img src="${image.src}" alt="${image.title}" class="image-card-img">
        <div class="image-card-overlay"></div>
        <div class="image-card-content">
            <span class="image-card-category">${image.category}</span>
            <h3 class="image-card-title">${image.title}</h3>
        </div>
    `;
    
    return card;
}

// Create carousel slide element
function createCarouselSlide(image) {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    
    slide.innerHTML = `
        <img src="${image.src}" alt="${image.title}">
        <div class="carousel-slide-overlay"></div>
        <div class="carousel-slide-content">
            <span class="image-card-category">${image.category}</span>
            <h3 class="image-card-title">${image.title}</h3>
        </div>
    `;
    
    return slide;
}

// Mobile Menu Functions
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.remove('active');
}

// Carousel Functions
function updateCarousel() {
    const track = document.getElementById('carouselTrack');
    if (track) {
        const translateX = -currentSlide * 100;
        track.style.transform = `translateX(${translateX}%)`;
    }
}

function nextSlide() {
    if (totalSlides > 0) {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }
}

function previousSlide() {
    if (totalSlides > 0) {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }
}

// Initialize event listeners
function initializeEventListeners() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        
        if (mobileMenu && mobileMenuBtn &&
            !mobileMenu.contains(event.target) &&
            !mobileMenuBtn.contains(event.target)) {
            mobileMenu.classList.remove('active');
        }
    });
}

// Initialize intersection observer for animations
function initializeObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    // Observe all image cards for animations
    setTimeout(() => {
        document.querySelectorAll('.image-card').forEach(card => {
            observer.observe(card);
        });
    }, 100);
}
