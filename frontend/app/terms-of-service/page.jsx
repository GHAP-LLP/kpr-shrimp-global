import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Terms of Service',
  description: 'Terms of Service for the Indo Aquatic UK Ltd website. Information-only B2B marketing site governed by English law.',
  path: '/terms-of-service',
});

function Section({ title, children }) {
  return (
    <section className="mb-10">
      <h2 className="font-fraunces text-2xl text-ink-900 mb-4">{title}</h2>
      <div className="space-y-3 text-sm text-frost-700 leading-relaxed font-inter">{children}</div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <div className="bg-ice-100 min-h-screen">
      <div className="bg-frost-900 py-16 border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-neon-500 font-inter mb-4">Legal</p>
          <h1 className="font-fraunces text-4xl sm:text-5xl text-white mb-3">Terms of Service</h1>
          <p className="text-frost-500 font-inter">Last updated: 8 July 2026</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <Section title="1. About this website">
          <p>This website is operated by Indo Aquatic UK Ltd (Indo Aquatic Ltd., Company No. 17230607), registered at Hall Farm Burrill Lane, Brantingham, Brough, HU15 1YG, United Kingdom ("Indo Aquatic", "we", "us").</p>
          <p>This is a business-to-business (B2B) information and marketing website. It is intended for trade buyers, procurement professionals, and business contacts. It is not a consumer-facing retail website and does not accept consumer orders.</p>
        </Section>

        <Section title="2. Use of this website">
          <p>By accessing this website, you agree to use it only for lawful purposes and in a manner that does not infringe the rights of others or restrict their use and enjoyment of the site.</p>
          <p>You may not:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Use the site in any way that causes, or may cause, damage to the website or impairs its availability or accessibility</li>
            <li>Use the site to copy, store, host, transmit, send, use, publish, or distribute any material that constitutes spyware, malware, or other harmful software</li>
            <li>Conduct any systematic or automated data collection activities without our express written consent</li>
          </ul>
        </Section>

        <Section title="3. Information accuracy">
          <p>We make reasonable efforts to ensure that product specifications, pricing indications, and other information on this website are accurate and up to date. However, all information is provided for indicative purposes only.</p>
          <p>Product specifications, availability, pricing, and minimum order quantities are subject to change. Confirmed specifications are those set out in a written quotation or order confirmation issued by Indo Aquatic UK Ltd.</p>
          <p>Nothing on this website constitutes a legally binding offer to supply products at any stated price or specification.</p>
        </Section>

        <Section title="4. No consumer sales">
          <p>This website does not facilitate consumer purchases. All enquiries, sample requests, and orders are handled through direct commercial communication with our sales team and are subject to separate commercial terms agreed between the parties.</p>
        </Section>

        <Section title="5. Intellectual property">
          <p>All content on this website — including text, images, graphics, and the Indo Aquatic logo — is the property of Indo Aquatic UK Ltd or its licensors and is protected by copyright and other intellectual property laws.</p>
          <p>You may view and print pages of this website for personal, non-commercial reference purposes. You may not reproduce, distribute, or create derivative works from this content without our prior written permission.</p>
        </Section>

        <Section title="6. Third-party links">
          <p>This website may contain links to third-party websites. These links are provided for your convenience only. We have no control over the content of those websites and accept no responsibility for them or for any loss or damage that may arise from your use of them.</p>
        </Section>

        <Section title="7. Limitation of liability">
          <p>To the maximum extent permitted by law, Indo Aquatic UK Ltd excludes all liability for loss or damage (including indirect or consequential loss) arising out of or in connection with the use of, or inability to use, this website or its content.</p>
          <p>Nothing in these terms excludes or limits liability for death or personal injury caused by negligence, fraud, or any other liability that cannot lawfully be excluded.</p>
        </Section>

        <Section title="8. Governing law">
          <p>These terms are governed by and construed in accordance with the laws of England and Wales. Any dispute arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
        </Section>

        <Section title="9. Changes to these terms">
          <p>We reserve the right to update these Terms of Service at any time. The date at the top of this page reflects the most recent revision. Continued use of the site after changes constitutes acceptance of the updated terms.</p>
        </Section>

        <Section title="10. Contact">
          <p>For questions about these terms:<br />
          Indo Aquatic UK Ltd<br />
          Hall Farm Burrill Lane, Brantingham, Brough, HU15 1YG<br />
          <a href="mailto:info@indoaquaticltd.com" className="text-neon-500 hover:underline">info@indoaquaticltd.com</a></p>
        </Section>

      </div>
    </div>
  );
}
