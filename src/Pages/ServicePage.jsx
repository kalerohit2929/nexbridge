import { useEffect, useRef } from 'react'

const services = [
  { title: 'Lead Generation',        desc: 'Targeted prospect database creation tailored to your ideal customer profile and market segment.' },
  { title: 'Contact Research',       desc: 'Identify relevant business contacts and decision-makers across organisations and departments.' },
  { title: 'Market Intelligence',    desc: 'Actionable industry and market insights to position your offering with confidence.' },
  { title: 'Company Research',       desc: 'Deep-dive into companies, departments, and organisational structures for strategic clarity.' },
  { title: 'Data Enrichment',        desc: 'Improve CRM and database quality so your team works from accurate, complete records.' },
  { title: 'Account-Based Research', desc: 'Custom research for strategic target accounts — built around your specific priorities.' },
]

export default function Services() {
  const sectionRef = useRef(null)
  const headerRef  = useRef(null)
  const itemsRef   = useRef([])

  useEffect(() => {
    const header = headerRef.current
    const items  = itemsRef.current

    // ── Helpers ──
    function setInstant(el, props) {
      const prev = el.style.transition
      el.style.transition = 'none'
      Object.assign(el.style, props)
      // force reflow so the instant set isn't batched with the next transition
      void el.offsetHeight
      el.style.transition = prev
    }

    // Detect if we're in single-column mode (mobile)
    function isMobile() {
      return window.innerWidth < 640
    }

    // ── Header ──
    function resetHeader() {
      setInstant(header, { opacity: '0', transform: 'translateY(-24px)', transition: 'none' })
    }
    function showHeader() {
      header.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
      header.style.opacity    = '1'
      header.style.transform  = 'translateY(0)'
    }
    function hideHeader() {
      header.style.transition = 'opacity 0.4s ease, transform 0.4s ease'
      header.style.opacity    = '0'
      header.style.transform  = 'translateY(-24px)'  // slides UP on exit
    }

    // ── Items ──
    function resetItem(el, index) {
      // On mobile everything slides from below; on desktop alternate left/right
      const tx = isMobile() ? '0' : (index % 2 === 0 ? '-32px' : '32px')
      setInstant(el, { opacity: '0', transform: `translateX(${tx}) translateY(${isMobile() ? '24px' : '0'})`, transition: 'none' })
    }
    function showItem(el, index) {
      const row   = Math.floor(index / 2)
      const delay = isMobile() ? index * 0.08 : row * 0.1 + (index % 2) * 0.08
      el.style.transition = `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`
      el.style.opacity    = '1'
      el.style.transform  = 'translateX(0) translateY(0)'
    }
    function hideItem(el, index) {
      const tx = isMobile() ? '0' : (index % 2 === 0 ? '-32px' : '32px')
      el.style.transition = 'opacity 0.35s ease, transform 0.35s ease'
      el.style.opacity    = '0'
      el.style.transform  = `translateX(${tx}) translateY(${isMobile() ? '-24px' : '0'})`
    }

    // ── Set initial hidden state ──
    resetHeader()
    items.forEach((el, i) => resetItem(el, i))

    // ── Header observer ──
    const headerObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) showHeader()
      else hideHeader()
    }, { threshold: 0.2 })
    headerObserver.observe(header)

    // ── Item observers ──
    const itemObservers = items.map((el, i) => {
      const obs = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) showItem(el, i)
        else hideItem(el, i)
      }, { threshold: 0.15 })
      obs.observe(el)
      return obs
    })

    return () => {
      headerObserver.disconnect()
      itemObservers.forEach(obs => obs.disconnect())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: '#0B1221',
        padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,60px)', /* ← fix: was hardcoded 80px 60px */
        fontFamily: 'sans-serif',
        overflow: 'hidden',
        boxSizing: 'border-box', /* ← fix */
      }}
    >

      {/* ── Responsive grid styles ── */}
      <style>{`
        .services-grid {
          display: grid;
          grid-template-columns: 1fr;   /* ← fix: single col on mobile */
          gap: 0;
        }
        @media (min-width: 640px) {
          .services-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        .service-item {
          display: flex;
          align-items: flex-start;
          gap: clamp(14px, 2vw, 24px);  /* ← fix */
          box-sizing: border-box;        /* ← fix */
        }
        /* Desktop: alternate left/right padding + borders */
        @media (min-width: 640px) {
          .service-item-left  { padding: 32px clamp(24px,4vw,48px) 32px 0; border-right: 0.5px solid rgba(245,240,232,0.1); }
          .service-item-right { padding: 32px 0 32px clamp(24px,4vw,48px); }
        }
        /* Mobile: uniform padding */
        @media (max-width: 639px) {
          .service-item { padding: 24px 0; }
        }
        .service-item-border-b { border-bottom: 0.5px solid rgba(245,240,232,0.1); }
        .service-num {
          font-size: clamp(36px, 5vw, 52px); /* ← fix */
          font-weight: 300;
          color: rgba(201,168,76,0.2);
          line-height: 1;
          min-width: clamp(36px, 5vw, 52px);  /* ← fix */
          font-family: Georgia, serif;
          flex-shrink: 0;
        }
        .service-title {
          font-family: 'Cormorant Garant', Georgia, serif;
          font-size: clamp(15px, 2vw, 17px); /* ← fix */
          font-weight: 500;
          color: #F5F0E8;
          margin: 0 0 8px;
        }
        .service-desc {
          font-size: clamp(12px, 1.6vw, 13.5px); /* ← fix */
          line-height: 1.7;
          color: rgba(245,240,232,0.5);
          margin: 0;
        }
        .services-header-text h2 {
          font-family: 'Cormorant Garant', Georgia, serif;
          font-size: clamp(28px, 5vw, 46px); /* ← fix */
          font-weight: 300;
          color: #F5F0E8;
          line-height: 1.15;
          margin: 0;
        }
        .services-header-desc {
          font-size: clamp(12px, 1.6vw, 14px); /* ← fix */
          line-height: 1.7;
          color: rgba(245,240,232,0.5);
          margin: 0;
        }
        /* On mobile: header stacks vertically */
        .services-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 64px;
          border-bottom: 1px solid rgba(201,168,76,0.3);
          padding-bottom: 40px;
          opacity: 0;
          flex-wrap: wrap;   /* ← fix */
          gap: 20px;         /* ← fix */
        }
        .services-header-desc-wrap {
          max-width: 280px;
          text-align: right;
        }
        @media (max-width: 639px) {
          .services-header-desc-wrap {
            text-align: left; /* ← fix: left-align on mobile */
            max-width: 100%;
          }
        }
      `}</style>

      {/* Header */}
      <div ref={headerRef} className="services-header">
        <div className="services-header-text">
          <p style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C9A84C', margin: '0 0 12px' }}>
            What We Do
          </p>
          <h2>
            Our <em style={{ color: '#C9A84C' }}>Services</em>
          </h2>
        </div>
        <div className="services-header-desc-wrap">
          <p className="services-header-desc">
            Six specialised research capabilities to fuel your growth and strategic decisions.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="services-grid">
        {services.map((service, i) => {
          const isLeft    = i % 2 === 0
          const isLastRow = i >= services.length - 2

          return (
            <div
              key={i}
              ref={el => itemsRef.current[i] = el}
              className={[
                'service-item',
                isLeft ? 'service-item-left' : 'service-item-right',
                !isLastRow ? 'service-item-border-b' : '',
              ].join(' ')}
              style={{ opacity: 0 }}
            >
              <span className="service-num">
                {String(i + 1).padStart(2, '0')}
              </span>

              <div style={{ paddingTop: '6px', minWidth: 0 }}> {/* ← fix: minWidth:0 prevents flex overflow */}
                <h3 className="service-title">{service.title}</h3>
                <div style={{ width: '24px', height: '1px', backgroundColor: '#C9A84C', marginBottom: '10px' }} />
                <p className="service-desc">{service.desc}</p>
              </div>
            </div>
          )
        })}
      </div>

    </section>
  )
}