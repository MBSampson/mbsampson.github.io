# Dark Mode Portfolio Design — Research Synthesis

## Palette Rules
- Never use pure #000000; use warm-tinted near-black (#0E0C0B, HSL 20° 8% 5%)
- Body text: #EDE6D6 (warm off-white), never pure white
- Accent saturation must be boosted ~15% vs light mode equivalents
- Gold sweet spot: #C9A961 (chroma ~40, luminance ~68)

## Typography
- Cormorant Garamond: minimum SemiBold 600 at display sizes; hairline weights disappear on dark
- Alternative: Fraunces (has opsz axis) + Inter
- Body: DM Sans or Inter, 17–18px, line-height 1.65–1.75

## Particle Systems
- Vanilla Canvas 2D preferred over tsParticles/three.js for portfolio-scale (50–200 particles)
- Spring physics: stiffness 0.06–0.08, damping 0.88–0.92
- Gate cursor behavior on `(hover: hover) and (pointer: fine)` not viewport width
- Always respect `prefers-reduced-motion`
- Pause via IntersectionObserver + visibilitychange

## Mobile
- Replace cursor with auto-Lissajous drift OR gyroscope tilt
- iOS requires DeviceOrientationEvent.requestPermission() on user gesture
- Low-pass filter tilt: smoothX += (raw - smoothX) * 0.08