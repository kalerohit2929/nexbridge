import { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'

const industries = [
  'Technology', 'SaaS', 'Healthcare', 'Banking',
  'Insurance', 'Manufacturing', 'Retail', 'Logistics',
  'Telecommunications', 'Education', 'Other',
]

const regions = ['India', 'APAC', 'Middle East', 'Other']

export default function ContactForm() {
  const formRef    = useRef(null)
  const sectionRef = useRef(null)
  const headerRef  = useRef(null)
  const leftRef    = useRef(null)
  const rightRef   = useRef(null)

  const [status, setStatus]   = useState('idle')
  const [focused, setFocused] = useState('')

  useEffect(() => {
    const els = [headerRef.current, leftRef.current, rightRef.current]
    gsap.set(els, { opacity: 0, y: 40 })

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // ── Animate IN ──
          gsap.to(els, {
            opacity: 1, y: 0,
            duration: 0.7, stagger: 0.15, ease: 'power3.out',
          })
        } else {
          // ── Animate OUT (reverse) ──
          gsap.to(els, {
            opacity: 0, y: -40,
            duration: 0.4, stagger: 0.08, ease: 'power3.in',
          })
        }
      })
    }, { threshold: 0.1 })
    // ↑ No observer.disconnect() — keeps watching for re-entry

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    const data = new FormData(e.target)
    data.append('access_key', 'c4c8efa2-1277-4a14-b6fa-c1f85163b141')
    data.append('replyto', data.get('email'))

    try {
      const res  = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data })
      const json = await res.json()
      if (json.success) {
        setStatus('success')
        e.target.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputStyle = (name) => ({
    width          : '100%',
    backgroundColor: '#162035',
    border         : '0.5px solid ' + (focused === name ? '#C9A84C' : 'rgba(201,168,76,0.2)'),
    borderRadius   : '0',
    padding        : '14px 16px',
    fontSize       : 'clamp(13px, 1.8vw, 14px)', // ← fix
    color          : '#F5F0E8',
    outline        : 'none',
    transition     : 'border-color 0.25s',
    fontFamily     : 'sans-serif',
    boxSizing      : 'border-box',
  })

  const labelStyle = {
    fontSize     : '10px',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color        : 'rgba(245,240,232,0.4)',
    display      : 'block',
    marginBottom : '8px',
    fontFamily   : 'sans-serif',
  }

  return (
    <section
      ref={sectionRef}
      style={{ backgroundColor: '#0B1221', overflow: 'hidden', boxSizing: 'border-box' }} // ← fix
    >

      <style>{`
        .cf-wrap {
          padding: clamp(40px, 6vw, 100px) clamp(20px, 5vw, 60px); /* ← fix */
          max-width: 1100px;
          margin: 0 auto;
          box-sizing: border-box; /* ← fix */
        }

        .cf-inner {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
        }
        @media (min-width: 1024px) {
          .cf-inner {
            grid-template-columns: 1fr 1.6fr;
            gap: 80px;
            align-items: start;
          }
        }

        .cf-title {
          font-family: Cormorant Garant, Georgia, serif;
          font-weight: 300;
          color: #F5F0E8;
          line-height: 1.15;
          margin: 0 0 24px;
          font-size: clamp(26px, 5vw, 44px); /* ← fix */
        }

        .cf-grid-2 {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 540px) {
          .cf-grid-2 { grid-template-columns: 1fr 1fr; }
        }

        .cf-select {
          appearance: none;
          -webkit-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23C9A84C' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          padding-right: 36px !important;
          cursor: pointer;
        }
        .cf-select option {
          background-color: #162035;
          color: #F5F0E8;
        }

        .cf-btn {
          width: 100%;
          padding: clamp(13px, 2vw, 16px) 32px; /* ← fix */
          background-color: #C9A84C;
          border: none;
          color: #0B1221;
          font-size: clamp(11px, 1.5vw, 12px); /* ← fix */
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 500;
          cursor: pointer;
          font-family: sans-serif;
          transition: background-color 0.25s, opacity 0.25s;
          border-radius: 0;
        }
        .cf-btn:hover   { background-color: #b8922f; }
        .cf-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .cf-info-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 20px 0;
          border-bottom: 0.5px solid rgba(201,168,76,0.12);
        }
        .cf-info-item:first-child {
          border-top: 0.5px solid rgba(201,168,76,0.12);
        }

        .cf-dot {
          width: 6px;
          height: 6px;
          background-color: #C9A84C;
          flex-shrink: 0;
          margin-top: 6px;
        }

        .cf-info-label {
          font-size: clamp(10px, 1.5vw, 12px); /* ← fix */
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.3);
          margin: 0 0 4px;
          font-family: sans-serif;
        }
        .cf-info-value {
          font-size: clamp(14px, 2vw, 15px); /* ← fix */
          color: #F5F0E8;
          margin: 0;
          font-family: Cormorant Garant, Georgia, serif;
          font-weight: 400;
        }

        .cf-success-box {
          padding: clamp(32px, 5vw, 48px) clamp(20px, 4vw, 40px); /* ← fix */
          border: 0.5px solid rgba(201,168,76,0.3);
          text-align: center;
          box-sizing: border-box;
        }
        .cf-success-title {
          font-family: Cormorant Garant, Georgia, serif;
          font-size: clamp(20px, 4vw, 26px); /* ← fix */
          font-weight: 300;
          color: #F5F0E8;
          margin: 0 0 12px;
        }

        ::placeholder { color: rgba(245,240,232,0.2) !important; }
      `}</style>

      <div className="cf-wrap">

        {/* Section label */}
        <div ref={headerRef} style={{ marginBottom: '48px', paddingBottom: '32px', borderBottom: '0.5px solid rgba(201,168,76,0.2)' }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C9A84C', margin: '0 0 14px', fontFamily: 'sans-serif' }}>
            Contact
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '28px', height: '0.5px', backgroundColor: '#C9A84C' }} />
            <div style={{ width: '5px', height: '5px', border: '1px solid #C9A84C', transform: 'rotate(45deg)', flexShrink: 0 }} />
            <div style={{ width: '28px', height: '0.5px', backgroundColor: '#C9A84C' }} />
          </div>
        </div>

        <div className="cf-inner">

          {/* Left — info panel */}
          <div ref={leftRef}>
            <h2 className="cf-title">
              Let's Discuss Your <em style={{ color: '#C9A84C' }}>Research Requirements</em>
            </h2>
            <p style={{ fontSize: 'clamp(13px,1.8vw,14px)', color: 'rgba(245,240,232,0.4)', lineHeight: 1.8, margin: '0 0 40px', fontFamily: 'sans-serif' }}>
              Tell us about your project and we'll get back to you within 24 hours with a tailored research proposal.
            </p>

            <div>
              <div className="cf-info-item">
                <div className="cf-dot" />
                <div>
                  <p className="cf-info-label">Response Time</p>
                  <p className="cf-info-value">Within 24 hours</p>
                </div>
              </div>
              <div className="cf-info-item">
                <div className="cf-dot" />
                <div>
                  <p className="cf-info-label">Coverage</p>
                  <p className="cf-info-value">India · APAC · Middle East</p>
                </div>
              </div>
              <div className="cf-info-item">
                <div className="cf-dot" />
                <div>
                  <p className="cf-info-label">Engagement</p>
                  <p className="cf-info-value">Project-based &amp; Retainer</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div ref={rightRef}>
            {status === 'success' ? (
              <div className="cf-success-box">
                <div style={{ width: '48px', height: '48px', border: '1px solid #C9A84C', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '20px' }}>
                  ✓
                </div>
                <h3 className="cf-success-title">Message Received</h3>
                <p style={{ fontSize: 'clamp(13px,1.8vw,14px)', color: 'rgba(245,240,232,0.4)', margin: '0 0 28px', lineHeight: 1.7, fontFamily: 'sans-serif' }}>
                  Thank you for reaching out. We'll be in touch within 24 hours.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C9A84C', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'sans-serif' }}
                >
                  Send another message →
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit}>
                <input type="hidden" name="subject" value="New Research Enquiry" />
                <input type="checkbox" name="botcheck" style={{ display: 'none' }} />

                {/* Row 1 — Name + Company */}
                <div className="cf-grid-2" style={{ marginBottom: '20px' }}>
                  <div>
                    <label style={labelStyle}>Name <span style={{ color: '#C9A84C' }}>*</span></label>
                    <input type="text" name="name" required placeholder="John Smith"
                      style={inputStyle('name')}
                      onFocus={() => setFocused('name')} onBlur={() => setFocused('')} />
                  </div>
                  <div>
                    <label style={labelStyle}>Company <span style={{ color: '#C9A84C' }}>*</span></label>
                    <input type="text" name="company" required placeholder="Acme Corp"
                      style={inputStyle('company')}
                      onFocus={() => setFocused('company')} onBlur={() => setFocused('')} />
                  </div>
                </div>

                {/* Row 2 — Email + Phone */}
                <div className="cf-grid-2" style={{ marginBottom: '20px' }}>
                  <div>
                    <label style={labelStyle}>Email <span style={{ color: '#C9A84C' }}>*</span></label>
                    <input type="email" name="email" required placeholder="john@acme.com"
                      style={inputStyle('email')}
                      onFocus={() => setFocused('email')} onBlur={() => setFocused('')} />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone</label>
                    <input type="tel" name="phone" placeholder="+91 98765 43210"
                      style={inputStyle('phone')}
                      onFocus={() => setFocused('phone')} onBlur={() => setFocused('')} />
                  </div>
                </div>

                {/* Row 3 — Industry + Region */}
                <div className="cf-grid-2" style={{ marginBottom: '20px' }}>
                  <div>
                    <label style={labelStyle}>Industry <span style={{ color: '#C9A84C' }}>*</span></label>
                    <select name="industry" required className="cf-select" style={inputStyle('industry')}
                      onFocus={() => setFocused('industry')} onBlur={() => setFocused('')} defaultValue="">
                      <option value="" disabled>Select industry</option>
                      {industries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Region <span style={{ color: '#C9A84C' }}>*</span></label>
                    <select name="region" required className="cf-select" style={inputStyle('region')}
                      onFocus={() => setFocused('region')} onBlur={() => setFocused('')} defaultValue="">
                      <option value="" disabled>Select region</option>
                      {regions.map(reg => <option key={reg} value={reg}>{reg}</option>)}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div style={{ marginBottom: '28px' }}>
                  <label style={labelStyle}>Message <span style={{ color: '#C9A84C' }}>*</span></label>
                  <textarea name="message" required rows={5}
                    placeholder="Tell us about your research requirements, target market, and timeline..."
                    style={{ ...inputStyle('message'), resize: 'vertical', minHeight: '130px', lineHeight: 1.7 }}
                    onFocus={() => setFocused('message')} onBlur={() => setFocused('')} />
                </div>

                {status === 'error' && (
                  <p style={{ fontSize: '13px', color: '#E24B4A', margin: '0 0 16px', fontFamily: 'sans-serif' }}>
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}

                <button type="submit" className="cf-btn" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Submit Enquiry →'}
                </button>

                <p style={{ fontSize: '11px', color: 'rgba(245,240,232,0.25)', margin: '16px 0 0', fontFamily: 'sans-serif', lineHeight: 1.6 }}>
                  Your information is kept confidential and never shared with third parties.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}