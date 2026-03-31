// Mobile menu toggle with accessibility improvements
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navbarUl = document.querySelector('.navbar ul');
    
    // Function to update aria-expanded attribute
    function updateAriaExpanded(isExpanded) {
        if (mobileToggle) {
            mobileToggle.setAttribute('aria-expanded', isExpanded);
        }
    }

    // Function to show mobile menu
    function showMenu() {
        navbarUl.style.display = 'flex';
        navbarUl.style.flexDirection = 'column';
        navbarUl.style.position = 'absolute';
        navbarUl.style.top = '100%';
        navbarUl.style.left = '0';
        navbarUl.style.width = '100%';
        navbarUl.style.backgroundColor = 'white';
        navbarUl.style.padding = '20px';
        navbarUl.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        navbarUl.style.zIndex = '1000';
        updateAriaExpanded('true');
    }

    // Function to hide mobile menu
    function hideMenu() {
        navbarUl.style.display = 'none';
        updateAriaExpanded('false');
    }

    // Function to toggle menu
    function toggleMenu() {
        if (navbarUl.style.display === 'flex') {
            hideMenu();
        } else {
            showMenu();
        }
    }

    // Initialize menu state based on window width
    function initMenuState() {
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            // On mobile, menu should be hidden by default (CSS already hides it)
            // Ensure inline styles are cleared
            navbarUl.removeAttribute('style');
            // CSS media query hides .navbar ul, but we need to set display none
            navbarUl.style.display = 'none';
            updateAriaExpanded('false');
        } else {
            // On desktop, ensure menu is visible and reset inline styles
            navbarUl.removeAttribute('style');
            updateAriaExpanded('false');
        }
    }

    // Set up mobile toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMenu);
        // Close menu when clicking a nav link (for mobile)
        const navLinks = document.querySelectorAll('.navbar ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    hideMenu();
                }
            });
        });
    }

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            initMenuState();
        }, 250);
    });

    // Initialize menu state on load
    initMenuState();

    // Smooth scroll for anchor links (excluding # links)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const targetElement = document.querySelector(href);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to current page link (simplified)
    // Since all links are "#", this is not functional; we'll keep but note
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar ul li a');
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
});