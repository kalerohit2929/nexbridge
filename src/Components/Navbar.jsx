import { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { gsap } from 'gsap'

const navLinks = [
  { label: 'Home',       to: '/' },
  { label: 'About Us',   to: '/about' },
  { label: 'Services',   to: '/services' },
  { label: 'Industries', to: '/industries' },
  { label: 'Coverage',   to: '/coverage' },
  { label: 'Contact',    to: '/contact' },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  const headerRef  = useRef(null)
  const logoRef    = useRef(null)
  const linksRef   = useRef(null)
  const burgerRef  = useRef(null)

  // ── Mount animation (slides down from above once) ──
  useEffect(() => {
    const tl = gsap.timeline()
    gsap.set(headerRef.current, { y: -80, opacity: 0 })
    tl.to(headerRef.current, {
      y: 0, opacity: 1,
      duration: 0.7, ease: 'power3.out', delay: 0.1,
    })
    // Stagger logo → links → burger
    gsap.set([logoRef.current, linksRef.current, burgerRef.current], { opacity: 0, y: -10 })
    tl.to([logoRef.current, linksRef.current, burgerRef.current], {
      opacity: 1, y: 0,
      duration: 0.5, stagger: 0.1, ease: 'power2.out',
    }, '-=0.3')
  }, [])

  // ── Scroll detection ──
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Lock body scroll when mobile menu open ──
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header
      ref={headerRef}
      style={{ boxSizing: 'border-box' }} /* ← fix: prevents any width bleed */
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0B1221]/95 backdrop-blur-[6px] shadow-elevated'
          : 'bg-[#0B1221]'
      }`}
    >
      {/* ── Main nav row ── */}
      <nav className="w-full mx-auto flex items-center justify-between h-[64px] lg:h-[72px]"
        style={{ padding: '0 clamp(16px, 4vw, 48px)' }} /* ← fix: responsive side padding */
      >

        {/* Logo */}
        <NavLink ref={logoRef} to="/" className="flex items-center gap-3 group" style={{ minWidth: 0 }}>
          <div className="w-8 h-8 lg:w-9 lg:h-9 border border-[#C9A84C] flex items-center justify-center shrink-0 group-hover:bg-[#C9A84C]/10 transition-colors duration-200">
            {/* ↑ fix: slightly smaller on mobile */}
            <span
              className="text-[15px] lg:text-[18px] font-light text-[#C9A84C] leading-none"
              style={{ fontFamily: "'Cormorant Garant', Georgia, serif" }}
            >
              NB
            </span>
          </div>
          <div className="flex flex-col leading-none min-w-0">
            {/* ↑ fix: min-w-0 prevents flex overflow */}
            <span
              className="text-[15px] lg:text-[17px] font-light tracking-[0.08em] text-[#F5F0E8] truncate"
              style={{ fontFamily: "'Cormorant Garant', Georgia, serif" }}
            >
              NEX<span className="text-[#C9A84C]">BRIDGE</span>
            </span>
            <span className="text-[8px] lg:text-[9px] tracking-[0.22em] mt-[3px] text-[#8896A8]">
              {/* ↑ fix: slightly smaller on mobile */}
              INTELLIGENCE
            </span>
          </div>
        </NavLink>

        {/* Desktop nav links */}
        <ul ref={linksRef} className="hidden lg:flex items-center gap-1">
          {navLinks.map(({ label, to }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-[11px] font-semibold tracking-[0.14em] uppercase transition-colors duration-200
                  after:absolute after:bottom-0 after:left-4 after:right-4 after:h-[1px] after:bg-[#C9A84C]
                  after:transition-transform after:duration-200 after:origin-left
                  ${isActive
                    ? 'text-[#C9A84C] after:scale-x-100'
                    : 'text-[#8896A8] hover:text-[#F5F0E8] after:scale-x-0 hover:after:scale-x-100'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          ref={burgerRef}
          className="lg:hidden flex flex-col gap-[5px] p-2"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          style={{ flexShrink: 0 }} /* ← fix: never squishes */
        >
          <span className={`block h-[1px] w-6 bg-[#C9A84C] transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
          <span className={`block h-[1px] w-6 bg-[#C9A84C] transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`block h-[1px] w-6 bg-[#C9A84C] transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
        </button>
      </nav>

      {/* Mobile dropdown */}
      <div
        className={`lg:hidden bg-[#0B1221] border-t border-[#C9A84C]/20 overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ boxSizing: 'border-box' }} /* ← fix */
      >
        <ul style={{ padding: 'clamp(12px, 3vw, 16px) clamp(16px, 4vw, 24px)' }} className="flex flex-col gap-1">
          {/* ↑ fix: responsive padding in dropdown */}
          {navLinks.map(({ label, to }) => (
            <li key={to}>
              <NavLink
                to={to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 text-[11px] font-semibold tracking-[0.14em] uppercase border-l-2 transition-all duration-200 ${
                    isActive
                      ? 'text-[#C9A84C] border-[#C9A84C] bg-[#C9A84C]/5'
                      : 'text-[#8896A8] border-transparent hover:text-[#F5F0E8] hover:border-[#C9A84C]/40'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
