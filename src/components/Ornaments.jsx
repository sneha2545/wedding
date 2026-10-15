// ─────────────────────────────────────────────────────────────────────────────
//  Ornaments — reusable SVG decorative elements.
//  All composed of simple geometric primitives.
// ─────────────────────────────────────────────────────────────────────────────

// A traditional ornamental divider used between major sections.
export function FiligreeDivider({ className = '' }) {
  return (
    <svg
      className={`mx-auto ${className}`}
      viewBox="0 0 200 24"
      fill="none"
      aria-hidden
    >
      {/* Central diamond. */}
      <path
        d="M100 4 L108 12 L100 20 L92 12 Z"
        fill="#d8b069"
        opacity="0.85"
      />
      {/* Side flourishes. */}
      <path
        d="M88 12 Q 70 6 50 12 Q 30 18 12 12"
        stroke="#d8b069"
        strokeWidth="0.9"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M112 12 Q 130 6 150 12 Q 170 18 188 12"
        stroke="#d8b069"
        strokeWidth="0.9"
        fill="none"
        opacity="0.7"
      />
      {/* Tiny dots. */}
      <circle cx="40" cy="14" r="1.2" fill="#d8b069" opacity="0.7" />
      <circle cx="160" cy="14" r="1.2" fill="#d8b069" opacity="0.7" />
      <circle cx="20" cy="12" r="0.8" fill="#f1d490" opacity="0.8" />
      <circle cx="180" cy="12" r="0.8" fill="#f1d490" opacity="0.8" />
    </svg>
  )
}

// A corner flourish — flips horizontally / vertically based on the position prop.
export function CornerFlourish({ position = 'tl', className = '' }) {
  const flipX = position === 'tr' || position === 'br'
  const flipY = position === 'bl' || position === 'br'
  return (
    <svg
      className={`${className}`}
      viewBox="0 0 60 60"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.9"
      aria-hidden
      style={{
        transform: `scale(${flipX ? -1 : 1}, ${flipY ? -1 : 1})`,
      }}
    >
      <path d="M2 30 L 2 2 L 30 2" />
      <path d="M2 16 L 16 16 L 16 2" opacity="0.6" />
      <circle cx="2" cy="2" r="1.6" fill="currentColor" />
      <path
        d="M 18 8 Q 28 14 22 24 Q 16 18 12 12"
        strokeWidth="0.7"
        opacity="0.7"
      />
    </svg>
  )
}

// A subtle mandala backdrop, used as a watermark behind section titles.
export function MandalaWatermark({ className = '', size = 360 }) {
  return (
    <svg
      className={`${className}`}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      aria-hidden
    >
      {/* Concentric rings. */}
      <circle cx="100" cy="100" r="92" strokeWidth="0.5" opacity="0.35" />
      <circle cx="100" cy="100" r="74" strokeWidth="0.5" opacity="0.4" />
      <circle cx="100" cy="100" r="56" strokeWidth="0.4" opacity="0.45" />
      {/* Eight-petal lotus ring. */}
      <g opacity="0.45" strokeWidth="0.5">
        {Array.from({ length: 8 }).map((_, i) => (
          <g key={i} transform={`rotate(${i * 45} 100 100)`}>
            <path d="M100 30 Q 108 50 100 70 Q 92 50 100 30 Z" />
          </g>
        ))}
      </g>
      {/* Eight-petal ring offset by 22.5°. */}
      <g opacity="0.35" strokeWidth="0.4">
        {Array.from({ length: 8 }).map((_, i) => (
          <g key={i} transform={`rotate(${i * 45 + 22.5} 100 100)`}>
            <path d="M100 50 Q 105 65 100 80 Q 95 65 100 50 Z" />
          </g>
        ))}
      </g>
      {/* Central rosette. */}
      <circle cx="100" cy="100" r="14" strokeWidth="0.5" opacity="0.5" />
      <circle cx="100" cy="100" r="6" fill="currentColor" opacity="0.4" />
    </svg>
  )
}

// A simple lotus motif — for cards, accents, or as a small decorative element.
export function LotusMotif({ className = '', size = 40 }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
      aria-hidden
    >
      {/* Central petal. */}
      <path d="M30 8 Q 36 28 30 48 Q 24 28 30 8 Z" opacity="0.8" />
      {/* Side petals. */}
      <path d="M30 14 Q 46 28 36 48 Q 26 36 30 14 Z" opacity="0.7" />
      <path d="M30 14 Q 14 28 24 48 Q 34 36 30 14 Z" opacity="0.7" />
      {/* Outer petals. */}
      <path d="M30 22 Q 52 32 38 52 L 30 42 Z" opacity="0.55" />
      <path d="M30 22 Q 8 32 22 52 L 30 42 Z" opacity="0.55" />
      {/* Centre. */}
      <circle cx="30" cy="34" r="2.5" fill="currentColor" opacity="0.7" />
      {/* Base. */}
      <path d="M14 50 Q 30 56 46 50" strokeWidth="0.6" opacity="0.6" />
    </svg>
  )
}

// A diamond ornament with hanging pearls.
export function PearlDrop({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M8 0 L 13 8 L 8 16 L 3 8 Z"
        fill="#f1d490"
        opacity="0.9"
      />
      <circle cx="8" cy="22" r="2" fill="#f1d490" opacity="0.65" />
    </svg>
  )
}