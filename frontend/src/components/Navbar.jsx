import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
const NAV_COMPANY = [
  { name: 'About us', to: '/about' },
  { name: 'Sustainability', to: '/sustainability' },
  { name: 'Resources & Docs', to: '/resources' },
  { name: 'Contact', to: '/contact' },
];

const EASE = [0.22, 1, 0.36, 1];

// ─── Desktop dropdown ──────────────────────────────────────────────────────────
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

// ─── Mobile full-screen overlay ───────────────────────────────────────────────
const GROUPS = [
  { label: 'Products', items: NAV_PRODUCTS },
  { label: 'Sectors', items: NAV_SECTORS },
  { label: 'Company', items: NAV_COMPANY },
];

// All links flattened with group labels interspersed — used for stagger timing
const ALL_ITEMS = GROUPS.flatMap(g => [
  { type: 'label', name: g.label },
  ...g.items.map(i => ({ type: 'link', ...i })),
]);

const overlayVariants = {
  hidden: { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
  visible: { opacity: 1, clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.45, ease: EASE } },
  exit:    { opacity: 0, clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.3, ease: [0.4, 0, 1, 1] } },
};

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.22 } },
};

const linkVariants = {
  hidden: { opacity: 0, x: 16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.38, ease: EASE } },
};

const labelVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } },
};

const ctaVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE, delay: 0.5 } },
};

function MobileMenu({ isOpen, onClose }) {
  // Prevent body scroll while menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] bg-frost-900 flex flex-col"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          data-testid="nav-mobile-menu"
        >
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 border-b border-white/10 flex-shrink-0">
            <Link to="/" onClick={onClose} className="flex items-center gap-3">
              <div className="w-8 h-8 bg-neon-500 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold font-mono">KG</span>
              </div>
              <div className="leading-none">
                <div className="font-fraunces font-semibold text-white text-sm">KPR Shrimp Global</div>
                <div className="text-frost-500 text-xs">Ltd</div>
              </div>
            </Link>
            <button
              onClick={onClose}
              className="p-2 rounded-md text-white hover:bg-white/10 transition-colors"
              aria-label="Close menu"
              data-testid="nav-mobile-close"
            >
              <X size={22} />
            </button>
          </div>

          {/* Scrollable link list */}
          <motion.div
            className="flex-1 overflow-y-auto px-4 sm:px-6 pt-8 pb-4"
            variants={listVariants}
            initial="hidden"
            animate="visible"
          >
            {GROUPS.map((group, gi) => (
              <div key={group.label} className={gi > 0 ? 'mt-8' : ''}>
                <motion.p
                  variants={labelVariants}
                  className="text-[10px] font-semibold tracking-[0.22em] uppercase text-neon-500 font-inter mb-3"
                >
                  {group.label}
                </motion.p>
                {group.items.map(item => (
                  <motion.div key={item.to} variants={linkVariants}>
                    <Link
                      to={item.to}
                      onClick={onClose}
                      className="flex items-center justify-between py-3 border-b border-white/[0.07] last:border-0 group"
                      data-testid={`mobile-link-${item.to.replace(/\//g, '-')}`}
                    >
                      <span className="font-fraunces text-2xl text-white group-hover:text-neon-500 transition-colors leading-tight">
                        {item.name}
                      </span>
                      <ArrowRight
                        size={16}
                        className="text-frost-500 flex-shrink-0 ml-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all"
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            className="px-4 sm:px-6 py-5 border-t border-white/10 flex-shrink-0"
            variants={ctaVariants}
            initial="hidden"
            animate="visible"
          >
            <Link
              to="/request-a-sample"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full py-4 bg-neon-500 hover:bg-neon-600 text-white font-semibold rounded-md transition-colors font-inter text-sm"
              data-testid="mobile-cta-sample"
            >
              Request a sample <ArrowRight size={15} />
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Navbar ────────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [sectorsOpen, setSectorsOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setProductsOpen(false);
    setSectorsOpen(false);
    setCompanyOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-ice-300" data-testid="navbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 flex-shrink-0" data-testid="nav-logo">
              <div className="w-8 h-8 bg-frost-900 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold font-mono">KG</span>
              </div>
              <div className="leading-none">
                <div className="font-fraunces font-semibold text-frost-900 text-sm">KPR Shrimp Global</div>
                <div className="text-frost-500 text-xs">Ltd</div>
              </div>
            </Link>

            {/* Desktop nav */}
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
              <div className="relative" onMouseEnter={() => setCompanyOpen(true)} onMouseLeave={() => setCompanyOpen(false)}>
                <button className="flex items-center gap-1 text-sm text-ink-900 hover:text-neon-500 font-medium transition-colors py-2" data-testid="nav-company-btn">
                  Company <ChevronDown size={14} className={`transition-transform ${companyOpen ? 'rotate-180' : ''}`} />
                </button>
                <Dropdown items={NAV_COMPANY} isOpen={companyOpen} />
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <Link to="/request-a-sample" className="hidden sm:inline-flex items-center px-4 py-2 bg-neon-500 hover:bg-neon-600 text-white text-sm font-medium rounded-md transition-colors" data-testid="nav-request-sample">
                Request a sample
              </Link>
              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden p-2 rounded-md text-ink-900 hover:bg-ice-100 transition-colors"
                data-testid="nav-mobile-toggle"
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Full-screen mobile overlay (rendered outside nav to cover entire viewport) */}
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
