// ─────────────────────────────────────────────────────────────────────────────
//  Venue — compact venue section with name, address, ceremony time, and a
//  "Get Directions" button that opens Google Maps.
//  Wrapped in a royal frame with corner flourishes.
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from 'framer-motion'
import { invitation } from '../config/invitation.js'
import { usePhotoSrc } from '../utils/usePhotoSrc.js'
import { CornerFlourish, FiligreeDivider } from './Ornaments.jsx'

export default function Venue() {
  const { venue, wedding } = invitation
  const photo = usePhotoSrc({ src: venue.photo, fallback: 'venue.svg', alt: venue.name })

  const mapsUrl = (() => {
    const q = encodeURIComponent(venue.mapsQuery || `${venue.name}, ${venue.address}`)
    return `https://www.google.com/maps/search/?api=1&query=${q}`
  })()

  return (
    <section
      id="venue"
      className="grain-overlay relative w-full px-6 md:px-10 py-28 md:py-36 bg-gradient-to-b from-sandstone-900 via-[#1a1108] to-sandstone-900"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(ellipse_at_50%_0%,rgba(216,176,105,0.14),transparent_70%)]" />

      <div className="relative mx-auto max-w-5xl">
        <motion.header
          className="text-center mb-14 md:mb-20"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9 }}
        >
          <p className="font-serif italic text-champagne text-sm md:text-base tracking-[0.3em] uppercase mb-3">
            Where We'll Be
          </p>
          <h3 className="font-serif text-ivory text-[clamp(2rem,4.6vw,3rem)] tracking-invitation leading-tight">
            The Venue
          </h3>
          <div className="my-5 flex justify-center">
            <FiligreeDivider className="w-56 md:w-72" />
          </div>
        </motion.header>

        <motion.div
          className="gold-sheen royal-frame relative overflow-hidden rounded-[14px]"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1 }}
        >
          <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
            <img
              src={photo.src}
              alt={venue.name}
              loading="lazy"
              decoding="async"
              onError={() => photo.setSrc('venue.svg')}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-2 rounded-[10px] border border-ivory/10 pointer-events-none" />

            {/* Photo corner flourishes. */}
            <CornerFlourish position="tl" className="absolute top-4 left-4 w-6 h-6 text-gold-300/85" />
            <CornerFlourish position="tr" className="absolute top-4 right-4 w-6 h-6 text-gold-300/85" />
          </div>

          <div className="relative px-6 md:px-12 py-10 md:py-12 text-center">
            <CornerFlourish position="bl" className="absolute bottom-2 left-2 w-6 h-6 text-gold-300/85" />
            <CornerFlourish position="br" className="absolute bottom-2 right-2 w-6 h-6 text-gold-300/85" />

            <h4 className="font-serif text-champagne text-[clamp(1.6rem,3.2vw,2.3rem)] tracking-[0.16em] mb-3">
              {venue.name}
            </h4>
            <p className="font-sans text-ivory/80 text-base md:text-lg leading-relaxed mb-2">
              {venue.address}
            </p>
            <p className="font-serif italic text-ivory/70 text-sm md:text-base tracking-[0.12em] mb-7">
              {wedding.day}, {wedding.date} {wedding.month} {wedding.year} ·{' '}
              {invitation.events.find((e) => e.key === 'wedding')?.time}
            </p>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center"
              aria-label={`Get Directions to ${venue.name}`}
            >
              <span className="absolute inset-0 rounded-full blur-md bg-gold-400/40 group-hover:bg-gold-400/65 transition-colors" />
              <span className="relative flex items-center gap-2 px-7 py-3 rounded-full border border-gold-300/65 bg-gradient-to-b from-sandstone-700/70 to-sandstone-900/70 backdrop-blur-sm text-ivory font-sans tracking-[0.22em] uppercase text-xs md:text-sm transition-all duration-300 group-hover:scale-[1.04] group-hover:border-gold-200/80">
                <PinIcon className="h-4 w-4 text-champagne group-hover:rotate-[-8deg] transition-transform" />
                Get Directions
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function PinIcon({ className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 22s-7-7.16-7-12a7 7 0 1 1 14 0c0 4.84-7 12-7 12z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}