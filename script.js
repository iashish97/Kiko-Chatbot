// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            // Close mobile menu if open
            if(navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Contact form submission
const contactForm = document.getElementById('contactForm');
if(contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const service = document.getElementById('service').value;
        
        // Simple validation
        if(!name || !email) {
            alert('Please fill in all required fields (name and email).');
            return;
        }
        
        // In a real application, you would send this data to a server
        // For this demo, we'll just show a success message
        let serviceText = '';
        if(service) {
            const serviceMap = {
                'individual': 'Individual Therapy',
                'couples': 'Couples Counseling',
                'family': 'Family Therapy',
                'assessment': 'Clinical Assessment',
                'kiko': 'Kiko Chatbot Updates'
            };
            serviceText = serviceMap[service] || service;
        }
        
        alert(`Thank you ${name}! Your message has been sent successfully. We will contact you soon at ${email}${service ? ' regarding ' + serviceText : ''}.`);
        
        // Reset form
        contactForm.reset();
        
        // Scroll to top for better UX
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Kiko notification button
const notifyBtn = document.getElementById('notifyBtn');
if(notifyBtn) {
    notifyBtn.addEventListener('click', function() {
        const email = prompt('Please enter your email to be notified when Kiko launches:');
        if(email) {
            // Simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(emailRegex.test(email)) {
                alert(`Thank you! We'll notify you at ${email} when Kiko is available. You'll be among the first to try our new mental health companion.`);
                
                // In a real app, you would send this email to your server
                console.log(`User registered for Kiko notifications: ${email}`);
            } else {
                alert('Please enter a valid email address.');
            }
        }
    });
}

// Add interactivity to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = 'var(--shadow)';
    });
});

// Add a simple typing effect to the Kiko demo (optional)
function simulateKikoTyping() {
    const kikoDemo = document.querySelector('.kiko-demo');
    if(!kikoDemo) return;
    
    const originalContent = kikoDemo.innerHTML;
    
    // Reset to original periodically to create a dynamic effect
    setInterval(() => {
        kikoDemo.innerHTML = originalContent;
        
        // Add a new message after a delay
        setTimeout(() => {
            const newMessage = document.createElement('div');
            newMessage.className = 'message';
            newMessage.innerHTML = '<div class="kiko-message">Remember to practice self-care today. Even small actions can make a big difference in how you feel.</div>';
            kikoDemo.appendChild(newMessage);
            kikoDemo.scrollTop = kikoDemo.scrollHeight;
        }, 3000);
    }, 15000);
}

// Initialize Kiko typing simulation when page loads
document.addEventListener('DOMContentLoaded', function() {
    simulateKikoTyping();
    
    // Add active class to current section in viewport
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    function highlightNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight