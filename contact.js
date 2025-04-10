
// DOM elements
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

// Form validation and submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Basic validation
    let isValid = true;
    
    if (name === '') {
        markInvalid('name', 'Please enter your name');
        isValid = false;
    } else {
        markValid('name');
    }
    
    if (email === '') {
        markInvalid('email', 'Please enter your email address');
        isValid = false;
    } else if (!isValidEmail(email)) {
        markInvalid('email', 'Please enter a valid email address');
        isValid = false;
    } else {
        markValid('email');
    }
    
    if (subject === '') {
        markInvalid('subject', 'Please enter a subject');
        isValid = false;
    } else {
        markValid('subject');
    }
    
    if (message === '') {
        markInvalid('message', 'Please enter your message');
        isValid = false;
    } else {
        markValid('message');
    }
    
    // If form is valid, process submission
    if (isValid) {
        // Simulate form submission
        setTimeout(() => {
            // Hide form and show success message
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';
            
            // Reset form values
            contactForm.reset();
            
            // Store the message in local storage
            const contactMessage = {
                name,
                email,
                subject,
                message,
                date: new Date().toISOString()
            };
            
            let messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
            messages.push(contactMessage);
            localStorage.setItem('contactMessages', JSON.stringify(messages));
            
        }, 1000);
    }
});

// Helper functions
function markInvalid(fieldId, message) {
    const field = document.getElementById(fieldId);
    field.classList.add('invalid');
    
    // Create error message if it doesn't exist
    let errorElement = field.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains('error-message')) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        field.parentNode.insertBefore(errorElement, field.nextSibling);
    }
    
    errorElement.textContent = message;
}

function markValid(fieldId) {
    const field = document.getElementById(fieldId);
    field.classList.remove('invalid');
    
    // Remove error message if it exists
    const errorElement = field.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.remove();
    }
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}

// Add CSS styles for form validation
document.head.insertAdjacentHTML('beforeend', `
<style>
    .invalid {
        border-color: #e53e3e !important;
        box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1) !important;
    }
    
    .error-message {
        color: #e53e3e;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    }
</style>
`);
