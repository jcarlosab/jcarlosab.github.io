const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const waveEl = document.getElementById('wave');
const finalScoreEl = document.getElementById('final-score');
const finalWaveEl = document.getElementById('final-wave');
const gameoverOverlay = document.getElementById('gameover-overlay');
const restartBtn = document.getElementById('restart-btn');

let W, H;

function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    W = canvas.width;
    H = canvas.height;
}
resize();
window.addEventListener('resize', resize);

const GREEN = '#00ff41';
const GREEN_DIM = '#008f11';
const RED = '#ff3333';
const ORANGE = '#ffaa00';
const WHITE = '#c0c0c0';

const ship = { x: 0, y: 0, w: 28, h: 32, speed: 4, invincible: 0 };

let asteroids = [];
let enemies = [];
let particles = [];
let stars = [];
let floatTexts = [];
let score = 0;
let wave = 1;
let gameRunning = false;
let enemiesSpawnedThisWave = 0;
let enemiesPerWave = 4;
let frameCount = 0;
let spawnTimer = 0;
let waveTimer = 0;
let shakeX = 0, shakeY = 0;
let shakeIntensity = 0;
let flashAlpha = 0;
let keys = {};

function initStars() {
    stars = [];
    for (let i = 0; i < 80; i++) {
        stars.push({
            x: Math.random() * W,
            y: Math.random() * H,
            size: 0.5 + Math.random() * 2,
            speed: 0.2 + Math.random() * 0.8,
            bright: 0.3 + Math.random() * 0.7,
        });
    }
}

function reset() {
    ship.x = W / 2;
    ship.y = H - 70;
    ship.invincible = 0;
    asteroids = [];
    enemies = [];
    particles = [];
    floatTexts = [];
    score = 0;
    wave = 1;
    enemiesSpawnedThisWave = 0;
    enemiesPerWave = 4;
    frameCount = 0;
    spawnTimer = 0;
    waveTimer = 0;
    shakeIntensity = 0;
    flashAlpha = 0;
    gameRunning = true;
    gameoverOverlay.classList.remove('visible');
    scoreEl.textContent = '0';
    waveEl.textContent = '1';
    initStars();
}

// --- ENTITIES ---
function spawnAsteroid() {
    const minSize = 18 + wave * 2;
    const maxSize = 28 + wave * 3;
    const size = minSize + Math.random() * (maxSize - minSize);
    const speed = 1 + Math.random() * 1.5 + wave * 0.15;
    const vertices = [];
    const sides = 5 + Math.floor(Math.random() * 5);
    for (let i = 0; i < sides; i++) {
        const angle = (i / sides) * Math.PI * 2;
        const r = size * (0.7 + Math.random() * 0.3);
        vertices.push({ x: Math.cos(angle) * r, y: Math.sin(angle) * r });
    }
    const wobbleAmp = 0.2 + Math.random() * 0.3;
    const wobbleSpeed = 0.02 + Math.random() * 0.03;
    asteroids.push({
        x: 20 + Math.random() * (W - 40),
        y: -size,
        vx: (Math.random() - 0.5) * (0.3 + wave * 0.05),
        vy: speed,
        vertices,
        size,
        rotation: 0,
        rotSpeed: (Math.random() - 0.5) * 0.04,
        wobbleAmp,
        wobbleSpeed,
        wobblePhase: Math.random() * Math.PI * 2,
    });
}

function spawnEnemy() {
    const types = ['diver', 'zigzag'];
    const type = types[Math.floor(Math.random() * types.length)];
    const scale = 1 + (wave - 1) * 0.08;
    const w = 24 * scale;
    const h = 28 * scale;
    const baseSpeed = 1.2 + Math.random() * 0.8 + wave * 0.12;
    enemies.push({
        type,
        x: 20 + Math.random() * (W - 40),
        y: -h,
        vx: type === 'zigzag' ? (Math.random() > 0.5 ? 1 : -1) * (1.5 + wave * 0.15) : (Math.random() - 0.5) * 1,
        vy: baseSpeed,
        w, h,
        phase: Math.random() * Math.PI * 2,
        wobbleFreq: 0.03 + Math.random() * 0.02,
        wobbleAmp: 30 + Math.random() * 20,
        trailTimer: 0,
    });
}

// --- PARTICLES ---
function emitExplosion(x, y, color, count, spread) {
    spread = spread || 4;
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * spread;
        particles.push({
            x, y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 20 + Math.random() * 30,
            maxLife: 20 + Math.random() * 30,
            size: 1 + Math.random() * 3,
            color,
        });
    }
}

function emitDebris(x, y, count) {
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 2;
        particles.push({
            x: x + (Math.random() - 0.5) * 10,
            y: y + (Math.random() - 0.5) * 10,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 15 + Math.random() * 15,
            maxLife: 30,
            size: 1 + Math.random() * 2,
            color: RED,
            decay: true,
        });
    }
}

function emitTrail(x, y) {
    const len = 6 + Math.floor(Math.random() * 4);
    for (let i = 0; i < len; i++) {
        particles.push({
            x: x + (Math.random() - 0.5) * 6,
            y: y + 14 + Math.random() * 4,
            vx: (Math.random() - 0.5) * 0.5,
            vy: 0.8 + Math.random() * 1.5,
            life: 8 + Math.random() * 12,
            maxLife: 20,
            size: 1 + Math.random() * 2.5,
            color: i < 2 ? ORANGE : GREEN,
        });
    }
}

function emitScoreText(x, y, pts) {
    floatTexts.push({
        x, y,
        text: `+${pts}`,
        life: 40,
        maxLife: 40,
        vy: -1.5,
    });
}

function emitAsteroidTrail(a) {
    if (frameCount % 3 !== 0) return;
    for (let i = 0; i < 2; i++) {
        particles.push({
            x: a.x + (Math.random() - 0.5) * a.size * 0.5,
            y: a.y + a.size * 0.3,
            vx: (Math.random() - 0.5) * 0.2,
            vy: 0.3 + Math.random() * 0.5,
            life: 12 + Math.random() * 8,
            maxLife: 20,
            size: 0.5 + Math.random() * 1.5,
            color: 'rgba(255, 51, 51, 0.4)',
        });
    }
}

function emitEnemyTrail(e) {
    if (frameCount % 2 !== 0) return;
    particles.push({
        x: e.x + (Math.random() - 0.5) * e.w * 0.3,
        y: e.y + e.h * 0.4,
        vx: (Math.random() - 0.5) * 0.2,
        vy: 0.5 + Math.random() * 0.8,
        life: 8 + Math.random() * 6,
        maxLife: 14,
        size: 0.5 + Math.random() * 1.5,
        color: 'rgba(255, 51, 51, 0.5)',
    });
}

// --- SHAKE ---
function triggerShake(intensity) {
    shakeIntensity = Math.max(shakeIntensity, intensity);
}

// --- COLLISION ---
function rectCircleCollision(rx, ry, rw, rh, cx, cy, cr) {
    const nearX = Math.max(rx, Math.min(cx, rx + rw));
    const nearY = Math.max(ry, Math.min(cy, ry + rh));
    const dx = cx - nearX;
    const dy = cy - nearY;
    return dx * dx + dy * dy < cr * cr;
}

function shipHitAsteroid(a) {
    const sx = ship.x - ship.w / 2;
    const sy = ship.y - ship.h / 2;
    return rectCircleCollision(sx, sy, ship.w, ship.h, a.x, a.y, a.size * 0.7);
}

function shipHitEnemy(e) {
    const sx = ship.x - ship.w / 2;
    const sy = ship.y - ship.h / 2;
    return sx < e.x + e.w / 2 && sx + ship.w > e.x - e.w / 2 &&
           sy < e.y + e.h / 2 && sy + ship.h > e.y - e.h / 2;
}

function nearMissAsteroid(a) {
    const margin = 30;
    const sx = ship.x - ship.w / 2 - margin;
    const sy = ship.y - ship.h / 2 - margin;
    const sw = ship.w + margin * 2;
    const sh = ship.h + margin * 2;
    return rectCircleCollision(sx, sy, sw, sh, a.x, a.y, a.size * 0.7);
}

// --- DRAW ---
function drawShip() {
    ctx.save();
    ctx.translate(ship.x, ship.y);

    if (ship.invincible > 0 && Math.floor(ship.invincible / 4) % 2 === 0) {
        ctx.globalAlpha = 0.25;
    }

    // Thruster flame
    const flicker = 0.8 + Math.random() * 0.4;
    ctx.shadowColor = ORANGE;
    ctx.shadowBlur = 15;
    ctx.fillStyle = ORANGE;
    ctx.beginPath();
    ctx.moveTo(-6, ship.h / 2 - 2);
    ctx.lineTo(0, ship.h / 2 + 8 * flicker);
    ctx.lineTo(6, ship.h / 2 - 2);
    ctx.fill();

    ctx.shadowColor = GREEN;
    ctx.shadowBlur = 15;
    ctx.strokeStyle = GREEN;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, -ship.h / 2);
    ctx.lineTo(-ship.w / 2, ship.h / 2);
    ctx.lineTo(-ship.w / 4, ship.h / 3);
    ctx.lineTo(0, ship.h / 2.5);
    ctx.lineTo(ship.w / 4, ship.h / 3);
    ctx.lineTo(ship.w / 2, ship.h / 2);
    ctx.closePath();
    ctx.stroke();

    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(0, 255, 65, 0.05)';
    ctx.fill();
    ctx.restore();
}

function drawAsteroid(a) {
    a.rotation += a.rotSpeed;
    a.x += Math.sin(frameCount * a.wobbleSpeed + a.wobblePhase) * a.wobbleAmp * 0.5;

    ctx.save();
    ctx.translate(a.x, a.y);
    ctx.rotate(a.rotation);

    ctx.shadowColor = RED;
    ctx.shadowBlur = 8;
    ctx.strokeStyle = RED;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    a.vertices.forEach((v, i) => {
        if (i === 0) ctx.moveTo(v.x, v.y);
        else ctx.lineTo(v.x, v.y);
    });
    ctx.closePath();
    ctx.stroke();

    ctx.shadowBlur = 0;
    const innerAlpha = 0.03 + Math.sin(frameCount * 0.05 + a.wobblePhase) * 0.02;
    ctx.fillStyle = `rgba(255, 51, 51, ${innerAlpha})`;
    ctx.fill();
    ctx.restore();
}

function drawEnemy(e) {
    if (e.type === 'zigzag') {
        e.x += Math.sin(frameCount * e.wobbleFreq + e.phase) * 0.3;
    }

    ctx.save();
    ctx.translate(e.x, e.y);

    ctx.shadowColor = RED;
    ctx.shadowBlur = 10;
    ctx.strokeStyle = RED;
    ctx.lineWidth = 2;

    const hw = e.w / 2;
    const hh = e.h / 2;

    ctx.beginPath();
    ctx.moveTo(0, hh);
    ctx.lineTo(hw, -hh);
    ctx.lineTo(hw * 0.3, -hh * 0.5);
    ctx.lineTo(0, -hh * 0.7);
    ctx.lineTo(-hw * 0.3, -hh * 0.5);
    ctx.lineTo(-hw, -hh);
    ctx.closePath();
    ctx.stroke();

    // Cockpit glow
    ctx.shadowBlur = 0;
    ctx.fillStyle = `rgba(255, 51, 51, ${0.05 + Math.sin(frameCount * 0.08) * 0.03})`;
    ctx.fill();

    ctx.strokeStyle = RED;
    ctx.lineWidth = 1;
    ctx.shadowColor = RED;
    ctx.shadowBlur = 5;
    ctx.beginPath();
    ctx.moveTo(0, -hh * 0.3);
    ctx.lineTo(0, hh);
    ctx.stroke();

    ctx.restore();
}

function drawParticles() {
    particles.forEach(p => {
        const alpha = p.life / p.maxLife;
        ctx.globalAlpha = alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.decay ? 2 : 6;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
    });
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
}

function drawStars() {
    stars.forEach(s => {
        const pulse = 0.7 + Math.sin(frameCount * 0.02 + s.x) * 0.3;
        ctx.globalAlpha = s.bright * pulse;
        ctx.fillStyle = GREEN;
        ctx.shadowColor = GREEN;
        ctx.shadowBlur = s.size * 2;
        ctx.fillRect(s.x - s.size / 2, s.y - s.size / 2, s.size, s.size);
    });
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
}

function drawFloatTexts() {
    floatTexts.forEach(ft => {
        const alpha = ft.life / ft.maxLife;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = ORANGE;
        ctx.font = '14px "Share Tech Mono", monospace';
        ctx.textAlign = 'center';
        ctx.shadowColor = ORANGE;
        ctx.shadowBlur = 10;
        ctx.fillText(ft.text, ft.x, ft.y);
        ctx.restore();
    });
}

function drawWaveAnnounce() {
    if (waveTimer > 0 && waveTimer < 120) {
        ctx.save();
        const alpha = Math.min(1, (120 - waveTimer) / 30);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = GREEN;
        ctx.font = '22px "Share Tech Mono", monospace';
        ctx.textAlign = 'center';
        ctx.shadowColor = GREEN;
        ctx.shadowBlur = 30;
        ctx.fillText(`◉ WAVE ${wave} ◉`, W / 2, H / 2 - 12);

        ctx.shadowBlur = 10;
        ctx.font = '12px "Share Tech Mono", monospace';
        ctx.fillStyle = GREEN_DIM;
        ctx.fillText(`asteroids x${Math.floor((wave + 3) / 2)}`, W / 2, H / 2 + 18);
        ctx.restore();
    }
}

function drawFlash() {
    if (flashAlpha > 0) {
        ctx.save();
        ctx.globalAlpha = flashAlpha;
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, W, H);
        ctx.restore();
    }
}

// --- UPDATE STARS ---
function updateStars() {
    stars.forEach(s => {
        s.y += s.speed;
        if (s.y > H) {
            s.y = -2;
            s.x = Math.random() * W;
        }
    });
}

// --- UPDATE ---
function update() {
    if (!gameRunning) return;
    frameCount++;

    // Movement (teclado)
    if (keys['ArrowLeft'] && ship.x - ship.w / 2 > 0) ship.x -= ship.speed;
    if (keys['ArrowRight'] && ship.x + ship.w / 2 < W) ship.x += ship.speed;
    if (keys['ArrowUp'] && ship.y - ship.h / 2 > 0) ship.y -= ship.speed;
    if (keys['ArrowDown'] && ship.y + ship.h / 2 < H) ship.y += ship.speed;

    // Movement (joystick)
    if (jActive) {
        ship.x = Math.max(ship.w / 2, Math.min(W - ship.w / 2, ship.x + jDx * ship.speed * 1.5));
        ship.y = Math.max(ship.h / 2, Math.min(H - ship.h / 2, ship.y + jDy * ship.speed * 1.5));
    }

    if (frameCount % 2 === 0) emitTrail(ship.x, ship.y);
    if (ship.invincible > 0) ship.invincible--;
    if (waveTimer > 0) waveTimer--;
    if (shakeIntensity > 0) shakeIntensity *= 0.9;
    if (shakeIntensity < 0.1) shakeIntensity = 0;
    if (flashAlpha > 0) flashAlpha *= 0.85;
    if (flashAlpha < 0.01) flashAlpha = 0;

    shakeX = (Math.random() - 0.5) * shakeIntensity;
    shakeY = (Math.random() - 0.5) * shakeIntensity;

    updateStars();

    // Spawn asteroids
    spawnTimer++;
    const spawnRate = Math.max(15, 50 - wave * 3);
    if (spawnTimer > spawnRate) {
        spawnTimer = 0;
        spawnAsteroid();
    }

    if (wave >= 3 && frameCount % 200 === 0) spawnAsteroid();
    if (wave >= 6 && frameCount % 150 === 0) spawnAsteroid();

    // Spawn enemies
    if (enemiesSpawnedThisWave < enemiesPerWave && frameCount % Math.max(60, 120 - wave * 5) === 0) {
        spawnEnemy();
        enemiesSpawnedThisWave++;
    }

    // Wave progression: new wave every ~15 seconds
    if (frameCount > 0 && frameCount % (60 * 15) === 0) {
        wave++;
        enemiesPerWave = 4 + wave * 2;
        enemiesSpawnedThisWave = 0;
        waveTimer = 150;
        waveEl.textContent = wave;
        triggerShake(4);
    }

    // Update asteroids
    for (let i = asteroids.length - 1; i >= 0; i--) {
        const a = asteroids[i];
        a.x += a.vx;
        a.y += a.vy;

        emitAsteroidTrail(a);

        if (a.y > H + a.size) {
            const pts = Math.floor(a.size / 5) + wave;
            score += pts;
            scoreEl.textContent = score;
            emitScoreText(a.x, H - 30, pts);
            emitDebris(a.x, H - 10, 5);
            asteroids.splice(i, 1);
            continue;
        }

        if (a.x < -a.size || a.x > W + a.size) {
            asteroids.splice(i, 1);
            continue;
        }

        if (ship.invincible <= 0) {
            if (shipHitAsteroid(a)) {
                gameOver();
                return;
            }
            if (nearMissAsteroid(a)) {
                triggerShake(2);
            }
        }
    }

    // Update enemies
    for (let i = enemies.length - 1; i >= 0; i--) {
        const e = enemies[i];
        e.x += e.vx;
        e.y += e.vy;

        emitEnemyTrail(e);

        if (e.type === 'diver' && e.vy < 4) {
            e.vy += 0.01;
        }

        if (e.x < -e.w || e.x > W + e.w || e.y > H + e.h) {
            enemies.splice(i, 1);
            continue;
        }

        if (ship.invincible <= 0 && shipHitEnemy(e)) {
            gameOver();
            return;
        }
    }

    // Update particles
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.decay) {
            p.size *= 0.97;
        }
        p.life--;
        if (p.life <= 0) particles.splice(i, 1);
    }

    // Update float texts
    for (let i = floatTexts.length - 1; i >= 0; i--) {
        const ft = floatTexts[i];
        ft.y += ft.vy;
        ft.life--;
        if (ft.life <= 0) floatTexts.splice(i, 1);
    }
}

function gameOver() {
    gameRunning = false;
    triggerShake(20);
    flashAlpha = 0.6;
    emitExplosion(ship.x, ship.y, RED, 60, 6);
    emitExplosion(ship.x, ship.y, ORANGE, 30, 5);
    emitExplosion(ship.x, ship.y, '#fff', 15, 3);
    finalScoreEl.textContent = score;
    finalWaveEl.textContent = wave;
    setTimeout(() => {
        gameoverOverlay.classList.add('visible');
    }, 700);
}

// --- RENDER ---
function render() {
    ctx.save();
    ctx.translate(shakeX, shakeY);
    ctx.clearRect(-10, -10, W + 20, H + 20);

    drawStars();
    drawParticles();
    asteroids.forEach(drawAsteroid);
    enemies.forEach(drawEnemy);
    drawFloatTexts();
    drawWaveAnnounce();

    if (gameRunning || ship.invincible > 0) {
        drawShip();
    }

    drawFlash();
    ctx.restore();
}

// --- GAME LOOP ---
function loop() {
    update();
    render();
    requestAnimationFrame(loop);
}

// --- INPUT (TECLADO) ---
document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
    }
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// --- INPUT (JOYSTICK TÁCTIL) ---
const joystick = document.getElementById('joystick');
const knob = document.getElementById('joystick-knob');
const J_RADIUS = 35;
let jActive = false;
let jTouchId = null;
let jDx = 0, jDy = 0;

function handleJoystickStart(t) {
    jActive = true;
    jTouchId = t.identifier;
    knob.classList.add('active');
}

function handleJoystickMove(t) {
    if (!jActive) return;
    const rect = joystick.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    let dx = t.clientX - cx;
    let dy = t.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = J_RADIUS;
    if (dist > maxDist) {
        dx = (dx / dist) * maxDist;
        dy = (dy / dist) * maxDist;
    }
    jDx = dx / maxDist;
    jDy = dy / maxDist;
    knob.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
}

function handleJoystickEnd() {
    jActive = false;
    jTouchId = null;
    jDx = 0;
    jDy = 0;
    knob.style.transform = 'translate(-50%, -50%)';
    knob.classList.remove('active');
}

joystick.addEventListener('touchstart', (e) => {
    e.preventDefault();
    handleJoystickStart(e.changedTouches[0]);
}, { passive: false });

document.addEventListener('touchmove', (e) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
        if (e.changedTouches[i].identifier === jTouchId) {
            e.preventDefault();
            handleJoystickMove(e.changedTouches[i]);
        }
    }
}, { passive: false });

document.addEventListener('touchend', (e) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
        if (e.changedTouches[i].identifier === jTouchId) {
            handleJoystickEnd();
        }
    }
});

document.addEventListener('touchcancel', () => {
    if (jActive) handleJoystickEnd();
});

// --- RESTART ---
restartBtn.addEventListener('click', reset);

// --- START ---
reset();
loop();
