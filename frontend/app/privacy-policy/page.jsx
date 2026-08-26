import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Privacy Policy',
  description: 'Privacy Policy for Indo Aquatic UK Ltd — how we collect, use, and protect your personal data in accordance with UK GDPR.',
  path: '/privacy-policy',
});

function Section({ title, children }) {
  return (
    <section className="mb-10">
      <h2 className="font-fraunces text-2xl text-ink-900 mb-4">{title}</h2>
      <div className="space-y-3 text-sm text-frost-700 leading-relaxed font-inter">{children}</div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-ice-100 min-h-screen">
      <div className="bg-frost-900 py-16 border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-neon-500 font-inter mb-4">Legal</p>
          <h1 className="font-fraunces text-4xl sm:text-5xl text-white mb-3">Privacy Policy</h1>
          <p className="text-frost-500 font-inter">Last updated: 8 July 2026</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <Section title="1. Who we are">
          <p>Indo Aquatic UK Ltd ("we", "us", "our") is the data controller for personal data collected through this website and in connection with our business activities.</p>
          <p><strong className="text-ink-900">Registered company:</strong> Indo Aquatic Ltd.<br />
          <strong className="text-ink-900">Company number:</strong> 17230607<br />
          <strong className="text-ink-900">Registered address:</strong> Hall Farm Burrill Lane, Brantingham, Brough, HU15 1YG, United Kingdom<br />
          <strong className="text-ink-900">Email:</strong> <a href="mailto:info@indoaquaticltd.com" className="text-neon-500 hover:underline">info@indoaquaticltd.com</a></p>
        </Section>

        <Section title="2. What data we collect">
          <p>When you submit a contact form, sample request, or document request on this website, we may collect:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Name and job title</li>
            <li>Company name and sector</li>
            <li>Email address and telephone number</li>
            <li>Product interests, purchase volumes, and timeline</li>
            <li>Message content</li>
          </ul>
          <p>We do not collect payment information through this website. We do not use analytics cookies or tracking pixels.</p>
        </Section>

        <Section title="3. How we use your data">
          <p>We use the personal data you provide to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Respond to your enquiry or sample request</li>
            <li>Send you requested documentation (spec sheets, certifications)</li>
            <li>Follow up on business discussions you have initiated</li>
            <li>Maintain records of our business relationships</li>
          </ul>
          <p>We do not use your data for unsolicited marketing or share it with third-party advertisers.</p>
        </Section>

        <Section title="4. Legal basis for processing">
          <p>We process your personal data on the following bases under UK GDPR:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong className="text-ink-900">Legitimate interests</strong> (Article 6(1)(f)) — to respond to business enquiries and maintain commercial relationships with B2B buyers and suppliers.</li>
            <li><strong className="text-ink-900">Contract</strong> (Article 6(1)(b)) — where processing is necessary to take steps prior to entering a contract or to perform a contract with you.</li>
          </ul>
        </Section>

        <Section title="5. How long we keep your data">
          <p>We retain personal data collected through business enquiries for up to 3 years from the date of last contact, unless a longer period is required by law or for the purpose of an ongoing commercial relationship.</p>
          <p>You may request deletion of your data at any time (see Section 7).</p>
        </Section>

        <Section title="6. Who we share data with">
          <p>We do not sell your personal data. We may share it with:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong className="text-ink-900">Our sourcing partners</strong> (India and other origin countries) — for the purposes of fulfilling orders and supply chain coordination, subject to appropriate safeguards.</li>
            <li><strong className="text-ink-900">Service providers</strong> — such as email hosting, where processing is governed by a data processing agreement.</li>
            <li><strong className="text-ink-900">Legal or regulatory authorities</strong> — where we are required to do so by law.</li>
          </ul>
        </Section>

        <Section title="7. Your rights">
          <p>Under UK GDPR, you have the right to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request erasure of your data ("right to be forgotten")</li>
            <li>Object to or restrict processing</li>
            <li>Request portability of your data</li>
            <li>Withdraw consent where processing is based on consent</li>
          </ul>
          <p>To exercise any of these rights, contact us at <a href="mailto:info@indoaquaticltd.com" className="text-neon-500 hover:underline">info@indoaquaticltd.com</a>. We will respond within one calendar month.</p>
        </Section>

        <Section title="8. Complaints">
          <p>If you believe we have not handled your data lawfully, you have the right to lodge a complaint with the UK Information Commissioner's Office (ICO): <a href="https://ico.org.uk" className="text-neon-500 hover:underline" target="_blank" rel="noopener noreferrer">ico.org.uk</a>.</p>
        </Section>

        <Section title="9. Cookies">
          <p>This website uses only essential session cookies necessary for the site to function. We do not use analytics, advertising, or tracking cookies. See our <a href="/cookie-policy" className="text-neon-500 hover:underline">Cookie Policy</a> for details.</p>
        </Section>

        <Section title="10. Changes to this policy">
          <p>We may update this Privacy Policy from time to time. The date at the top of this page reflects the most recent revision. Continued use of the site after changes constitutes acceptance of the updated policy.</p>
        </Section>

        <Section title="11. Contact us">
          <p>For any data protection queries, contact:<br />
          Indo Aquatic UK Ltd<br />
          Hall Farm Burrill Lane, Brantingham, Brough, HU15 1YG<br />
          <a href="mailto:info@indoaquaticltd.com" className="text-neon-500 hover:underline">info@indoaquaticltd.com</a></p>
        </Section>

      </div>
    </div>
  );
}
