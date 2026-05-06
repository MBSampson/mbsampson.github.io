# Wind Streak Particle System - Implementation Brief

## Context

You are modifying an existing single-file `index.html` personal portfolio website. The hero section is `<section id="hero">`. It already contains a `<canvas id="particle-canvas">` element and an existing particle script. You are replacing the particle system entirely.

The system has two layers:
- **Static ambient dots** - breathe in place with sub-pixel amplitude, no drift, no physics
- **Dynamic wind streaks** - travel left → right with three-layer curl, per-segment taper, and optional fork branching

Desktop gets full cursor interaction. Mobile gets auto-drift only. `prefers-reduced-motion` draws one static frame and stops.

---

## Step 1 - Verify the canvas element

Locate inside `<section id="hero">`:

```html
<canvas id="particle-canvas"></canvas>
```

If absent, add it as the **first child** of `<section id="hero">`, before all other children.

Ensure the CSS reads:

```css
#particle-canvas {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  pointer-events: none;
  z-index: 1;
}
```

---

## Step 2 - Remove the old particle script

Find the IIFE wrapping the existing canvas particle init. It begins with:

```js
(function(){
  const canvas = document.getElementById('particle-canvas');
```

Delete this entire IIFE from opening `(function(){` to closing `})();`. Do not touch any other script blocks.

---

## Step 3 - Insert the new particle script

Paste the following as a new `<script>` block just before the closing `</body>` tag, after all existing script blocks.

```html
<script>
/* ── WIND STREAK PARTICLE SYSTEM ─────────────────
   Scope: #hero section canvas only.
   Two layers: static ambient dots + dynamic wind streaks.
   Desktop: cursor proximity boosts + spawns streaks.
   Mobile:  auto-drift only, no cursor interaction.
   Accessibility: respects prefers-reduced-motion.
──────────────────────────────────────────────── */
(function(){

  const canvas = document.getElementById('particle-canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  const hero = document.getElementById('hero');

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = !window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  let W, H, t = 0;
  let mouse = { x: -999, y: -999 };
  let dots = [], streaks = [];
  let animId;

  /* Color palette - RGB string format for rgba() usage */
  const GOLD  = '201,169,97';
  const BLUE  = '74,127,181';
  const SAND  = '217,199,167';
  const BLUSH = '196,144,122';
  const DOT_COLS = [GOLD, GOLD, SAND, BLUE, BLUSH];
  const STK_COLS = [GOLD, GOLD, GOLD, GOLD, BLUE, SAND, BLUSH];

  function rnd(a, b) { return a + Math.random() * (b - a); }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  function resize() {
    W = canvas.width  = hero.offsetWidth;
    H = canvas.height = hero.offsetHeight;
  }

  /* ── STATIC DOT ───────────────────────────────
     Breathes in place with sub-pixel amplitude.
     No drift, no physics - purely atmospheric.
  ─────────────────────────────────────────────── */
  class Dot {
    constructor() {
      this.x   = rnd(0, W);
      this.y   = rnd(0, H);
      this.r   = rnd(0.6, 2.0);
      this.col = DOT_COLS[Math.floor(Math.random() * DOT_COLS.length)];
      this.a   = rnd(0.1, 0.45);
      this.ph  = rnd(0, Math.PI * 2);
      this.amp = rnd(0.08, 0.22);
      this.dx  = 0;
      this.dy  = 0;
    }
    update() {
      this.dx = Math.sin(t * 0.4 + this.ph) * this.amp;
      this.dy = Math.cos(t * 0.3 + this.ph * 1.3) * this.amp;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x + this.dx, this.y + this.dy, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.col},${this.a})`;
      ctx.fill();
    }
  }

  /* ── WIND STREAK ──────────────────────────────
     Travels left → right across the hero.
     Three-layer curl: primary wave + secondary
     ripple + tertiary micro-wobble.
     Per-segment thickness tapering.
     ~18% of streaks fork near their tail.
  ─────────────────────────────────────────────── */
  class Streak {
    constructor(mode) { this.reset(mode || 'init'); }

    reset(mode) {
      this.x     = mode === 'init' ? rnd(-W * 0.3, W * 1.15) : rnd(-W * 0.18, -12);
      this.y     = rnd(H * 0.04, H * 0.96);
      this.spd   = rnd(0.4, 2.1);
      this.col   = STK_COLS[Math.floor(Math.random() * STK_COLS.length)];
      this.base  = rnd(0.06, 0.28);
      this.thick = rnd(0.5, 2.2);

      /* Primary curl - large, slow wave */
      this.c1amp  = rnd(8, 55);
      this.c1freq = rnd(0.005, 0.016);
      this.c1ph   = rnd(0, Math.PI * 2);

      /* Secondary curl - tighter ripple */
      this.c2amp  = rnd(2, 18);
      this.c2freq = rnd(0.018, 0.048);
      this.c2ph   = rnd(0, Math.PI * 2);

      /* Tertiary wobble - micro noise feel */
      this.c3amp  = rnd(0.5, 4);
      this.c3freq = rnd(0.06, 0.14);
      this.c3ph   = rnd(0, Math.PI * 2);

      this.len     = rnd(80, 340);
      this.segs    = Math.max(10, Math.floor(this.len / 12));
      this.fadeIn  = rnd(0.08, 0.2);
      this.fadeOut = rnd(0.15, 0.3);
      this.age     = mode === 'init' ? rnd(0, 200) : 0;
      this.life    = rnd(200, 480);
      this.dead    = false;

      /* Fork branch */
      this.fork    = Math.random() < 0.18;
      this.forkAt  = rnd(0.55, 0.8);
      this.forkAng = rnd(0.15, 0.5) * (Math.random() < 0.5 ? 1 : -1);
      this.forkLen = rnd(0.2, 0.45);

      this.near    = false;
    }

    yAt(px) {
      return this.c1amp * Math.sin(px * this.c1freq + this.c1ph)
           + this.c2amp * Math.sin(px * this.c2freq + this.c2ph)
           + this.c3amp * Math.sin(px * this.c3freq + this.c3ph);
    }

    thickAt(frac) {
      const peak = 0.45;
      return frac < peak ? frac / peak : 1 - (frac - peak) / (1 - peak);
    }

    update() {
      this.age++;
      if(!isTouch) {
        const mdx = (this.x + this.len * 0.5) - mouse.x;
        const mdy = this.y - mouse.y;
        this.near = (mdx * mdx + mdy * mdy) < 18000;
      }
      this.x += this.near ? this.spd * 2.2 : this.spd;
      if(this.x > W + 380 || this.age > this.life) this.dead = true;
    }

    draw() {
      const prog  = this.age / this.life;
      const env   = prog < this.fadeIn
        ? prog / this.fadeIn
        : prog > 1 - this.fadeOut
          ? (1 - prog) / this.fadeOut
          : 1;
      const alpha = clamp(this.base * env * (this.near ? 1.8 : 1), 0, 1);
      if(alpha < 0.004) return;

      const segW  = this.len / this.segs;
      const boost = this.near ? 1.3 : 1;

      ctx.save();
      ctx.lineCap  = 'round';
      ctx.lineJoin = 'round';

      /* Main streak - drawn segment by segment for per-segment taper */
      for(let i = 0; i < this.segs; i++) {
        const frac0 = i / this.segs;
        const frac1 = (i + 1) / this.segs;
        const px0   = this.x + i * segW;
        const py0   = this.y + this.yAt(px0);
        const px1   = this.x + (i + 1) * segW;
        const py1   = this.y + this.yAt(px1);
        const tf    = this.thickAt((frac0 + frac1) * 0.5);

        ctx.beginPath();
        ctx.moveTo(px0, py0);
        ctx.lineTo(px1, py1);
        ctx.strokeStyle = `rgba(${this.col},${alpha * tf})`;
        ctx.lineWidth   = this.thick * tf * boost;
        ctx.stroke();
      }

      /* Fork branch */
      if(this.fork) {
        const forkStartSeg = Math.floor(this.forkAt * this.segs);
        const forkSegs     = Math.floor(this.forkLen * this.segs);

        for(let i = 0; i < forkSegs; i++) {
          const fi0  = forkStartSeg + i;
          const fi1  = fi0 + 1;
          const fp0x = this.x + fi0 * segW;
          const fp0y = this.y + this.yAt(fp0x)
                     + Math.sin(this.forkAng * (i / forkSegs) * Math.PI) * (i + 1) * 6;
          const fp1x = this.x + fi1 * segW;
          const fp1y = this.y + this.yAt(fp1x)
                     + Math.sin(this.forkAng * ((i + 1) / forkSegs) * Math.PI) * (i + 2) * 6;
          const fA   = alpha * (1 - i / forkSegs) * 0.7 * 0.6;
          const frac = fi0 / this.segs;

          ctx.beginPath();
          ctx.moveTo(fp0x, fp0y);
          ctx.lineTo(fp1x, fp1y);
          ctx.strokeStyle = `rgba(${this.col},${fA})`;
          ctx.lineWidth   = this.thick * this.thickAt(frac) * 0.55 * boost;
          ctx.stroke();
        }
      }

      /* Leading tip glow - desktop cursor only */
      if(this.near) {
        const tipX = this.x + this.len;
        const tipY = this.y + this.yAt(tipX);
        ctx.beginPath();
        ctx.arc(tipX, tipY, this.thick * 1.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.col},${alpha * 0.55})`;
        ctx.fill();
      }

      ctx.restore();
    }
  }

  /* ── RENDER LOOP ──────────────────────────────── */
  function loop() {
    ctx.clearRect(0, 0, W, H);
    t += 0.007;

    dots.forEach(d => { d.update(); d.draw(); });

    for(let i = 0; i < streaks.length; i++) {
      streaks[i].update();
      streaks[i].draw();
      if(streaks[i].dead) streaks[i].reset('mid');
    }

    animId = requestAnimationFrame(loop);
  }

  /* ── INIT ─────────────────────────────────────── */
  function init() {
    resize();
    dots    = Array.from({ length: 80 }, () => new Dot());
    streaks = Array.from({ length: 26 }, () => new Streak('init'));

    if(prefersReduced) {
      dots.forEach(d => d.draw());
      return;
    }

    loop();
  }

  /* ── CURSOR BURST - desktop only ─────────────── */
  let burstCD = 0;
  if(!isTouch) {
    hero.addEventListener('mousemove', e => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      if(burstCD-- > 0) return;
      burstCD = 10;
      if(streaks.length >= 42) return;
      const s  = new Streak('mid');
      s.x      = mouse.x - rnd(8, 90);
      s.y      = mouse.y + rnd(-50, 50);
      s.spd    = rnd(1.2, 2.8);
      s.base   = rnd(0.14, 0.3);
      s.len    = rnd(40, 160);
      streaks.push(s);
    });
    hero.addEventListener('mouseleave', () => { mouse.x = -999; mouse.y = -999; });
  }

  /* ── LIFECYCLE ────────────────────────────────── */
  window.addEventListener('resize', () => {
    resize();
    dots.forEach(d => { d.x = rnd(0, W); d.y = rnd(0, H); });
  });

  document.addEventListener('visibilitychange', () => {
    if(document.hidden) {
      cancelAnimationFrame(animId);
    } else if(!prefersReduced) {
      loop();
    }
  });

  const heroIO = new IntersectionObserver(entries => {
    if(entries[0].isIntersecting) {
      if(!prefersReduced) loop();
    } else {
      cancelAnimationFrame(animId);
    }
  }, { threshold: 0.01 });
  heroIO.observe(hero);

  init();

})();
</script>
```

---

## Step 4 - Remove stale cursor tracking

Search existing non-particle script blocks for any `mousemove` listener that references the old particle `mouse` object or `particle-canvas` directly. Delete only those. Leave all other `mousemove` listeners untouched.

---

## Step 5 - Verify

Open `index.html` in a browser and confirm all five conditions:

1. Gold, blue, and sand dots are visible and static - sub-pixel breathing only, no drift
2. Wind streaks travel continuously left → right with visible curl
3. Moving the cursor inside the hero accelerates nearby streaks and spawns additional ones
4. No streaks render outside the hero section boundary
5. Enabling `prefers-reduced-motion` in OS accessibility settings stops all animation after one static frame

---

## Reference - tunable constants

| Constant | Location | Effect |
|---|---|---|
| `length: 80` | `init()` dots array | Number of ambient dots |
| `length: 26` | `init()` streaks array | Base streak count |
| `42` | cursor burst guard | Max streaks before burst stops spawning |
| `burstCD = 10` | cursor burst cooldown | Frames between burst spawns (higher = slower) |
| `c1amp: rnd(8, 55)` | `Streak.reset()` | Primary curl height in px |
| `c2amp: rnd(2, 18)` | `Streak.reset()` | Secondary ripple height in px |
| `spd: rnd(0.4, 2.1)` | `Streak.reset()` | Base travel speed in px/frame |
| `0.18` | fork probability | Fraction of streaks that fork (~18%) |
| `t += 0.007` | render loop | Global time step - controls dot breathe rate |
