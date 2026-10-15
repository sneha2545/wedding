// ─────────────────────────────────────────────────────────────────────────────
//  SkipButton — discreet, accessible skip control shown during the opening.
// ─────────────────────────────────────────────────────────────────────────────

import { motion, AnimatePresence } from 'framer-motion'

export default function SkipButton({ visible, onSkip }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="skip"
          type="button"
          onClick={onSkip}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-30 w-9 h-9 md:w-10 md:h-10 grid place-items-center rounded-full text-ivory/70 hover:text-ivory text-xs border border-ivory/15 bg-black/25 backdrop-blur-sm hover:bg-black/40 transition-colors"
          aria-label="Skip opening animation"
        >
          <svg viewBox="0 0 12 12" className="w-3 h-3" fill="currentColor" aria-hidden>
            <path d="M2 1 L 8 6 L 2 11 Z" />
            <rect x="9" y="1" width="1.5" height="10" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}