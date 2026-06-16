import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const regions = [
  {
    name: 'India',
    icon: '🇮🇳',
    color: '#FF9933',
    desc: 'Major industries and business sectors across metro and tier-2 cities.',
    cities: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune'],
  },
  {
    name: 'APAC',
    icon: '🌏',
    color: '#C9A84C',
    desc: 'Key business hubs across the Asia-Pacific region.',
    cities: ['Singapore', 'Australia', 'Malaysia', 'Indonesia', 'Thailand','Hong kong'],
  },
  {
    name: 'Middle East',
    icon: '🌍',
    color: '#4A9B7F',
    desc: 'Emerging and established markets across the Gulf and Levant.',
    cities: ['UAE', 'Saudi Arabia',],
  },
]

export default function Regions() {
  const sectionRef = useRef(null)
  const cardsRef   = useRef([])
  const headingRef = useRef(null)

  useEffect(() => {
    const els = [headingRef.current, ...cardsRef.current]
    gsap.set(els, { opacity: 0, y: 40 })

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // ── Animate IN ──
          gsap.to(headingRef.current, {
            opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
          })
          gsap.to(cardsRef.current, {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.2, ease: 'power3.out', delay: 0.3,
          })
        } else {
          // ── Animate OUT (reverse) ──
          gsap.to(headingRef.current, {
            opacity: 0, y: -40, duration: 0.4, ease: 'power3.in',
          })
          gsap.to(cardsRef.current, {
            opacity: 0, y: -40, duration: 0.4, stagger: 0.08, ease: 'power3.in',
          })
        }
      })
    }, { threshold: 0.1 })
    // ↑ No observer.disconnect() — keeps watching for re-entry

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="regions-section">

      <style>{`
        .regions-section {
          background-color: #0B1221;
          padding: clamp(60px, 8vw, 100px) clamp(20px, 5vw, 80px); /* ← fix */
          box-sizing: border-box;  /* ← fix */
          overflow-x: hidden;      /* ← fix */
        }
        .regions-header h2 {
          font-family: 'Cormorant Garant', serif;
          font-size: clamp(28px, 5vw, 48px); /* ← fix */
          font-weight: 400;
          color: #FFFFFF;
          margin-bottom: 16px;
        }
        .regions-header p {
          color: #8896A8;
          font-size: clamp(14px, 2vw, 16px); /* ← fix */
          max-width: 500px;
          margin: 0 auto;
        }
        .regions-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          max-width: 1100px;
          margin: 0 auto;
        }
        @media (min-width: 768px) {
          .regions-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .region-card {
          background-color: #162035;
          border: 1px solid rgba(201,168,76,0.15);
          border-radius: 2px;
          padding: clamp(28px, 4vw, 40px) clamp(20px, 3vw, 32px); /* ← fix */
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
          box-sizing: border-box; /* ← fix */
        }
        .region-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background-color: #C9A84C;
        }
        .region-card:hover {
          background-color: #1E2D47;
          border-color: rgba(201,168,76,0.4);
          transform: translateY(-6px);
          box-shadow: 0 12px 48px rgba(11,18,33,0.3);
        }
        .region-name {
          font-family: 'Cormorant Garant', serif;
          font-size: clamp(24px, 4vw, 32px); /* ← fix */
          font-weight: 400;
          color: #FFFFFF;
          margin-bottom: 8px;
        }
        .region-desc {
          font-size: clamp(13px, 1.8vw, 14px); /* ← fix */
          line-height: 1.8;
          color: #8896A8;
          margin-bottom: 24px;
        }
        .city-tag {
          display: inline-block;
          padding: 4px 10px;
          margin: 4px;
          font-size: clamp(10px, 1.5vw, 11px); /* ← fix */
          font-weight: 500;
          color: #8896A8;
          border: 1px solid rgba(201,168,76,0.2);
          border-radius: 2px;
          letter-spacing: 0.05em;
          transition: all 0.2s;
          white-space: nowrap; /* ← fix: prevents tags breaking mid-word */
        }
        .region-card:hover .city-tag {
          border-color: rgba(201,168,76,0.4);
          color: #C9A84C;
        }
      `}</style>

      {/* Header */}
      <div ref={headingRef} className="regions-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
        <span className="badge badge-gold" style={{ marginBottom: '16px', display: 'inline-block' }}>
          Coverage
        </span>
        <h2>
          Regions We <span style={{ color: '#C9A84C', fontStyle: 'italic' }}>Cover</span>
        </h2>
        <div style={{ width: '60px', height: '1px', backgroundColor: '#C9A84C', margin: '0 auto 16px' }} />
        <p>Deep research capabilities across three of the world's fastest-growing business regions.</p>
      </div>

      {/* Cards */}
      <div className="regions-grid">
        {regions.map((region, i) => (
          <div key={i} ref={el => cardsRef.current[i] = el} className="region-card">

            <div style={{ fontSize: 'clamp(36px, 6vw, 48px)', marginBottom: '16px' }}>{region.icon}</div>
            <h3 className="region-name">{region.name}</h3>

            <div style={{ width: '40px', height: '1px', backgroundColor: '#C9A84C', margin: '16px 0' }} />

            <p className="region-desc">{region.desc}</p>

            <div style={{ display: 'flex', flexWrap: 'wrap', margin: '-4px' }}>
              {region.cities.map((city, j) => (
                <span key={j} className="city-tag">{city}</span>
              ))}
            </div>

          </div>
        ))}
      </div>

    </section>
  )
}