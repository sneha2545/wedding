// ─────────────────────────────────────────────────────────────────────────────
//  CeremonyDetails — Haldi, Mehendi, Wedding Ceremony in compact royal cards.
//  Each card uses the .royal-frame utility plus corner flourishes, ornamental
//  motifs, and a gold-sheen hover effect.
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from 'framer-motion'
import { invitation } from '../config/invitation.js'
import { CornerFlourish, LotusMotif, FiligreeDivider } from './Ornaments.jsx'

const eventAccent = {
  haldi: 'from-sandstone-400/30 to-gold-300/10',
  mehendi: 'from-maroon-500/25 to-maroon-700/5',
  wedding: 'from-sandstone-300/30 to-gold-300/20',
}

const eventMotif = {
  haldi: 'haldi',
  mehendi: 'mehendi',
  wedding: 'wedding',
}

// Tiny decorative motif specific to each event.
function EventMotif({ kind, className = '' }) {
  if (kind === 'haldi') {
    // Sun motif (turmeric gold).
    return (
      <svg className={className} viewBox="0 0 60 60" aria-hidden>
        <circle cx="30" cy="30" r="11" fill="none" stroke="currentColor" strokeWidth="1" />
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={i}
            x1="30" y1="6" x2="30" y2="14"
            stroke="currentColor"
            strokeWidth="1"
            transform={`rotate(${i * 30} 30 30)`}
          />
        ))}
      </svg>
    )
  }
  if (kind === 'mehendi') {
    // Vine motif (henna green).
    return (
      <svg className={className} viewBox="0 0 60 60" aria-hidden>
        <path
          d="M10 30 Q 20 10 30 30 Q 40 50 50 30"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <circle cx="10" cy="30" r="2" fill="currentColor" />
        <circle cx="30" cy="30" r="2" fill="currentColor" />
        <circle cx="50" cy="30" r="2" fill="currentColor" />
        <path d="M16 24 Q 20 18 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <path d="M36 36 Q 40 42 44 36" fill="none" stroke="currentColor" strokeWidth="0.8" />
      </svg>
    )
  }
  // wedding — phoenix-like motif.
  return (
    <svg className={className} viewBox="0 0 60 60" aria-hidden>
      <path
        d="M30 10 Q 40 22 38 30 Q 50 26 50 36 Q 42 42 30 38 Q 18 42 10 36 Q 10 26 22 30 Q 20 22 30 10 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle cx="30" cy="30" r="3" fill="currentColor" />
    </svg>
  )
}

export default function CeremonyDetails() {
  return (
    <section
      id="ceremony"
      className="grain-overlay relative w-full px-6 md:px-10 py-28 md:py-36 bg-gradient-to-b from-sandstone-900 via-[#1d1308] to-sandstone-900"
    >
      {/* Decorative top arch. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(ellipse_at_50%_0%,rgba(216,176,105,0.18),transparent_70%)]" />

      <div className="relative mx-auto max-w-5xl">
        <motion.header
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9 }}
        >
          <p className="font-serif italic text-champagne text-sm md:text-base tracking-[0.3em] uppercase mb-3">
            The Celebrations
          </p>
          <h3 className="font-serif text-ivory text-[clamp(2rem,4.6vw,3rem)] tracking-invitation leading-tight">
            Ceremony Details
          </h3>
          <div className="my-5 flex justify-center">
            <FiligreeDivider className="w-56 md:w-72" />
          </div>
          <p className="mx-auto mt-2 max-w-2xl font-serif italic text-ivory/80 text-[clamp(0.95rem,1.8vw,1.1rem)] leading-relaxed">
            {invitation.message.body}
          </p>
        </motion.header>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {invitation.events.map((event, i) => (
            <motion.li
              key={event.key}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: 'easeOut' }}
              className="group relative"
            >
              <div
                className={`gold-sheen relative h-full rounded-[14px] royal-frame px-7 py-9 md:px-8 md:py-11 text-center transition-transform duration-500 group-hover:-translate-y-1.5`}
              >
                {/* Inner gradient overlay. */}
                <div className={`absolute inset-0 rounded-[14px] bg-gradient-to-b ${eventAccent[event.key]} pointer-events-none`} />

                <CornerFlourish position="tl" className="absolute top-1.5 left-1.5 w-5 h-5 text-gold-300/85" />
                <CornerFlourish position="tr" className="absolute top-1.5 right-1.5 w-5 h-5 text-gold-300/85" />
                <CornerFlourish position="bl" className="absolute bottom-1.5 left-1.5 w-5 h-5 text-gold-300/85" />
                <CornerFlourish position="br" className="absolute bottom-1.5 right-1.5 w-5 h-5 text-gold-300/85" />

                <div className="relative">
                  <EventMotif
                    kind={eventMotif[event.key]}
                    className="mx-auto mb-3 w-9 h-9 text-gold-300/80"
                  />

                  <p className="font-serif italic text-ivory/70 text-xs md:text-sm tracking-[0.3em] uppercase mb-2">
                    {event.subtitle}
                  </p>
                  <h4 className="font-serif text-champagne text-[clamp(1.8rem,3.6vw,2.4rem)] tracking-[0.18em] mb-3">
                    {event.title}
                  </h4>

                  <div className="mx-auto h-px w-16 bg-gold-300/50 mb-4" aria-hidden />

                  <p className="font-serif text-ivory text-base md:text-lg leading-snug">
                    {event.date}
                  </p>
                  <p className="font-sans text-ivory/70 text-sm md:text-base mt-2 tracking-[0.18em] uppercase">
                    {event.time}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}