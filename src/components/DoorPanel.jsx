// ─────────────────────────────────────────────────────────────────────────────
//  DoorPanel — a single carved wooden door panel.
//  Built entirely as inline SVG so it scales crisply at any size.
//  All ornaments are simple geometric primitives.
// ─────────────────────────────────────────────────────────────────────────────

export default function DoorPanel({ side = 'left' }) {
  const mirror = side === 'right'

  return (
    <svg
      viewBox="0 0 600 1000"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      style={{ transform: mirror ? 'scaleX(-1)' : undefined }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`wood-${side}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3d2410" />
          <stop offset="0.08" stopColor="#5a3418" />
          <stop offset="0.5" stopColor="#8c5a26" />
          <stop offset="0.92" stopColor="#5a3418" />
          <stop offset="1" stopColor="#2e1c0a" />
        </linearGradient>
        <radialGradient id={`stud-${side}`} cx="50%" cy="40%" r="60%">
          <stop offset="0" stopColor="#f6d895" />
          <stop offset="0.6" stopColor="#a8782e" />
          <stop offset="1" stopColor="#3a2408" />
        </radialGradient>
        <linearGradient id={`edge-${side}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1a0e04" stopOpacity="0" />
          <stop offset="0.85" stopColor="#1a0e04" stopOpacity="0" />
          <stop offset="1" stopColor="#f1d490" stopOpacity="0.55" />
        </linearGradient>
        <pattern id={`grain-${side}`} x="0" y="0" width="6" height="1000" patternUnits="userSpaceOnUse">
          <line x1="1" y1="0" x2="1" y2="1000" stroke="#2a1608" strokeOpacity="0.25" strokeWidth="0.6" />
          <line x1="4" y1="0" x2="4" y2="1000" stroke="#1a0e04" strokeOpacity="0.2" strokeWidth="0.4" />
        </pattern>
        <linearGradient id="shadow-left" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.7" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="600" height="1000" fill={`url(#wood-${side})`} />
      <rect x="0" y="0" width="600" height="1000" fill={`url(#grain-${side})`} />

      <g fill="none" stroke="#c89649" strokeWidth="3" opacity="0.85">
        <rect x="20" y="20" width="560" height="960" rx="6" />
        <rect x="40" y="40" width="520" height="920" rx="4" opacity="0.6" />
        <rect x="60" y="60" width="480" height="880" rx="3" opacity="0.4" />
      </g>

      {Array.from({ length: 6 }).map((_, row) => {
        const y = 90 + row * 140
        return (
          <g key={row}>
            <rect x="80" y={y} width="440" height="120" rx="6"
              fill="none" stroke="#a8782e" strokeWidth="1.6" opacity="0.75" />
            <rect x="90" y={y + 10} width="420" height="100" rx="4"
              fill="none" stroke="#c89649" strokeWidth="0.8" opacity="0.4" />
            <g transform={`translate(300 ${y + 60})`}>
              <circle r="38" fill="none" stroke="#dba72a" strokeWidth="1.4" opacity="0.85" />
              <circle r="30" fill="none" stroke="#dba72a" strokeWidth="0.8" opacity="0.5" />
              <path
                d="M 0 -22 L 6 -7 L 22 -7 L 10 3 L 14 18 L 0 9 L -14 18 L -10 3 L -22 -7 L -6 -7 Z"
                fill="#dba72a" opacity="0.45"
              />
              <circle r="3" fill="#f6d895" opacity="0.9" />
            </g>
            <g fill="none" stroke="#c89649" strokeWidth="1" opacity="0.7">
              <path d={`M 130 ${y + 60} Q 165 ${y + 30} 200 ${y + 60} Q 165 ${y + 90} 130 ${y + 60} Z`} />
              <path d={`M 400 ${y + 60} Q 435 ${y + 30} 470 ${y + 60} Q 435 ${y + 90} 400 ${y + 60} Z`} />
              <circle cx="120" cy={y + 60} r="6" fill="#dba72a" opacity="0.6" />
              <circle cx="480" cy={y + 60} r="6" fill="#dba72a" opacity="0.6" />
            </g>
          </g>
        )
      })}

      {Array.from({ length: 14 }).map((_, i) => {
        const y = 60 + i * 65
        return (
          <g key={`stud-${i}`}>
            <circle cx="305" cy={y} r="9" fill={`url(#stud-${side})`} />
            <circle cx="305" cy={y} r="3" fill="#fff4c8" opacity="0.7" />
          </g>
        )
      })}

      <g transform="translate(245 500)">
        <rect x="-10" y="-40" width="40" height="80" rx="6" fill="url(#stud-left)" opacity="0.9" />
        <circle cx="50" cy="0" r="34" fill="none" stroke={`url(#stud-${side})`} strokeWidth="9" />
        <circle cx="50" cy="0" r="34" fill="none" stroke="#1a0e04" strokeWidth="1" opacity="0.5" />
        <circle cx="50" cy="0" r="22" fill="#2a1608" />
        <circle cx="50" cy="0" r="22" fill="none" stroke="#dba72a" strokeWidth="0.8" opacity="0.6" />
      </g>

      <rect x="0" y="0" width="600" height="1000" fill={`url(#edge-${side})`} />
      <rect x="0" y="0" width="60" height="1000" fill="url(#shadow-left)" opacity="0.55" />
    </svg>
  )
}