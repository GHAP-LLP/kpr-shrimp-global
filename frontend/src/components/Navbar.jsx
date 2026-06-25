import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const NAV_PRODUCTS = [
  { name: 'All Products', to: '/products' },
  { name: 'Frozen Raw Shrimp', to: '/products/frozen-raw-shrimp' },
  { name: 'Cooked Shrimp', to: '/products/cooked-shrimp' },
  { name: 'Ready-to-Cook', to: '/products/ready-to-cook' },
];
const NAV_SECTORS = [
  { name: 'Foodservice & HORECA', to: '/sectors/foodservice-horeca' },
  { name: 'Food Manufacturers', to: '/sectors/food-manufacturers' },
  { name: 'Wholesale Distributors', to: '/sectors/wholesale-distributors' },
  { name: 'Retail Private Label', to: '/sectors/retail-private-label' },
];

function Dropdown({ items, isOpen }) {
  if (!isOpen) return null;
  return (
    <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-ice-300 rounded-lg shadow-xl py-1 z-50">
      {items.map(item => (
        <Link key={item.to} to={item.to} className="flex items-center px-4 py-2.5 text-sm text-ink-900 hover:bg-ice-100 hover:text-neon-500 transition-colors">
          {item.name}
        </Link>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [sectorsOpen, setSectorsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setProductsOpen(false);
    setSectorsOpen(false);
  }, [location.pathname]);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-ice-300" data-testid="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 flex-shrink-0" data-testid="nav-logo">
            <div className="w-8 h-8 bg-frost-900 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold font-mono">KG</span>
            </div>
            <div className="leading-none">
              <div className="font-fraunces font-semibold text-frost-900 text-sm">KPR Shrimp Global</div>
              <div className="text-frost-500 text-xs">Ltd</div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <div className="relative" onMouseEnter={() => setProductsOpen(true)} onMouseLeave={() => setProductsOpen(false)}>
              <button className="flex items-center gap-1 text-sm text-ink-900 hover:text-neon-500 font-medium transition-colors py-2" data-testid="nav-products-btn">
                Products <ChevronDown size={14} className={`transition-transform ${productsOpen ? 'rotate-180' : ''}`} />
              </button>
              <Dropdown items={NAV_PRODUCTS} isOpen={productsOpen} />
            </div>
            <div className="relative" onMouseEnter={() => setSectorsOpen(true)} onMouseLeave={() => setSectorsOpen(false)}>
              <button className="flex items-center gap-1 text-sm text-ink-900 hover:text-neon-500 font-medium transition-colors py-2" data-testid="nav-sectors-btn">
                Sectors <ChevronDown size={14} className={`transition-transform ${sectorsOpen ? 'rotate-180' : ''}`} />
              </button>
              <Dropdown items={NAV_SECTORS} isOpen={sectorsOpen} />
            </div>
            <Link to="/contact" className="text-sm text-ink-900 hover:text-neon-500 font-medium transition-colors" data-testid="nav-contact">
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/request-a-sample" className="hidden sm:inline-flex items-center px-4 py-2 bg-neon-500 hover:bg-neon-600 text-white text-sm font-medium rounded-md transition-colors" data-testid="nav-request-sample">
              Request a sample
            </Link>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-md text-ink-900 hover:bg-ice-100 transition-colors" data-testid="nav-mobile-toggle" aria-label="Toggle menu">
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-ice-300" data-testid="nav-mobile-menu">
          <div className="px-4 py-5 space-y-1 max-h-[80vh] overflow-y-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-frost-500 pb-2">Products</p>
            {NAV_PRODUCTS.map(item => (
              <Link key={item.to} to={item.to} className="block py-2 text-sm text-ink-900 hover:text-neon-500 transition-colors border-b border-ice-300/50 last:border-0">{item.name}</Link>
            ))}
            <p className="text-xs font-semibold uppercase tracking-widest text-frost-500 pb-2 pt-5">Sectors</p>
            {NAV_SECTORS.map(item => (
              <Link key={item.to} to={item.to} className="block py-2 text-sm text-ink-900 hover:text-neon-500 transition-colors border-b border-ice-300/50 last:border-0">{item.name}</Link>
            ))}
            <div className="pt-5">
              <Link to="/contact" className="block py-2 text-sm text-ink-900 hover:text-neon-500 border-b border-ice-300/50">Contact</Link>
              <Link to="/request-a-sample" className="mt-4 block w-full text-center px-4 py-3 bg-neon-500 text-white text-sm font-medium rounded-md hover:bg-neon-600 transition-colors">Request a sample</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
