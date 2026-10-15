import { useEffect, useState } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
//  usePhotoSrc — loads an image asset and falls back gracefully when the
//  primary file is missing or fails to decode.
// ─────────────────────────────────────────────────────────────────────────────

function normalise(initial) {
  if (typeof initial === 'string') return { src: initial, fallback: null, alt: '' }
  return {
    src: initial.src,
    fallback: initial.fallback ?? null,
    alt: initial.alt ?? '',
  }
}

export function usePhotoSrc(initial) {
  const initialSpec = normalise(initial)
  const [src, setSrc] = useState(initialSpec.src)
  const [attemptedFallback, setAttemptedFallback] = useState(false)

  useEffect(() => {
    setSrc(normalise(initial).src)
    setAttemptedFallback(false)
  }, [initial])

  return {
    src,
    setSrc: (next) => {
      if (typeof next === 'string') {
        setSrc(next)
      } else if (next && !attemptedFallback) {
        setAttemptedFallback(true)
        setSrc(initialSpec.fallback || initialSpec.src)
      }
    },
    alt: initialSpec.alt,
  }
}