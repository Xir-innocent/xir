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

// Projects Carousel
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel-next');
const prevButton = document.querySelector('.carousel-prev');
const dotsContainer = document.querySelector('.carousel-dots');

let currentIndex = 0;
const totalSlides = slides.length;

// Create dots
slides.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
}

function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);

// Auto-play
let autoPlay = setInterval(nextSlide, 6000);

// Pause on hover
document.querySelector('.projects-carousel').addEventListener('mouseenter', () => clearInterval(autoPlay));
document.querySelector('.projects-carousel').addEventListener('mouseleave', () => autoPlay = setInterval(nextSlide, 6000));

// 3D Solutions Carousel
const track3d = document.querySelector('.carousel-3d-track');
const cards3d = Array.from(document.querySelectorAll('.solution-3d-card'));
const prevBtn3d = document.querySelector('.carousel-3d-prev');
const nextBtn3d = document.querySelector('.carousel-3d-next');
const dotsContainer3d = document.querySelector('.carousel-3d-dots');

let current3d = 0;
const total3d = cards3d.length;

cards3d.forEach((card, i) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo3d(i));
    dotsContainer3d.appendChild(dot);
});

const dots3d = document.querySelectorAll('.carousel-3d-dots .dot');

function update3dCarousel() {
    cards3d.forEach((card, i) => {
        card.classList.remove('active', 'prev', 'next');
        if (i === current3d) card.classList.add('active');
        else if (i === (current3d - 1 + total3d) % total3d) card.classList.add('prev');
        else if (i === (current3d + 1) % total3d) card.classList.add('next');
    });
    dots3d.forEach((dot, i) => dot.classList.toggle('active', i === current3d));
}

function goTo3d(index) {
    current3d = index;
    update3dCarousel();
}

prevBtn3d.addEventListener('click', () => goTo3d((current3d - 1 + total3d) % total3d));
nextBtn3d.addEventListener('click', () => goTo3d((current3d + 1) % total3d));

// Auto-rotate (optional)
setInterval(() => nextBtn3d.click(), 8000);

update3dCarousel();
// ==================== ADVANCED XIR SIZER LOGIC ====================
let currentProjectId = '';

function generateProjectId() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const random = Math.floor(100 + Math.random() * 900);
    return `XIR-${year}-${month}${random}`;
}

function loadSavedSession() {
    const saved = localStorage.getItem('xirCurrentProject');
    if (saved) {
        const data = JSON.parse(saved);
        currentProjectId = data.projectId || generateProjectId();
        document.getElementById('project-id').value = currentProjectId;
        
        // Restore inputs
        if (data.inputs) {
            Object.keys(data.inputs).forEach(key => {
                const el = document.getElementById(key);
                if (el) el.value = data.inputs[key];
            });
        }
    } else {
        currentProjectId = generateProjectId();
        document.getElementById('project-id').value = currentProjectId;
    }
}

function saveSession(inputs, results) {
    const sessionData = {
        projectId: currentProjectId,
        timestamp: new Date().toISOString(),
        inputs: inputs,
        results: results
    };
    localStorage.setItem('xirCurrentProject', JSON.stringify(sessionData));
}

function runXIRSizer() {
    // Get inputs
    const inputs = {
        projectId: document.getElementById('project-id').value,
        location: document.getElementById('location').value || 'Lagos',
        dailyKwh: parseFloat(document.getElementById('daily-kwh').value) || 45,
        peakKw: parseFloat(document.getElementById('peak-kw').value) || 12,
        roofArea: parseFloat(document.getElementById('roof-area').value) || 120,
        shading: parseFloat(document.getElementById('shading').value) || 5,
        autonomy: parseFloat(document.getElementById('autonomy').value) || 2,
        systemType: document.getElementById('system-type').value
    };

    // Improved XIR Precision Calculations (Lagos/Nigeria focused)
    const psh = 5.2;                    // Average peak sun hours Lagos
    const tempDerate = 0.88;            // Temperature & dust derating
    const wiringLoss = 0.95;
    const shadingLoss = (100 - inputs.shading) / 100;
    const overallEff = 0.78 * shadingLoss * tempDerate * wiringLoss;

    let arrayKwp = (inputs.dailyKwh / (psh * overallEff)) * 1.12; // 12% reliability buffer
    arrayKwp = Math.round(arrayKwp * 10) / 10;                     // Round to 1 decimal

    const inverterKw = Math.ceil(Math.max(arrayKwp * 1.25, inputs.peakKw) * 10) / 10;
    const batteryKwh = Math.round(inputs.dailyKwh * inputs.autonomy * 1.15); // 15% extra for DoD/efficiency

    const dailyYield = Math.round(arrayKwp * psh * overallEff);

    // Three scenarios
    const undersized = Math.round(arrayKwp * 0.65 * 10) / 10;
    const oversized = Math.round(arrayKwp * 1.45 * 10) / 10;

    const results = {
        optimalKwp: arrayKwp,
        inverterKw: inverterKw,
        batteryKwh: batteryKwh,
        dailyYield: dailyYield,
        reliability: "97%"
    };

    // Build beautiful results HTML
    let html = `
        <div class="scenario-card optimal">
            <h4>XIR Optimal Design</h4>
            <p class="text-4xl font-bold text-emerald-700">${arrayKwp} kWp Hybrid System</p>
            <p><strong>${Math.round(arrayKwp * 1.82)} × 550W Panels</strong> • ${inverterKw}kW Inverter • ${batteryKwh}kWh LiFePO4</p>
            <p class="mt-3"><strong>Daily Yield:</strong> ${dailyYield} kWh | <strong>Reliability:</strong> ${results.reliability}</p>
        </div>

        <h4 class="mt-8 mb-4">Comparison — Why XIR Optimal is Best</h4>
        <div class="scenario-card undersized">
            <strong>Undersized (Poor Design):</strong> ${undersized} kWp → High failure risk during peak/rainy season
        </div>
        <div class="scenario-card optimal">
            <strong>XIR Optimal:</strong> ${arrayKwp} kWp → Balanced reliability + cost efficiency
        </div>
        <div class="scenario-card oversized">
            <strong>Oversized (Over-design):</strong> ${oversized} kWp → Unnecessarily expensive
        </div>

        <div class="mt-8 p-5 bg-purple-50 rounded-xl text-sm">
            <strong>Why this is XIR Optimal:</strong> We added a controlled 12% reliability buffer while staying under 120% of minimum size. This avoids both system failure and wasteful over-spending.
        </div>
    `;

    document.getElementById('results-content').innerHTML = html;
    document.getElementById('sizer-results').classList.remove('hidden');

    // Save session
    saveSession(inputs, results);
}

// Load saved session when page loads
window.addEventListener('load', () => {
    loadSavedSession();
});
