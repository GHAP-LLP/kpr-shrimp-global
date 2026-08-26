import Link from 'next/link';
import LogoMark from '@/components/LogoMark';

const productLinks = [
  { name: 'Frozen Raw Prawns', href: '/products/frozen-raw-shrimp' },
  { name: 'Cooked Prawns', href: '/products/cooked-shrimp' },
  { name: 'Added Value Innovation', href: '/products/ready-to-cook' },
  { name: 'All Products', href: '/products' },
];
const sectorLinks = [
  { name: 'Retail Private Label', href: '/sectors/retail-private-label' },
  { name: 'Retail Processors', href: '/sectors/food-manufacturers' },
  { name: 'Foodservice', href: '/sectors/foodservice-horeca' },
  { name: 'Wholesale Distributors', href: '/sectors/wholesale-distributors' },
];
const companyLinks = [
  { name: 'About us', href: '/about' },
  { name: 'Sustainability', href: '/sustainability' },
  { name: 'Corporate Policies', href: '/policies' },
  { name: 'Resources & Docs', href: '/resources' },
  { name: 'Request a sample', href: '/request-a-sample' },
  { name: 'Contact', href: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-frost-900 text-white" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-2">
              <LogoMark size={40} />
              <div>
                <div className="font-fraunces text-white text-base leading-none">Indo Aquatic</div>
                <div className="font-inter text-[10px] tracking-[0.2em] uppercase text-white/40 mt-0.5">UK Ltd</div>
              </div>
            </div>
            <p className="text-frost-500/70 text-xs italic mt-2 mb-3">Premium Seafood. Global Standards.</p>
            <p className="text-frost-500 text-sm leading-relaxed">The UK's specialist frozen prawn supplier. Backed by our own farms, processing plants, and two decades of family aquaculture expertise.</p>
            <div className="mt-4 pt-4 border-t border-frost-700">
              <p className="text-frost-500 text-xs leading-relaxed">Hall Farm Burrill Lane<br />Brantingham, Brough, HU15 1YG</p>
              <a href="mailto:sales@indoaquaticltd.com" className="text-frost-500 text-xs hover:text-neon-500 transition-colors block mt-2">sales@indoaquaticltd.com</a>
              <p className="text-frost-500/50 text-xs mt-2">Indo Aquatic Ltd. · Company No. 17230607</p>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-frost-500 mb-4">Products</h4>
            <ul className="space-y-2.5">
              {productLinks.map(link => (
                <li key={link.href}><Link href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">{link.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-frost-500 mb-4">Sectors</h4>
            <ul className="space-y-2.5">
              {sectorLinks.map(link => (
                <li key={link.href}><Link href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">{link.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-frost-500 mb-4">Company</h4>
            <ul className="space-y-2.5">
              {companyLinks.map(link => (
                <li key={link.href}><Link href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">{link.name}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-frost-700 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-frost-500 text-xs">© {new Date().getFullYear()} Indo Aquatic UK Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="text-frost-500 text-xs hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="text-frost-500 text-xs hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/cookie-policy" className="text-frost-500 text-xs hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
