/**
 * WEYLAND-YUTANI CREW INTERFACE
 * Interactive portfolio with loading screen, typewriter effects,
 * scroll animations, and motion tracker
 */

// ============================================
// CONFIGURATION
// ============================================
const CONFIG = {
    loadingDuration: 2800,
    typewriterSpeed: 35,
    bioText: 'Desarrollador Full Stack especializado en Magnolia CMS, trabajando a diario con Java, YAML, FreeMarker (FTL), JavaScript, HTML y CSS. Experiencia también en React, Next.js, Node.js y Python para proyectos personales.',
    roleText: 'FULL STACK DEVELOPER',
    roleSpeed: 60,
    startDate: new Date('2017-11-01'),
    scrollThreshold: 0.15,
};

// ============================================
// DOM ELEMENTS
// ============================================
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initLoadingScreen();
});

function initLoadingScreen() {
    const loadingBar = $('#loading-bar');
    const loadingText = $('#loading-text');
    const loadingScreen = $('#loading-screen');
    const interfaceEl = $('#interface');

    const stages = [
        { progress: 15, text: 'LOADING KERNEL...' },
        { progress: 35, text: 'INITIALIZING SUBSYSTEMS...' },
        { progress: 55, text: 'CALIBRATING SENSORS...' },
        { progress: 75, text: 'ESTABLISHING UPLINK...' },
        { progress: 90, text: 'AUTHENTICATING CREW...' },
        { progress: 100, text: 'SYSTEM READY' },
    ];

    let currentStage = 0;

    function advanceStage() {
        if (currentStage >= stages.length) {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                interfaceEl.classList.add('visible');
                initAllSystems();
            }, 400);
            return;
        }

        const stage = stages[currentStage];
        loadingBar.style.width = stage.progress + '%';
        loadingText.textContent = stage.text;
        currentStage++;

        setTimeout(advanceStage, CONFIG.loadingDuration / stages.length);
    }

    setTimeout(advanceStage, 300);
}

function initAllSystems() {
    initDateDisplay();
    initTypewriterRole();
    initTypewriterBio();
    initExperience();
    initScrollAnimations();
    initSkillBars();
    initContactCards();
}

// ============================================
// DATE DISPLAY
// ============================================
function initDateDisplay() {
    const dateEl = $('#header-date');
    if (!dateEl) return;

    function updateDate() {
        const now = new Date();
        const y = now.getFullYear();
        const m = String(now.getMonth() + 1).padStart(2, '0');
        const d = String(now.getDate()).padStart(2, '0');
        const h = String(now.getHours()).padStart(2, '0');
        const min = String(now.getMinutes()).padStart(2, '0');
        const s = String(now.getSeconds()).padStart(2, '0');
        dateEl.textContent = `${y}.${m}.${d} // ${h}:${min}:${s}`;
    }

    updateDate();
    setInterval(updateDate, 1000);
}

// ============================================
// TYPEWRITER EFFECTS
// ============================================
function initTypewriterRole() {
    const el = $('#role-typewriter');
    if (!el) return;

    let i = 0;
    const text = CONFIG.roleText;

    function type() {
        if (i < text.length) {
            el.textContent += text.charAt(i);
            i++;
            setTimeout(type, CONFIG.roleSpeed + Math.random() * 30);
        }
    }

    setTimeout(type, 800);
}

function initTypewriterBio() {
    const el = $('#bio-typewriter');
    if (!el) return;

    let i = 0;
    const text = CONFIG.bioText;

    function type() {
        if (i < text.length) {
            el.textContent += text.charAt(i);
            i++;
            setTimeout(type, CONFIG.typewriterSpeed + Math.random() * 40);
        }
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setTimeout(type, 400);
                observer.disconnect();
            }
        });
    }, { threshold: 0.3 });

    observer.observe(el);
}

// ============================================
// EXPERIENCE CALCULATOR
// ============================================
function initExperience() {
    const el = $('#experience-display');
    if (!el) return;

    function calc() {
        const now = new Date();
        let years = now.getFullYear() - CONFIG.startDate.getFullYear();
        let months = now.getMonth() - CONFIG.startDate.getMonth();

        if (months < 0) {
            years--;
            months += 12;
        }

        if (years > 0) {
            el.textContent = `${years} year${years !== 1 ? 's' : ''} and ${months} month${months !== 1 ? 's' : ''}`;
        } else {
            el.textContent = `${months} month${months !== 1 ? 's' : ''}`;
        }
    }

    calc();
    setInterval(calc, 1000 * 60 * 60);
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const sections = $$('.section-frame');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: CONFIG.scrollThreshold,
        rootMargin: '0px 0px -50px 0px',
    });

    sections.forEach((section) => observer.observe(section));
}

// ============================================
// SKILL BARS ANIMATION
// ============================================
function initSkillBars() {
    const items = $$('.diag-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const item = entry.target;
                const fill = item.querySelector('.diag-fill');

                setTimeout(() => {
                    item.classList.add('visible');
                    if (fill) fill.classList.add('animated');
                }, 100);

                observer.unobserve(item);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -30px 0px',
    });

    items.forEach((item) => observer.observe(item));
}

// ============================================
// CONTACT CARDS INTERACTION
// ============================================
function initContactCards() {
    const cards = $$('.contact-card');

    cards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
            playHoverSound();
        });

        card.addEventListener('click', (e) => {
            playClickSound();
        });
    });
}

// ============================================
// WEB AUDIO - Synthesized Sounds
// ============================================
let audioCtx = null;

function getAudioContext() {
    if (!audioCtx) {
        try {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            return null;
        }
    }
    return audioCtx;
}

function playHoverSound() {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.08);
}

function playClickSound() {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'square';
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.12);
}
