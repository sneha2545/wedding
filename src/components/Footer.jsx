// ─────────────────────────────────────────────────────────────────────────────
//  Footer — elegant closing with a lotus motif and ornamental treatment.
// ─────────────────────────────────────────────────────────────────────────────

import { invitation } from '../config/invitation.js'
import { LotusMotif, FiligreeDivider } from './Ornaments.jsx'

export default function Footer() {
  const { company, url } = invitation.credits
  return (
    <footer className="grain-overlay relative w-full px-6 py-14 md:py-16 bg-sandstone-900 text-center overflow-hidden">
      {/* Subtle warm glow behind the lotus. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(ellipse_at_50%_0%,rgba(216,176,105,0.18),transparent_70%)]" />

      <div className="relative mx-auto max-w-md flex flex-col items-center">
        <LotusMotif className="mb-6 text-gold-300/70" size={56} />

        <div className="w-40 md:w-56 mb-5 opacity-80">
          <FiligreeDivider />
        </div>

        <p className="font-serif italic text-ivory/85 text-base md:text-lg tracking-[0.18em] mb-2">
          Crafted with love by
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-serif text-champagne text-2xl md:text-3xl tracking-[0.14em] hover:text-ivory transition-colors underline-offset-4 hover:underline"
        >
          {company}
        </a>

        <p className="font-sans text-ivory/45 text-[10px] tracking-[0.45em] uppercase mt-8">
          {new Date().getFullYear()} · All Rights Reserved
        </p>
      </div>
    </footer>
  )
}