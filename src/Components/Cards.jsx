import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const cards = [
  {
    number: '01',
    title: 'Customized Solutions',
    desc: 'Every project tailored to your unique business goals and target markets.',
    icon: '⚡',
  },
  {
    number: '02',
    title: 'Verified Research',
    desc: 'Rigorous quality checks and multi-level validation on every data point.',
    icon: '✦',
  },
  {
    number: '03',
    title: 'Fast Delivery',
    desc: 'Efficient turnaround times without compromising on accuracy or depth.',
    icon: '◈',
  },
  {
    number: '04',
    title: 'Regional Expertise',
    desc: 'Strong understanding of local business landscapes across India, APAC and the Middle East.',
    icon: '◉',
  },
]

export default function WhyUs() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    // Set initial hidden state
    gsap.set(headingRef.current, { opacity: 0, y: 40 })
    gsap.set(cardsRef.current, { opacity: 0, y: 40 })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // ── Animate IN ──
            gsap.to(headingRef.current, {
              opacity: 1, y: 0,
              duration: 0.6, ease: 'power3.out',
            })
            gsap.to(cardsRef.current, {
              opacity: 1, y: 0,
              duration: 0.7, stagger: 0.15, ease: 'power3.out', delay: 0.2,
            })
          } else {
            // ── Animate OUT (reverse) ──
            gsap.to(headingRef.current, {
              opacity: 0, y: -40,          // slides UP and fades
              duration: 0.4, ease: 'power3.in',
            })
            gsap.to(cardsRef.current, {
              opacity: 0, y: -40,          // slides UP and fades
              duration: 0.4, stagger: 0.08, ease: 'power3.in',
            })
          }
        })
      },
      { threshold: 0.1 }
      // ↑ No observer.disconnect() — keeps watching for re-entry
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="whyus-section">

      <style>{`
        .whyus-section {
          background-color: #F5F0E8;
          padding: clamp(60px, 8vw, 100px) clamp(20px, 5vw, 80px); /* ← fix */
          position: relative;
          overflow: hidden;
          box-sizing: border-box; /* ← fix */
        }
        .whyus-header h2 {
          font-family: 'Cormorant Garant', Georgia, serif;
          font-size: clamp(28px, 5vw, 48px); /* ← fix */
          font-weight: 400;
          color: #0B1221;
          margin-bottom: 16px;
        }
        .whyus-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2px;
          max-width: 1100px;
          margin: 0 auto;
          background-color: rgba(201,168,76,0.15);
        }
        @media (min-width: 768px) {
          .whyus-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .whyus-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        .whyus-card {
          background-color: #F5F0E8;
          padding: clamp(28px, 4vw, 48px) clamp(20px, 3vw, 36px); /* ← fix */
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          cursor: default;
          box-sizing: border-box; /* ← fix */
        }
        .whyus-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background-color: #0B1221;
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform 0.4s ease;
          z-index: 0;
        }
        .whyus-card:hover::after { transform: scaleY(1); }
        .whyus-card:hover .card-number { color: rgba(201,168,76,0.2); }
        .whyus-card:hover .card-icon   { color: #C9A84C; }
        .whyus-card:hover .card-title  { color: #FFFFFF; }
        .whyus-card:hover .card-line   { background-color: #C9A84C; }
        .whyus-card:hover .card-desc   { color: #8896A8; }
        .whyus-card > * { position: relative; z-index: 1; }
        .card-number {
          font-family: 'Cormorant Garant', Georgia, serif;
          font-size: clamp(48px, 8vw, 72px); /* ← fix */
          font-weight: 300;
          color: rgba(11,18,33,0.08);
          line-height: 1;
          margin-bottom: 16px;
          transition: color 0.3s;
        }
        .card-icon {
          font-size: 28px;
          color: #C9A84C;
          margin-bottom: 20px;
          display: block;
          transition: color 0.3s;
        }
        .card-title {
          font-family: 'Cormorant Garant', Georgia, serif;
          font-size: clamp(18px, 3vw, 24px); /* ← fix */
          font-weight: 500;
          color: #0B1221;
          margin-bottom: 12px;
          transition: color 0.3s;
        }
        .card-line {
          width: 32px;
          height: 1px;
          background-color: #C9A84C;
          margin-bottom: 16px;
          transition: background-color 0.3s;
        }
        .card-desc {
          font-size: clamp(13px, 2vw, 14px); /* ← fix */
          line-height: 1.8;
          color: #4A5568;
          transition: color 0.3s;
        }
      `}</style>

      {/* Header */}
      <div ref={headingRef} className="whyus-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
        <span className="badge badge-gold" style={{ marginBottom: '16px', display: 'inline-block' }}>
          Our Edge
        </span>
        <h2>
          Why <span style={{ color: '#C9A84C', fontStyle: 'italic' }}>NexBridge Intelligence?</span>
        </h2>
        <div style={{ width: '60px', height: '1px', backgroundColor: '#C9A84C', margin: '0 auto' }} />
      </div>

      {/* Cards */}
      <div className="whyus-grid">
        {cards.map((card, i) => (
          <div key={i} ref={el => cardsRef.current[i] = el} className="whyus-card">
            <div className="card-number">{card.number}</div>
            <span className="card-icon">{card.icon}</span>
            <h3 className="card-title">{card.title}</h3>
            <div className="card-line" />
            <p className="card-desc">{card.desc}</p>
          </div>
        ))}
      </div>

    </section>
  )
}