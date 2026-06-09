/**
 * NEON RUNNER - Enhanced Endless Runner Game
 * Powerups, double jump, background music, spectrum visualizer
 */

// ============================================
// AUDIO SYSTEM
// ============================================
const AudioSystem = {
    ctx: null,
    analyser: null,
    dataArray: null,
    spectrumBars: [],
    bgMusic: null,
    bgGain: null,
    
    init() {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.analyser = this.ctx.createAnalyser();
        this.analyser.fftSize = 64;
        this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
        
        createSpectrumBars();
    },
    
    getAnalyser() {
        if (!this.analyser) this.init();
        return this.analyser;
    },
    
    playJump() {
        if (!this.ctx) this.init();
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        gain.connect(this.analyser);
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.1);
        
        gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);
        
        osc.start(this.ctx.currentTime);
        osc.stop(this.ctx.currentTime + 0.15);
    },
    
    playDoubleJump() {
        if (!this.ctx) this.init();
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        gain.connect(this.analyser);
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.08);
        
        gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);
        
        osc.start(this.ctx.currentTime);
        osc.stop(this.ctx.currentTime + 0.12);
    },
    
    playScore() {
        if (!this.ctx) this.init();
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        gain.connect(this.analyser);
        
        osc.type = 'square';
        osc.frequency.setValueAtTime(880, this.ctx.currentTime);
        osc.frequency.setValueAtTime(1100, this.ctx.currentTime + 0.05);
        
        gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
        
        osc.start(this.ctx.currentTime);
        osc.stop(this.ctx.currentTime + 0.1);
    },
    
    playPowerup() {
        if (!this.ctx) this.init();
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        gain.connect(this.analyser);
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523, this.ctx.currentTime);
        osc.frequency.setValueAtTime(659, this.ctx.currentTime + 0.1);
        osc.frequency.setValueAtTime(784, this.ctx.currentTime + 0.2);
        osc.frequency.setValueAtTime(1047, this.ctx.currentTime + 0.3);
        
        gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.4);
        
        osc.start(this.ctx.currentTime);
        osc.stop(this.ctx.currentTime + 0.4);
    },
    
    playGameOver() {
        if (!this.ctx) this.init();
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        gain.connect(this.analyser);
        
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 0.5);
        
        gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.5);
        
        osc.start(this.ctx.currentTime);
        osc.stop(this.ctx.currentTime + 0.5);
    },
    
    startBgMusic() {
        if (!this.ctx) this.init();
        if (this.bgMusic) return;
        
        this.bgGain = this.ctx.createGain();
        this.bgGain.gain.setValueAtTime(0.15, this.ctx.currentTime);
        this.bgGain.connect(this.ctx.destination);
        this.bgGain.connect(this.analyser);
        
        const baseFreq = 110;
        const notes = [110, 130.81, 146.83, 164.81, 174.61, 196, 220, 196, 174.61, 146.83, 130.81, 110];
        let noteIndex = 0;
        
        const playNote = () => {
            if (!gameState.isRunning || !this.ctx) return;
            
            const osc = this.ctx.createOscillator();
            const noteGain = this.ctx.createGain();
            
            osc.type = 'square';
            osc.frequency.setValueAtTime(notes[noteIndex], this.ctx.currentTime);
            noteGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
            noteGain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
            
            osc.connect(noteGain);
            noteGain.connect(this.bgGain);
            
            osc.start(this.ctx.currentTime);
            osc.stop(this.ctx.currentTime + 0.2);
            
            noteIndex = (noteIndex + 1) % notes.length;
            setTimeout(playNote, 200);
        };
        
        playNote();
    },
    
    stopBgMusic() {
        if (this.bgGain) {
            this.bgGain.disconnect();
            this.bgGain = null;
        }
    },
    
    updateSpectrum() {
        if (!this.analyser || !gameState.isRunning) return;
        
        this.analyser.getByteFrequencyData(this.dataArray);
        
        this.spectrumBars.forEach((bar, i) => {
            const value = this.dataArray[i] || 0;
            const height = (value / 255) * 30;
            bar.style.height = Math.max(3, height) + 'px';
            bar.style.opacity = value > 20 ? 1 : 0.3;
        });
    }
};

function createSpectrumBars() {
    // Spectrum visualizer disabled - uncomment to enable
    return;
    
    const container = document.getElementById('game-container');
    const spectrumContainer = document.createElement('div');
    spectrumContainer.id = 'spectrum';
    spectrumContainer.style.cssText = `
        position: absolute;
        bottom: 60px;
        left: 80px;
        display: flex;
        align-items: flex-end;
        gap: 3px;
        z-index: 15;
        opacity: 0.8;
    `;
    
    for (let i = 0; i < 16; i++) {
        const bar = document.createElement('div');
        bar.style.cssText = `
            width: 4px;
            height: 3px;
            background: linear-gradient(to top, #00ff00, #00ffff);
            border-radius: 2px;
            transition: height 0.05s ease-out;
            box-shadow: 0 0 8px #00ff00;
        `;
        spectrumContainer.appendChild(bar);
        AudioSystem.spectrumBars.push(bar);
    }
    
    container.appendChild(spectrumContainer);
}

// ============================================
// GAME CONFIGURATION
// ============================================
const CONFIG = {
    CONTAINER_WIDTH: 800,
    CONTAINER_HEIGHT: 400,

    PLAYER_WIDTH: 40,
    PLAYER_HEIGHT: 40,
    PLAYER_INITIAL_X: 80,
    GROUND_HEIGHT: 60,

    JUMP_FORCE: -14,
    DOUBLE_JUMP_FORCE: -12,
    GRAVITY: 0.65,
    MAX_JUMP_TIME: 180,
    
    INITIAL_SPEED: 5,
    MAX_SPEED: 16,
    SPEED_INCREMENT: 0.0008,
    
    LEVELS: [
        { speed: 5, interval: 1500, name: "FÁCIL" },
        { speed: 7, interval: 1200, name: "NORMAL" },
        { speed: 9, interval: 1000, name: "DIFÍCIL" },
        { speed: 11, interval: 800, name: "EXPERTO" },
        { speed: 13, interval: 600, name: "EXTREMO" },
        { speed: 15, interval: 450, name: "IMPOSIBLE" }
    ],
    
    MIN_OBSTACLE_WIDTH: 25,
    MAX_OBSTACLE_WIDTH: 55,
    MIN_OBSTACLE_HEIGHT: 35,
    MAX_OBSTACLE_HEIGHT: 70,
    
    PARTICLE_INTERVAL: 100,
    
    POWERUP_INTERVAL: 8000,
    POWERUP_DURATION: 5000,
};

// ============================================
// DOM ELEMENTS
// ============================================
const container = document.getElementById('game-container');
const player = document.getElementById('player');
const ground = document.getElementById('ground');
const groundLines = document.getElementById('ground-lines');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('high-score');
const levelElement = document.getElementById('level');
const overlay = document.getElementById('overlay');
const finalScoreElement = document.getElementById('final-score');
const finalHighScoreElement = document.getElementById('final-high-score');
const speedLinesContainer = document.getElementById('speed-lines');
const pauseMenu = document.getElementById('pause-menu');

// ============================================
// GAME STATE
// ============================================
let gameState = {
    isRunning: false,
    isPaused: false,
    isGameOver: false,
    score: 0,
    highScore: parseInt(localStorage.getItem('neonRunnerHighScore')) || 0,
    gameSpeed: CONFIG.INITIAL_SPEED,
    currentLevel: 0,
    groundOffset: 0,
    lastObstacleTime: 0,
    playerY: 0,
    playerVelocityY: 0,
    isJumping: false,
    canDoubleJump: true,
    jumpPressed: false,
    jumpStartTime: 0,
    lastParticleTime: 0,
    activePowerup: null,
    powerupEndTime: 0,
    lastPowerupTime: 0,
};

let obstacles = [];
let powerups = [];
let animationFrameId = null;
let lastTime = 0;
let bgElements = { far: [], mid: [] };

// ============================================
// INITIALIZATION
// ============================================

function init() {
    createBackgrounds();
    highScoreElement.textContent = `BEST: ${gameState.highScore}`;
    
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);
    
    createPowerupIndicator();
    startPreviewMode();
}

function createPowerupIndicator() {
    const indicator = document.createElement('div');
    indicator.id = 'powerup-indicator';
    container.appendChild(indicator);
}

function createBackgrounds() {
    const bgFar = document.getElementById('bg-far');
    for (let i = 0; i < 20; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * (CONFIG.CONTAINER_HEIGHT - CONFIG.GROUND_HEIGHT - 80) + 'px';
        star.style.width = star.style.height = Math.random() * 2 + 1 + 'px';
        star.style.opacity = Math.random() * 0.5 + 0.2;
        bgFar.appendChild(star);
        bgElements.far.push({ el: star, speed: 0.2 });
    }
    
    const bgMid = document.getElementById('bg-mid');
    for (let i = 0; i < 15; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * (CONFIG.CONTAINER_HEIGHT - CONFIG.GROUND_HEIGHT - 100) + 'px';
        star.style.width = star.style.height = Math.random() * 3 + 2 + 'px';
        star.style.opacity = Math.random() * 0.7 + 0.3;
        bgMid.appendChild(star);
        bgElements.mid.push({ el: star, speed: 0.5 });
    }
}

function startPreviewMode() {
    gameLoopPreview();
}

function gameLoopPreview() {
    if (gameState.isRunning || gameState.isGameOver) return;
    
    gameState.groundOffset = (gameState.groundOffset + 2) % 60;
    ground.style.transform = `translateX(-${gameState.groundOffset}px)`;
    groundLines.style.transform = `translateX(-${gameState.groundOffset}px)`;
    
    updateBackgrounds(0.5);
    
    animationFrameId = requestAnimationFrame(gameLoopPreview);
}

// ============================================
// INPUT HANDLING
// ============================================

function handleKeyDown(event) {
    if (event.code === 'Space') {
        event.preventDefault();
        
        if (gameState.isPaused) {
            togglePause();
        } else if (!gameState.isRunning && !gameState.isGameOver) {
            startGame();
        } else if (gameState.isGameOver) {
            startGame();
        } else if (!gameState.isJumping) {
            startJump();
        } else if (gameState.canDoubleJump) {
            doDoubleJump();
        }
        
        gameState.jumpPressed = true;
    }
    
    if (event.code === 'KeyP') {
        event.preventDefault();
        if (gameState.isRunning && !gameState.isGameOver) {
            togglePause();
        }
    }
}

function handleKeyUp(event) {
    if (event.code === 'Space') {
        gameState.jumpPressed = false;
    }
}

function handleTouchStart(event) {
    event.preventDefault();
    
    if (!gameState.isRunning || gameState.isGameOver) {
        startGame();
    } else if (!gameState.isJumping) {
        startGame();
    } else if (gameState.canDoubleJump) {
        doDoubleJump();
    }
    
    gameState.jumpPressed = true;
}

function handleTouchEnd(event) {
    gameState.jumpPressed = false;
}

function togglePause() {
    gameState.isPaused = !gameState.isPaused;
    
    if (gameState.isPaused) {
        pauseMenu.classList.remove('hidden');
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    } else {
        pauseMenu.classList.add('hidden');
        lastTime = performance.now();
        gameLoop(lastTime);
    }
}

// ============================================
// JUMP MECHANICS
// ============================================

function startJump() {
    gameState.isJumping = true;
    gameState.jumpStartTime = Date.now();
    gameState.playerVelocityY = CONFIG.JUMP_FORCE;
    gameState.canDoubleJump = true;
    
    player.classList.remove('player-running');
    player.classList.add('player-jumping');
    
    AudioSystem.playJump();
    createJumpParticles();
}

function doDoubleJump() {
    if (!gameState.canDoubleJump) return;
    
    gameState.canDoubleJump = false;
    gameState.playerVelocityY = CONFIG.DOUBLE_JUMP_FORCE;
    
    AudioSystem.playDoubleJump();
    createDoubleJumpParticles();
    
    player.style.transform = 'scale(0.9)';
    setTimeout(() => player.style.transform = 'scale(1)', 100);
}

function updateJump() {
    if (gameState.jumpPressed && 
        gameState.isJumping && 
        Date.now() - gameState.jumpStartTime < CONFIG.MAX_JUMP_TIME) {
        gameState.playerVelocityY -= 0.4;
    }
}

// ============================================
// PARTICLE SYSTEM
// ============================================

function createRunParticles() {
    const now = Date.now();
    if (now - gameState.lastParticleTime < CONFIG.PARTICLE_INTERVAL) return;
    if (gameState.isJumping) return;
    
    gameState.lastParticleTime = now;
    
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = (CONFIG.PLAYER_INITIAL_X - 5) + 'px';
    particle.style.bottom = (CONFIG.GROUND_HEIGHT + 10) + 'px';
    particle.style.background = `hsl(${120 + Math.random() * 40}, 100%, 50%)`;
    particle.style.boxShadow = `0 0 10px ${particle.style.background}`;
    
    const size = Math.random() * 4 + 3;
    particle.style.width = particle.style.height = size + 'px';
    
    container.appendChild(particle);
    
    const duration = 500;
    const startTime = Date.now();
    
    function animateParticle() {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / duration;
        
        if (progress >= 1) {
            particle.remove();
            return;
        }
        
        const x = CONFIG.PLAYER_INITIAL_X - 5 - progress * 30;
        const y = CONFIG.GROUND_HEIGHT + 10 + Math.sin(progress * Math.PI) * 20;
        const opacity = 1 - progress;
        
        particle.style.left = x + 'px';
        particle.style.bottom = y + 'px';
        particle.style.opacity = opacity;
        
        requestAnimationFrame(animateParticle);
    }
    
    animateParticle();
}

function createJumpParticles() {
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = (CONFIG.PLAYER_INITIAL_X + Math.random() * 20) + 'px';
            particle.style.bottom = (CONFIG.GROUND_HEIGHT + Math.random() * 20) + 'px';
            particle.style.background = `hsl(${120 + Math.random() * 40}, 100%, 50%)`;
            particle.style.boxShadow = `0 0 15px ${particle.style.background}`;
            particle.style.width = particle.style.height = (Math.random() * 6 + 4) + 'px';
            
            container.appendChild(particle);
            
            const duration = 400;
            const startTime = Date.now();
            const vx = (Math.random() - 0.5) * 8;
            const vy = Math.random() * 5 + 3;
            
            function animate() {
                const elapsed = Date.now() - startTime;
                const progress = elapsed / duration;
                
                if (progress >= 1) {
                    particle.remove();
                    return;
                }
                
                particle.style.left = (CONFIG.PLAYER_INITIAL_X + Math.random() * 20 + vx * progress * 30) + 'px';
                particle.style.bottom = (CONFIG.GROUND_HEIGHT + vy * progress * 30) + 'px';
                particle.style.opacity = 1 - progress;
                
                requestAnimationFrame(animate);
            }
            
            animate();
        }, i * 30);
    }
}

function createDoubleJumpParticles() {
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = (CONFIG.PLAYER_INITIAL_X + Math.random() * 30) + 'px';
            particle.style.bottom = (CONFIG.GROUND_HEIGHT + Math.random() * 30 + gameState.playerY) + 'px';
            particle.style.background = `hsl(${60 + Math.random() * 60}, 100%, 60%)`;
            particle.style.boxShadow = `0 0 20px ${particle.style.background}`;
            particle.style.width = particle.style.height = (Math.random() * 8 + 5) + 'px';
            
            container.appendChild(particle);
            
            const duration = 300;
            const startTime = Date.now();
            const vx = (Math.random() - 0.5) * 15;
            const vy = Math.random() * 10 + 5;
            
            function animate() {
                const elapsed = Date.now() - startTime;
                const progress = elapsed / duration;
                
                if (progress >= 1) {
                    particle.remove();
                    return;
                }
                
                particle.style.left = (CONFIG.PLAYER_INITIAL_X + Math.random() * 30 + vx * progress * 20) + 'px';
                particle.style.bottom = (CONFIG.GROUND_HEIGHT + Math.random() * 30 + gameState.playerY + vy * progress * 20) + 'px';
                particle.style.opacity = 1 - progress;
                
                requestAnimationFrame(animate);
            }
            
            animate();
        }, i * 20);
    }
}

// ============================================
// POWERUPS SYSTEM
// ============================================

function createPowerup() {
    const goodTypes = ['star', 'shield', 'coin', 'slowmo'];
    const badTypes = ['boost', 'gravity'];
    
    // 60% good, 40% bad powerups
    const isGood = Math.random() < 0.6;
    const types = isGood ? goodTypes : badTypes;
    const type = types[Math.floor(Math.random() * types.length)];
    
    const powerup = document.createElement('div');
    powerup.className = `powerup ${type}`;
    powerup.style.left = CONFIG.CONTAINER_WIDTH + 'px';
    
    const height = CONFIG.GROUND_HEIGHT + 80 + Math.random() * 80;
    powerup.style.bottom = height + 'px';
    
    container.appendChild(powerup);
    
    powerups.push({
        element: powerup,
        x: CONFIG.CONTAINER_WIDTH,
        width: 30,
        height: 30,
        type: type,
        collected: false
    });
}

function updatePowerups() {
    const currentTime = Date.now();
    
    for (let i = powerups.length - 1; i >= 0; i--) {
        const p = powerups[i];
        p.x -= gameState.gameSpeed;
        
        if (p.x + p.width < -50 || p.collected) {
            p.element.remove();
            powerups.splice(i, 1);
            continue;
        }
        
        p.element.style.left = p.x + 'px';
        
        if (!p.collected && checkPowerupCollision(p)) {
            collectPowerup(p);
        }
    }
    
    if (currentTime - gameState.lastPowerupTime > CONFIG.POWERUP_INTERVAL) {
        createPowerup();
        gameState.lastPowerupTime = currentTime;
    }
}

function checkPowerupCollision(p) {
    const padding = 5;
    
    const playerLeft = CONFIG.PLAYER_INITIAL_X + padding;
    const playerRight = CONFIG.PLAYER_INITIAL_X + CONFIG.PLAYER_WIDTH - padding;
    const playerBottom = CONFIG.GROUND_HEIGHT + gameState.playerY + padding;
    const playerTop = playerBottom + CONFIG.PLAYER_HEIGHT - padding;
    
    const pLeft = p.x + padding;
    const pRight = p.x + p.width - padding;
    const pBottom = parseFloat(p.element.style.bottom);
    const pTop = pBottom + p.height;
    
    if (playerRight > pLeft && 
        playerLeft < pRight && 
        playerBottom < pTop && 
        playerTop > pBottom) {
        return true;
    }
    
    return false;
}

function collectPowerup(p) {
    p.collected = true;
    p.element.remove();
    
    AudioSystem.playPowerup();
    createPowerupCollectEffect(p);
    
    applyPowerup(p.type);
}

function createPowerupCollectEffect(p) {
    const colorMap = {
        star: '#ffff00',
        shield: '#00ffff',
        clock: '#ff00ff',
        coin: '#ffd700'
    };
    
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = p.x + 'px';
        particle.style.bottom = p.element.style.bottom;
        particle.style.background = colorMap[p.type];
        particle.style.boxShadow = `0 0 15px ${colorMap[p.type]}`;
        particle.style.width = particle.style.height = '8px';
        
        container.appendChild(particle);
        
        const duration = 400;
        const startTime = Date.now();
        const vx = (Math.random() - 0.5) * 10;
        const vy = Math.random() * 8 + 4;
        
        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / duration;
            
            if (progress >= 1) {
                particle.remove();
                return;
            }
            
            particle.style.left = (p.x + vx * progress * 30) + 'px';
            particle.style.bottom = (parseFloat(p.element.style.bottom) + vy * progress * 20) + 'px';
            particle.style.opacity = 1 - progress;
            particle.style.transform = `scale(${1 - progress})`;
            
            requestAnimationFrame(animate);
        }
        
        animate();
    }
}

function applyPowerup(type) {
    const indicator = document.getElementById('powerup-indicator');
    const duration = CONFIG.POWERUP_DURATION;
    
    gameState.activePowerup = type;
    gameState.powerupEndTime = Date.now() + duration;
    
    indicator.className = `active ${type}`;
    indicator.textContent = getPowerupText(type);
    
    if (type === 'shield') {
        player.classList.add('shield-active');
    }
    if (type === 'gravity') {
        player.classList.add('gravity-active');
    }
    if (type === 'slowmo' || type === 'boost') {
        player.style.boxShadow = `0 0 25px #8844ff, 0 0 50px rgba(136, 68, 255, 0.6)`;
    }
    if (type === 'boost') {
        player.style.boxShadow = `0 0 25px #ff4444, 0 0 50px rgba(255, 68, 68, 0.6)`;
    }
    
    setTimeout(() => {
        if (Date.now() >= gameState.powerupEndTime) {
            deactivatePowerup();
        }
    }, duration);
}

function getPowerupText(type) {
    const texts = {
        star: '⭐ INMORTAL',
        shield: '🛡 ESCUDO',
        coin: '💰 PUNTOS',
        slowmo: '🐢 CÁMARA LENTA',
        boost: '🚀 BOOST',
        gravity: '⬇️ GRAVEDAD'
    };
    return texts[type] || '';
}

function deactivatePowerup() {
    const indicator = document.getElementById('powerup-indicator');
    indicator.className = '';
    player.classList.remove('shield-active', 'gravity-active');
    player.style.boxShadow = '';
    gameState.activePowerup = null;
}

function updatePowerupEffect() {
    if (gameState.activePowerup && Date.now() >= gameState.powerupEndTime) {
        deactivatePowerup();
    }
}

function handlePowerupEffects() {
    if (!gameState.activePowerup) return;
    
    switch (gameState.activePowerup) {
        case 'star':
            gameState.gameSpeed = Math.max(CONFIG.INITIAL_SPEED, gameState.gameSpeed - 0.02);
            break;
        case 'coin':
            gameState.score += 2;
            break;
        case 'slowmo':
            gameState.gameSpeed = Math.max(CONFIG.INITIAL_SPEED, gameState.gameSpeed - 0.05);
            break;
        case 'boost':
            gameState.gameSpeed = Math.min(CONFIG.MAX_SPEED, gameState.gameSpeed + 0.04);
            break;
        case 'gravity':
            // Handled in updatePlayer
            break;
    }
}

// ============================================
// GAME LOGIC
// ============================================

function startGame() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    
    gameState = {
        isRunning: true,
        isPaused: false,
        isGameOver: false,
        score: 0,
        highScore: gameState.highScore,
        gameSpeed: CONFIG.INITIAL_SPEED,
        currentLevel: 0,
        groundOffset: 0,
        lastObstacleTime: Date.now(),
        lastPowerupTime: Date.now(),
        playerY: 0,
        playerVelocityY: 0,
        isJumping: false,
        canDoubleJump: true,
        jumpPressed: false,
        jumpStartTime: 0,
        lastParticleTime: 0,
        activePowerup: null,
        powerupEndTime: 0,
    };
    
    obstacles.forEach(obs => obs.element.remove());
    obstacles = [];
    
    powerups.forEach(p => p.element.remove());
    powerups = [];
    
    player.style.bottom = CONFIG.GROUND_HEIGHT + 'px';
    player.classList.add('player-running');
    player.classList.remove('player-jumping', 'shield-active');
    
overlay.classList.add('hidden');
    
    levelElement.textContent = '1';
    
    AudioSystem.startBgMusic();
    
    lastTime = performance.now();
    gameLoop(lastTime);
}

function gameLoop(currentTime) {
    if (!gameState.isRunning || gameState.isPaused) return;
    
    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;
    
    updatePlayer(deltaTime);
    updateObstacles(deltaTime);
    updatePowerups();
    updatePowerupEffect();
    handlePowerupEffects();
    updateDifficulty();
    updateScore();
    updateBackgrounds();
    updateGround();
    
    AudioSystem.updateSpectrum();
    
    if (!gameState.isJumping) {
        createRunParticles();
    }
    
    animationFrameId = requestAnimationFrame(gameLoop);
}

function updatePlayer(deltaTime) {
    let gravity = CONFIG.GRAVITY;
    if (gameState.activePowerup === 'gravity') {
        gravity = CONFIG.GRAVITY * 2;
    }
    
    gameState.playerVelocityY += gravity;
    gameState.playerY -= gameState.playerVelocityY;
    
    updateJump();
    
    if (gameState.playerY <= 0) {
        gameState.playerY = 0;
        gameState.playerVelocityY = 0;
        gameState.isJumping = false;
        gameState.canDoubleJump = true;
        player.classList.remove('player-jumping');
        player.classList.add('player-running');
    }
    
    player.style.bottom = (CONFIG.GROUND_HEIGHT + gameState.playerY) + 'px';
}

function updateObstacles(deltaTime) {
    const currentTime = Date.now();
    
    for (let i = obstacles.length - 1; i >= 0; i--) {
        const obs = obstacles[i];
        obs.x -= gameState.gameSpeed;
        
        if (obs.x + obs.width < -50) {
            obs.element.remove();
            obstacles.splice(i, 1);
            continue;
        }
        
        obs.element.style.left = obs.x + 'px';
        
        if (gameState.activePowerup === 'shield') {
            continue;
        }
        
        if (checkCollision(obs)) {
            gameOver();
            return;
        }
    }
    
    const levelConfig = CONFIG.LEVELS[gameState.currentLevel];
    const variation = (Math.random() * 0.4 + 0.8);
    const adjustedInterval = levelConfig.interval * variation;
    
    if (currentTime - gameState.lastObstacleTime > adjustedInterval) {
        createObstacle();
        gameState.lastObstacleTime = currentTime;
    }
}

function createObstacle() {
    const type = Math.random();
    let isTriangle = false;
    let isTall = false;
    let isWide = false;
    
    const level = gameState.currentLevel;
    
    if (type > 0.75) {
        isTriangle = true;
    } else if (type > 0.5 + level * 0.05) {
        isTall = true;
    } else if (type < 0.2 - level * 0.02) {
        isWide = true;
    }
    
    const width = isTriangle ? 50 : (Math.random() * (CONFIG.MAX_OBSTACLE_WIDTH - CONFIG.MIN_OBSTACLE_WIDTH) + CONFIG.MIN_OBSTACLE_WIDTH);
    const height = isTriangle ? 50 : (isTall ? CONFIG.MAX_OBSTACLE_HEIGHT : Math.random() * (CONFIG.MAX_OBSTACLE_HEIGHT - CONFIG.MIN_OBSTACLE_HEIGHT) + CONFIG.MIN_OBSTACLE_HEIGHT);
    
    const obstacle = document.createElement('div');
    let className = 'obstacle';
    if (isTriangle) className += ' triangle';
    if (isTall) className += ' tall';
    if (isWide) className += ' wide';
    className += ' active';
    
    obstacle.className = className;
    obstacle.style.width = isTriangle ? '50px' : width + 'px';
    obstacle.style.height = isTriangle ? '50px' : height + 'px';
    obstacle.style.left = CONFIG.CONTAINER_WIDTH + 'px';
    
    container.appendChild(obstacle);
    
    obstacles.push({
        element: obstacle,
        x: CONFIG.CONTAINER_WIDTH,
        width: isTriangle ? 50 : width,
        height: isTriangle ? 50 : height,
    });
}

function checkCollision(obs) {
    const padding = 8;
    
    const playerLeft = CONFIG.PLAYER_INITIAL_X + padding;
    const playerRight = CONFIG.PLAYER_INITIAL_X + CONFIG.PLAYER_WIDTH - padding;
    const playerBottom = CONFIG.GROUND_HEIGHT + gameState.playerY + padding;
    const playerTop = playerBottom + CONFIG.PLAYER_HEIGHT - padding;
    
    const obsLeft = obs.x + padding;
    const obsRight = obs.x + obs.width - padding;
    const obsBottom = CONFIG.GROUND_HEIGHT;
    const obsTop = CONFIG.GROUND_HEIGHT + obs.height;
    
    if (playerRight > obsLeft && 
        playerLeft < obsRight && 
        playerBottom < obsTop && 
        playerTop > obsBottom) {
        return true;
    }
    
    return false;
}

function updateDifficulty() {
    if (gameState.gameSpeed < CONFIG.MAX_SPEED) {
        gameState.gameSpeed += CONFIG.SPEED_INCREMENT;
    }
    
    for (let i = CONFIG.LEVELS.length - 1; i >= 0; i--) {
        if (gameState.gameSpeed >= CONFIG.LEVELS[i].speed) {
            if (gameState.currentLevel !== i) {
                gameState.currentLevel = i;
                levelElement.textContent = (i + 1);
            }
            break;
        }
    }
}

function updateScore() {
    gameState.score += 1;
    scoreElement.textContent = gameState.score;
    
    if (gameState.score % 500 === 0) {
        AudioSystem.playScore();
    }
}

function updateBackgrounds(speed = null) {
    const moveSpeed = speed || gameState.gameSpeed;
    
    bgElements.far.forEach(item => {
        let x = parseFloat(item.el.style.left);
        x -= moveSpeed * item.speed * 0.1;
        if (x < -5) x = 105;
        item.el.style.left = x + '%';
    });
    
    bgElements.mid.forEach(item => {
        let x = parseFloat(item.el.style.left);
        x -= moveSpeed * item.speed * 0.15;
        if (x < -5) x = 105;
        item.el.style.left = x + '%';
    });
}

function updateGround() {
    gameState.groundOffset = (gameState.groundOffset + gameState.gameSpeed) % 60;
    ground.style.transform = `translateX(-${gameState.groundOffset}px)`;
    groundLines.style.transform = `translateX(-${gameState.groundOffset}px)`;
}

function gameOver() {
    gameState.isRunning = false;
    gameState.isPaused = false;
    gameState.isGameOver = true;
    
    pauseMenu.classList.add('hidden');
    
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    
    AudioSystem.stopBgMusic();
    AudioSystem.playGameOver();
    createSpeedLines();
    
    if (gameState.score > gameState.highScore) {
        gameState.highScore = gameState.score;
        localStorage.setItem('neonRunnerHighScore', gameState.highScore);
    }
    
    levelElement.textContent = gameState.currentLevel + 1;
    
    finalScoreElement.textContent = `PUNTAJE: ${gameState.score}`;
    finalHighScoreElement.textContent = `MEJOR: ${gameState.highScore}`;
    overlay.querySelector('h1').textContent = 'GAME OVER';
    overlay.querySelector('.subtitle').textContent = `Nivel alcanzado: ${CONFIG.LEVELS[gameState.currentLevel].name}`;
    overlay.querySelector('.instruction').textContent = '[ PRESIONA ESPACIO ]';
    overlay.classList.remove('hidden');
    
    AudioSystem.spectrumBars.forEach(bar => {
        bar.style.height = '3px';
        bar.style.opacity = '0.3';
    });
    
    document.getElementById('powerup-indicator').className = '';
}

function createSpeedLines() {
    speedLinesContainer.innerHTML = '';
    speedLinesContainer.classList.add('active');
    
    for (let i = 0; i < 20; i++) {
        const line = document.createElement('div');
        line.className = 'speed-line';
        line.style.top = Math.random() * 100 + '%';
        line.style.left = Math.random() * 100 + '%';
        line.style.width = (Math.random() * 100 + 50) + 'px';
        speedLinesContainer.appendChild(line);
    }
    
    setTimeout(() => {
        speedLinesContainer.classList.remove('active');
    }, 300);
}

// ============================================
// START
// ============================================
init();