// NEXA TECH IT SOLUTIONS - Clean JavaScript

(function() {
    'use strict';
    
    // DOM Elements
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const servicesDropdown = document.getElementById('servicesDropdown');
    
    // Initialize
    document.addEventListener('DOMContentLoaded', init);
    
    function init() {
        setupNavbar();
        setupMobileMenu();
        setupDropdown();
    }
    
    // Navbar scroll effect
    function setupNavbar() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // Mobile menu toggle
    function setupMobileMenu() {
        if (!hamburger || !navLinks) return;
        
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
        
        // Close menu when clicking a link
        const links = navLinks.querySelectorAll('.nav-link:not(.dropdown-toggle)');
        links.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
    
    // Dropdown functionality
    function setupDropdown() {
        if (!servicesDropdown) {
            console.log('Services dropdown not found');
            return;
        }
        
        const dropdownToggle = servicesDropdown.querySelector('.dropdown-toggle');
        const dropdownMenu = servicesDropdown.querySelector('.dropdown-menu');
        
        if (!dropdownToggle) {
            console.log('Dropdown toggle not found');
            return;
        }
        
        if (!dropdownMenu) {
            console.log('Dropdown menu not found');
            return;
        }
        
        console.log('Dropdown setup complete');
        
        // Toggle dropdown on click
        dropdownToggle.addEventListener('click', function(e) {
            // Only prevent default and toggle on mobile
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                
                // Toggle active class
                const isActive = servicesDropdown.classList.contains('active');
                servicesDropdown.classList.toggle('active');
                
                console.log('Dropdown clicked. Now active:', !isActive);
                console.log('Dropdown menu display:', window.getComputedStyle(dropdownMenu).display);
            }
        });
        
        // Close dropdown when clicking outside (mobile only)
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                if (!servicesDropdown.contains(e.target)) {
                    servicesDropdown.classList.remove('active');
                }
            }
        });
        
        // Close dropdown and menu when clicking a dropdown item
        const dropdownItems = servicesDropdown.querySelectorAll('.dropdown-item');
        console.log('Found dropdown items:', dropdownItems.length);
        
        dropdownItems.forEach(function(item) {
            item.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    console.log('Dropdown item clicked');
                    // Allow navigation but close menus
                    servicesDropdown.classList.remove('active');
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            });
        });
        
        // Handle window resize - close dropdown when switching to desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                servicesDropdown.classList.remove('active');
            }
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact form is now handled by contact-form.js
    // This keeps the main.js clean and modular
    
})();
