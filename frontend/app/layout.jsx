import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ScrollTopButton from '@/components/ScrollTopButton';
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
  // Only used for small badges/labels — not worth a render-blocking preload.
  preload: false,
});

export const metadata = {
  metadataBase: new URL('https://iaquatic.com'),
  title: {
    default: 'Frozen Shrimp & Prawn Supplier UK & EU | Indo Aquatic',
    template: '%s | Indo Aquatic',
  },
  description: 'Frozen shrimp (prawns) — IQF raw, cooked, and added value — plus shellfish, whole fish, and fillets, supplied to UK & EU trade buyers. Own farms, certified processing, full traceability.',
  robots: { index: true, follow: true },
  openGraph: {
    siteName: 'Indo Aquatic',
    type: 'website',
    title: 'Frozen Shrimp & Prawn Supplier UK & EU | Indo Aquatic',
    description: 'Frozen shrimp (prawns) — raw, cooked, and added value — plus shellfish, whole fish, and fillets. Own farms, certified processing, UK & EU delivery.',
    images: [{ url: DEFAULT_OG, width: 1200, height: 630, alt: 'Premium frozen seafood — Indo Aquatic, UK & EU supplier' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frozen Shrimp & Prawn Supplier UK & EU | Indo Aquatic',
    description: 'Frozen shrimp (prawns) — raw, cooked, and added value — plus shellfish, whole fish, and fillets.',
    images: [{ url: DEFAULT_OG, alt: 'Premium frozen seafood — Indo Aquatic, UK & EU supplier' }],
  },
  other: { 'theme-color': '#F97316' },
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://iaquatic.com/#organization',
      name: 'Indo Aquatic Ltd',
      legalName: 'Indo Aquatic Ltd',
      url: 'https://iaquatic.com',
      description: 'Frozen seafood supplier to the UK & EU. Specialist shrimp (prawns) — raw, cooked, and added value — plus shellfish, whole fish, and fillets.',
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
        { '@type': 'ContactPoint', contactType: 'sales', email: 'sales@iaquatic.com' },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://iaquatic.com/#website',
      url: 'https://iaquatic.com',
      name: 'Indo Aquatic',
      publisher: { '@id': 'https://iaquatic.com/#organization' },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-GB" className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <div className="min-h-screen flex flex-col bg-ice-100">
          <Navbar />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
        </div>
        <WhatsAppButton />
        <ScrollTopButton />
      </body>
    </html>
  );
}
