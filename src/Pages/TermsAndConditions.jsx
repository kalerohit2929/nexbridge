import LegalLayout from '../Components/LegalLayout'
import LegalSection from '../Components/LegalSection'

export default function TermsAndConditions() {
  return (
    <LegalLayout
      badge="Legal"
      title="Terms &"
      italic="Conditions"
      lastUpdated="[Date]"
    >

      <LegalSection title="Acceptance of Terms">
        <div className="legal-highlight-box">
          <p>
            By accessing and using the NexBridge Intelligence website, you agree to these Terms and Conditions.
          </p>
        </div>
      </LegalSection>

      <LegalSection title="Services">
        <p>
          NexBridge Intelligence provides business research, lead generation support, contact research, market intelligence, company research, and related consulting services.
        </p>
      </LegalSection>

      <LegalSection title="Website Usage">
        <p>Users agree not to:</p>
        <ul>
          <li>Use the website for unlawful purposes</li>
          <li>Attempt unauthorized access to systems</li>
          <li>Copy or reproduce website content without permission</li>
        </ul>
      </LegalSection>

      <LegalSection title="Intellectual Property">
        <p>
          All website content, branding, logos, graphics, and materials are the property of NexBridge Intelligence unless otherwise stated.
        </p>
      </LegalSection>

      <LegalSection title="Limitation of Liability">
        <p>
          NexBridge Intelligence makes reasonable efforts to provide accurate information but does not guarantee the completeness or accuracy of information provided through the website.
        </p>
        <p>
          We shall not be liable for any direct or indirect damages resulting from the use of our website or services.
        </p>
      </LegalSection>

      <LegalSection title="Changes">
        <p>
          We reserve the right to modify these terms at any time without prior notice.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <div className="legal-contact-box">
          <h3>Legal Enquiries</h3>
          <p>For questions regarding these Terms & Conditions, please contact:</p>
          <p>
            <a href="mailto:connect@nexbridgeintelligence.com">connect@nexbridgeintelligence.com</a>
          </p>
          <p style={{ marginTop: '4px' }}>NexBridge Intelligence, India</p>
        </div>
      </LegalSection>

    </LegalLayout>
  )
}