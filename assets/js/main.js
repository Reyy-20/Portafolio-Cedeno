// Navegación suave para los enlaces del menú
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // Cerrar el menú móvil después de hacer clic en un enlace
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {toggle: false});
                bsCollapse.hide();
            }
        }
    });
});

// Cambiar el estilo de la barra de navegación al hacer scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const backToTop = document.querySelector('.back-to-top');
    
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
        backToTop.classList.add('active');
    } else {
        navbar.classList.remove('scrolled');
        backToTop.classList.remove('active');
    }
});

// Animación de las habilidades al hacer scroll
function animateSkills() {
    const skills = document.querySelectorAll('.progress-bar');
    skills.forEach(skill => {
        const width = skill.style.width;
        skill.style.width = '0';
        setTimeout(() => {
            skill.style.width = width;
        }, 100);
    });
}

// Detectar cuando los elementos están en el viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// Animar elementos al hacer scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
        if (isInViewport(element) && !element.classList.contains('animated')) {
            element.classList.add('animated');
            if (element.classList.contains('progress-bar')) {
                animateSkills();
            }
        }
    });
}

// Inicializar animaciones al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Añadir clase de animación a los elementos
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
    });
    
    // Inicializar tooltips de Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Inicializar popovers de Bootstrap
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
    
    // Animar elementos al cargar
    animateOnScroll();
    
    // Configurar el formulario de contacto
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí puedes agregar la lógica para enviar el formulario
            const formData = new FormData(contactForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Simular envío del formulario
            console.log('Datos del formulario:', formObject);
            
            // Mostrar mensaje de éxito
            alert('¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.');
            contactForm.reset();
        });
    }
});

// Animar elementos al hacer scroll
window.addEventListener('scroll', animateOnScroll);

// Efecto de escritura en el encabezado
function typeWriter(element, text, i = 0) {
    if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(() => typeWriter(element, text, i), 100);
    }
}

// Inicializar efecto de escritura si existe el elemento
const heroTitle = document.querySelector('.hero-section h1');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    setTimeout(() => typeWriter(heroTitle, text), 1000);
}

// Galería de portafolio - Lightbox
const portfolioItems = document.querySelectorAll('.portfolio-item');
portfolioItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Aquí puedes implementar un lightbox personalizado o usar una librería como Lightbox.js
        // Por ahora, solo mostramos una alerta
        const title = this.querySelector('h4')?.textContent || 'Proyecto';
        alert(`Ver más detalles sobre: ${title}`);
    });
});

// Contador de estadísticas
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Inicializar contadores cuando la sección es visible
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = document.querySelectorAll('.counter');
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    animateValue(counter, 0, target, 2000);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);
}

// Efecto de carga de la página
window.addEventListener('load', function() {
    // Ocultar el preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.display = 'none';
    }
    
    // Mostrar el contenido con animación
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.style.opacity = '1';
        mainContent.style.transform = 'translateY(0)';
    }

    // Inicializar el asistente Snoopy
    initSnoopyAssistant();
});

// Asistente Snoopy
function initSnoopyAssistant() {
    const snoopyAssistant = document.getElementById('snoopy-assistant');
    const snoopyImg = document.getElementById('snoopy-img');
    const snoopyMessage = document.getElementById('snoopy-message');
    const snoopyButtons = document.querySelector('.snoopy-buttons');
    
    if (!snoopyAssistant) return;
    
    // Mensajes aleatorios para Snoopy
    const messages = [
        "¡Hola! Soy Snoopy, tu guía. ¿En qué puedo ayudarte hoy?",
        "¡Hola! Haz clic en mí para navegar fácilmente.",
        "¡Explora mi portafolio! Estoy aquí para ayudarte.",
        "¿Buscas algo en especial? Puedo guiarte.",
        "¡Bienvenido a mi portafolio! ¿En qué te ayudo?"
    ];
    
    // Cambiar mensaje aleatoriamente cada 10 segundos
    setInterval(() => {
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        snoopyMessage.textContent = randomMessage;
    }, 10000);
    
    // Mostrar/ocultar botones al hacer clic en Snoopy
    snoopyImg.addEventListener('click', (e) => {
        e.stopPropagation();
        snoopyAssistant.classList.toggle('active');
    });
    
    // Ocultar botones al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!snoopyAssistant.contains(e.target)) {
            snoopyAssistant.classList.remove('active');
        }
    });
    
    // Navegación con los botones de Snoopy
    const buttons = document.querySelectorAll('.snoopy-btn');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const sectionId = button.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            
            if (section) {
                // Desplazamiento suave a la sección
                window.scrollTo({
                    top: section.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Mensaje de confirmación
                const sectionName = button.textContent.trim();
                snoopyMessage.textContent = `¡Perfecto! Vamos a la sección de ${sectionName}.`;
                
                // Ocultar botones después de la selección
                snoopyAssistant.classList.remove('active');
            }
        });
    });
    
    // Animación de saludo al cargar la página
    setTimeout(() => {
        snoopyMessage.textContent = "¡Bienvenido a mi portafolio! ¿En qué te ayudo hoy?";
        snoopyMessage.style.opacity = '1';
        snoopyMessage.style.visibility = 'visible';
        
        setTimeout(() => {
            snoopyMessage.style.opacity = '0';
            snoopyMessage.style.visibility = 'hidden';
        }, 5000);
    }, 2000);
}

// Hacer que Snoopy siga el scroll suavemente
let lastScrollTop = 0;
const snoopyAssistant = document.getElementById('snoopy-assistant');

if (snoopyAssistant) {
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Actualizar posición de Snoopy
        if (Math.abs(lastScrollTop - scrollTop) > 10) {
            snoopyAssistant.style.bottom = '30px';
            snoopyAssistant.style.transition = 'bottom 0.3s ease';
            
            // Mostrar mensaje al hacer scroll
            const snoopyMessage = document.getElementById('snoopy-message');
            if (snoopyMessage) {
                snoopyMessage.textContent = "¿Neitas ayuda para navegar? ¡Haz clic en mí!";
                snoopyMessage.style.opacity = '1';
                snoopyMessage.style.visibility = 'visible';
                
                setTimeout(() => {
                    snoopyMessage.style.opacity = '0';
                    snoopyMessage.style.visibility = 'hidden';
                }, 3000);
            }
        }
        
        lastScrollTop = scrollTop;
    });
}
