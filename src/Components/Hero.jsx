import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const badgeRef = useRef(null)
  const headingRef = useRef(null)
  const lineRef = useRef(null)
  const paraRef = useRef(null)
  const btnsRef = useRef(null)

  useEffect(() => {
    gsap.set([badgeRef.current, headingRef.current, lineRef.current, paraRef.current, btnsRef.current], { opacity: 0, y: 30 })

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const tl = gsap.timeline()
          tl.to(badgeRef.current,   { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
            .to(headingRef.current, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.3')
            .to(lineRef.current,    { opacity: 1, y: 0, scaleX: 1, duration: 0.5, ease: 'power2.out' }, '-=0.3')
            .to(paraRef.current,    { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.2')
            .to(btnsRef.current,    { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
          observer.disconnect()
        }
      })
    }, { threshold: 0.2 })

    observer.observe(badgeRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      className="relative min-h-screen flex items-center"
      style={{
        padding: 'clamp(80px, 10vw, 120px) clamp(20px, 5vw, 80px) clamp(60px, 8vw, 80px)',
        boxSizing: 'border-box',
        overflowX: 'hidden',   // ← prevents horizontal scroll
      }}
    >
      <img
        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1800&q=80"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.3, zIndex: 0 }}
      />

      <div className="absolute inset-0" style={{ backgroundColor: '#0B1221', opacity: 0.85, zIndex: 1 }} />

      <div className="relative" style={{ zIndex: 2, maxWidth: 'min(800px, 100%)', width: '100%' }}>

        <div ref={badgeRef}>
          <span className="badge badge-gold">India · APAC · Middle East</span>
        </div>

        <h1
          ref={headingRef}
          className="text-white"
          style={{
            fontFamily: 'Cormorant Garant, serif',
            fontSize: 'clamp(28px, 6vw, 58px)',  // ← scales with screen
            fontWeight: 400,
            lineHeight: 1.15,
            margin: '20px 0',
          }}
        >
          Business Intelligence, Lead Generation and{' '}
          <span style={{ color: '#C9A84C', fontStyle: 'italic' }}>Contact Research</span>{' '}
          Across India, APAC and the Middle East
        </h1>

        <div ref={lineRef} style={{ width: '60px', height: '1px', backgroundColor: '#C9A84C', margin: '20px 0' }} />

        <p
          ref={paraRef}
          style={{
            fontSize: 'clamp(14px, 2vw, 17px)',  // ← scales with screen
            lineHeight: 1.8,
            color: '#B0BEC5',
            marginBottom: '32px',
          }}
        >
          We help businesses identify decision-makers, build targeted prospect databases,
          gather market intelligence, and accelerate business growth through accurate
          research and data-driven insights.
        </p>

        <div ref={btnsRef} className="flex gap-4 flex-wrap">
          <a href="/contact" className="btn btn-gold btn-lg">Request a Project</a>
          <a href="/contact" className="btn btn-ghost btn-lg">Schedule a Consultation</a>
        </div>

      </div>
    </section>
  )
}