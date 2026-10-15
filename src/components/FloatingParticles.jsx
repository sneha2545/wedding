// ─────────────────────────────────────────────────────────────────────────────
//  FloatingParticles — ambient gold sparkles that drift gently across the
//  page. Sits at z-index 0 in App.jsx so it never blocks interaction.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useState, useMemo } from 'react'

const SEED_COUNT = 28

// Deterministic pseudo-random so SSR + first paint don't mismatch.
function seededRand(seed) {
  let s = seed % 2147483647
  if (s <= 0) s += 2147483646
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

export default function FloatingParticles({ count = SEED_COUNT, className = '' }) {
  // Defer particle generation to the client so it doesn't bloat the SSR pass.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const particles = useMemo(() => {
    if (!mounted) return []
    const rng = seededRand(7)
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: rng() * 100,
      size: 2 + rng() * 4,
      duration: 12 + rng() * 18,
      delay: rng() * 14,
      drift: (rng() - 0.5) * 16,
      hue: 38 + rng() * 14, // warm gold
      twinkle: 0.4 + rng() * 0.5,
    }))
  }, [count, mounted])

  if (!mounted) return null

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 overflow-hidden z-0 ${className}`}
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute"
          style={{
            left: `${p.left}%`,
            bottom: '-20px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: `radial-gradient(circle, hsl(${p.hue} 80% 78%) 0%, hsl(${p.hue} 70% 50%) 60%, transparent 100%)`,
            borderRadius: '50%',
            boxShadow: `0 0 ${p.size * 2}px hsl(${p.hue} 80% 70%)`,
            opacity: 0,
            animation: `floatPetal ${p.duration}s linear ${p.delay}s infinite, glowPulse ${p.twinkle * 5}s ease-in-out ${p.delay * 0.3}s infinite`,
            // We reuse the floatPetal keyframe (translates Y up + drift X).
          }}
        />
      ))}
    </div>
  )
}