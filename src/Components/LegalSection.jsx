export default function LegalSection({ title, children }) {
  return (
    <div className="legal-section-block">
      <h2>{title}</h2>
      <div className="legal-gold-line" />
      {children}
    </div>
  )
}