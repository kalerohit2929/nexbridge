import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const steps = [
  { step: '01', title: 'Requirement Discussion',  desc: 'We understand your business goals and research requirements in detail.' },
  { step: '02', title: 'Target Definition',       desc: 'Define the ideal customer profile, industries, regions and decision-maker roles.' },
  { step: '03', title: 'Research & Verification', desc: 'Our team conducts in-depth research and verifies every data point.' },
  { step: '04', title: 'Quality Review',          desc: 'Multi-level quality checks ensure accuracy and completeness.' },
  { step: '05', title: 'Final Delivery',          desc: 'Clean, structured data delivered in your preferred format on time.' },
]

export default function Process() {
  const sectionRef = useRef(null)
  const stepsRef   = useRef([])
  const lineRef    = useRef(null)
  const headingRef = useRef(null)

  useEffect(() => {
    gsap.set(headingRef.current, { opacity: 0, y: 40 })
    gsap.set(stepsRef.current,  { opacity: 0, y: 40 })
    gsap.set(lineRef.current,   { scaleX: 0, transformOrigin: 'left' })

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // ── Animate IN ──
          gsap.to(headingRef.current, {
            opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
          })
          gsap.to(lineRef.current, {
            scaleX: 1, duration: 1.2, ease: 'power2.out', delay: 0.2,
          })
          gsap.to(stepsRef.current, {
            opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out', delay: 0.3,
          })
        } else {
          // ── Animate OUT (reverse) ──
          gsap.to(headingRef.current, {
            opacity: 0, y: -40, duration: 0.4, ease: 'power3.in',
          })
          gsap.to(lineRef.current, {
            scaleX: 0, duration: 0.5, ease: 'power2.in', transformOrigin: 'right', // ← shrinks right-to-left
          })
          gsap.to(stepsRef.current, {
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
    <section ref={sectionRef} className="process-section">

      <style>{`
        .process-section {
          background-color: #F5F0E8;
          padding: clamp(60px, 8vw, 100px) clamp(20px, 5vw, 80px); /* ← fix */
          box-sizing: border-box;  /* ← fix */
          overflow-x: hidden;      /* ← fix */
        }
        .process-header h2 {
          font-family: 'Cormorant Garant', serif;
          font-size: clamp(28px, 5vw, 48px); /* ← fix */
          font-weight: 400;
          color: #0B1221;
          margin-bottom: 16px;
        }
        .process-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
        }
        @media (min-width: 768px) {
          .process-grid {
            grid-template-columns: repeat(5, 1fr);
            gap: 0;
          }
        }
        .process-card {
          position: relative;
          padding: clamp(24px, 3vw, 32px) clamp(16px, 2vw, 24px); /* ← fix */
          background: #FFFFFF;
          border-top: 2px solid #C9A84C;
          border-radius: 2px;
          text-align: center;
          transition: transform 0.2s, box-shadow 0.2s;
          box-sizing: border-box; /* ← fix */
        }
        .process-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 8px 48px rgba(11,18,33,0.12);
        }
        @media (min-width: 768px) {
          .process-card {
            border-radius: 0;
            border-top: none;
            border-left: none;
            background: transparent;
          }
        }
        .process-step-num {
          font-family: 'Cormorant Garant', serif;
          font-size: clamp(15px, 2vw, 18px); /* ← fix */
          font-weight: 500;
          color: #C9A84C;
        }
        .process-step-circle {
          width: clamp(44px, 6vw, 56px);  /* ← fix */
          height: clamp(44px, 6vw, 56px); /* ← fix */
          border-radius: 50%;
          background-color: #0B1221;
          border: 2px solid #C9A84C;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          position: relative;
          z-index: 1;
        }
        .process-card-title {
          font-family: 'Cormorant Garant', serif;
          font-size: clamp(16px, 2.5vw, 20px); /* ← fix */
          font-weight: 500;
          color: #0B1221;
          margin-bottom: 10px;
        }
        .process-card-desc {
          font-size: clamp(12px, 1.6vw, 13px); /* ← fix */
          line-height: 1.7;
          color: #4A5568;
        }
        .connector {
          display: none;
        }
        @media (min-width: 768px) {
          .connector {
            display: block;
            position: absolute;
            top: 28px;
            left: 50%;
            right: -50%;
            height: 1px;
            background-color: rgba(201,168,76,0.3);
            z-index: 0;
          }
          .process-card:last-child .connector {
            display: none;
          }
        }
      `}</style>

      {/* Header */}
      <div ref={headingRef} className="process-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
        <span className="badge badge-gold" style={{ marginBottom: '16px', display: 'inline-block' }}>
          How We Work
        </span>
        <h2>
          Our <span style={{ color: '#C9A84C', fontStyle: 'italic' }}>Process</span>
        </h2>
        <div ref={lineRef} style={{ width: '60px', height: '1px', backgroundColor: '#C9A84C', margin: '0 auto' }} />
      </div>

      {/* Steps */}
      <div className="process-grid">
        {steps.map((s, i) => (
          <div key={i} ref={el => stepsRef.current[i] = el} className="process-card">

            <div className="connector" />

            <div className="process-step-circle">
              <span className="process-step-num">{s.step}</span>
            </div>

            <h3 className="process-card-title">{s.title}</h3>
            <p className="process-card-desc">{s.desc}</p>

          </div>
        ))}
      </div>

    </section>
  )
}