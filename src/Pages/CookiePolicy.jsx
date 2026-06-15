import LegalLayout from '../Components/LegalLayout'
import LegalSection from '../Components/LegalSection'

export default function CookiePolicy() {
  return (
    <LegalLayout
      badge="Legal"
      title="Cookie"
      italic="Policy"
      lastUpdated="[Date]"
    >

      <LegalSection title="Overview">
        <div className="legal-highlight-box">
          <p>
            NexBridge Intelligence uses cookies to improve user experience and website performance.
          </p>
        </div>
      </LegalSection>

      <LegalSection title="What Are Cookies?">
        <p>
          Cookies are small text files stored on your device when you visit a website.
        </p>
      </LegalSection>

      <LegalSection title="How We Use Cookies">
        <p>We use cookies to:</p>
        <ul>
          <li>Improve website functionality</li>
          <li>Analyze website traffic</li>
          <li>Enhance user experience</li>
          <li>Monitor website performance</li>
        </ul>
      </LegalSection>

      <LegalSection title="Third-Party Cookies">
        <p>
          Some third-party services such as Google Analytics may place cookies on your device.
        </p>
      </LegalSection>

      <LegalSection title="Managing Cookies">
        <p>
          You may choose to disable cookies through your browser settings. However, some website features may not function properly.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <div className="legal-contact-box">
          <h3>Cookie Questions?</h3>
          <p>For questions regarding this Cookie Policy, contact:</p>
          <p>
            <a href="mailto:connect@nexbridgeintelligence.com">connect@nexbridgeintelligence.com</a>
          </p>
          <p style={{ marginTop: '4px' }}>NexBridge Intelligence, India</p>
        </div>
      </LegalSection>

    </LegalLayout>
  )
}