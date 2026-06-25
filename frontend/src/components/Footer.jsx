import { Link } from 'react-router-dom';

const productLinks = [
  { name: 'Frozen Raw Shrimp', to: '/products/frozen-raw-shrimp' },
  { name: 'Cooked Shrimp', to: '/products/cooked-shrimp' },
  { name: 'Ready-to-Cook', to: '/products/ready-to-cook' },
  { name: 'All Products', to: '/products' },
];
const sectorLinks = [
  { name: 'Foodservice & HORECA', to: '/sectors/foodservice-horeca' },
  { name: 'Food Manufacturers', to: '/sectors/food-manufacturers' },
  { name: 'Wholesale Distributors', to: '/sectors/wholesale-distributors' },
  { name: 'Retail Private Label', to: '/sectors/retail-private-label' },
];
const companyLinks = [
  { name: 'Request a sample', to: '/request-a-sample' },
  { name: 'Contact', to: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-frost-900 text-white" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-neon-500 rounded flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold font-mono">KG</span>
              </div>
              <div>
                <div className="font-fraunces text-white text-base">KPR Shrimp Global</div>
                <div className="text-frost-500 text-xs">Ltd</div>
              </div>
            </div>
            <p className="text-frost-500 text-sm leading-relaxed mt-3">The UK's specialist shrimp supplier. Backed by Green House Agro Products, Nellore, Andhra Pradesh.</p>
            <div className="mt-4 pt-4 border-t border-frost-700">
              <p className="text-frost-500 text-xs">UK office: [Address — confirm]</p>
              <a href="mailto:sales@kprshrimpglobal.com" className="text-frost-500 text-xs hover:text-neon-500 transition-colors block mt-1">sales@kprshrimpglobal.com</a>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-frost-500 mb-4">Products</h4>
            <ul className="space-y-2.5">
              {productLinks.map(link => (
                <li key={link.to}><Link to={link.to} className="text-sm text-white/70 hover:text-white transition-colors">{link.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-frost-500 mb-4">Sectors</h4>
            <ul className="space-y-2.5">
              {sectorLinks.map(link => (
                <li key={link.to}><Link to={link.to} className="text-sm text-white/70 hover:text-white transition-colors">{link.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-frost-500 mb-4">Company</h4>
            <ul className="space-y-2.5">
              {companyLinks.map(link => (
                <li key={link.to}><Link to={link.to} className="text-sm text-white/70 hover:text-white transition-colors">{link.name}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-frost-700 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-frost-500 text-xs">© {new Date().getFullYear()} KPR Shrimp Global Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(label => (
              <a key={label} href="#" className="text-frost-500 text-xs hover:text-white transition-colors">{label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
