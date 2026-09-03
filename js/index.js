// ========== INDEX - INTERAÇÕES ==========
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== SCROLL INDICATOR =====
    const scrollIndicator = document.querySelector('.hero-foda__scroll');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const quemSomos = document.querySelector('.quem-somos');
            if (quemSomos) {
                quemSomos.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
    
    // ===== ANIMAÇÃO DOS CARDS =====
    const cards = document.querySelectorAll('.projeto-card, .participe-card, .diretoria-card, .curso-card, .transparencia__item');
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 120);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardObserver.observe(card);
    });
    
    // ===== BOTÕES "ABRIR CURRÍCULO" =====
    const cvButtons = document.querySelectorAll('.btn-cv');
    
    cvButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Pega o nome da pessoa
            const card = this.closest('.diretoria-card');
            const name = card ? card.querySelector('h4')?.textContent || 'Membro' : 'Membro';
            const role = card ? card.querySelector('.diretoria-card__role')?.textContent || '' : '';
            
            // Simula abertura de currículo
            alert(`📄 Abrindo currículo de ${name}\n${role ? `🎯 ${role}` : ''}\n\n(Em breve disponível para download)`);
            
            // Efeito visual
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
    
    // ===== FORMULÁRIO DE CONTATO =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[type="text"]')?.value || '';
            const email = this.querySelector('input[type="email"]')?.value || '';
            const message = this.querySelector('textarea')?.value || '';
            
            if (name && email && message) {
                alert('✅ Mensagem enviada com sucesso!\n\nEntraremos em contato em breve.');
                this.reset();
            } else {
                alert('⚠️ Por favor, preencha todos os campos.');
            }
        });
    }
    
    // ===== CONSOLE =====
    console.log('✨ Bem-vindo à Cia Aplauso Contemporâneo!');
    console.log('🎭 Arte que transforma realidades desde 2014.');
});