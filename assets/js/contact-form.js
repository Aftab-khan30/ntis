// NEXA TECH IT SOLUTIONS - Contact Form Handler

(function () {
    'use strict';

    function handleFormSubmit(e) {
        e.preventDefault();

        var form       = e.target;
        var msgBox     = document.getElementById('formMessage');
        var submitBtn  = form.querySelector('.submit-btn');
        var origLabel  = submitBtn.innerHTML;

        var formData = {
            name:    document.getElementById('name').value.trim(),
            email:   document.getElementById('email').value.trim(),
            phone:   document.getElementById('phone').value.trim(),
            service: document.getElementById('service').value,
            message: document.getElementById('message').value.trim()
        };

        if (!validate(formData, msgBox)) return;

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending...</span>';

        fetch('send-email.php', {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify(formData)
        })
        .then(function (res) { return res.json(); })
        .then(function () {
            showMsg(msgBox, '✓ Message Sent! We will contact you soon.', 'success');
            form.reset();
        })
        .catch(function () {
            showMsg(msgBox, '✗ Something went wrong. Please try again.', 'error');
        })
        .finally(function () {
            submitBtn.disabled = false;
            submitBtn.innerHTML = origLabel;
        });
    }

    function validate(data, msgBox) {
        if (!data.name || data.name.length < 2) {
            showMsg(msgBox, 'Please enter your full name (at least 2 characters).', 'error');
            return false;
        }
        if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            showMsg(msgBox, 'Please enter a valid email address.', 'error');
            return false;
        }
        if (!data.message || data.message.length < 10) {
            showMsg(msgBox, 'Please enter a message (at least 10 characters).', 'error');
            return false;
        }
        if (data.phone && !/^[\d\s\-\+\(\)]{10,}$/.test(data.phone)) {
            showMsg(msgBox, 'Please enter a valid phone number.', 'error');
            return false;
        }
        return true;
    }

    function showMsg(el, text, type) {
        el.className = 'form-message ' + type;
        el.textContent = text;
        el.style.display = 'block';
        if (type === 'success') {
            setTimeout(function () {
                el.style.display = 'none';
            }, 8000);
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        var form = document.getElementById('contactForm');
        if (form) form.addEventListener('submit', handleFormSubmit);
    });

}());
