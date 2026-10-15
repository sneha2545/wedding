// ─────────────────────────────────────────────────────────────────────────────
//  PalaceGate / Hero — click-paced sequence over an MP4 video background.
//
//  Flow:
//    1. Page loads → video plays automatically (muted, inline, autoplay loop).
//    2. +`shlokaDelaySeconds` → shloka fades in.
//    3. After `shlokaDurationSeconds` → shloka auto-fades out.
//    4. Visitor clicks anywhere → welcome message fades in. The video keeps
//       playing in the background.
//    5. When `video.currentTime` reaches `gateOpenSeconds` → welcome fades
//       out, names fade in, and the video crossfades to the open-courtyard
//       still. The scene is locked.
//
//  All timings live in `invitation.opening`. Tune them to match the video.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { invitation } from '../config/invitation.js'
import { CornerFlourish } from './Ornaments.jsx'
import useReducedMotion from '../hooks/useReducedMotion.js'

const STAGE = {
  VIDEO: 'video',         // only video, no text yet
  SHLOKA: 'shloka',       // shloka visible
  WELCOME: 'welcome',     // welcome visible after first click
  NAMES: 'names',         // names visible — scene locked
}

export default function PalaceGate() {
  const [stage, setStage] = useState(STAGE.VIDEO)
  const reducedMotion = useReducedMotion()
  const videoRef = useRef(null)
  const namesTriggeredRef = useRef(false)
  const { bride, groom, photos, shloka, welcomeMessage, finalPhrase, opening } =
    invitation

  // Stage 2 → 3: auto-advance the shloka in then out.
  useEffect(() => {
    if (reducedMotion) {
      setStage(STAGE.NAMES)
      return
    }
    const showId = window.setTimeout(
      () => setStage(STAGE.SHLOKA),
      opening.shlokaDelaySeconds * 1000,
    )
    return () => window.clearTimeout(showId)
  }, [reducedMotion, opening.shlokaDelaySeconds])

  useEffect(() => {
    if (stage !== STAGE.SHLOKA) return
    const hideId = window.setTimeout(
      () => setStage(STAGE.WELCOME),
      opening.shlokaDurationSeconds * 1000,
    )
    return () => window.clearTimeout(hideId)
  }, [stage, opening.shlokaDurationSeconds])

  // Stage 4: trigger names when the video reaches the gate-open moment.
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onTimeUpdate = () => {
      if (namesTriggeredRef.current) return
      if (stage !== STAGE.WELCOME) return
      if (v.currentTime >= opening.gateOpenSeconds) {
        namesTriggeredRef.current = true
        setStage(STAGE.NAMES)
      }
    }
    v.addEventListener('timeupdate', onTimeUpdate)
    return () => v.removeEventListener('timeupdate', onTimeUpdate)
  }, [stage, opening.gateOpenSeconds])

  // Click anywhere on the hero advances the shloka → welcome transition.
  const advance = useCallback(() => {
    setStage((current) => {
      if (current === STAGE.SHLOKA) return STAGE.WELCOME
      return current
    })
  }, [])

  const frozen = stage === STAGE.NAMES
  const showScrollHint = stage === STAGE.NAMES

  return (
    <section
      id="hero"
      className="relative w-full min-h-[100svh] overflow-hidden bg-sandstone-900 select-none"
      onClick={stage === STAGE.SHLOKA ? advance : undefined}
    >
      {/* ── Background video. Plays automatically and keeps playing */}
      {/* ── in the background. Once names appear, it crossfades out */}
      {/* ── and the still takes its place. ── */}
      <motion.video
        ref={videoRef}
        src={photos.openingVideo}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        initial={{ opacity: 1 }}
        animate={{ opacity: frozen ? 0 : 1 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        aria-hidden
      />

      {/* ── Open-courtyard still — fades in once names are shown. ── */}
      <motion.img
        src={photos.openingStill}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
        decoding="async"
        initial={{ opacity: 0 }}
        animate={{ opacity: frozen ? 1 : 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />

      {/* Vignette for text legibility after the freeze. */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: frozen ? 1 : 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 0%, rgba(0,0,0,0.55) 78%)',
        }}
      />

      {/* ── Text overlays — one stage visible at a time. ── */}
      <div className="relative h-[100svh] flex items-center justify-center px-6 text-center">
        <AnimatePresence mode="wait">
          {stage === STAGE.SHLOKA && (
            <motion.div
              key="shloka"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-3xl"
            >
              <CornerFlourish
                position="tl"
                className="absolute -top-6 -left-8 md:-top-10 md:-left-12 w-10 md:w-14 h-10 md:h-14 text-gold-300/60"
              />
              <CornerFlourish
                position="tr"
                className="absolute -top-6 -right-8 md:-top-10 md:-right-12 w-10 md:w-14 h-10 md:h-14 text-gold-300/60"
              />
              <p
                className="font-deva text-ivory/95 leading-[1.85]
                           text-[clamp(1.5rem,4.2vw,2.6rem)]
                           tracking-[0.04em] drop-shadow-[0_2px_18px_rgba(0,0,0,0.75)]"
              >
                {shloka.lines.map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </motion.div>
          )}

          {stage === STAGE.WELCOME && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-3xl"
            >
              <CornerFlourish
                position="tl"
                className="absolute -top-6 -left-8 md:-top-10 md:-left-12 w-10 md:w-14 h-10 md:h-14 text-gold-300/60"
              />
              <CornerFlourish
                position="tr"
                className="absolute -top-6 -right-8 md:-top-10 md:-right-12 w-10 md:w-14 h-10 md:h-14 text-gold-300/60"
              />
              <p
                className="font-serif italic text-ivory/95 text-center leading-snug
                           text-[clamp(1.7rem,4.8vw,3rem)]
                           drop-shadow-[0_2px_18px_rgba(0,0,0,0.75)]"
              >
                {welcomeMessage}
              </p>
            </motion.div>
          )}

          {stage === STAGE.NAMES && (
            <motion.h1
              key="names"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <span
                className="block font-script text-ivory leading-none
                           text-[clamp(5rem,16vw,12rem)]
                           drop-shadow-[0_3px_24px_rgba(0,0,0,0.7)]"
              >
                {bride.firstName}
              </span>
              <span
                className="block font-serif italic text-champagne my-4
                           text-[clamp(1.4rem,3vw,2.2rem)] tracking-[0.35em]"
              >
                {finalPhrase}
              </span>
              <span
                className="block font-upper text-ivory leading-none tracking-[0.18em]
                           text-[clamp(5rem,16vw,12rem)]
                           drop-shadow-[0_3px_24px_rgba(0,0,0,0.7)]"
              >
                {groom.firstName}
              </span>
            </motion.h1>
          )}
        </AnimatePresence>
      </div>

      {/* ── "Tap to skip" hint while the shloka is showing. ── */}
      <AnimatePresence>
        {stage === STAGE.SHLOKA && (
          <motion.div
            key="hint"
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            aria-hidden
          >
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="block text-ivory/80 text-[10px] tracking-[0.45em] uppercase"
            >
              Tap to skip
            </motion.span>
            <svg width="22" height="14" viewBox="0 0 22 14" aria-hidden>
              <path d="M11 1 L 17 9 L 5 9 Z" fill="currentColor" className="text-ivory/70" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll hint once the names have arrived. */}
      <AnimatePresence>
        {showScrollHint && (
          <motion.div
            key="scroll-hint"
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            aria-hidden
          >
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block text-ivory/75 text-[10px] tracking-[0.4em] uppercase"
            >
              Scroll ▾
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}