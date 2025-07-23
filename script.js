// ========================
// ANIMAÇÕES DE SCROLL
// ========================

document.addEventListener('DOMContentLoaded', function() {
    // Função para verificar se um elemento está visível na tela
    function isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        const threshold = 100; // pixels antes de aparecer
        
        return (
            rect.top >= -threshold &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + threshold &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Função para animar elementos quando entram na tela
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            if (isElementInViewport(element) && !element.classList.contains('visible')) {
                element.classList.add('visible');
                
                // Adicionar classe de animação específica
                if (element.classList.contains('fade-up-trigger')) {
                    element.classList.add('fade-up');
                } else if (element.classList.contains('fade-left-trigger')) {
                    element.classList.add('fade-left');
                } else if (element.classList.contains('fade-right-trigger')) {
                    element.classList.add('fade-right');
                } else if (element.classList.contains('scale-in-trigger')) {
                    element.classList.add('scale-in');
                } else if (element.classList.contains('fade-in-trigger')) {
                    element.classList.add('fade-in');
                } else {
                    // Animação padrão
                    element.classList.add('fade-up');
                }
            }
        });
    }

    // Adicionar classes de animação aos elementos
    function setupAnimations() {
        // Seção Hero
        const heroSection = document.querySelector('#hero');
        if (heroSection) {
            const heroTitle = heroSection.querySelector('h1');
            const heroText = heroSection.querySelector('p');
            const heroButtons = heroSection.querySelector('.hero-buttons');
            const heroImage = heroSection.querySelector('.hero-profile-image');
            
            if (heroTitle) {
                heroTitle.classList.add('animate-on-scroll', 'fade-up-trigger');
            }
            if (heroText) {
                heroText.classList.add('animate-on-scroll', 'fade-up-trigger', 'delay-1');
            }
            if (heroButtons) {
                heroButtons.classList.add('animate-on-scroll', 'fade-up-trigger', 'delay-2');
            }
            if (heroImage) {
                heroImage.classList.add('animate-on-scroll', 'fade-right-trigger', 'delay-3');
            }
        }

        // Seção About
        const aboutSection = document.querySelector('#sobre');
        if (aboutSection) {
            const aboutTitle = aboutSection.querySelector('.section-title');
            const aboutTextBox = aboutSection.querySelector('.about-text-box');
            const aboutButton = aboutSection.querySelector('.btn');
            
            if (aboutTitle) {
                aboutTitle.classList.add('animate-on-scroll', 'fade-up-trigger');
            }
            if (aboutTextBox) {
                aboutTextBox.classList.add('animate-on-scroll', 'scale-in-trigger', 'delay-1');
            }
            if (aboutButton) {
                aboutButton.classList.add('animate-on-scroll', 'fade-up-trigger', 'delay-2');
            }
        }

        // Seção Projetos
        const workSection = document.querySelector('#projetos');
        if (workSection) {
            const workTitle = workSection.querySelector('.section-title');
            const workDescription = workSection.querySelector('.work-description');
            const workCards = workSection.querySelectorAll('.work-link-card');
            
            if (workTitle) {
                workTitle.classList.add('animate-on-scroll', 'fade-up-trigger');
            }
            if (workDescription) {
                workDescription.classList.add('animate-on-scroll', 'fade-up-trigger', 'delay-1');
            }
            
            workCards.forEach((card, index) => {
                card.classList.add('animate-on-scroll', 'fade-up-trigger', `delay-${index + 2}`);
            });
        }

        // Seção Contato
        const contactSection = document.querySelector('#contato');
        if (contactSection) {
            const contactTitle = contactSection.querySelector('.section-title');
            const contactDescription = contactSection.querySelector('.contact-description');
            const contactCards = contactSection.querySelectorAll('.contact-link-card');
            
            if (contactTitle) {
                contactTitle.classList.add('animate-on-scroll', 'fade-up-trigger');
            }
            if (contactDescription) {
                contactDescription.classList.add('animate-on-scroll', 'fade-up-trigger', 'delay-1');
            }
            
            contactCards.forEach((card, index) => {
                card.classList.add('animate-on-scroll', 'scale-in-trigger', `delay-${index + 2}`);
            });
        }

        // Páginas de projetos
        const projectItems = document.querySelectorAll('.project-item');
        projectItems.forEach((item, index) => {
            item.classList.add('animate-on-scroll', 'fade-up-trigger', `delay-${Math.min(index + 1, 4)}`);
        });

        // Header da página
        const pageHeader = document.querySelector('.page-header');
        if (pageHeader) {
            const pageTitle = pageHeader.querySelector('.section-title');
            const pageDescription = pageHeader.querySelector('.page-description');
            
            if (pageTitle) {
                pageTitle.classList.add('animate-on-scroll', 'fade-up-trigger');
            }
            if (pageDescription) {
                pageDescription.classList.add('animate-on-scroll', 'fade-up-trigger', 'delay-1');
            }
        }

        // Cards de projetos individuais
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            card.classList.add('animate-on-scroll', 'fade-up-trigger', `delay-${Math.min(index + 1, 4)}`);
        });

        // Elementos de detalhes de projeto
        const projectDetails = document.querySelectorAll('.project-detail');
        projectDetails.forEach((detail, index) => {
            detail.classList.add('animate-on-scroll', 'fade-left-trigger', `delay-${index + 1}`);
        });
    }

    // Executar animações quando a página carrega
    setupAnimations();
    
    // Pequeno delay para garantir que os elementos estejam prontos
    setTimeout(() => {
        animateOnScroll(); // Verificar elementos já visíveis
    }, 100);

    // Executar animações durante o scroll com throttling
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                animateOnScroll();
                scrollTimeout = null;
            }, 16); // ~60fps
        }
    });
    
    // Executar animações quando a janela é redimensionada
    window.addEventListener('resize', animateOnScroll);
});

// ========================
// SMOOTH SCROLLING PARA LINKS INTERNOS
// ========================

document.addEventListener('DOMContentLoaded', function() {
    // Selecionar todos os links que apontam para âncoras
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Se é um link para uma âncora na mesma página
            if (href.startsWith('#') && href.length > 1) {
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    // Calcular posição considerando o header fixo
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    // Smooth scroll
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// ========================
// EFEITOS ADICIONAIS DE HOVER E PARALLAX
// ========================

document.addEventListener('DOMContentLoaded', function() {
    // Efeito de parallax suave na imagem do hero
    const heroImage = document.querySelector('.hero-profile-image');
    
    if (heroImage) {
        let ticking = false;
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(function() {
                    const scrolled = window.pageYOffset;
                    const parallax = scrolled * 0.2;
                    
                    heroImage.style.transform = `translateY(${parallax}px)`;
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // Efeito de hover nos cards
    const cards = document.querySelectorAll('.work-link-card, .contact-link-card, .project-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Efeito de typing no título principal (opcional)
    const mainTitle = document.querySelector('h1');
    if (mainTitle && mainTitle.textContent.includes('Missão:')) {
        const originalText = mainTitle.textContent;
        let currentText = '';
        let currentIndex = 0;
        
        // Iniciar com texto vazio
        mainTitle.textContent = '';
        mainTitle.style.borderRight = '2px solid var(--color-light-purple)';
        
        function typeText() {
            if (currentIndex < originalText.length) {
                currentText += originalText[currentIndex];
                mainTitle.textContent = currentText;
                currentIndex++;
                setTimeout(typeText, 50);
            } else {
                // Remover cursor após completar
                setTimeout(() => {
                    mainTitle.style.borderRight = 'none';
                }, 1000);
            }
        }

        // Iniciar o efeito após um pequeno delay
        setTimeout(typeText, 500);
    }
});

// ========================
// NAVEGAÇÃO ATIVA
// ========================

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        const scrollPosition = window.scrollY + 100; // Offset para o header

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Throttle da função de scroll
    let navScrollTimeout;
    window.addEventListener('scroll', function() {
        if (!navScrollTimeout) {
            navScrollTimeout = setTimeout(function() {
                updateActiveNav();
                navScrollTimeout = null;
            }, 16);
        }
    });

    // Verificar estado inicial
    updateActiveNav();
});

// ========================
// LAZY LOADING DE IMAGENS
// ========================

document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
});

// ========================
// PERFORMANCE OPTIMIZATION
// ========================

// Debounce function para otimizar eventos
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function para scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ========================
// FUNCIONALIDADES ESPECÍFICAS PARA PÁGINAS DE PROJETO
// ========================

document.addEventListener('DOMContentLoaded', function() {
    // Botão de voltar
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            e.preventDefault();
            if (document.referrer && document.referrer.includes(window.location.origin)) {
                window.history.back();
            } else {
                window.location.href = '../index.html';
            }
        });
    }

    // Modal para imagens de projeto (se existir)
    const projectImages = document.querySelectorAll('.project-image img');
    projectImages.forEach(img => {
        img.addEventListener('click', function() {
            // Implementar modal de imagem se necessário
            console.log('Imagem clicada:', this.src);
        });
    });

    // Expandir/colapsar detalhes do projeto
    const toggleButtons = document.querySelectorAll('.toggle-details');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const details = this.nextElementSibling;
            if (details) {
                details.classList.toggle('expanded');
                this.textContent = details.classList.contains('expanded') ? 
                    'Mostrar menos' : 'Mostrar mais';
            }
        });
    });
});

// ========================
// EASTER EGGS E INTERATIVIDADE EXTRA
// ========================

document.addEventListener('DOMContentLoaded', function() {
    // Contador de cliques no logo
    const logo = document.querySelector('.logo');
    let logoClicks = 0;
    
    if (logo) {
        logo.addEventListener('click', function() {
            logoClicks++;
            if (logoClicks === 5) {
                // Easter egg após 5 cliques
                document.body.style.filter = 'hue-rotate(180deg)';
                setTimeout(() => {
                    document.body.style.filter = 'none';
                }, 2000);
                logoClicks = 0;
            }
        });
    }
});

// ========================
// INICIALIZAÇÃO FINAL
// ========================

// Garantir que todas as funcionalidades sejam carregadas
window.addEventListener('load', function() {
    console.log('Portfolio scripts loaded successfully!');
    
    // Trigger inicial para animações
    setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
    }, 300);
});

// Tema escuro //
const toggleBtn = document.getElementById('toggle-theme-btn'); // <-- trocar aqui
const body = document.body;

// Função para aplicar tema
function applyTheme(theme) {
    if (theme === 'dark') {
        body.classList.add('dark-theme');
        toggleBtn.textContent = '☀️'; // ícone sol
    } else {
        body.classList.remove('dark-theme');
        toggleBtn.textContent = '🌙'; // ícone lua
    }
}

// Lê a preferência salva
const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

// Alterna o tema no clique do botão
toggleBtn.addEventListener('click', () => {
    const isDark = body.classList.contains('dark-theme');
    if (isDark) {
        applyTheme('light');
        localStorage.setItem('theme', 'light');
    } else {
        applyTheme('dark');
        localStorage.setItem('theme', 'dark');
    }
});
