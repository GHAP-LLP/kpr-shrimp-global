'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { IMG } from '@/data/products';

const EASE = [0.22, 1, 0.36, 1];
const ROTATE_MS = 8000;

const SLIDES = [
  {
    id: 'seafood',
    image: '/images/widerRange.jpg',
    eyebrow: 'Indo Aquatic UK Ltd',
    tagline: 'Premium Seafood. Global Standards.',
    title: 'The leading seafood supplier in the UK & EU.',
    body: 'Frozen shrimp is our specialism — raw, cooked, and value-added — supplied alongside shellfish, whole fish, and fillets through our own farms and a world-class global distribution network.',
    primary: { href: '/contact', label: 'Contact us' },
    secondary: { href: '/products', label: 'View our range' },
  },
  {
    id: 'shrimp',
    image: IMG.frozenRaw,
    eyebrow: 'Core Range',
    tagline: 'One supplier. The whole freezer.',
    title: 'Frozen shrimp, every format.',
    body: 'HOSO to fully peeled, IQF cooked, and an eight-strong coated range — par-fried, consistent piece weights, and ready to cook straight from frozen. Specification locked batch to batch.',
    primary: { href: '/products', label: 'Explore the range' },
    secondary: { href: '/contact', label: 'Contact us' },
  },
];

export default function HeroSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(() => {
      setActive(prev => (prev + 1) % SLIDES.length);
    }, ROTATE_MS);
    return () => clearTimeout(timerRef.current);
  }, [active, paused]);

  const slide = SLIDES[active];

  return (
    <section
      className="bg-frost-900 relative overflow-hidden"
      data-testid="hero-section"
      aria-roledescription="carousel"
      aria-label="Featured ranges"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Both slide images stay mounted; opacity crossfade avoids reload flashes. */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[58%] hidden lg:block pointer-events-none">
        {SLIDES.map((s, i) => (
          <img
            key={s.id}
            src={s.image}
            alt=""
            fetchPriority={i === 0 ? 'high' : 'low'}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === active ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-frost-900 via-frost-900/75 to-frost-900/10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-20 md:py-28 max-w-xl lg:max-w-2xl min-h-[560px] md:min-h-[540px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-neon-500 font-inter mb-3" data-testid="hero-eyebrow">
                {slide.eyebrow}
              </p>
              <p className="text-base text-white/70 font-inter italic mb-5">{slide.tagline}</p>
              <h1 className="font-fraunces text-5xl sm:text-6xl lg:text-7xl text-white font-normal leading-[1.05] mb-6" data-testid="hero-h1">
                {slide.title}
              </h1>
              <p className="text-lg text-frost-500 leading-relaxed mb-10 max-w-2xl font-inter">
                {slide.body}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={slide.primary.href}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-neon-700 hover:bg-neon-800 text-white font-medium rounded-md transition-colors font-inter"
                  data-testid="hero-cta-primary"
                >
                  {slide.primary.label}
                </Link>
                <Link
                  href={slide.secondary.href}
                  className="inline-flex items-center gap-2 px-7 py-3.5 border border-frost-500 text-white hover:border-white hover:bg-white/5 font-medium rounded-md transition-colors font-inter"
                  data-testid="hero-cta-secondary"
                >
                  {slide.secondary.label} <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-3 mt-10" data-testid="hero-slider-dots">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActive(i)}
                aria-label={`Show slide ${i + 1}: ${s.title}`}
                aria-current={i === active}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? 'w-8 bg-neon-500' : 'w-4 bg-white/25 hover:bg-white/50'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
