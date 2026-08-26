'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { IMG } from '@/data/products';

const EASE = [0.22, 1, 0.36, 1];

export default function HeroSection() {
  return (
    <section className="bg-frost-900 relative overflow-hidden" data-testid="hero-section">
      <div className="absolute inset-y-0 right-0 w-full lg:w-[58%] hidden lg:block pointer-events-none">
        <img
          src={IMG.frozenRaw}
          alt="Frozen raw prawn — IQF block"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-frost-900 via-frost-900/75 to-frost-900/10" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="py-20 md:py-28 max-w-xl lg:max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-neon-500 font-inter mb-3" data-testid="hero-eyebrow">
            Indo Aquatic UK Ltd
          </p>
          <p className="text-base text-white/50 font-inter italic mb-5">Premium Seafood. Global Standards.</p>
          <h1 className="font-fraunces text-5xl sm:text-6xl lg:text-7xl text-white font-normal leading-[1.05] mb-6" data-testid="hero-h1">
            The UK's specialist frozen prawn supplier.
          </h1>
          <p className="text-lg text-frost-500 leading-relaxed mb-10 max-w-2xl font-inter">
            UK distributor of raw, cooked and added value prawns – supplied through our own farms, processing plants, and a trusted network of partners around the world, with every step closely controlled to deliver the highest quality prawns in the UK market.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/request-a-sample"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-neon-500 hover:bg-neon-600 text-white font-medium rounded-md transition-colors font-inter"
              data-testid="hero-cta-sample"
            >
              Request a frozen sample
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-frost-500 text-white hover:border-white hover:bg-white/5 font-medium rounded-md transition-colors font-inter"
              data-testid="hero-cta-catalogue"
            >
              View product range <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
