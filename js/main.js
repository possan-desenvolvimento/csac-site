// ========== HEADER SCROLL ==========
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ========== MOBILE MENU ==========
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav__menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
}

document.querySelectorAll('.nav__menu a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ========== BACK TO TOP ==========
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== CHAT POP-UP ==========
const chatToggle = document.getElementById('chatToggle');
const chatPopup = document.getElementById('chatPopup');
const chatClose = document.getElementById('chatClose');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');

// Abrir chat
chatToggle.addEventListener('click', () => {
    chatPopup.classList.toggle('active');
});

// Fechar chat
chatClose.addEventListener('click', () => {
    chatPopup.classList.remove('active');
});

// Fechar ao clicar fora
document.addEventListener('click', (e) => {
    const container = document.querySelector('.chat-container');
    if (!container.contains(e.target)) {
        chatPopup.classList.remove('active');
    }
});

// Enviar mensagem
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = chatInput.value.trim();
    
    if (message) {
        // Adiciona mensagem do usuário no chat
        const body = document.querySelector('.chat-popup__body');
        const userMessage = document.createElement('div');
        userMessage.className = 'chat-message user';
        userMessage.style.cssText = 'display:flex;justify-content:flex-end;margin-bottom:1rem;';
        userMessage.innerHTML = `<p style="background:var(--gold);color:var(--dark);padding:0.8rem 1rem;border-radius:var(--radius);max-width:85%;font-size:0.9rem;line-height:1.5;">${message}</p>`;
        body.appendChild(userMessage);
        
        // Limpa input
        chatInput.value = '';
        
        // Simula resposta automática
        setTimeout(() => {
            const systemMessage = document.createElement('div');
            systemMessage.className = 'chat-message system';
            systemMessage.style.cssText = 'display:flex;justify-content:flex-start;margin-bottom:1rem;';
            systemMessage.innerHTML = `<p style="background:var(--dark);padding:0.8rem 1rem;border-radius:var(--radius);border:1px solid rgba(212,165,116,0.05);color:rgba(255,255,255,0.7);font-size:0.9rem;max-width:85%;line-height:1.5;">✅ Mensagem enviada!<br>Em breve entraremos em contato pelo WhatsApp.</p>`;
            body.appendChild(systemMessage);
            body.scrollTop = body.scrollHeight;
            
            // Envia para o WhatsApp (n8n)
            const phoneNumber = '5513999999999'; // Substituir pelo número real
            const whatsappMessage = encodeURIComponent(`Mensagem do site:\n\n${message}`);
            window.open(`https://wa.me/${phoneNumber}?text=${whatsappMessage}`, '_blank');
        }, 800);
        
        // Rola para o final
        setTimeout(() => {
            body.scrollTop = body.scrollHeight;
        }, 100);
    }
});

// ========== ATUALIZAR ANO NO FOOTER ==========
const yearSpan = document.querySelector('.footer__bottom p');
if (yearSpan) {
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = yearSpan.textContent.replace('2024', currentYear);
}

// ========== VIDEO MODAL ==========
const videoModal = document.getElementById('videoModal');
const videoModalPlayer = document.getElementById('videoModalPlayer');
const videoCards = document.querySelectorAll('[data-video-modal]');
const videoModalClose = document.querySelectorAll('[data-video-modal-close]');

const closeVideoModal = () => {
    videoModal.classList.remove('active');
    videoModal.setAttribute('aria-hidden', 'true');
    videoModalPlayer.pause();
    videoModalPlayer.currentTime = 0;
    document.body.style.overflow = '';
};

videoCards.forEach((card) => {
    const openVideoModal = () => {
        videoModal.classList.add('active');
        videoModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        videoModalPlayer.play();
    };

    card.addEventListener('click', openVideoModal);
    card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openVideoModal();
        }
    });
});

videoModalClose.forEach((element) => {
    element.addEventListener('click', closeVideoModal);
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && videoModal.classList.contains('active')) {
        closeVideoModal();
    }
});