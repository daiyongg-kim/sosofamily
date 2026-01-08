/**
 * SoSo Family - Application Support
 * Main JavaScript
 */

// ==========================================
// EmailJS Configuration
// ==========================================
const EMAIL_CONFIG = {
    serviceId: 'service_7y4umo7',
    templateId: 'template_9eyeky4',
    publicKey: 'SDwrh_xAZJhtQ6nsv',
    toEmail: 'sosofamily.ca@gmail.com'
};

// ==========================================
// EmailJS Initialization
// ==========================================
function initializeEmailJS() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAIL_CONFIG.publicKey);
        console.log('EmailJS initialized successfully');
    } else {
        console.log('Waiting for EmailJS to load...');
        setTimeout(initializeEmailJS, 200);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeEmailJS();
    setupFormValidation();
});

// ==========================================
// Form Validation
// ==========================================
function setupFormValidation() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const inputs = form.querySelectorAll('.form-input[required]');

    inputs.forEach(input => {
        // Validate on blur
        input.addEventListener('blur', () => validateInput(input));

        // Clear error on focus
        input.addEventListener('focus', () => {
            input.parentElement.classList.remove('has-error');
            input.classList.remove('invalid');
        });

        // Real-time validation for email
        if (input.type === 'email') {
            input.addEventListener('input', () => {
                if (input.value && isValidEmail(input.value)) {
                    input.classList.add('valid');
                    input.classList.remove('invalid');
                } else if (input.value) {
                    input.classList.remove('valid');
                }
            });
        }
    });
}

function validateInput(input) {
    const group = input.parentElement;
    let isValid = true;

    if (input.required && !input.value.trim()) {
        isValid = false;
    }

    if (input.type === 'email' && input.value && !isValidEmail(input.value)) {
        isValid = false;
    }

    if (!isValid) {
        group.classList.add('has-error');
        input.classList.add('invalid');
        input.classList.remove('valid');
    } else {
        group.classList.remove('has-error');
        input.classList.remove('invalid');
        if (input.value) {
            input.classList.add('valid');
        }
    }

    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateForm(form) {
    const inputs = form.querySelectorAll('.form-input[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!validateInput(input)) {
            isValid = false;
        }
    });

    return isValid;
}

// ==========================================
// Form Submission
// ==========================================
async function submitContactForm(event) {
    event.preventDefault();

    const form = event.target;
    const button = document.getElementById('submit-btn');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');

    // Hide previous messages
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';

    // Validate form
    if (!validateForm(form)) {
        console.log('Form validation failed');
        return;
    }

    // Get form data
    const formData = new FormData(form);

    // Update button state to loading
    const originalButtonText = button.innerHTML;
    button.innerHTML = '<span class="btn-text">Sending...</span>';
    button.classList.add('loading');
    button.disabled = true;

    try {
        // Check if EmailJS is configured
        if (EMAIL_CONFIG.serviceId === 'YOUR_SERVICE_ID') {
            // Demo mode - simulate success for testing
            console.log('EmailJS not configured - running in demo mode');
            console.log('Form data:', Object.fromEntries(formData));

            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Show success (demo)
            showSuccess(form, button, successMessage, originalButtonText);
            console.log('Demo: Email would be sent to', EMAIL_CONFIG.toEmail);
            return;
        }

        // Check if EmailJS is loaded
        if (typeof emailjs === 'undefined') {
            throw new Error('EmailJS library not loaded');
        }

        // Prepare template parameters
        const templateParams = {
            from_name: formData.get('name'),
            from_email: formData.get('email'),
            subject: formData.get('subject') || 'Contact Form Submission',
            message: formData.get('message'),
            to_email: EMAIL_CONFIG.toEmail,
            request_date: new Date().toLocaleDateString(),
            request_time: new Date().toLocaleTimeString()
        };

        console.log('Sending email with params:', templateParams);

        // Send email via EmailJS
        const response = await emailjs.send(
            EMAIL_CONFIG.serviceId,
            EMAIL_CONFIG.templateId,
            templateParams,
            EMAIL_CONFIG.publicKey
        );

        console.log('EmailJS Response:', response);
        showSuccess(form, button, successMessage, originalButtonText);

    } catch (error) {
        console.error('Email sending failed:', error);
        showError(button, errorMessage, originalButtonText, error);
    }
}

function showSuccess(form, button, successMessage, originalButtonText) {
    // Update button
    button.classList.remove('loading');
    button.classList.add('success');
    button.innerHTML = '<span class="btn-text">Message Sent!</span> <span class="btn-icon">&#10004;</span>';

    // Show success message
    successMessage.style.display = 'flex';
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Reset form
    form.reset();

    // Clear validation states
    form.querySelectorAll('.form-input').forEach(input => {
        input.classList.remove('valid', 'invalid');
    });

    // Reset button after delay
    setTimeout(() => {
        button.innerHTML = originalButtonText;
        button.classList.remove('success');
        button.disabled = false;
        successMessage.style.display = 'none';
    }, 5000);
}

function showError(button, errorMessage, originalButtonText, error) {
    // Reset button
    button.classList.remove('loading');
    button.innerHTML = originalButtonText;
    button.disabled = false;

    // Show error message
    errorMessage.style.display = 'flex';
    errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Log detailed error info
    console.error('Error details:', {
        message: error.message,
        text: error.text,
        status: error.status,
        name: error.name
    });

    // Hide error after delay
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 8000);
}

// ==========================================
// Smooth Scroll for Navigation
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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
