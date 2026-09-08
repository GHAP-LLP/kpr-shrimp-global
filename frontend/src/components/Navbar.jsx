'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LogoMark from '@/components/LogoMark';
import { NAV_PRODUCTS, NAV_SECTORS, NAV_COMPANY } from '@/data/nav';

const EASE = [0.22, 1, 0.36, 1];

function DropdownMenu({ items, id }) {
  return (
    <div id={id} className="absolute top-full left-0 w-56 bg-white border border-ice-300 rounded-lg shadow-xl py-1 z-50">
      {items.map(item => (
        <Link key={item.href} href={item.href} className="flex items-center px-4 py-2.5 text-sm text-ink-900 hover:bg-ice-100 hover:text-neon-700 transition-colors">
          {item.name}
        </Link>
      ))}
    </div>
  );
}

const GROUPS = [
  { label: 'Products', items: NAV_PRODUCTS },
  { label: 'Sectors', items: NAV_SECTORS },
  { label: 'Company', items: NAV_COMPANY },
];

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
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-[60] bg-frost-900 flex flex-col"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          data-testid="nav-mobile-menu"
        >
          <div className="flex items-center justify-between h-[70px] px-4 sm:px-6 border-b border-white/10 flex-shrink-0">
            <Link href="/" onClick={onClose} className="flex items-center gap-3">
              <LogoMark size={40} />
              <div>
                <div className="font-fraunces font-semibold text-white text-base leading-none">Indo Aquatic</div>
                <div className="font-inter text-[10px] tracking-[0.2em] uppercase text-white/50 mt-0.5">UK Ltd</div>
              </div>
            </Link>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="p-2 rounded-md text-white hover:bg-white/10 transition-colors"
              aria-label="Close menu"
              data-testid="nav-mobile-close"
            >
              <X size={22} />
            </button>
          </div>

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
                  <motion.div key={item.href} variants={linkVariants}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="flex items-center justify-between py-3 border-b border-white/[0.07] last:border-0 group"
                      data-testid={`mobile-link-${item.href.replace(/\//g, '-')}`}
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

          <motion.div
            className="px-4 sm:px-6 py-5 border-t border-white/10 flex-shrink-0"
            variants={ctaVariants}
            initial="hidden"
            animate="visible"
          >
            <Link
              href="/request-a-sample"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full py-4 bg-neon-700 hover:bg-neon-800 text-white font-semibold rounded-md transition-colors font-inter text-sm"
              data-testid="mobile-cta-sample"
            >
              Request a frozen sample <ArrowRight size={15} />
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState(null);
  const navRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenGroup(null);
      }
    }
    function handleKeyDown(e) {
      if (e.key === 'Escape') setOpenGroup(null);
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  function toggleGroup(name) {
    setOpenGroup(prev => (prev === name ? null : name));
  }

  return (
    <>
      <nav
        ref={navRef}
        className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-ice-300"
        data-testid="navbar"
        onMouseLeave={() => setOpenGroup(null)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[70px]">

            <Link href="/" className="flex items-center gap-3 flex-shrink-0" data-testid="nav-logo">
              <LogoMark size={42} />
              <div>
                <div className="font-fraunces font-semibold text-frost-900 text-base leading-none">Indo Aquatic</div>
                <div className="font-inter text-[10px] tracking-[0.18em] uppercase text-frost-500 mt-0.5">UK Ltd</div>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              {[
                { key: 'products', label: 'Products', items: NAV_PRODUCTS, testId: 'nav-products-btn' },
                { key: 'sectors',  label: 'Sectors',  items: NAV_SECTORS,  testId: 'nav-sectors-btn' },
                { key: 'company',  label: 'Company',  items: NAV_COMPANY,  testId: 'nav-company-btn' },
              ].map(({ key, label, items, testId }) => {
                const isOpen = openGroup === key;
                const menuId = `nav-menu-${key}`;
                return (
                  <div
                    key={key}
                    className="relative"
                    onMouseEnter={() => setOpenGroup(key)}
                  >
                    <button
                      onClick={() => toggleGroup(key)}
                      className={`flex items-center gap-1 text-[15px] font-semibold transition-colors py-5 hover:text-neon-700 ${isOpen ? 'text-neon-700' : 'text-ink-900'}`}
                      data-testid={testId}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      aria-controls={menuId}
                    >
                      {label}
                      <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && <DropdownMenu items={items} id={menuId} />}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <Link href="/request-a-sample" className="hidden sm:inline-flex items-center px-5 py-2.5 bg-neon-700 hover:bg-neon-800 text-white text-[15px] font-semibold rounded-md transition-colors" data-testid="nav-request-sample">
                Request a frozen sample
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

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
