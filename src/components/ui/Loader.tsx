'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader() {
  const [visible, setVisible] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!sessionStorage.getItem('mb_loaded')) {
      setVisible(true)
      sessionStorage.setItem('mb_loaded', '1')
      const t = setTimeout(() => setVisible(false), 2700)
      return () => clearTimeout(t)
    }
  }, [])

  useEffect(() => {
    if (!visible) return
    const start = performance.now()
    const duration = 2000
    let rafId: number

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setCount(Math.round(eased * 100))
      if (t < 1) rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.2, 0, 0.2, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: '#0a0a0a',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          {/* Name + tagline */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.2, 0, 0.2, 1] }}
            style={{ textAlign: 'center' }}
          >
            <div style={{
              fontFamily: 'var(--font-display)', fontWeight: 400,
              fontSize: 'clamp(44px, 8vw, 82px)', lineHeight: 1,
              letterSpacing: '-0.02em', textTransform: 'uppercase',
              color: '#ffffff',
            }}>
              Matt Banton
            </div>
            <div style={{
              marginTop: 16,
              fontFamily: 'var(--font-mono)', fontSize: 10,
              letterSpacing: '0.28em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)',
            }}>
              Portrait &amp; Editorial Photography
            </div>
          </motion.div>

          {/* Counter — large, bottom-right corner */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{
              position: 'absolute', bottom: 24, right: 40,
              fontFamily: 'var(--font-mono)', fontWeight: 400,
              fontSize: 'clamp(96px, 14vw, 180px)', lineHeight: 1,
              letterSpacing: '-0.03em',
              color: 'rgba(255,255,255,0.12)',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {String(count).padStart(3, '0')}
          </motion.div>

          {/* Progress track */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0,
            width: '100%', height: 1,
            background: 'rgba(255,255,255,0.07)',
          }}>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2.0, ease: [0.2, 0, 0.2, 1] }}
              style={{
                height: '100%', width: '100%',
                background: 'rgba(255,255,255,0.35)',
                transformOrigin: 'left',
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
