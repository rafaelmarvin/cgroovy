// Welcome text in different languages
const welcomeTexts = [
    'Welcome',      // English
    'ようこそ',        // Japanese
    'Selamat Datang', // Indonesian
    '환영합니다'        // Korean
];

let currentWelcomeIndex = 0;
let currentSlideIndex = 0;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Start welcome text rotation
    startWelcomeTextRotation();
    
    // Start background slideshow
    startBackgroundSlideshow();
    
    // Handle form submission
    handleFormSubmission();

});

// Welcome text rotation
function startWelcomeTextRotation() {
    const welcomeElement = document.getElementById('welcome-text');
    
    setInterval(() => {
        currentWelcomeIndex = (currentWelcomeIndex + 1) % welcomeTexts.length;
        
        // Fade out
        welcomeElement.style.opacity = '0';
        welcomeElement.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            welcomeElement.textContent = welcomeTexts[currentWelcomeIndex];
            // Fade in
            welcomeElement.style.opacity = '1';
            welcomeElement.style.transform = 'translateY(0)';
        }, 250);
        
    }, 3000); // Change every 3 seconds
}

// Background slideshow
function startBackgroundSlideshow() {
    const slides = document.querySelectorAll('.slide');
    
    setInterval(() => {
        slides[currentSlideIndex].classList.remove('active');
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        slides[currentSlideIndex].classList.add('active');
        
    }, 4000); // Change every 4 seconds
}

// Form submission handling
function handleFormSubmission() {
    const form = document.getElementById('signupForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const userData = {
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password'),
            age: formData.get('age'),
            gender: formData.get('gender')
        };
        
        // Validate form
        if (validateForm(userData)) {
            alert(`Welcome to C'Groovy, ${userData.username}! Your account has been created successfully.`);
            
            // Reset form
            document.getElementById('signupForm').reset();
        }
    });
}

// Form validation
function validateForm(userData) {
    const errors = [];
    
    // Username validation
    if (!userData.username || userData.username.length < 3) {
        errors.push('Username must be at least 3 characters long');
    }
    
    // Email validation
    const email = document.getElementById('email').value
     if(!email.endsWith('@gmail.com')){
            errors.push('email', 'Email must ended with @gmail.com');
        }
    
    // Password validation
    if (!userData.password || userData.password.length < 6) {
        errors.push('Password must be at least 6 characters long');
    }
    
    // Age validation
    const age = parseInt(userData.age);
    if (!age || age < 13 || age > 120) {
        errors.push('Please enter a valid age between 13 and 120');
    }
    
    // Gender validation
    if (!userData.gender) {
        errors.push('Please select a gender');
    }
    
    // Display errors if any
    if (errors.length > 0) {
        alert('Please fix the following errors:\n\n' + errors.join('\n'));
        return false;
    }
    
    return true;
}
