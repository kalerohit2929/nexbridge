import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function LegalLayout({ badge, title, italic, lastUpdated, children }) {
  const heroRef    = useRef(null)
  const contentRef = useRef(null)

  // Hero slides down on mount
  useEffect(() => {
    gsap.set(heroRef.current, { opacity: 0, y: -30 })
    gsap.to(heroRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 })
  }, [])

  // Content sections animate in/out on scroll
  useEffect(() => {
    const sections = Array.from(contentRef.current.children)
    gsap.set(sections, { opacity: 0, y: 40 })

    const observers = sections.map((section, i) => {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            gsap.to(section, {
              opacity: 1, y: 0,
              duration: 0.6, delay: 0.05 * (i % 4), ease: 'power3.out',
            })
          } else {
            gsap.to(section, {
              opacity: 0, y: -30,
              duration: 0.4, ease: 'power3.in',
            })
          }
        })
      }, { threshold: 0.1 })
      obs.observe(section)
      return obs
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  return (
    <>
      <style>{`
        .legal-hero {
          background-color: #0B1221;
          padding: clamp(100px,12vw,160px) clamp(20px,5vw,80px) clamp(48px,6vw,80px);
          box-sizing: border-box;
          overflow: hidden;
          position: relative;
          border-bottom: 1px solid rgba(201,168,76,0.2);
        }
        .legal-hero-inner {
          max-width: min(800px, 100%);
        }
        .legal-hero h1 {
          font-family: 'Cormorant Garant', Georgia, serif;
          font-size: clamp(32px, 5vw, 58px);
          font-weight: 400;
          color: #FFFFFF;
          line-height: 1.1;
          margin: 0 0 20px;
        }
        .legal-hero-meta {
          font-size: clamp(11px, 1.5vw, 13px);
          color: rgba(245,240,232,0.35);
          letter-spacing: 0.06em;
          margin: 0;
        }
        .legal-body {
          background-color: #F5F0E8;
          padding: clamp(48px,6vw,100px) clamp(20px,5vw,80px);
          box-sizing: border-box;
        }
        .legal-content {
          max-width: min(820px, 100%);
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: clamp(36px, 5vw, 56px);
        }
        .legal-section-block {
          box-sizing: border-box;
        }
        .legal-section-block h2 {
          font-family: 'Cormorant Garant', Georgia, serif;
          font-size: clamp(20px, 3vw, 28px);
          font-weight: 500;
          color: #0B1221;
          margin: 0 0 12px;
        }
        .legal-gold-line {
          width: 32px;
          height: 1px;
          background-color: #C9A84C;
          margin-bottom: 16px;
        }
        .legal-section-block p,
        .legal-section-block li {
          font-size: clamp(13px, 1.8vw, 15px);
          line-height: 1.85;
          color: #4A5568;
          margin: 0 0 10px;
        }
        .legal-section-block ul,
        .legal-section-block ol {
          padding-left: clamp(16px, 3vw, 24px);
          margin: 0 0 10px;
        }
        .legal-section-block li {
          margin-bottom: 6px;
        }
        .legal-section-block a {
          color: #C9A84C;
          text-decoration: none;
          border-bottom: 1px solid rgba(201,168,76,0.3);
          transition: border-color 0.2s;
        }
        .legal-section-block a:hover {
          border-color: #C9A84C;
        }
        .legal-highlight-box {
          background-color: #FFFFFF;
          border-left: 2px solid #C9A84C;
          padding: clamp(16px, 2vw, 24px) clamp(16px, 3vw, 28px);
          border-radius: 2px;
          margin-top: 12px;
          box-sizing: border-box;
        }
        .legal-highlight-box p {
          margin: 0 !important;
        }
        .legal-contact-box {
          background-color: #0B1221;
          padding: clamp(24px, 4vw, 40px);
          border-radius: 2px;
          box-sizing: border-box;
        }
        .legal-contact-box p {
          color: rgba(245,240,232,0.6) !important;
        }
        .legal-contact-box h3 {
          font-family: 'Cormorant Garant', Georgia, serif;
          font-size: clamp(18px, 2.5vw, 22px);
          font-weight: 400;
          color: #FFFFFF;
          margin: 0 0 12px;
        }
        .legal-contact-box a {
          color: #C9A84C !important;
          border-bottom-color: rgba(201,168,76,0.3) !important;
        }
      `}</style>

      {/* Hero */}
      <section className="legal-hero">
        {/* Subtle gold radial accent */}
        <div style={{ position: 'absolute', top: 0, right: 0, width: '400px', height: '400px', background: 'radial-gradient(circle at top right, rgba(201,168,76,0.08) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }} />

        <div ref={heroRef} className="legal-hero-inner" style={{ position: 'relative', zIndex: 1 }}>
          <span className="badge badge-gold" style={{ marginBottom: '20px', display: 'inline-block' }}>
            {badge}
          </span>
          <h1>
            {title}{' '}
            <span style={{ color: '#C9A84C', fontStyle: 'italic' }}>{italic}</span>
          </h1>
          <div style={{ width: '60px', height: '1px', backgroundColor: '#C9A84C', marginBottom: '20px' }} />
          <p className="legal-hero-meta">Last updated: {lastUpdated}</p>
        </div>
      </section>

      {/* Body */}
      <section className="legal-body">
        <div ref={contentRef} className="legal-content">
          {children}
        </div>
      </section>
    </>
  )
}