import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function About() {
  const heroRef    = useRef(null)
  const whoRef     = useRef(null)
  const missionRef = useRef(null)

  // ── Hero: slide-down on mount only ──
  useEffect(() => {
    const el = heroRef.current
    gsap.set(el, { opacity: 0, y: -30 })
    gsap.to(el, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.1 })
  }, [])

  // ── Scroll sections: bidirectional ──
  useEffect(() => {
    const sections = [whoRef.current, missionRef.current]

    sections.forEach(section => {
      const children = Array.from(section.children)
      gsap.set(children, { opacity: 0, y: 40 })

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // ── Animate IN ──
            gsap.to(children, {
              opacity: 1, y: 0,
              duration: 0.7, stagger: 0.15, ease: 'power3.out',
            })
          } else {
            // ── Animate OUT (reverse) ──
            gsap.to(children, {
              opacity: 0, y: -40,      // slides UP on exit
              duration: 0.5, stagger: 0.08, ease: 'power3.in',
            })
          }
        })
      }, { threshold: 0.1 })
      // ↑ No observer.disconnect() — keeps watching for re-entry

      observer.observe(section)
    })
  }, [])

  return (
    <>
      <style>{`
        .about-hero {
          min-height: 70vh;
          display: flex;
          align-items: center;
          padding: clamp(100px, 12vw, 160px) clamp(20px, 5vw, 80px) clamp(60px, 8vw, 100px); /* ← fix */
          position: relative;
          overflow: hidden;
          box-sizing: border-box; /* ← fix */
        }
        .about-hero-content {
          position: relative;
          zIndex: 3;
          max-width: min(800px, 100%); /* ← fix */
        }
        .about-hero p {
          font-size: clamp(14px, 2vw, 17px); /* ← fix */
          line-height: 1.8;
          color: #FFFFFF;
          max-width: 600px;
        }
        .about-section {
          padding: clamp(60px, 8vw, 100px) clamp(20px, 5vw, 80px); /* ← fix */
          position: relative;
          overflow: hidden;
          box-sizing: border-box; /* ← fix */
        }
        .who-h2 {
          font-family: 'Cormorant Garant', serif;
          font-size: clamp(26px, 4vw, 48px); /* ← fix */
          font-weight: 400;
          color: #0B1221;
          margin-bottom: 16px;
        }
        .who-p {
          font-size: clamp(14px, 2vw, 17px); /* ← fix */
          line-height: 1.9;
          color: #4A5568;
          max-width: 800px;
          margin-bottom: 40px;
        }
        .mv-h2 {
          font-family: 'Cormorant Garant', serif;
          font-size: clamp(26px, 4vw, 48px); /* ← fix */
          font-weight: 400;
          color: #FFFFFF;
        }
        .mv-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          max-width: 1100px;
          margin: 0 auto;
        }
        @media (min-width: 768px) {
          .mv-grid { grid-template-columns: repeat(2, 1fr); }
        }
        .mv-card {
          padding: clamp(28px, 4vw, 48px) clamp(20px, 3vw, 40px); /* ← fix */
          border-radius: 2px;
          position: relative;
          overflow: hidden;
          transition: transform 0.3s;
          box-sizing: border-box; /* ← fix */
        }
        .mv-card:hover { transform: translateY(-4px); }
        .mv-card-title {
          font-family: 'Cormorant Garant', serif;
          font-size: clamp(22px, 3vw, 28px); /* ← fix */
          font-weight: 500;
          margin-bottom: 16px;
        }
        .mv-card-desc {
          font-size: clamp(13px, 1.8vw, 15px); /* ← fix */
          line-height: 1.9;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px; /* ← fix: tighter on mobile */
          padding-top: 40px;
          border-top: 1px solid rgba(201,168,76,0.3);
        }
        @media (min-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 24px;
          }
        }
        .stat-card {
          padding: clamp(16px, 2vw, 24px); /* ← fix */
          background-color: #FFFFFF;
          border-top: 2px solid #C9A84C;
          border-radius: 2px;
          box-sizing: border-box; /* ← fix */
        }
        .stat-value {
          font-family: 'Cormorant Garant', serif;
          font-size: clamp(30px, 5vw, 42px); /* ← fix */
          font-weight: 300;
          color: #C9A84C;
          line-height: 1;
        }
        .stat-label {
          font-size: clamp(9px, 1.2vw, 11px); /* ← fix */
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #8896A8;
          margin-top: 6px;
        }
      `}</style>

      {/* ── Hero ── mount animation only */}
      <section className="about-hero">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&q=80"
          alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5, zIndex: 0 }}
        />
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#0B1221', opacity: 0.4, zIndex: 1 }} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '500px', height: '500px', background: 'radial-gradient(circle at top left, rgba(201,168,76,0.12) 0%, transparent 70%)', zIndex: 2 }} />

        <div ref={heroRef} style={{ position: 'relative', zIndex: 3, maxWidth: 'min(800px, 100%)' }}>
          <span className="badge badge-gold" style={{ marginBottom: '24px', display: 'inline-block' }}>
            About Us
          </span>
          <h1 style={{ fontFamily: 'Cormorant Garant, serif', fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 600, color: '#FFFFFF', lineHeight: 1.1, marginBottom: '24px' }}>
            About <span style={{ color: '#C9A84C', fontStyle: 'italic' }}>NexBridge Intelligence</span>
          </h1>
          <div style={{ width: '60px', height: '1px', backgroundColor: '#C9A84C', marginBottom: '24px' }} />
          <p className="about-hero p">
            Empowering businesses with accurate research and data-driven intelligence across India, APAC, and the Middle East.
          </p>
        </div>
      </section>

      {/* ── Who We Are ── */}
      <section className="about-section" style={{ backgroundColor: '#F5F0E8' }}>
        <div style={{ position: 'absolute', top: '50%', right: '-40px', transform: 'translateY(-50%)', fontFamily: 'Cormorant Garant, serif', fontSize: 'clamp(80px, 15vw, 180px)', fontWeight: 700, color: 'rgba(201,168,76,0.06)', lineHeight: 1, userSelect: 'none', zIndex: 0 }}>
          {/* ↑ fix: watermark also scales */}
          WHO
        </div>

        <div ref={whoRef} style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <span className="badge badge-gold" style={{ marginBottom: '16px', display: 'inline-block' }}>
            Who We Are
          </span>
          <h2 className="who-h2">
            A Trusted <span style={{ color: '#C9A84C', fontStyle: 'italic' }}>Intelligence Partner</span>
          </h2>
          <div style={{ width: '60px', height: '1px', backgroundColor: '#C9A84C', marginBottom: '32px' }} />
          <p className="who-p">
            NexBridge Intelligence is a business intelligence and lead generation company serving organizations across India, APAC, and the Middle East. We specialize in contact research, market intelligence, prospect database development, and business research solutions that help organizations make informed decisions and accelerate growth.
          </p>

          <div className="stats-grid">
            {[
              { value: '10+',  label: 'Years Experience' },
              { value: '500+', label: 'Clients Served' },
              { value: '1M+',  label: 'Contacts Delivered' },
              { value: '98%',  label: 'Accuracy Rate' },
            ].map((s, i) => (
              <div key={i} className="stat-card">
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="about-section" style={{ backgroundColor: '#0B1221' }}>
        <img
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1800&q=80"
          alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.07, zIndex: 0 }}
        />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="badge badge-gold" style={{ marginBottom: '16px', display: 'inline-block' }}>
              Our Purpose
            </span>
            <h2 className="mv-h2">
              Mission <span style={{ color: '#C9A84C', fontStyle: 'italic' }}>&amp;</span> Vision
            </h2>
            <div style={{ width: '60px', height: '1px', backgroundColor: '#C9A84C', margin: '16px auto 0' }} />
          </div>

          <div ref={missionRef} className="mv-grid">
            {/* Mission */}
            <div className="mv-card" style={{ backgroundColor: '#162035', borderLeft: '2px solid #C9A84C' }}>
              <div style={{ fontSize: 'clamp(28px, 4vw, 36px)', marginBottom: '20px' }}>🎯</div>
              <h3 className="mv-card-title" style={{ color: '#FFFFFF' }}>Our Mission</h3>
              <div style={{ width: '40px', height: '1px', backgroundColor: '#C9A84C', marginBottom: '20px' }} />
              <p className="mv-card-desc" style={{ color: '#8896A8' }}>
                To provide accurate, actionable business intelligence that enables our clients to connect with the right people and uncover new opportunities.
              </p>
            </div>

            {/* Vision */}
            <div className="mv-card" style={{ backgroundColor: '#C9A84C' }}>
              <div style={{ fontSize: 'clamp(28px, 4vw, 36px)', marginBottom: '20px' }}>🔭</div>
              <h3 className="mv-card-title" style={{ color: '#0B1221' }}>Our Vision</h3>
              <div style={{ width: '40px', height: '1px', backgroundColor: '#0B1221', marginBottom: '20px' }} />
              <p className="mv-card-desc" style={{ color: '#0B1221' }}>
                To become a trusted research and intelligence partner for businesses across emerging and developed markets.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}