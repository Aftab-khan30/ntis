// NEXA TECH IT SOLUTIONS - Contact Form Handler
// Using EmailJS for email delivery (no backend required)

(function() {
    'use strict';
    
    // EmailJS Configuration
    // IMPORTANT: Replace these with your actual EmailJS credentials
    // Sign up at https://www.emailjs.com/ to get your credentials
    const EMAILJS_CONFIG = {
        publicKey: 'YOUR_PUBLIC_KEY',  // Replace with your EmailJS public key
        serviceId: 'YOUR_SERVICE_ID',   // Replace with your EmailJS service ID
        templateId: 'YOUR_TEMPLATE_ID'  // Replace with your EmailJS template ID
    };
    
    // Initialize EmailJS
    function initEmailJS() {
        if (typeof emailjs !== 'undefined') {
            emailjs.init(EMAILJS_CONFIG.publicKey);
            console.log('EmailJS initialized successfully');
        } else {
            console.error('EmailJS library not loaded');
        }
    }
    
    // Form submission handler
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const formMessage = document.getElementById('formMessage');
        const submitBtn = form.querySelector('.submit-btn');
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            service: document.getElementById('service').value,
            message: document.getElementById('message').value.trim()
        };
        
        // Validate form
        if (!validateForm(formData, formMessage)) {
            return;
        }
        
        // Disable button and show loading state
        submitBtn.disabled = true;
        const originalBtnContent = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span>';
        
        // Check if EmailJS is configured
        if (EMAILJS_CONFIG.publicKey === 'YOUR_PUBLIC_KEY') {
            // Demo mode - simulate success
            simulateFormSubmission(form, formMessage, submitBtn, originalBtnContent, formData);
        } else {
            // Real EmailJS submission
            sendEmailViaEmailJS(form, formMessage, submitBtn, originalBtnContent, formData);
        }
    }
    
    // Validate form data
    function validateForm(data, messageElement) {
        // Check required fields
        if (!data.name || data.name.length < 2) {
            showMessage(messageElement, 'Please enter your full name (at least 2 characters)', 'error');
            return false;
        }
        
        if (!data.email || !isValidEmail(data.email)) {
            showMessage(messageElement, 'Please enter a valid email address', 'error');
            return false;
        }
        
        if (!data.message || data.message.length < 10) {
            showMessage(messageElement, 'Please enter a message (at least 10 characters)', 'error');
            return false;
        }
        
        // Validate phone if provided
        if (data.phone && !isValidPhone(data.phone)) {
            showMessage(messageElement, 'Please enter a valid phone number', 'error');
            return false;
        }
        
        return true;
    }
    
    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Phone validation (supports various formats)
    function isValidPhone(phone) {
        const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
        return phoneRegex.test(phone);
    }
    
    // Send email via EmailJS
    function sendEmailViaEmailJS(form, messageElement, submitBtn, originalBtnContent, formData) {
        emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.templateId,
            {
                from_name: formData.name,
                from_email: formData.email,
                phone: formData.phone || 'Not provided',
                service: formData.service || 'Not specified',
                message: formData.message,
                to_name: 'NEXA TECH IT SOLUTIONS'
            }
        ).then(
            function(response) {
                console.log('Email sent successfully:', response);
                showMessage(
                    messageElement,
                    '✓ Thank you! Your message has been sent successfully. We will contact you soon.',
                    'success'
                );
                form.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
            },
            function(error) {
                console.error('Email sending failed:', error);
                showMessage(
                    messageElement,
                    '✗ Sorry, there was an error sending your message. Please try again or contact us directly.',
                    'error'
                );
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
            }
        );
    }
    
    // Simulate form submission (demo mode)
    function simulateFormSubmission(form, messageElement, submitBtn, originalBtnContent, formData) {
        // Log form data to console for testing
        console.log('=== CONTACT FORM SUBMISSION (DEMO MODE) ===');
        console.log('Name:', formData.name);
        console.log('Email:', formData.email);
        console.log('Phone:', formData.phone || 'Not provided');
        console.log('Service:', formData.service || 'Not specified');
        console.log('Message:', formData.message);
        console.log('==========================================');
        
        // Simulate network delay
        setTimeout(() => {
            showMessage(
                messageElement,
                '✓ SUCCESS! Your message has been received (Demo Mode). Check the browser console for details.',
                'success'
            );
            form.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnContent;
            
            // Show setup instructions
            console.log('\n📧 TO ENABLE REAL EMAIL SENDING:');
            console.log('1. Sign up at https://www.emailjs.com/');
            console.log('2. Create an email service and template');
            console.log('3. Replace the credentials in assets/js/contact-form.js');
            console.log('4. Update EMAILJS_CONFIG with your actual keys\n');
        }, 1500);
    }
    
    // Show message to user
    function showMessage(element, message, type) {
        element.className = `form-message ${type}`;
        element.textContent = message;
        element.style.display = 'block';
        
        // Auto-hide success messages after 8 seconds
        if (type === 'success') {
            setTimeout(() => {
                element.style.display = 'none';
                element.className = 'form-message';
                element.textContent = '';
            }, 8000);
        }
    }
    
    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            // Initialize EmailJS
            initEmailJS();
            
            // Attach form submit handler
            contactForm.addEventListener('submit', handleFormSubmit);
            
            console.log('Contact form initialized successfully');
            
            // Show setup status
            if (EMAILJS_CONFIG.publicKey === 'YOUR_PUBLIC_KEY') {
                console.warn('⚠️ Contact form is in DEMO MODE. Configure EmailJS to enable real email sending.');
            }
        }
    });
    
})();
