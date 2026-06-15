import React from 'react'
import { useNavigate } from 'react-router-dom'

const ContactPage = ({ onOpenForm }) => {
  const navigate = useNavigate()

  function handleCta() {
    navigate('/#contact-form')
  }

  return (
    <section className="bg-[#0B1221] overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-5 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-28">

        {/* Header */}
        <div className="mb-14 pb-10 border-b border-[#C9A84C]/20">
          <span className="text-label-caps block mb-4">Contact</span>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-[32px] sm:text-[40px] lg:text-[48px] font-light text-[#F5F0E8] leading-tight m-0">
              Get In <em className="text-italic-gold">Touch</em>
            </h2>
            <p className="font-body text-[13px] text-[#F5F0E8]/40 leading-relaxed max-w-[260px] m-0">
              Reach us through any of the channels below — we respond within 24 hours.
            </p>
          </div>
        </div>

        {/* Contact cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#C9A84C]/10 mb-12">

          {/* Card 01 */}
          {/* <a href="mailto:sales@nexbridgeintelligence.com" className="group relative block bg-[#0B1221] no-underline px-6 py-8 sm:px-8 sm:py-9 lg:px-10 lg:py-11 transition-colors duration-300 hover:bg-[#111d33]">
            <span className="absolute inset-x-0 top-0 h-[2px] bg-[#C9A84C] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
            <span className="font-display text-[11px] text-[#C9A84C]/35 tracking-widest block mb-5">01</span>
            <p className="text-label-caps text-[#F5F0E8]/35 mb-2 text-[10px]">Sales Enquiries</p>
            <p className="font-display text-[16px] sm:text-[18px] text-[#F5F0E8] mb-2 transition-colors duration-300 group-hover:text-[#C9A84C]">sales@nexbridgeintelligence.com</p>
            <p className="font-body text-[12px] text-[#F5F0E8]/30 leading-snug m-0">For new projects and proposals</p>
            <span className="absolute bottom-7 right-7 text-[#C9A84C] text-lg opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">{'>'}</span>
          </a> */}

          {/* Card 02 */}
          <a href="mailto:connect@nexbridgeintelligence.in" className="group relative block bg-[#0B1221] no-underline px-6 py-8 sm:px-8 sm:py-9 lg:px-10 lg:py-11 transition-colors duration-300 hover:bg-[#111d33]">
            <span className="absolute inset-x-0 top-0 h-[2px] bg-[#C9A84C] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
            <span className="font-display text-[11px] text-[#C9A84C]/35 tracking-widest block mb-5">01</span>
            <p className="text-label-caps text-[#F5F0E8]/35 mb-2 text-[10px]">General Information</p>
            <p className="font-display text-[16px] sm:text-[18px] text-[#F5F0E8] mb-2 transition-colors duration-300 group-hover:text-[#C9A84C]">connect@nexbridgeintelligence.in</p>
            <p className="font-body text-[12px] text-[#F5F0E8]/30 leading-snug m-0">For general queries and partnerships</p>
            <span className="absolute bottom-7 right-7 text-[#C9A84C] text-lg opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">{'>'}</span>
          </a>

          {/* Card 03 */}
          <a href="tel:+910000000000" className="group relative block bg-[#0B1221] no-underline px-6 py-8 sm:px-8 sm:py-9 lg:px-10 lg:py-11 transition-colors duration-300 hover:bg-[#111d33]">
            <span className="absolute inset-x-0 top-0 h-[2px] bg-[#C9A84C] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
            <span className="font-display text-[11px] text-[#C9A84C]/35 tracking-widest block mb-5">02</span>
            <p className="text-label-caps text-[#F5F0E8]/35 mb-2 text-[10px]">Phone</p>
            <p className="font-display text-[16px] sm:text-[18px] text-[#F5F0E8] mb-2 transition-colors duration-300 group-hover:text-[#C9A84C]">+91 9503364554</p>
            <p className="font-body text-[12px] text-[#F5F0E8]/30 leading-snug m-0">Mon – Fri, 9am – 6pm IST</p>
            <span className="absolute bottom-7 right-7 text-[#C9A84C] text-lg opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">{'>'}</span>
          </a>

          {/* Card 04 */}
          {/* <a href="https://wa.me/910000000000" target="_blank" rel="noopener noreferrer" className="group relative block bg-[#0B1221] no-underline px-6 py-8 sm:px-8 sm:py-9 lg:px-10 lg:py-11 transition-colors duration-300 hover:bg-[#111d33]">
            <span className="absolute inset-x-0 top-0 h-[2px] bg-[#C9A84C] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
            <span className="font-display text-[11px] text-[#C9A84C]/35 tracking-widest block mb-5">04</span>
            <p className="text-label-caps text-[#F5F0E8]/35 mb-2 text-[10px]">WhatsApp</p>
            <p className="font-display text-[16px] sm:text-[18px] text-[#F5F0E8] mb-2 transition-colors duration-300 group-hover:text-[#C9A84C]">+91 00000 00000</p>
            <p className="font-body text-[12px] text-[#F5F0E8]/30 leading-snug m-0">Quick responses via WhatsApp</p>
            <span className="absolute bottom-7 right-7 text-[#C9A84C] text-lg opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">{'>'}</span>
          </a> */}

        </div>

        {/* CTA banner */}
        <div className="border border-[#C9A84C]/25 flex flex-col gap-6 p-8 sm:p-12 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-label-caps mb-2 text-[10px]">Prefer a detailed enquiry?</p>
            <h3 className="font-display text-[22px] sm:text-[26px] font-light text-[#F5F0E8] m-0 mb-2 leading-snug">
              Let's Discuss Your <em className="text-italic-gold">Research Requirements</em>
            </h3>
            <p className="font-body text-[13px] text-[#F5F0E8]/35 leading-relaxed m-0">
              Fill in your details and we'll send you a tailored research proposal.
            </p>
          </div>
          <button onClick={handleCta} className="btn btn-gold shrink-0 self-start md:self-auto">
            Open Enquiry Form
          </button>
        </div>

      </div>
    </section>
  )
}

export default ContactPage