import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { DEFAULT_OG } from '@/lib/metadata';
import '@/index.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
});

export const metadata = {
  metadataBase: new URL('https://www.indoaquaticltd.com'),
  title: {
    default: 'UK Frozen Prawn Supplier — IQF, Cooked & Added Value | Indo Aquatic',
    template: '%s | Indo Aquatic — UK Frozen Prawn Supplier',
  },
  description: 'UK wholesale frozen prawn supplier. Indo Aquatic supplies IQF raw (HOSO, HLSO, PD), cooked, and added value prawns to UK retailers, foodservice operators, retail processors, and distributors. Traceable Andhra Pradesh origin. Samples within 5 days.',
  robots: { index: true, follow: true },
  openGraph: {
    siteName: 'Indo Aquatic',
    type: 'website',
    title: 'UK Frozen Prawn Supplier | Indo Aquatic — IQF, Cooked & Added Value',
    description: 'UK specialist importer of premium frozen prawns. HOSO, HLSO, PD, IQF Cooked, Tempura, Breaded, Butterfly. Traceable Indian origin, consistent spec, UK account team.',
    images: [{ url: DEFAULT_OG, width: 1200, height: 630, alt: 'Premium IQF frozen prawns — Indo Aquatic UK supplier' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UK Frozen Prawn Supplier | Indo Aquatic — IQF, Cooked & Added Value',
    description: 'UK specialist importer of premium frozen prawns. HOSO, HLSO, PD, IQF Cooked, Tempura, Breaded, Butterfly.',
    images: [{ url: DEFAULT_OG, alt: 'Premium IQF frozen prawns — Indo Aquatic UK supplier' }],
  },
  other: { 'theme-color': '#F97316' },
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.indoaquaticltd.com/#organization',
      name: 'Indo Aquatic UK Ltd',
      legalName: 'Indo Aquatic UK Ltd',
      url: 'https://www.indoaquaticltd.com',
      description: 'UK specialist importer and distributor of premium frozen prawns. Raw, cooked, and added value formats.',
      foundingDate: '2026',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Hall Farm Burrill Lane',
        addressLocality: 'Brantingham',
        addressRegion: 'East Riding of Yorkshire',
        postalCode: 'HU15 1YG',
        addressCountry: 'GB',
      },
      contactPoint: [
        { '@type': 'ContactPoint', contactType: 'sales', email: 'sales@indoaquaticltd.com' },
        { '@type': 'ContactPoint', contactType: 'customer service', email: 'samples@indoaquaticltd.com' },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.indoaquaticltd.com/#website',
      url: 'https://www.indoaquaticltd.com',
      name: 'Indo Aquatic',
      publisher: { '@id': 'https://www.indoaquaticltd.com/#organization' },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <div className="min-h-screen flex flex-col bg-ice-100">
          <Navbar />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
