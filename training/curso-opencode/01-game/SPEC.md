# Neon Runner - Game Specification

## 1. Project Overview

**Project Name:** Neon Runner  
**Type:** 2D Endless Runner Browser Game  
**Core Functionality:** Infinite runner where player jumps over obstacles, collects powerups, and survives as long as possible  
**Target Users:** Casual gamers looking for quick, addictive gameplay

---

## 2. UI/UX Specification

### Layout Structure

- **Game Container:** 800x400px fixed aspect ratio
- **Responsive:** Scales to 95vw on mobile (max-height 400px)
- **Single HTML file split into:** `index.html`, `style.css`, `game.js`

### Visual Design

**Color Palette:**
- Background: `#0a0a1a` to `#1a1a2e` (gradient)
- Player: `#00ff00` (neon green)
- Ground: `#ff00ff` to `#aa00aa` (magenta gradient)
- Obstacles: `#ff3333` to `#cc0000` (red gradient)
- UI Text: `#00ffff` (cyan), `#ffff00` (yellow), `#ff00ff` (magenta)

**Typography:**
- Font: 'Courier New', monospace
- Title: 56px bold with glow effects
- HUD: 28px for score, 14px for high score
- Level indicator: 16px yellow

**Visual Effects:**
- Neon glow shadows on all game elements
- Parallax scrolling background (2 layers)
- Animated ground with scrolling lines
- Player running bob animation
- Obstacle pulse animation
- Particle systems (running, jumping, double jump, powerup collection)
- Speed lines on game over

### Components

**Player:**
- 40x40px neon green square
- Glowing eye detail
- Trail effect behind
- Shield effect when powered up

**Obstacles:**
- Rectangles (varying width 25-55px, height 35-70px)
- Triangles (50x50px)
- Tall variants (max height)
- Wide variants (reduced height)
- Pulsing glow animation

**Powerups:**
- ⭐ Star (Inmortal): Reduces speed, protects from obstacles
- 🛡 Shield: One-hit protection
- ⏱ Clock (Tiempo): Slows game speed
- 💰 Coin (Puntos): Bonus score

**HUD:**
- Score (top-right)
- High score (below score)
- Level indicator (top-left)
- Powerup indicator (near player)

**Overlay:**
- Start screen: Title, subtitle, instruction
- Game over: Final score, high score, level reached, restart instruction

---

## 3. Functionality Specification

### Core Features

**Movement:**
- Spacebar to jump
- Touch tap for mobile
- Double jump available (second press while airborne)

**Physics:**
- Gravity: 0.65
- Jump force: -14
- Double jump force: -12
- Variable jump height (hold space for higher jump)
- Delta-time based updates for consistent speed

**Difficulty Progression:**
- 6 levels: FÁCIL → IMPOSIBLE
- Speed increases: 5 → 16 (increment 0.0008/frame)
- Obstacle interval decreases: 1500ms → 450ms
- Random variation in spawn timing (80%-120%)

**Powerups:**
- Spawn every 8 seconds
- Duration: 5 seconds each
- Multiple can be active

**Scoring:**
- +1 point per frame
- +2 points with Coin powerup
- Sound effect every 500 points

### Audio System

**Web Audio API (no external files):**
- Jump sound (sine wave 400→800Hz)
- Double jump sound (triangle wave 600→1200Hz)
- Score milestone sound (square wave)
- Powerup collection (ascending arpeggio)
- Game over sound (descending sawtooth)
- Background music (looping 8-note sequence)

**Spectrum Visualizer:**
- 16 bars responding to audio frequencies
- Located near player

### Data Handling

- High score stored in localStorage (`neonRunnerHighScore`)
- No server-side storage

---

## 4. File Structure

```
curso-opencode/01-game/
├── SPEC.md        # This file
├── index.html    # HTML structure
├── style.css     # All styling
└── game.js       # Game logic
```

---

## 5. Acceptance Criteria

- [x] Game runs in browser without external dependencies
- [x] Player jumps with spacebar/touch
- [x] Double jump works
- [x] Obstacles spawn with variation
- [x] Difficulty increases over time
- [x] 4 powerup types work correctly
- [x] Background music plays
- [x] Sound effects for actions
- [x] Spectrum visualizer responds to audio
- [x] High score persists between sessions
- [x] Game over triggers on collision (unless shielded/starred)
- [x] Responsive design works on mobile
- [x] Visual polish: particles, glows, animations