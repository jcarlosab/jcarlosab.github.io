/**
 * WEYLAND-YUTANI CREW INTERFACE
 * Radar navigation + screen system + swipe + transitions
 */

const CFG = {
    loadTime: 2400,
    typeSpeed: 35,
    roleText: 'DESARROLLADOR FULL STACK',
    roleSpeed: 60,
    bioText: 'Desarrollador Full Stack especializado en Magnolia CMS, trabajando a diario con Java, YAML, FreeMarker (FTL), JavaScript, HTML y CSS. Experiencia también en React, Next.js, Node.js y Python para proyectos personales.',
    startDate: new Date('2017-11-01'),
    swipeThreshold: 50,
    swipeCooldown: 600,
};

const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

let currentScreen = 0;
const totalScreens = 4;
let wheelCooldown = false;
let swipeCooldown = false;
let transitioning = false;

// ============================================
// BOOT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const bar = $('#loading-bar');
    const txt = $('#loading-text');
    const loadScreen = $('#loading-screen');
    const iface = $('#interface');

    const stages = [
        [15, 'CARGANDO NÚCLEO...'],
        [40, 'INICIALIZANDO SUBSISTEMAS...'],
        [65, 'CALIBRANDO SENSORES...'],
        [85, 'ESTABLECIENDO UPLINK...'],
        [100, 'SISTEMA LISTO'],
    ];

    let i = 0;
    function tick() {
        if (i >= stages.length) {
            setTimeout(() => {
                loadScreen.classList.add('hidden');
                iface.classList.add('visible');
                boot();
            }, 300);
            return;
        }
        bar.style.width = stages[i][0] + '%';
        txt.textContent = stages[i][1];
        i++;
        setTimeout(tick, CFG.loadTime / stages.length);
    }
    setTimeout(tick, 200);
});

function boot() {
    initNav();
    initSwipe();
    initRadar();
    initDate();
    initRole();
    initExperience();
    initCTA();
}

// ============================================
// NAVIGATION
// ============================================
function initNav() {
    $$('.bn-item').forEach(b => {
        b.addEventListener('click', () => goTo(+b.dataset.screen));
    });

    $$('.blip').forEach(b => {
        b.addEventListener('click', () => goTo(+b.dataset.screen));
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowDown' || e.key === 'PageDown') { e.preventDefault(); goTo(currentScreen + 1); }
        else if (e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); goTo(currentScreen - 1); }
        else if (e.key === 'Home') { e.preventDefault(); goTo(0); }
        else if (e.key === 'End') { e.preventDefault(); goTo(totalScreens - 1); }
    });

    $('.screens-wrapper').addEventListener('wheel', e => {
        const scroll = e.target.closest('.screen-scroll');
        if (scroll) {
            if (e.deltaY < 0 && scroll.scrollTop > 0) return;
            if (e.deltaY > 0 && scroll.scrollTop + scroll.clientHeight < scroll.scrollHeight - 2) return;
        }
        if (wheelCooldown) return;
        wheelCooldown = true;
        setTimeout(() => wheelCooldown = false, 800);
        if (e.deltaY > 0) goTo(currentScreen + 1);
        else if (e.deltaY < 0) goTo(currentScreen - 1);
    }, { passive: true });
}

// ============================================
// TOUCH SWIPE
// ============================================
function initSwipe() {
    const wrapper = $('.screens-wrapper');
    let startX = 0;
    let startY = 0;
    let tracking = false;

    wrapper.addEventListener('touchstart', e => {
        // Ignore if inside scrollable area with scroll
        const scroll = e.target.closest('.screen-scroll');
        if (scroll && scroll.scrollHeight > scroll.clientHeight + 4) {
            const atTop = scroll.scrollTop <= 0;
            const atBot = scroll.scrollTop + scroll.clientHeight >= scroll.scrollHeight - 2;
            // If scrollable and not at boundary, let native scroll handle it
            if (!atTop && !atBot) return;
        }

        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        tracking = true;
    }, { passive: true });

    wrapper.addEventListener('touchend', e => {
        if (!tracking) return;
        tracking = false;

        const dx = e.changedTouches[0].clientX - startX;
        const dy = e.changedTouches[0].clientY - startY;

        // Only trigger if horizontal movement dominates
        if (Math.abs(dx) < CFG.swipeThreshold || Math.abs(dy) > Math.abs(dx)) return;
        if (swipeCooldown || transitioning) return;

        if (dx < 0) goTo(currentScreen + 1);  // swipe left → next
        else goTo(currentScreen - 1);          // swipe right → prev
    }, { passive: true });
}

// ============================================
// SCREEN TRANSITIONS
// ============================================
function goTo(idx) {
    if (idx < 0 || idx >= totalScreens || idx === currentScreen || transitioning) return;

    const direction = idx > currentScreen ? 1 : -1;
    const oldScreen = $(`.screen[data-index="${currentScreen}"]`);
    const newScreen = $(`.screen[data-index="${idx}"]`);

    transitioning = true;
    swipeCooldown = true;

    // Outgoing
    if (oldScreen) {
        oldScreen.classList.add(direction > 0 ? 'slide-out-left' : 'slide-out-right');
    }

    setTimeout(() => {
        // Hide old, show new
        if (oldScreen) {
            oldScreen.classList.remove('active', 'slide-out-left', 'slide-out-right');
        }

        currentScreen = idx;

        if (newScreen) {
            newScreen.classList.add('active', direction > 0 ? 'slide-in-right' : 'slide-in-left');
            // Clean入场 class after animation
            setTimeout(() => {
                newScreen.classList.remove('slide-in-right', 'slide-in-left');
                transitioning = false;
            }, 350);
        } else {
            transitioning = false;
        }

        activateNav();
    }, 300);

    setTimeout(() => { swipeCooldown = false; }, CFG.swipeCooldown);
}

function activateNav() {
    $$('.bn-item').forEach(b => b.classList.remove('active'));
    const btn = $(`.bn-item[data-screen="${currentScreen}"]`);
    if (btn) btn.classList.add('active');

    const screen = $(`.screen[data-index="${currentScreen}"]`);
    if (!screen) return;

    // Diagnostics (screen 1)
    if (currentScreen === 1) {
        screen.querySelectorAll('.diag-row').forEach((r, i) => {
            setTimeout(() => {
                r.classList.add('visible');
                r.querySelector('.df')?.classList.add('animated');
            }, i * 60);
        });
        initBio();
    }
}

// ============================================
// RADAR CANVAS
// ============================================
function initRadar() {
    const canvas = $('#radar-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    const R = Math.min(cx, cy) - 10;

    let angle = 0;

    function draw() {
        ctx.clearRect(0, 0, W, H);

        // Rings
        for (let i = 1; i <= 3; i++) {
            ctx.beginPath();
            ctx.arc(cx, cy, R * (i / 3), 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(0,255,136,0.08)';
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        // Cross lines
        ctx.strokeStyle = 'rgba(0,255,136,0.05)';
        ctx.beginPath();
        ctx.moveTo(cx, cy - R); ctx.lineTo(cx, cy + R);
        ctx.moveTo(cx - R, cy); ctx.lineTo(cx + R, cy);
        ctx.stroke();

        // Sweep
        const sweepGrad = ctx.createConicGradient(-angle, cx, cy);
        sweepGrad.addColorStop(0, 'rgba(0,255,136,0.18)');
        sweepGrad.addColorStop(0.08, 'rgba(0,255,136,0)');
        sweepGrad.addColorStop(1, 'rgba(0,255,136,0)');

        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, Math.PI * 2);
        ctx.fillStyle = sweepGrad;
        ctx.fill();

        // Sweep line
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(-angle) * R, cy + Math.sin(-angle) * R);
        ctx.strokeStyle = 'rgba(0,255,136,0.5)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Center dot
        ctx.beginPath();
        ctx.arc(cx, cy, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#00ff88';
        ctx.fill();

        angle += 0.012;
        requestAnimationFrame(draw);
    }

    draw();
    positionBlips();
}

function positionBlips() {
    const radar = $('#radar');
    if (!radar) return;
    const W = radar.offsetWidth;
    const H = radar.offsetHeight;
    const cx = W / 2;
    const cy = H / 2;
    const R = Math.min(cx, cy) * 0.72;

    const blips = $$('.blip');
    const angles = [-Math.PI / 2, Math.PI / 2, Math.PI]; // top, bottom, left

    blips.forEach((b, i) => {
        const a = angles[i];
        const x = cx + Math.cos(a) * R;
        const y = cy + Math.sin(a) * R;
        b.style.left = x + 'px';
        b.style.top = y + 'px';
    });
}

// ============================================
// DATE
// ============================================
function initDate() {
    const el = $('#header-date');
    if (!el) return;
    function upd() {
        const n = new Date();
        const p = v => String(v).padStart(2, '0');
        el.textContent = `${n.getFullYear()}.${p(n.getMonth()+1)}.${p(n.getDate())} // ${p(n.getHours())}:${p(n.getMinutes())}:${p(n.getSeconds())}`;
    }
    upd();
    setInterval(upd, 1000);
}

// ============================================
// TYPEWRITER ROLE
// ============================================
let roleDone = false;
function initRole() {
    const el = $('#role-typewriter');
    if (!el || roleDone) return;
    roleDone = true;
    let i = 0;
    (function type() {
        if (i < CFG.roleText.length) {
            el.textContent += CFG.roleText.charAt(i++);
            setTimeout(type, CFG.roleSpeed + Math.random() * 30);
        }
    })();
}

// ============================================
// TYPEWRITER BIO
// ============================================
let bioDone = false;
function initBio() {
    const el = $('#bio-typewriter');
    if (!el || bioDone) return;
    bioDone = true;
    let i = 0;
    (function type() {
        if (i < CFG.bioText.length) {
            el.textContent += CFG.bioText.charAt(i++);
            setTimeout(type, CFG.typeSpeed + Math.random() * 40);
        }
    })();
}

// ============================================
// EXPERIENCE
// ============================================
function initExperience() {
    const el = $('#experience-display');
    if (!el) return;
    function calc() {
        const now = new Date();
        let y = now.getFullYear() - CFG.startDate.getFullYear();
        let m = now.getMonth() - CFG.startDate.getMonth();
        if (m < 0) { y--; m += 12; }
        el.textContent = y > 0
            ? `${y} año${y!==1?'s':''} y ${m} mes${m!==1?'es':''}`
            : `${m} mes${m!==1?'es':''}`;
    }
    calc();
    setInterval(calc, 3600000);
}

// ============================================
// CTA
// ============================================
function initCTA() {
    const el = $('#cta-access');
    if (el) {
        el.addEventListener('click', e => {
            e.preventDefault();
            goTo(3);
        });
    }
}
