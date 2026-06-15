import { useEffect, useRef } from 'react'

const industries = [
  { name: 'Technology',         icon: '💻' },
  // { name: 'SaaS',               icon: '☁️' },
  { name: 'Healthcare',         icon: '🏥' },
  { name: 'Banking',            icon: '🏦' },
  { name: 'Insurance',          icon: '🛡️' },
  // { name: 'Manufacturing',      icon: '🏭' },
  // { name: 'Retail',             icon: '🛒' },
  // { name: 'Logistics',          icon: '🚚' },
  { name: 'Telecommunications', icon: '📡' },
  { name: 'Education',          icon: '🎓' },
   { name: 'Recruitment & Staffing',icon: '🧑‍🤝‍🧑' },
]

export default function Industries() {
  const sectionRef = useRef(null)
  const headerRef  = useRef(null)
  const lineRef    = useRef(null)
  const itemsRef   = useRef([])

  useEffect(function() {
    const header = headerRef.current
    const line   = lineRef.current
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

    function resetLine() {
      line.style.transition = 'none'
      line.style.width      = '0px'
      line.style.opacity    = '0'
    }
    function showLine() {
      line.style.transition = 'width 0.8s ease 0.3s, opacity 0.4s ease 0.3s'
      line.style.width      = '100%'
      line.style.opacity    = '1'
    }

    function resetItem(el, index) {
      el.style.transition = 'none'
      el.style.opacity    = '0'
      el.style.transform  = index % 2 === 0 ? 'translateY(30px)' : 'translateY(-30px)'
    }
    function showItem(el, index) {
      var delay = (index % 5) * 0.07
      el.style.transition = 'opacity 0.5s ease ' + delay + 's, transform 0.5s ease ' + delay + 's'
      el.style.opacity    = '1'
      el.style.transform  = 'translateY(0)'
    }

    resetHeader()
    resetLine()
    items.forEach(function(el, i) { resetItem(el, i) })

    var headerObs = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting) { showHeader() } else { resetHeader() }
    }, { threshold: 0.2 })
    headerObs.observe(header)

    var lineObs = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting) { showLine() } else { resetLine() }
    }, { threshold: 0.3 })
    lineObs.observe(line)

    var itemObservers = items.map(function(el, i) {
      var obs = new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting) { showItem(el, i) } else { resetItem(el, i) }
      }, { threshold: 0.1 })
      obs.observe(el)
      return obs
    })

    return function() {
      headerObs.disconnect()
      lineObs.disconnect()
      itemObservers.forEach(function(o) { o.disconnect() })
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{ backgroundColor: '#0B1221', overflow: 'hidden' }}
    >

      <style>{`
        .ind-section-inner {
          padding: 60px 20px;
        }
        @media (min-width: 768px) {
          .ind-section-inner {
            padding: 80px 40px;
          }
        }
        @media (min-width: 1024px) {
          .ind-section-inner {
            padding: 100px 80px;
          }
        }

        .ind-header h2 {
          font-size: 32px;
        }
        @media (min-width: 640px) {
          .ind-header h2 {
            font-size: 40px;
          }
        }
        @media (min-width: 1024px) {
          .ind-header h2 {
            font-size: 48px;
          }
        }

        .ind-grid {
          display: grid;
          gap: 12px;
          grid-template-columns: repeat(2, 1fr);
        }
        @media (min-width: 480px) {
          .ind-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 14px;
          }
        }
        @media (min-width: 768px) {
          .ind-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
          }
        }
        @media (min-width: 1024px) {
          .ind-grid {
            grid-template-columns: repeat(5, 1fr);
          }
        }

        .ind-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 20px 12px;
          border: 0.5px solid rgba(201,168,76,0.15);
          background-color: #162035;
          opacity: 0;
          cursor: default;
          border-radius: 0;
          transition: background-color 0.25s, border-color 0.25s;
        }
        @media (min-width: 640px) {
          .ind-card {
            padding: 24px 14px;
            gap: 12px;
          }
        }
        @media (min-width: 1024px) {
          .ind-card {
            padding: 28px 16px;
          }
        }

        .ind-card:hover {
          background-color: #1E2D47;
          border-color: rgba(201,168,76,0.4);
        }
        .ind-card:hover .ind-num {
          color: rgba(201,168,76,0.5) !important;
        }
        .ind-card:hover .ind-name {
          color: #C9A84C !important;
        }

        .ind-card-top {
          border-top: 2px solid #C9A84C;
        }
        .ind-card-bottom {
          border-bottom: 2px solid #C9A84C;
        }

        .ind-num {
          font-family: Georgia, serif;
          font-size: 22px;
          font-weight: 300;
          color: rgba(201,168,76,0.2);
          line-height: 1;
          transition: color 0.25s;
        }
        @media (min-width: 768px) {
          .ind-num {
            font-size: 26px;
          }
        }

        .ind-icon {
          font-size: 18px;
        }
        @media (min-width: 640px) {
          .ind-icon {
            font-size: 22px;
          }
        }

        .ind-name {
          font-family: Cormorant Garant, Georgia, serif;
          font-size: 13px;
          font-weight: 500;
          color: #F5F0E8;
          margin: 0;
          text-align: center;
          letter-spacing: 0.02em;
          transition: color 0.25s;
          line-height: 1.3;
        }
        @media (min-width: 640px) {
          .ind-name {
            font-size: 15px;
          }
        }
      `}</style>

      <div className="ind-section-inner">

        {/* Header */}
        <div
          ref={headerRef}
          className="ind-header"
          style={{ textAlign: 'center', marginBottom: '50px', opacity: 0 }}
        >
          <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C9A84C', margin: '0 0 14px', fontFamily: 'sans-serif' }}>
            Sectors
          </p>
          <h2 style={{ fontFamily: 'Cormorant Garant, Georgia, serif', fontWeight: 300, color: '#F5F0E8', margin: '0 0 24px' }}>
            Industries We <em style={{ color: '#C9A84C' }}>Serve</em>
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
            <div style={{ width: '40px', height: '0.5px', backgroundColor: '#C9A84C' }} />
            <div style={{ width: '6px', height: '6px', border: '1px solid #C9A84C', transform: 'rotate(45deg)', flexShrink: 0 }} />
            <div style={{ width: '40px', height: '0.5px', backgroundColor: '#C9A84C' }} />
          </div>
        </div>

        {/* Animated divider */}
        <div style={{ marginBottom: '40px', overflow: 'hidden' }}>
          <div
            ref={lineRef}
            style={{ height: '0.5px', backgroundColor: 'rgba(201,168,76,0.25)', width: '0px', opacity: 0 }}
          />
        </div>

        {/* Grid */}
        <div className="ind-grid" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {industries.map(function(industry, i) {
            var isTopRow = i < 5
            return (
              <div
                key={i}
                ref={function(el) { itemsRef.current[i] = el }}
                className={'ind-card ' + (isTopRow ? 'ind-card-top' : 'ind-card-bottom')}
              >
                <span className="ind-num">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="ind-icon">{industry.icon}</span>
                <p className="ind-name">
                  {industry.name}
                </p>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}