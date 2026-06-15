import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const items = [
  'Multi-Industry Expertise',
  'Customized Research Solutions',
  'Regional Coverage Across India, APAC & Middle East',
  'Fast Turnaround Times',
  'Quality-Assured Deliverables',
]

export default function TrustSection() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const itemsRef   = useRef([])

  useEffect(() => {
    const els = itemsRef.current

    gsap.set(headingRef.current, { opacity: 0, y: 40 })
    gsap.set(els, { opacity: 0, x: -40 })

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 75%',
      end: 'bottom 25%',

      onEnter: () => {
        gsap.to(headingRef.current, {
          opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
        })
        gsap.to(els, {
          opacity: 1, x: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out', delay: 0.2,
        })
      },
      onLeave: () => {
        gsap.to(headingRef.current, {
          opacity: 0, y: -40, duration: 0.4, ease: 'power3.in',
        })
        gsap.to(els, {
          opacity: 0, x: 40, duration: 0.4, stagger: 0.08, ease: 'power3.in',
        })
      },
      onEnterBack: () => {
        gsap.to(headingRef.current, {
          opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
        })
        gsap.to(els, {
          opacity: 1, x: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out', delay: 0.2,
        })
      },
      onLeaveBack: () => {
        gsap.to(headingRef.current, {
          opacity: 0, y: 40, duration: 0.4, ease: 'power3.in',  // ← slides DOWN when scrolling back up
        })
        gsap.to(els, {
          opacity: 0, x: -40, duration: 0.4, stagger: 0.08, ease: 'power3.in',
        })
      },
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: '#0B1221',
        padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 80px)', /* ← fix */
        boxSizing: 'border-box',  /* ← fix */
        overflowX: 'hidden',      /* ← fix */
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        {/* Header — now animated */}
        <div ref={headingRef}>
          <span className="badge badge-gold" style={{ marginBottom: '24px', display: 'inline-block' }}>
            Why Choose Us
          </span>
          <h2 style={{
            fontFamily: 'Cormorant Garant, serif',
            fontSize: 'clamp(26px, 5vw, 42px)', /* ← fix */
            fontWeight: 400,
            color: '#FFFFFF',
            marginBottom: '48px',
          }}>
            Trusted by Businesses <span style={{ color: '#C9A84C', fontStyle: 'italic' }}>Across the Globe</span>
          </h2>
        </div>

        {/* Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {items.map((item, i) => (
            <div
              key={i}
              ref={el => itemsRef.current[i] = el}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(10px, 2vw, 16px)',           /* ← fix */
                padding: 'clamp(14px, 2vw, 20px) clamp(16px, 3vw, 24px)', /* ← fix */
                backgroundColor: '#162035',
                borderLeft: '2px solid #C9A84C',
                borderRadius: '2px',
                boxSizing: 'border-box',                  /* ← fix */
              }}
            >
              <span style={{ color: '#C9A84C', fontSize: 'clamp(14px, 2vw, 18px)', fontWeight: 700, flexShrink: 0 }}>
                {/* ↑ fix: flexShrink:0 so checkmark never squishes */}
                ✔
              </span>
              <span style={{
                color: '#F5F0E8',
                fontSize: 'clamp(13px, 2vw, 16px)', /* ← fix */
                fontWeight: 400,
                letterSpacing: '0.02em',
                lineHeight: 1.5,                    /* ← fix: long items wrap cleanly */
              }}>
                {item}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}