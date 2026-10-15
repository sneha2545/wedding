// ─────────────────────────────────────────────────────────────────────────────
//  RosePetals — gently drifting petals across the opening scene.
//  Purely decorative. Disabled when prefers-reduced-motion is set.
// ─────────────────────────────────────────────────────────────────────────────

import { useMemo } from 'react'

export default function RosePetals({ active = true, count = 18 }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 8 + Math.random() * 14,
        duration: 7 + Math.random() * 6,
        delay: Math.random() * 6,
        hue: 18 + Math.random() * 14,
        rot: Math.random() * 360,
      })),
    [count],
  )

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((p) => (
        <span
          key={p.id}
          className="absolute top-0"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size * 1.4}px`,
            background: `radial-gradient(ellipse at 50% 35%, hsl(${p.hue} 75% 70%) 0%, hsl(${p.hue} 60% 45%) 70%, transparent 100%)`,
            borderRadius: '60% 40% 60% 40% / 50% 50% 50% 50%',
            transform: `rotate(${p.rot}deg)`,
            opacity: 0,
            animation: active
              ? `floatPetal ${p.duration}s linear ${p.delay}s infinite`
              : 'none',
            filter: 'blur(0.3px)',
          }}
        />
      ))}
    </div>
  )
}