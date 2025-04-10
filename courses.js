
// Course data
const coursesData = [
    {
        id: 1,
        title: "Web Development Fundamentals",
        description: "Master HTML, CSS, and JavaScript to build responsive websites from scratch. Learn modern web development practices and create your portfolio.",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
        
        duration: "12 Weeks",
        level: "Beginner",
        students: 1243,
        price: "$499"
    },
    {
        id: 2,
        title: "Advanced JavaScript & Frameworks",
        description: "Take your JavaScript skills to the next level with React, Vue, and Node.js. Build full-stack applications and deploy them to the cloud.",
        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479",
        duration: "14 Weeks",
        level: "Intermediate",
        students: 867,
        price: "$699"
    },
    {
        id: 3,
        title: "Data Science Essentials",
        description: "Learn to analyze data, create visualizations, and derive insights using Python, pandas, and Matplotlib. Build your data science portfolio.",
        image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f",
        duration: "16 Weeks",
        level: "Intermediate",
        students: 956,
        price: "$799"
    },
    {
        id: 4,
        title: "Machine Learning Specialization",
        description: "Dive into machine learning algorithms and apply them to real-world problems. Master scikit-learn, TensorFlow, and deep learning concepts.",
        image: "https://images.unsplash.com/photo-1655720031554-a359bfe7360c",
        duration: "20 Weeks",
        level: "Advanced",
        students: 543,
        price: "$999"
    },
    {
        id: 5,
        title: "UX/UI Design",
        description: "Design intuitive user interfaces and create seamless user experiences for digital products. Master Figma, user research, and prototyping.",
        image: "https://images.unsplash.com/photo-1535378620166-273708d44e4c",
        duration: "10 Weeks",
        level: "Beginner",
        students: 1109,
        price: "$599"
    },
    {
        id: 6,
        title: "Mobile App Development",
        description: "Build native and cross-platform mobile applications for iOS and Android using React Native and Flutter. Publish your apps to app stores.",
        image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e",
        duration: "15 Weeks",
        level: "Intermediate",
        students: 782,
        price: "$749"
    }
];

// DOM elements
const coursesContainer = document.getElementById('courses-container');
const searchInput = document.getElementById('course-search');
const enrollmentSection = document.getElementById('enrollment-section');
const enrollCourseSelect = document.getElementById('enroll-course');
const enrollmentForm = document.getElementById('enrollment-form');

// Create course cards
function renderCourses(courses) {
    coursesContainer.innerHTML = '';
    
    if (courses.length === 0) {
        coursesContainer.innerHTML = `
            <div class="no-courses">
                <p>No courses match your search. Please try different keywords.</p>
            </div>
        `;
        return;
    }
    
    courses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        
        courseCard.innerHTML = `
            <div class="course-image">
                <img src="${course.image}" alt="${course.title}">
            </div>
            <div class="course-content">
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <div class="course-details">
                    <span><i class="fas fa-clock"></i> ${course.duration}</span>
                    <span><i class="fas fa-signal"></i> ${course.level}</span>
                    <span><i class="fas fa-users"></i> ${course.students} students</span>
                </div>
                <div class="course-actions">
                    <div class="course-price">${course.price}</div>
                    <button class="btn btn-primary btn-small enroll-btn" data-course-id="${course.id}">Enroll Now</button>
                </div>
            </div>
        `;
        
        coursesContainer.appendChild(courseCard);
    });
    
    // Add event listeners to enroll buttons
    const enrollButtons = document.querySelectorAll('.enroll-btn');
    enrollButtons.forEach(button => {
        button.addEventListener('click', () => {
            const courseId = button.getAttribute('data-course-id');
            showEnrollmentForm(courseId);
        });
    });
}

// Filter courses based on search input
function filterCourses(searchTerm) {
    const term = searchTerm.toLowerCase().trim();
    
    if (!term) {
        return coursesData;
    }
    
    return coursesData.filter(course => {
        return (
            course.title.toLowerCase().includes(term) ||
            course.description.toLowerCase().includes(term) ||
            course.level.toLowerCase().includes(term)
        );
    });
}

// Show enrollment form and populate course select
function showEnrollmentForm(courseId) {
    // Show enrollment section
    enrollmentSection.style.display = 'block';
    enrollmentSection.scrollIntoView({ behavior: 'smooth' });
    
    // Populate course select options
    enrollCourseSelect.innerHTML = '<option value="" disabled>Choose a course</option>';
    
    coursesData.forEach(course => {
        const option = document.createElement('option');
        option.value = course.id;
        option.textContent = course.title;
        option.selected = course.id === parseInt(courseId);
        enrollCourseSelect.appendChild(option);
    });
}

// Handle enrollment form submission
enrollmentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('enroll-name').value,
        email: document.getElementById('enroll-email').value,
        phone: document.getElementById('enroll-phone').value,
        courseId: document.getElementById('enroll-course').value,
        message: document.getElementById('enroll-message').value
    };
    
    // Save to local storage
    let enrollments = JSON.parse(localStorage.getItem('enrollments')) || [];
    enrollments.push({
        ...formData,
        date: new Date().toISOString(),
        status: 'pending'
    });
    localStorage.setItem('enrollments', JSON.stringify(enrollments));
    
    // Reset form and show success message
    enrollmentForm.reset();
    alert('Thank you for enrolling! We will contact you shortly with next steps.');
    
    // Hide enrollment section
    enrollmentSection.style.display = 'none';
});

// Search functionality
searchInput.addEventListener('input', function() {
    const searchTerm = this.value;
    const filteredCourses = filterCourses(searchTerm);
    renderCourses(filteredCourses);
});

// FAQ accordion functionality
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close all other FAQ items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Render all courses initially
    renderCourses(coursesData);
});
