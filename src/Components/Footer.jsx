import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Footer() {
  const footerRef = useRef(null)

  useEffect(() => {
    const children = Array.from(footerRef.current.children)
    gsap.set(children, { opacity: 0, y: 20 })

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // ── Animate IN ──
          gsap.to(children, {
            opacity: 1, y: 0,
            duration: 0.6, stagger: 0.1, ease: 'power3.out',
          })
        } else {
          // ── Animate OUT (reverse) ──
          gsap.to(children, {
            opacity: 0, y: -20,         // slides UP and fades
            duration: 0.4, stagger: 0.06, ease: 'power3.in',
          })
        }
      })
    }, { threshold: 0.1 })
    // ↑ No observer.disconnect() — keeps watching for re-entry

    observer.observe(footerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <footer style={{
      backgroundColor: '#FFFFFF',
      borderTop: '1px solid rgba(201,168,76,0.3)',
      overflowX: 'hidden',      // ← fix
      boxSizing: 'border-box',  // ← fix
    }}>

      <style>{`
        .footer-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: clamp(40px, 6vw, 80px) clamp(20px, 5vw, 80px) 40px; /* ← fix */
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          box-sizing: border-box; /* ← fix */
        }
        @media (min-width: 768px) {
          .footer-inner {
            grid-template-columns: 2fr 1fr;
            gap: 48px;
          }
        }
        @media (min-width: 1024px) {
          .footer-inner {
            grid-template-columns: 2fr 1fr 1fr;
          }
        }
        .footer-link {
          display: block;
          font-size: clamp(12px, 1.5vw, 13px); /* ← fix */
          color: #4A5568;
          text-decoration: none;
          padding: 7px 0;
          border-bottom: 1px solid transparent;
          transition: all 0.2s;
          width: fit-content;
          word-break: break-word; /* ← fix: long email on small screens */
        }
        .footer-link:hover {
          color: #C9A84C;
          border-bottom-color: rgba(201,168,76,0.4);
        }
        .footer-bottom {
          border-top: 1px solid rgba(201,168,76,0.2);
          padding: clamp(16px, 3vw, 24px) clamp(20px, 5vw, 80px); /* ← fix */
          display: flex;
          flex-direction: column;
          gap: 8px;
          align-items: center;
          text-align: center;
          background-color: #F5F0E8;
          box-sizing: border-box; /* ← fix */
        }
        @media (min-width: 768px) {
          .footer-bottom {
            flex-direction: row;
            justify-content: space-between;
          }
        }
        .social-btn {
          width: 36px;
          height: 36px;
          border: 1px solid rgba(201,168,76,0.4);
          border-radius: 2px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
          color: #4A5568;
          flex-shrink: 0; /* ← fix */
        }
        .social-btn:hover {
          border-color: #C9A84C;
          background-color: rgba(201,168,76,0.1);
          color: #C9A84C;
        }
        .footer-col-title {
          font-family: 'Cormorant Garant', Georgia, serif;
          font-size: clamp(18px, 3vw, 22px); /* ← fix */
          font-weight: 500;
          color: #0B1221;
          margin-bottom: 20px;
        }
        .footer-gold-line {
          width: 32px;
          height: 1px;
          background-color: #C9A84C;
          margin-bottom: 20px;
        }
        .contact-box {
          margin-top: 32px;
          padding: 20px;
          background-color: #F5F0E8;
          border-left: 2px solid #C9A84C;
          box-sizing: border-box; /* ← fix */
        }
        .region-tag {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #C9A84C;
          padding: 4px 10px;
          border: 1px solid rgba(201,168,76,0.35);
          border-radius: 2px;
          white-space: nowrap; /* ← fix */
        }
        .brand-logo {
          width: clamp(32px, 5vw, 40px);  /* ← fix */
          height: clamp(32px, 5vw, 40px); /* ← fix */
          border: 1px solid #C9A84C;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
      `}</style>

      <div ref={footerRef} className="footer-inner">

        {/* ── Brand Column ── */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div className="brand-logo">
              <span style={{ fontFamily: 'Cormorant Garant, serif', fontSize: 'clamp(16px,3vw,20px)', color: '#C9A84C', fontWeight: 300 }}>N</span>
            </div>
            <div style={{ minWidth: 0 }}> {/* ← fix: prevents flex overflow */}
              <div style={{ fontFamily: 'Cormorant Garant, serif', fontSize: 'clamp(15px,3vw,18px)', color: '#0B1221', fontWeight: 300, letterSpacing: '0.06em' }}>
                NexBridge <span style={{ color: '#C9A84C' }}>Intelligence</span>
              </div>
              <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8896A8', marginTop: '3px' }}>
                Research & Analytics
              </div>
            </div>
          </div>

          <p style={{ fontSize: 'clamp(12px,1.8vw,13px)', color: '#4A5568', lineHeight: 1.8, marginBottom: '20px' }}>
            Lead Generation • Contact Research • Market Intelligence
          </p>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
            <span className="region-tag">India</span>
            <span className="region-tag">APAC</span>
            <span className="region-tag">Middle East</span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-btn">in</a>
          </div>
        </div>

        {/* ── Legal & Contact ── */}
        <div>
          <h4 className="footer-col-title">Legal</h4>
          <div className="footer-gold-line" />
          <a href="/privacy-policy" className="footer-link">Privacy Policy</a>
          <a href="/terms" className="footer-link">Terms & Conditions</a>
          <a href="/cookie-policy" className="footer-link">Cookie-policy</a>
          <a href="/contact" className="footer-link">Contact Information</a>

          <div className="contact-box">
            <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '8px' }}>
              Get In Touch
            </p>
            <a href="mailto:connect@nexbridgeintelligence.in" className="footer-link">
              connect@nexbridgeintelligence.in
            </a>
          </div>
        </div>

      </div>

      {/* ── Bottom Bar ── */}
      {/* ── Bottom Bar ── */}
      <div className="footer-bottom">
        <p style={{ fontSize: 'clamp(11px,1.5vw,12px)', color: '#4A5568', letterSpacing: '0.04em' }}>
          © 2025 NexBridge Intelligence. All rights reserved.
        </p>
        
        <p style={{ fontSize: 'clamp(13px,2vw,14px)', color: '#4A5568', fontStyle: 'italic', fontFamily: 'Cormorant Garant, serif' }}>
          Precision Research. Proven Results.
        </p>
        <p style={{ fontSize: 'clamp(11px,1.5vw,12px)', color: '#4A5568' }}>
          Made by{' '}
          <a href="https://www.instagram.com/__rohittt_29_?utm_source=qr&igsh=YjdsZjlyeXY3MzF6" target="_blank" rel="noreferrer"
            style={{ color: '#C9A84C', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.4)' }}>
            Rohit Kale
          </a>
        </p>
      </div>

    </footer>
  )
}