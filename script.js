document.addEventListener('DOMContentLoaded', function() {
    
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // --- Lógica del Menú de Navegación Responsive ---
    const nav = document.querySelector('.nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');

    // Función para manejar el menú móvil
    function toggleMenu() {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    }

    // Event listener para el menú hamburguesa
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }
    
    // Cerrar menú al hacer click en un enlace (en vista móvil)
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // --- Efecto de scroll suave para los enlaces de anclaje ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Cambiar estilo de la navegación al hacer scroll ---
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Añadir clase 'scrolled' cuando se baja más de 50px
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // Ocultar/mostrar navbar basado en la dirección del scroll
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scroll hacia abajo
            nav.style.transform = 'translateY(-100%)';
        } else {
            // Scroll hacia arriba
            nav.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
});

// --- Lógica del botón flotante de WhatsApp ---
const whatsappButton = document.getElementById('whatsappButton');
const heroSection = document.querySelector('.hero');
const footerSection = document.querySelector('.footer');

let isHeroIntersecting = false;
let isFooterIntersecting = false;

function updateWhatsappButtonVisibility() {
    if (whatsappButton) {
        if (isHeroIntersecting || isFooterIntersecting) {
            whatsappButton.classList.add('hidden');
        } else {
            whatsappButton.classList.remove('hidden');
        }
    }
}

if (whatsappButton && heroSection) {
    const heroObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // 50% of the hero section is visible
    };

    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            isHeroIntersecting = entry.isIntersecting;
            updateWhatsappButtonVisibility();
        });
    }, heroObserverOptions);

    heroObserver.observe(heroSection);
}

if (whatsappButton && footerSection) {
    const footerObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // 10% of the footer section is visible
    };

    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            isFooterIntersecting = entry.isIntersecting;
            updateWhatsappButtonVisibility();
        });
    }, footerObserverOptions);

    footerObserver.observe(footerSection);
}

});