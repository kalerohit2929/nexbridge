import { useEffect, useRef } from 'react'

const regions = [
  {
    name: 'India',
    code: 'IN',
    label: 'Domestic Market',
    countries: [
      'Mumbai', 'Delhi NCR', 'Bangalore', 'Hyderabad',
      'Chennai', 'Pune', 'Ahmedabad', 'Kolkata',
      'Jaipur', 'Surat',
    ],
    stat: '1.4B+',
    statLabel: 'population reach',
  },
  {
    name: 'APAC',
    code: 'AP',
    label: 'Asia Pacific',
    countries: [
      'Singapore', 'Australia', 
      'Indonesia', 'Malaysia', 'Thailand',
       
    ],
    stat: '4.5B+',
    statLabel: 'population reach',
  },
  {
    name: 'Middle East',
    code: 'ME',
    label: 'GCC & Levant',
    countries: [
      'UAE', 'Saudi Arabia',
      
    ],
    stat: '400M+',
    statLabel: 'population reach',
  },
]

export default function Coverage() {
  const sectionRef = useRef(null)
  const headerRef  = useRef(null)
  const panelsRef  = useRef([])

  useEffect(function() {
    const header = headerRef.current
    const panels = panelsRef.current

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

    function resetPanel(el, i) {
      el.style.transition = 'none'
      el.style.opacity    = '0'
      el.style.transform  = i === 0 ? 'translateX(-40px)' : i === 2 ? 'translateX(40px)' : 'translateY(40px)'
    }
    function showPanel(el, i) {
      var delay = i * 0.15
      el.style.transition = 'opacity 0.6s ease ' + delay + 's, transform 0.6s ease ' + delay + 's'
      el.style.opacity    = '1'
      el.style.transform  = 'translate(0)'
    }

    resetHeader()
    panels.forEach(function(el, i) { resetPanel(el, i) })

    var hObs = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting) { showHeader() } else { resetHeader() }
    }, { threshold: 0.2 })
    hObs.observe(header)

    var pObservers = panels.map(function(el, i) {
      var obs = new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting) { showPanel(el, i) } else { resetPanel(el, i) }
      }, { threshold: 0.1 })
      obs.observe(el)
      return obs
    })

    return function() {
      hObs.disconnect()
      pObservers.forEach(function(o) { o.disconnect() })
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{ backgroundColor: '#0B1221', padding: '80px 20px', overflow: 'hidden', fontFamily: 'sans-serif' }}
    >

      <style>{`
        .cov-header-inner {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 24px;
        }
        .cov-subtitle {
          text-align: right;
          max-width: 240px;
        }
        .cov-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1px;
          background-color: rgba(201,168,76,0.15);
          max-width: 1100px;
          margin: 0 auto;
        }
        .cov-panel {
          background-color: #0B1221;
          padding: 40px 28px;
          position: relative;
          opacity: 0;
        }
        .cov-countries {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px 16px;
        }
        @media (min-width: 640px) {
          .cov-grid {
            grid-template-columns: 1fr 1fr;
          }
          .cov-panel {
            padding: 44px 36px;
          }
        }
        @media (min-width: 1024px) {
          section {
            padding: 100px 60px !important;
          }
          .cov-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .cov-panel {
            padding: 48px 40px;
          }
          .cov-subtitle {
            text-align: right;
          }
        }
        @media (max-width: 639px) {
          .cov-subtitle {
            text-align: left;
            max-width: 100%;
          }
          .cov-header-inner h2 {
            font-size: 36px !important;
          }
        }
      `}</style>

      {/* Header */}
      <div
        ref={headerRef}
        style={{ marginBottom: '60px', opacity: 0, maxWidth: '1100px', margin: '0 auto 60px' }}
      >
        <div className="cov-header-inner">
          <div>
            <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C9A84C', margin: '0 0 14px' }}>
              Coverage
            </p>
            <h2 style={{ fontFamily: 'Cormorant Garant, Georgia, serif', fontSize: '48px', fontWeight: 300, color: '#F5F0E8', margin: 0, lineHeight: 1.1 }}>
              Markets We <em style={{ color: '#C9A84C' }}>Cover</em>
            </h2>
          </div>
          <div className="cov-subtitle">
            <p style={{ fontSize: '13px', color: 'rgba(245,240,232,0.4)', margin: '0 0 10px', lineHeight: 1.7 }}>
              On-the-ground research intelligence across three high-growth regions.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '0.5px', backgroundColor: '#C9A84C' }} />
              <div style={{ width: '5px', height: '5px', border: '1px solid #C9A84C', transform: 'rotate(45deg)', flexShrink: 0 }} />
              <div style={{ width: '32px', height: '0.5px', backgroundColor: '#C9A84C' }} />
            </div>
          </div>
        </div>
        <div style={{ height: '0.5px', backgroundColor: 'rgba(201,168,76,0.2)', marginTop: '36px' }} />
      </div>

      {/* Panels */}
      <div className="cov-grid">
        {regions.map(function(region, i) {
          return (
            <div
              key={i}
              ref={function(el) { panelsRef.current[i] = el }}
              className="cov-panel"
            >

              {/* Watermark */}
              <div style={{
                position: 'absolute', top: '20px', right: '20px',
                fontFamily: 'Georgia, serif', fontSize: '48px', fontWeight: 300,
                color: 'rgba(201,168,76,0.07)', lineHeight: 1, userSelect: 'none', letterSpacing: '-2px',
              }}>
                {region.code}
              </div>

              {/* Index row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <span style={{ fontFamily: 'Georgia, serif', fontSize: '13px', color: '#C9A84C', letterSpacing: '0.05em', flexShrink: 0 }}>
                  {'0' + (i + 1)}
                </span>
                <div style={{ flex: 1, height: '0.5px', backgroundColor: 'rgba(201,168,76,0.25)' }} />
                <span style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.35)', flexShrink: 0 }}>
                  {region.label}
                </span>
              </div>

              {/* Name */}
              <h3 style={{ fontFamily: 'Cormorant Garant, Georgia, serif', fontSize: '32px', fontWeight: 300, color: '#F5F0E8', margin: '0 0 14px', lineHeight: 1.1 }}>
                {region.name}
              </h3>

              {/* Stat */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '28px' }}>
                <span style={{ fontFamily: 'Georgia, serif', fontSize: '26px', fontWeight: 300, color: '#C9A84C' }}>
                  {region.stat}
                </span>
                <span style={{ fontSize: '12px', color: 'rgba(245,240,232,0.35)', letterSpacing: '0.04em' }}>
                  {region.statLabel}
                </span>
              </div>

              {/* Divider */}
              <div style={{ height: '0.5px', backgroundColor: 'rgba(245,240,232,0.08)', marginBottom: '24px' }} />

              {/* Countries */}
              <div className="cov-countries">
                {region.countries.map(function(country, j) {
                  return (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                      <div style={{ width: '4px', height: '4px', backgroundColor: '#C9A84C', flexShrink: 0 }} />
                      <span style={{ fontSize: '13px', color: 'rgba(245,240,232,0.55)', letterSpacing: '0.02em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {country}
                      </span>
                    </div>
                  )
                })}
              </div>

            </div>
          )
        })}
      </div>

    </section>
  )
}