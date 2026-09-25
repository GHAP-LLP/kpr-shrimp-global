import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
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
    default: 'Leading Seafood Supplier in the UK & EU | Indo Aquatic',
    template: '%s | Indo Aquatic — Seafood Supplier UK & EU',
  },
  description: 'Indo Aquatic is a leading frozen seafood supplier to the UK & EU. Specialist shrimp — IQF raw, cooked, and added value — plus shellfish, whole fish, and fillets. Own farms, certified processing, full traceability.',
  robots: { index: true, follow: true },
  openGraph: {
    siteName: 'Indo Aquatic',
    type: 'website',
    title: 'Leading Seafood Supplier in the UK & EU | Indo Aquatic',
    description: 'Specialist frozen shrimp — raw, cooked, and added value — plus shellfish, whole fish, and fillets. Own farms, certified processing, consistent spec, UK & EU delivery.',
    images: [{ url: DEFAULT_OG, width: 1200, height: 630, alt: 'Premium frozen seafood — Indo Aquatic, UK & EU supplier' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leading Seafood Supplier in the UK & EU | Indo Aquatic',
    description: 'Specialist frozen shrimp — raw, cooked, and added value — plus shellfish, whole fish, and fillets.',
    images: [{ url: DEFAULT_OG, alt: 'Premium frozen seafood — Indo Aquatic, UK & EU supplier' }],
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
      description: 'Leading frozen seafood supplier to the UK & EU. Specialist shrimp — raw, cooked, and added value — plus shellfish, whole fish, and fillets.',
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
        <WhatsAppButton />
      </body>
    </html>
  );
}
