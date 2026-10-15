// ─────────────────────────────────────────────────────────────────────────────
//  PhotoGallery — tasteful small collection of couple photographs.
//  Three photos (portrait + two memories) wrapped in royal frames with
//  corner flourishes, gold-sheen hover, and tap-to-enlarge lightbox.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { invitation } from '../config/invitation.js'
import { usePhotoSrc } from '../utils/usePhotoSrc.js'
import { CornerFlourish, FiligreeDivider } from './Ornaments.jsx'

export default function PhotoGallery() {
  const portrait = usePhotoSrc(invitation.photos.portrait)
  const memory1 = usePhotoSrc(invitation.photos.memory1)
  const memory2 = usePhotoSrc(invitation.photos.memory2)

  const [enlarged, setEnlarged] = useState(null)

  return (
    <section
      id="gallery"
      className="grain-overlay relative w-full px-6 md:px-10 py-28 md:py-36 bg-gradient-to-b from-sandstone-900 via-[#22160a] to-sandstone-900"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(ellipse_at_50%_0%,rgba(216,176,105,0.14),transparent_70%)]" />

      <div className="relative mx-auto max-w-6xl">
        <motion.header
          className="text-center mb-14 md:mb-20"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9 }}
        >
          <p className="font-serif italic text-champagne text-sm md:text-base tracking-[0.3em] uppercase mb-3">
            Their Story
          </p>
          <h3 className="font-serif text-ivory text-[clamp(1.9rem,3.8vw,2.7rem)] tracking-invitation leading-tight">
            A Few Beautiful Moments
          </h3>
          <div className="my-5 flex justify-center">
            <FiligreeDivider className="w-56 md:w-72" />
          </div>
        </motion.header>

        <ul className="grid grid-cols-12 gap-4 md:gap-6">
          <motion.li
            className="col-span-12 sm:col-span-5 md:col-span-5 row-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9 }}
          >
            <PhotoFrame
              photo={portrait}
              onTap={() => setEnlarged(portrait.src)}
              className="aspect-[4/5] h-full"
            />
          </motion.li>

          <motion.li
            className="col-span-6 sm:col-span-7 md:col-span-7"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.12 }}
          >
            <PhotoFrame
              photo={memory1}
              onTap={() => setEnlarged(memory1.src)}
              className="aspect-[16/10] h-full"
            />
          </motion.li>
          <motion.li
            className="col-span-6 sm:col-span-7 md:col-span-7"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.24 }}
          >
            <PhotoFrame
              photo={memory2}
              onTap={() => setEnlarged(memory2.src)}
              className="aspect-[16/10] h-full"
            />
          </motion.li>
        </ul>
      </div>

      <AnimatePresence>
        {enlarged && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-6 cursor-zoom-out"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setEnlarged(null)}
            role="dialog"
            aria-label="Enlarged photograph"
          >
            <motion.div className="relative">
              <CornerFlourish position="tl" className="absolute -top-3 -left-3 w-8 h-8 text-gold-300" />
              <CornerFlourish position="tr" className="absolute -top-3 -right-3 w-8 h-8 text-gold-300" />
              <CornerFlourish position="bl" className="absolute -bottom-3 -left-3 w-8 h-8 text-gold-300" />
              <CornerFlourish position="br" className="absolute -bottom-3 -right-3 w-8 h-8 text-gold-300" />
              <motion.img
                src={enlarged}
                alt=""
                className="max-h-[88vh] max-w-[92vw] rounded-lg shadow-[0_30px_80px_rgba(0,0,0,0.7)] border border-gold-300/30"
                initial={{ scale: 0.92 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.94 }}
                transition={{ duration: 0.35 }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function PhotoFrame({ photo, onTap, className = '' }) {
  return (
    <motion.button
      type="button"
      onClick={onTap}
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.4 }}
      className={`gold-sheen royal-frame relative w-full overflow-hidden rounded-[10px] ${className}`}
      aria-label={`Enlarge ${photo.alt}`}
    >
      <img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        decoding="async"
        onError={() => photo.setSrc(photo.fallback || photo.src)}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
      <div className="pointer-events-none absolute inset-2 rounded-[6px] border border-ivory/15" />

      {/* Corner flourishes in gold. */}
      <CornerFlourish position="tl" className="absolute top-3 left-3 w-5 h-5 text-gold-300/80" />
      <CornerFlourish position="tr" className="absolute top-3 right-3 w-5 h-5 text-gold-300/80" />
      <CornerFlourish position="bl" className="absolute bottom-3 left-3 w-5 h-5 text-gold-300/80" />
      <CornerFlourish position="br" className="absolute bottom-3 right-3 w-5 h-5 text-gold-300/80" />
    </motion.button>
  )
}