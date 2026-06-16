import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const industries = [
  { name: 'Technology',            icon: '💻' },
  { name: 'Pharmaceuticals',            icon: '🏥' },
  { name: 'Financial Services',               icon: '🏦' },
  { name: 'Insurance',             icon: '🛡️' },
  // { name: 'Telecommunications',    icon: '📡' },
  // { name: 'Education',             icon: '🎓' },
  { name: 'Recruitment & Staffing',icon: '🧑‍🤝‍🧑' },
]

export default function Industries() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    gsap.set(cardsRef.current, { opacity: 0, y: 30 })

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          gsap.to(cardsRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power3.out',
          })
          observer.disconnect()
        }
      })
    }, { threshold: 0.1 })

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="industries-section">

      <style>{`
        .industries-section {
          background-color: #0B1221;
          padding: clamp(60px, 8vw, 100px) clamp(20px, 5vw, 80px); /* ← fix */
          box-sizing: border-box;
          overflow-x: hidden; /* ← fix */
        }
        .industries-header h2 {
          font-family: 'Cormorant Garant', serif;
          font-size: clamp(28px, 6vw, 48px); /* ← fix */
          font-weight: 400;
          color: #FFFFFF;
          margin-bottom: 16px;
        }
        .industries-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          max-width: 1100px;
          margin: 0 auto;
        }
        @media (min-width: 640px) {
          .industries-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .industries-grid {
            grid-template-columns: repeat(5, 1fr); /* ← kept as is, fine on desktop */
          }
        }
        .industry-card {
          background-color: #162035;
          border: 1px solid rgba(201,168,76,0.15);
          border-radius: 2px;
          padding: 32px 20px;
          text-align: center;
          cursor: default;
          transition: all 0.2s;
          box-sizing: border-box; /* ← fix */
        }
        .industry-card:hover {
          background-color: #1E2D47;
          border-color: #C9A84C;
          transform: translateY(-4px);
        }
      `}</style>

      {/* Header */}
      <div className="industries-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
        <span className="badge badge-gold" style={{ marginBottom: '16px', display: 'inline-block' }}>
          Sectors
        </span>
        <h2>
          Industries We <span style={{ color: '#C9A84C', fontStyle: 'italic' }}>Serve</span>
        </h2>
        <div style={{ width: '60px', height: '1px', backgroundColor: '#C9A84C', margin: '0 auto' }} />
      </div>

      {/* Grid */}
      <div className="industries-grid">
        {industries.map((industry, i) => (
          <div
            key={i}
            ref={el => cardsRef.current[i] = el}
            className="industry-card"
          >
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>{industry.icon}</div>
            <p style={{
              fontFamily: 'Cormorant Garant, serif',
              fontSize: 'clamp(14px, 2vw, 17px)', /* ← fix */
              fontWeight: 500,
              color: '#F5F0E8',
              letterSpacing: '0.02em',
            }}>
              {industry.name}
            </p>
          </div>
        ))}
      </div>

    </section>
  )
}