import LegalLayout from '../Components/LegalLayout'
import LegalSection from '../Components/LegalSection'

export default function PrivacyPolicy() {
  return (
    <LegalLayout
      badge="Legal"
      title="Privacy"
      italic="Policy"
      lastUpdated="[Date]"
    >

      <LegalSection title="Overview">
        <div className="legal-highlight-box">
          <p>
            NexBridge Intelligence ("we", "our", "us") respects your privacy and is committed to protecting your personal information.
          </p>
        </div>
      </LegalSection>

      <LegalSection title="Information We Collect">
        <p>We may collect the following information when you interact with our website:</p>
        <ul>
          <li>Name</li>
          <li>Company Name</li>
          <li>Email Address</li>
          <li>Phone Number</li>
          <li>Business Information</li>
          <li>Any information submitted through our contact forms</li>
        </ul>
      </LegalSection>

      <LegalSection title="How We Use Information">
        <p>We use collected information to:</p>
        <ul>
          <li>Respond to inquiries</li>
          <li>Provide requested services</li>
          <li>Improve our website and services</li>
          <li>Communicate regarding business opportunities</li>
          <li>Maintain records of client interactions</li>
        </ul>
      </LegalSection>

      <LegalSection title="Information Sharing">
        <p>
          We do not sell, rent, or share personal information with third parties except when required by law or necessary to provide our services.
        </p>
      </LegalSection>

      <LegalSection title="Data Security">
        <p>
          We take reasonable measures to protect information against unauthorized access, disclosure, alteration, or destruction.
        </p>
      </LegalSection>

      <LegalSection title="Third-Party Services">
        <p>
          Our website may contain links to third-party websites. We are not responsible for their privacy practices.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <div className="legal-contact-box">
          <h3>Privacy-related inquiries?</h3>
          <p>For privacy-related inquiries, contact:</p>
          <p>
            <a href="mailto:connect@nexbridgeintelligence.com">connect@nexbridgeintelligence.com</a>
          </p>
          <p style={{ marginTop: '4px' }}>NexBridge Intelligence, India</p>
        </div>
      </LegalSection>

    </LegalLayout>
  )
}