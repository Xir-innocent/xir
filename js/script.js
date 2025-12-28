// js/script.js

document.addEventListener('DOMContentLoaded', function () {

    // ==================== Mobile Menu Toggle ====================
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navList = document.querySelector('.nav-list');

    mobileToggle.addEventListener('click', function () {
        navList.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            mobileToggle.classList.remove('active');
        });
    });

    // ==================== FAQ Accordion ====================
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function () {
            const body = this.nextElementSibling;
            const isOpen = body.classList.contains('open');

            // Close all others
            document.querySelectorAll('.accordion-body').forEach(b => {
                b.classList.remove('open');
            });

            // Open current if it was closed
            if (!isOpen) {
                body.classList.add('open');
            }
        });
    });

    // ==================== Solar Calculator ====================
    const calculatorForm = document.getElementById('solarCalculator');
    const resultBox = document.getElementById('calculatorResult');

    calculatorForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const bill = parseFloat(document.getElementById('bill').value);
        const location = document.getElementById('location').value;
        const type = document.getElementById('type').value;

        if (isNaN(bill) || bill <= 0) {
            resultBox.innerHTML = '<p style="color:red;">Please enter a valid monthly bill amount.</p>';
            resultBox.style.display = 'block';
            return;
        }

        // Simple estimation logic (you can refine this later)
        // Average daily consumption in kWh = (monthly bill / electricity tariff)
        // Nigeria average tariff ~₦65-₦70 per kWh (2025 estimate)
        const tariffPerKwh = 70;
        const dailyKwh = (bill / tariffPerKwh).toFixed(1);

        // System size needed (assuming 5 peak sun hours in Nigeria)
        const systemSizeKw = (dailyKwh / 5).toFixed(1);

        // Estimated annual savings (90% offset)
        const annualSavings = (bill * 12 * 0.9).toLocaleString();

        // Location-based sunlight adjustment (simplified)
        let sunlightNote = '';
        if (location === 'lagos') sunlightNote = 'Good solar potential in Lagos (avg. 4.8 sun hours).';
        else if (location === 'abuja') sunlightNote = 'Excellent northern sunlight (avg. 5.5+ sun hours).';
        else sunlightNote = 'Solar viability varies — we recommend a site survey.';

        // Property type note
        let typeNote = '';
        if (type === 'home') typeNote = 'Perfect for rooftop residential systems.';
        else if (type === 'business') typeNote = 'Ideal for commercial hybrid or grid-tie setups.';
        else typeNote = 'Custom large-scale solutions available.';

        // Display result
        resultBox.innerHTML = `
            <h3 style="color: var(--primary-purple); margin-bottom: 15px;">Your Solar Estimate</h3>
            <p><strong>Daily Energy Use:</strong> ~${dailyKwh} kWh</p>
            <p><strong>Recommended System Size:</strong> ${systemSizeKw} kW</p>
            <p><strong>Estimated Annual Savings:</strong> ₦${annualSavings}</p>
            <p><em>${sunlightNote}</em></p>
            <p><em>${typeNote}</em></p>
            <p style="margin-top: 20px; font-weight: 600;">
                This is an estimate. Contact us for a free accurate quote!
            </p>
        `;
        resultBox.style.display = 'block';

        // Smooth scroll to result
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    // Contact Form → WhatsApp Integration
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const phone = this.phone.value.trim();
    const message = this.message.value.trim();

    // Basic validation
    if (!name || !email || !phone || !message) {
        alert('Please fill in all fields before submitting.');
        return;
    }

    // Your WhatsApp number (without + or spaces)
    const whatsappNumber = '2348057015145';  // Change to 2349066686980 if preferred

    // Build the message
    const text = encodeURIComponent(
        `*New Inquiry from XIR Website*%0A%0A` +
        `*Name:* ${name}%0A` +
        `*Email:* ${email}%0A` +
        `*Phone:* ${phone}%0A%0A` +
        `*Message:*%0A${message}`
    );

    // Detect mobile vs desktop for best experience
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const url = isMobile 
        ? `whatsapp://send?phone=${whatsappNumber}&text=${text}`
        : `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${text}`;

    // Open WhatsApp
    window.open(url, '_blank');

    // Success feedback + reset form
    alert('Thank you! WhatsApp is opening with your message. Just tap Send to reach us instantly.');
    this.reset();
});

    // ==================== Smooth Scrolling for Anchor Links ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update URL without page jump
                history.pushState(null, null, this.getAttribute('href'));
            }
        });
    });

    // ==================== Header Background on Scroll ====================
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#ffffff';
            header.style.backdropFilter = 'none';
        }
    });

    // ==================== Testimonials Carousel (Simple Auto-Rotate) ====================
    // If you add more testimonials later, this will rotate them
    const testimonials = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;

    if (testimonials.length > 1) {
        setInterval(() => {
            testimonials[currentTestimonial].style.opacity = '0';
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            testimonials[currentTestimonial].style.opacity = '1';
        }, 6000);
    }

});

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Number Counter Animation
document.querySelectorAll('.counter').forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / 200; // Speed

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 20);
        } else {
            counter.innerText = target;
        }
    };

    if ('IntersectionObserver' in window) {
        const obs = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCount();
                obs.unobserve(counter);
            }
        });
        obs.observe(counter);
    }
});