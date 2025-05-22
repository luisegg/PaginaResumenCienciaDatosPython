// Smooth scrolling para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Function detail navigation
document.addEventListener('DOMContentLoaded', function() {
    const functionLinks = document.querySelectorAll('.function-link');
    const functionDetails = document.querySelectorAll('.function-detail');
    const defaultDetail = document.querySelector('.function-detail:not([id])');

    // Show default content when no function is selected
    function showDefaultContent() {
        functionDetails.forEach(detail => detail.classList.remove('active'));
        functionLinks.forEach(link => link.classList.remove('active'));
        if (defaultDetail) {
            defaultDetail.classList.add('active');
        }
    }

    // Handle function link clicks
    functionLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetDetail = document.getElementById(targetId);

            // Remove active class from all links and details
            functionLinks.forEach(link => link.classList.remove('active'));
            functionDetails.forEach(detail => detail.classList.remove('active'));

            // Add active class to clicked link and corresponding detail
            this.classList.add('active');
            if (targetDetail) {
                targetDetail.classList.add('active');
            }

            // Handle mobile view - scroll to content
            if (window.innerWidth <= 768) {
                const contentPanel = document.querySelector('.content-panel');
                if (contentPanel) {
                    contentPanel.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Check URL hash on page load
    if (window.location.hash) {
        const targetLink = document.querySelector(`a[href="${window.location.hash}"]`);
        if (targetLink) {
            targetLink.click();
        } else {
            showDefaultContent();
        }
    } else {
        showDefaultContent();
    }
});

// Handle mobile responsiveness
window.addEventListener('resize', function() {
    if (window.innerWidth <= 768) {
        document.querySelector('.sidebar').style.position = 'static';
    } else {
        document.querySelector('.sidebar').style.position = 'sticky';
    }
});

// Animación de aparición para las tarjetas al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar todas las tarjetas de librerías y recursos
document.querySelectorAll('.library-card, .resource-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Clase CSS para hacer visible los elementos
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    </style>
`);

// Resaltar el código cuando se hace hover sobre él
document.querySelectorAll('code').forEach(code => {
    code.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#e2e8f0';
    });
    
    code.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#f1f5f9';
    });
}); 