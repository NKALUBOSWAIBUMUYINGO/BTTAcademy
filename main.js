// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate the hamburger icon
    const spans = mobileMenuBtn.querySelectorAll('span');
    spans.forEach(span => span.classList.toggle('active'));
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Testimonial Carousel
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const indicators = document.querySelectorAll('.indicator');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentSlide = 0;
let slideInterval;

// Initialize automatic slideshow
function startSlideshow() {
    slideInterval = setInterval(() => {
        goToNextSlide();
    }, 5000);
}

// Change slide
function showSlide(index) {
    // Hide all slides
    testimonialSlides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Remove active class from all indicators
    indicators.forEach(indicator => {
        indicator.classList.remove('active');
    });
    
    // Show the current slide and activate its indicator
    testimonialSlides[index].classList.add('active');
    indicators[index].classList.add('active');
    
    // Update current slide index
    currentSlide = index;
}

// Next slide function
function goToNextSlide() {
    let nextIndex = currentSlide + 1;
    if (nextIndex >= testimonialSlides.length) {
        nextIndex = 0;
    }
    showSlide(nextIndex);
}

// Previous slide function
function goToPrevSlide() {
    let prevIndex = currentSlide - 1;
    if (prevIndex < 0) {
        prevIndex = testimonialSlides.length - 1;
    }
    showSlide(prevIndex);
}

// Check if testimonial elements exist before adding event listeners
if (testimonialSlides.length > 0 && prevBtn && nextBtn) {
    // Start the slideshow
    startSlideshow();
    
    // Event listeners for manual navigation
    prevBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        goToPrevSlide();
        startSlideshow();
    });
    
    nextBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        goToNextSlide();
        startSlideshow();
    });
    
    // Click on indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            clearInterval(slideInterval);
            showSlide(index);
            startSlideshow();
        });
    });
}

// Dark/Light Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcons = themeToggle.querySelectorAll('i');

// Check for saved theme preference or use device preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.className = savedTheme;
    updateThemeIcons(savedTheme === 'dark-theme');
} else {
    // Check for device preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    if (prefersDarkScheme.matches) {
        body.classList.add('dark-theme');
        body.classList.remove('light-theme');
        updateThemeIcons(true);
    }
}

// Update theme icons based on current theme
function updateThemeIcons(isDark) {
    themeIcons[0].style.display = isDark ? 'none' : 'inline-block';
    themeIcons[1].style.display = isDark ? 'inline-block' : 'none';
}

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    const isDark = body.classList.contains('light-theme');
    body.classList.toggle('light-theme');
    body.classList.toggle('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark-theme' : 'light-theme');
    updateThemeIcons(isDark);
});
