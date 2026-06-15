import { useEffect, useRef } from 'react'

const services = [
  { title: 'Lead Generation',        icon: '🎯', desc: 'Targeted prospect database creation tailored to your ideal customer profile and market segment.' },
  { title: 'Contact Research',       icon: '🔍', desc: 'Identify relevant business contacts and decision-makers across organisations and departments.' },
  { title: 'Market Intelligence',    icon: '📊', desc: 'Actionable industry and market insights to position your offering with confidence.' },
  { title: 'Company Research',       icon: '🏢', desc: 'Deep-dive into companies, departments, and organisational structures for strategic clarity.' },
  { title: 'Data Enrichment',        icon: '🗄️', desc: 'Improve CRM and database quality so your team works from accurate, complete records.' },
  { title: 'Account-Based Research', icon: '🎯', desc: 'Custom research for strategic target accounts — built around your specific priorities.' },
]

export default function Services() {
  const sectionRef = useRef(null)
  const headerRef  = useRef(null)
  const itemsRef   = useRef([])

  useEffect(function() {
    const header = headerRef.current
    const items  = itemsRef.current

    function resetHeader() {
      header.style.transition = 'none'
      header.style.opacity    = '0'
      header.style.transform  = 'translateY(-20px)'
    }
    function showHeader() {
      header.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
      header.style.opacity    = '1'
      header.style.transform  = 'translateY(0)'
    }

    function resetItem(el, i) {
      el.style.transition = 'none'
      el.style.opacity    = '0'
      el.style.transform  = i % 2 === 0 ? 'translateX(-28px)' : 'translateX(28px)'
    }
    function showItem(el, i) {
      var col   = i % 3
      var delay = col * 0.1 + Math.floor(i / 3) * 0.08
      el.style.transition = 'opacity 0.55s ease ' + delay + 's, transform 0.55s ease ' + delay + 's'
      el.style.opacity    = '1'
      el.style.transform  = 'translateX(0)'
    }

    resetHeader()
    items.forEach(function(el, i) { resetItem(el, i) })

    var hObs = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting) { showHeader() } else { resetHeader() }
    }, { threshold: 0.2 })
    hObs.observe(header)

    var iObservers = items.map(function(el, i) {
      var obs = new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting) { showItem(el, i) } else { resetItem(el, i) }
      }, { threshold: 0.1 })
      obs.observe(el)
      return obs
    })

    return function() {
      hObs.disconnect()
      iObservers.forEach(function(o) { o.disconnect() })
    }
  }, [])

  return (
    <section ref={sectionRef} style={{ backgroundColor: '#F5F0E8', overflow: 'hidden' }}>

      <style>{`
        .srv2-wrap {
          padding: 60px 20px;
        }
        @media (min-width: 640px) {
          .srv2-wrap { padding: 80px 40px; }
        }
        @media (min-width: 1024px) {
          .srv2-wrap { padding: 100px 80px; }
        }

        .srv2-header-row {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 56px;
          padding-bottom: 40px;
          border-bottom: 1px solid rgba(11,18,33,0.12);
        }
        @media (min-width: 768px) {
          .srv2-header-row {
            flex-direction: row;
            align-items: flex-end;
            justify-content: space-between;
          }
        }

        .srv2-title {
          font-family: Cormorant Garant, Georgia, serif;
          font-weight: 300;
          color: #0B1221;
          margin: 0;
          line-height: 1.1;
          font-size: 34px;
        }
        @media (min-width: 640px) {
          .srv2-title { font-size: 42px; }
        }
        @media (min-width: 1024px) {
          .srv2-title { font-size: 48px; }
        }

        .srv2-subtitle {
          font-size: 13px;
          color: rgba(11,18,33,0.45);
          line-height: 1.7;
          margin: 0;
          max-width: 100%;
        }
        @media (min-width: 768px) {
          .srv2-subtitle {
            text-align: right;
            max-width: 220px;
          }
        }

        .srv2-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1px;
          background-color: rgba(11,18,33,0.1);
          max-width: 1100px;
          margin: 0 auto;
        }
        @media (min-width: 640px) {
          .srv2-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .srv2-grid { grid-template-columns: repeat(3, 1fr); }
        }

        .srv2-card {
          background-color: #F5F0E8;
          padding: 32px 24px;
          opacity: 0;
          position: relative;
          transition: background-color 0.25s;
          cursor: default;
        }
        @media (min-width: 640px) {
          .srv2-card { padding: 36px 28px; }
        }
        @media (min-width: 1024px) {
          .srv2-card { padding: 44px 36px; }
        }

        .srv2-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background-color: #C9A84C;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s ease;
        }
        .srv2-card:hover::before {
          transform: scaleX(1);
        }
        .srv2-card:hover {
          background-color: #EDEAE0;
        }
        .srv2-card:hover .srv2-card-num {
          color: rgba(201,168,76,0.4);
        }
        .srv2-card:hover .srv2-card-title {
          color: #C9A84C;
        }

        .srv2-card-num {
          font-family: Georgia, serif;
          font-size: 38px;
          font-weight: 300;
          color: rgba(11,18,33,0.07);
          line-height: 1;
          margin-bottom: 16px;
          transition: color 0.25s;
        }
        @media (min-width: 1024px) {
          .srv2-card-num { font-size: 48px; }
        }

        .srv2-card-icon {
          font-size: 20px;
          margin-bottom: 14px;
          display: block;
        }

        .srv2-card-title {
          font-family: Cormorant Garant, Georgia, serif;
          font-size: 19px;
          font-weight: 500;
          color: #0B1221;
          margin: 0 0 12px;
          line-height: 1.2;
          transition: color 0.25s;
        }
        @media (min-width: 1024px) {
          .srv2-card-title { font-size: 21px; }
        }

        .srv2-card-line {
          width: 24px;
          height: 1px;
          background-color: #C9A84C;
          margin-bottom: 14px;
        }

        .srv2-card-desc {
          font-size: 13.5px;
          line-height: 1.75;
          color: rgba(11,18,33,0.5);
          margin: 0;
        }
      `}</style>

      <div className="srv2-wrap">

        {/* Header */}
        <div ref={headerRef} className="srv2-header-row" style={{ opacity: 0 }}>
          <div>
            <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C9A84C', margin: '0 0 14px', fontFamily: 'sans-serif' }}>
              What We Do
            </p>
            <h2 className="srv2-title">
              Our <em style={{ color: '#C9A84C' }}>Services</em>
            </h2>
          </div>
          <div>
            <p className="srv2-subtitle">
              Six specialised research capabilities to fuel your growth and strategic decisions.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '12px' }}>
              <div style={{ width: '28px', height: '0.5px', backgroundColor: '#C9A84C' }} />
              <div style={{ width: '5px', height: '5px', border: '1px solid #C9A84C', transform: 'rotate(45deg)', flexShrink: 0 }} />
              <div style={{ width: '28px', height: '0.5px', backgroundColor: '#C9A84C' }} />
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="srv2-grid">
          {services.map(function(service, i) {
            return (
              <div
                key={i}
                ref={function(el) { itemsRef.current[i] = el }}
                className="srv2-card"
              >
                <div className="srv2-card-num">{String(i + 1).padStart(2, '0')}</div>
                <span className="srv2-card-icon">{service.icon}</span>
                <h3 className="srv2-card-title">{service.title}</h3>
                <div className="srv2-card-line" />
                <p className="srv2-card-desc">{service.desc}</p>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}