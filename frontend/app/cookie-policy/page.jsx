import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Cookie Policy',
  description: 'Cookie Policy for Indo Aquatic UK Ltd. We use only essential session cookies — no analytics, no advertising trackers.',
  path: '/cookie-policy',
});

function Section({ title, children }) {
  return (
    <section className="mb-10">
      <h2 className="font-fraunces text-2xl text-ink-900 mb-4">{title}</h2>
      <div className="space-y-3 text-sm text-frost-700 leading-relaxed font-inter">{children}</div>
    </section>
  );
}

export default function CookiePolicyPage() {
  return (
    <div className="bg-ice-100 min-h-screen">
      <div className="bg-frost-900 py-16 border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-neon-500 font-inter mb-4">Legal</p>
          <h1 className="font-fraunces text-4xl sm:text-5xl text-white mb-3">Cookie Policy</h1>
          <p className="text-frost-500 font-inter">Last updated: 8 July 2026</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <Section title="1. What are cookies?">
          <p>Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work, or to make them work more efficiently, and to provide information to the website operator.</p>
        </Section>

        <Section title="2. How we use cookies">
          <p>This website uses only <strong className="text-ink-900">essential session cookies</strong> — those strictly necessary for the website to function. These cookies do not track you across other websites and do not collect personal data beyond what is required for basic site operation.</p>
          <p>We do <strong className="text-ink-900">not</strong> use:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Analytics cookies (e.g. Google Analytics, PostHog)</li>
            <li>Advertising or remarketing cookies</li>
            <li>Social media tracking cookies</li>
            <li>Performance profiling cookies</li>
          </ul>
        </Section>

        <Section title="3. Essential cookies we use">
          <div className="overflow-x-auto rounded-xl border border-ice-300 shadow-sm">
            <table className="w-full text-xs font-inter">
              <thead>
                <tr className="bg-ice-300 border-b border-ice-300">
                  <th className="text-left py-2.5 px-4 font-semibold text-frost-700 uppercase tracking-wider">Cookie</th>
                  <th className="text-left py-2.5 px-4 font-semibold text-frost-700 uppercase tracking-wider">Purpose</th>
                  <th className="text-left py-2.5 px-4 font-semibold text-frost-700 uppercase tracking-wider">Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-ice-300 bg-white">
                  <td className="py-3 px-4 font-mono text-ink-900">session</td>
                  <td className="py-3 px-4 text-frost-700">Maintains your session state as you navigate the site</td>
                  <td className="py-3 px-4 text-frost-700">Session (deleted when browser closes)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="4. Managing cookies">
          <p>You can control cookies through your browser settings. Most browsers allow you to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>View cookies stored on your device</li>
            <li>Delete individual cookies or all cookies</li>
            <li>Block cookies from specific websites or all websites</li>
            <li>Set your browser to notify you when a cookie is being set</li>
          </ul>
          <p>Please note that disabling essential cookies may affect the functionality of this website. Blocking all cookies will not prevent you from viewing the site content but may affect form submission features.</p>
          <p>For guidance on managing cookies in your browser, visit <a href="https://www.allaboutcookies.org" className="text-neon-700 hover:underline" target="_blank" rel="noopener noreferrer">allaboutcookies.org</a>.</p>
        </Section>

        <Section title="5. Changes to this policy">
          <p>We may update this Cookie Policy from time to time. If we introduce new types of cookies (for example analytics), we will update this page and, where required by law, obtain your consent before setting them.</p>
        </Section>

        <Section title="6. Contact us">
          <p>If you have any questions about our use of cookies:<br />
          Indo Aquatic UK Ltd<br />
          Hall Farm Burrill Lane, Brantingham, Brough, HU15 1YG<br />
          <a href="mailto:info@indoaquaticltd.com" className="text-neon-700 hover:underline">info@indoaquaticltd.com</a></p>
        </Section>

      </div>
    </div>
  );
}
