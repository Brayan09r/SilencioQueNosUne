// Efecto navbar al hacer scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(30, 39, 46, 0.95)';
        nav.style.padding = '1rem 5%';
    } else {
        nav.style.background = 'rgba(30, 39, 46, 0.7)';
    }
});

// Menú hamburguesa
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Efecto de escritura automática en el hero
const heroTitle = document.querySelector('.hero-content h1');
if(heroTitle) {
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            heroTitle.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    setTimeout(typeWriter, 500);
}

// Animación de aparición suave
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.cause-card, .info-item, .before, .after, .timeline-item, .fact-card');
    
    elements.forEach(el => {
        const elPosition = el.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elPosition < screenPosition) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
};

// Inicializar elementos
document.querySelectorAll('.cause-card, .info-item, .before, .after, .timeline-item, .fact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
});

// Llamar al cargar y al hacer scroll
window.addEventListener('load', () => {
    animateOnScroll();
    animateCounters();
});
window.addEventListener('scroll', animateOnScroll);

// Animación para la línea de tiempo
const animateTimeline = () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const screenPosition = window.innerHeight / 1.3;
    
    timelineItems.forEach((item, index) => {
        const itemPosition = item.getBoundingClientRect().top;
        
        if(itemPosition < screenPosition) {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 200);
        }
    });
};

// Contador animado para estadísticas
function animateCounters() {
    const counters = document.querySelectorAll('[data-target]');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText.replace(/\D/g, '');
        const increment = target / speed;
        
        if(count < target) {
            counter.innerText = Math.ceil(count + increment) + (counter.innerText.includes('%') ? '%' : '');
            setTimeout(animateCounters, 1);
        } else {
            counter.innerText = target + (counter.innerText.includes('%') ? '%' : '');
        }
    });
}

// Scroll suave para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Efecto parallax mejorado
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const videoBackground = document.querySelector('.video-background');
    if(videoBackground) {
        videoBackground.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
});

// Inicializar contadores cuando la sección es visible
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            animateCounters();
        }
    });
}, {threshold: 0.5});

const kidsSection = document.querySelector('#ninos');
if(kidsSection) observer.observe(kidsSection);

// Efecto tilt para tarjetas
if(document.querySelector(".cause-card")) {
    VanillaTilt.init(document.querySelectorAll(".cause-card, .info-item"), {
        max: 8,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
    });
}

// Validación de formulario
document.querySelector('.signature-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('¡Gracias por firmar! Tu apoyo hace la diferencia.');
    e.target.reset();
});

// Efecto hover para redes sociales
document.querySelectorAll('.social-media a').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'scale(1.1) translateY(-5px)';
    });
    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'scale(1) translateY(0)';
    });
});

// Formulario funcional con Formspree
document.querySelector('.signature-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
        const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });
        
        if (response.ok) {
            alert('✅ ¡Firma registrada! Gracias por unirte a la lucha');
            e.target.reset();
            // Actualizar contador
            const progress = document.querySelector('.progress');
            progress.style.width = '68%';
            progress.textContent = '68%';
            document.querySelector('.progress-text').textContent = '680 firmas de 1,000';
        }
    } catch (error) {
        alert('⚠️ Error al enviar. Por favor intenta nuevamente.');
    }
});