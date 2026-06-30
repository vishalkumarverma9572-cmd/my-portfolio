const phrases = [
    'Frontend Developer',
    'Python Developer',
    'Django & Flask Developer',
    'SEO Specialist',
    'Responsive Web Designer',
    'Creative Problem Solver'
];

function typeLoop(element, words, speed = 80, pause = 1500) {
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        const visibleText = currentWord.substring(0, charIndex);
        element.textContent = visibleText;

        if (isDeleting) {
            if (charIndex > 0) {
                charIndex -= 1;
                setTimeout(type, speed / 2);
            } else {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(type, 200);
            }
            return;
        }

        if (charIndex < currentWord.length) {
            charIndex += 1;
            setTimeout(type, speed);
        } else {
            isDeleting = true;
            setTimeout(type, pause);
        }
    }

    type();
}

function copyToClipboard(value) {
    navigator.clipboard.writeText(value).then(() => {
        showNotification('Copied to clipboard!');
    }).catch(() => {
        showNotification('Copy failed. Please copy manually.');
    });
}

function showNotification(message) {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 1.5rem;
        right: 1.5rem;
        background: rgba(17, 24, 39, 0.95);
        color: #fff;
        padding: 0.9rem 1.3rem;
        border-radius: 16px;
        box-shadow: 0 24px 50px rgba(0, 0, 0, 0.25);
        z-index: 999;
        font-weight: 600;
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2800);
}

function updateSkillBars() {
    const skills = document.querySelectorAll('.skill-progress');
    skills.forEach(skill => {
        const width = skill.dataset.width;
        skill.style.width = width;
    });
}

function setActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 130;
    let currentId = sections[0] ? sections[0].id : null;

    sections.forEach(section => {
        if (scrollPosition >= section.offsetTop) {
            currentId = section.id;
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
}

function toggleMobileMenu() {
    const menu = document.querySelector('.nav-menu');
    if (!menu) return;
    menu.classList.toggle('open');
}

function initBackToTop() {
    const button = document.getElementById('backToTop');
    if (!button) return;

    window.addEventListener('scroll', () => {
        button.classList.toggle('visible', window.scrollY > 400);
    });

    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function initScrollAnimations() {
    const elements = document.querySelectorAll('section');
    elements.forEach(el => el.classList.add('fade-in-element'));

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
        });
    }, { threshold: 0.15 });

    elements.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            document.querySelector(link.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
            document.querySelector('.nav-menu')?.classList.remove('open');
        });
    });

    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', () => copyToClipboard(button.dataset.value));
    });

    const hamburger = document.querySelector('.hamburger');
    hamburger?.addEventListener('click', toggleMobileMenu);

    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        typeLoop(typingElement, phrases);
    }

    initScrollAnimations();
    initBackToTop();
    updateSkillBars();
    setActiveLink();
    window.addEventListener('scroll', () => {
        setActiveLink();
    });
});
