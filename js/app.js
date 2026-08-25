const CFG = {
    startDate: new Date('2017-11-01'),
};

const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initMobileNav();
    initScrollSpy();
    initReveal();
    initProjectFilters();
    initExperience();
    initFooterYear();
});

// ============================================
// HEADER: fondo al hacer scroll
// ============================================
function initHeader() {
    const header = $('#site-header');
    if (!header) return;
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
}

// ============================================
// MENÚ MÓVIL
// ============================================
function initMobileNav() {
    const toggle = $('#nav-toggle');
    const links = $('#nav-links');
    if (!toggle || !links) return;

    const close = () => {
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Abrir menú');
    };

    toggle.addEventListener('click', () => {
        const open = links.classList.toggle('open');
        toggle.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    });

    links.addEventListener('click', e => {
        if (e.target.closest('a')) close();
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') close();
    });
}

// ============================================
// SCROLL SPY: resalta el enlace de la sección visible
// ============================================
function initScrollSpy() {
    const sections = $$('main section[id]');
    if (!sections.length || !('IntersectionObserver' in window)) return;

    const spy = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const id = entry.target.id;
            $$('.nav-link').forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(s => spy.observe(s));
}

// ============================================
// REVEAL: animación de aparición al hacer scroll
// ============================================
function initReveal() {
    const items = $$('.reveal');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
        items.forEach(el => el.classList.add('in'));
        return;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    items.forEach(el => observer.observe(el));

    // Barras de skill: fijar el nivel y activarlas al entrar en pantalla
    const skills = $$('.skill');
    const skillObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                el.style.setProperty('--level', el.dataset.level || 0);
                el.classList.add('in');
                skillObserver.unobserve(el);
            }
        });
    }, { threshold: 0.4 });

    skills.forEach(el => skillObserver.observe(el));
}

// ============================================
// FILTROS DE PROYECTOS
// ============================================
function initProjectFilters() {
    $$('.pf-item').forEach(btn => {
        btn.addEventListener('click', () => {
            $$('.pf-item').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            $$('.project-card').forEach(card => {
                const show = filter === 'all' || card.dataset.category === filter;
                card.classList.toggle('hidden', !show);
            });
        });
    });
}

// ============================================
// EXPERIENCIA: años y meses desde el inicio
// ============================================
function initExperience() {
    const els = $$('.js-experience');
    if (!els.length) return;
    const now = new Date();
    let y = now.getFullYear() - CFG.startDate.getFullYear();
    let m = now.getMonth() - CFG.startDate.getMonth();
    if (m < 0) { y--; m += 12; }
    const text = y > 0
        ? `${y} año${y !== 1 ? 's' : ''} y ${m} mes${m !== 1 ? 'es' : ''}`
        : `${m} mes${m !== 1 ? 'es' : ''}`;
    els.forEach(el => { el.textContent = text; });
}

// ============================================
// FOOTER: año actual
// ============================================
function initFooterYear() {
    const el = $('#footer-year');
    if (el) el.textContent = new Date().getFullYear();
}
