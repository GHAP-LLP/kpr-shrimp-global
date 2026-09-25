import Link from 'next/link';
import {
  ArrowRight, Snowflake, Flame, UtensilsCrossed,
  Target, MapPin, Users, CheckCircle, X,
  Leaf, Ship, Warehouse, Shield, Award, Clock,
} from 'lucide-react';
import { buildMetadata } from '@/lib/metadata';
import { FadeUp, FadeUpGrid, FadeUpItem } from '@/components/FadeUp';
import HeroSection from '@/components/HeroSection';
import SectionLabel from '@/components/SectionLabel';
import { IMG } from '@/data/products';
import { BRAND_IMGS } from '@/data/images';
import { CERTIFICATIONS } from '@/data/certifications';

export const metadata = {
  ...buildMetadata({
    description: 'Indo Aquatic is a leading frozen seafood supplier to the UK & EU. Specialist shrimp — raw, cooked, and value-added — plus shellfish, whole fish, and fillets. Own farms, certified processing, full traceability.',
    path: '/',
  }),
};

/* 01 · Sustainability & Certifications */
function SustainabilitySection() {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-ice-300" data-testid="sustainability-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="mb-10">
          <SectionLabel number="01" text="Sustainability & Certifications" />
          <h2 className="font-fraunces text-3xl sm:text-4xl text-ink-900 mb-3">Responsibly farmed. Independently certified.</h2>
          <p className="text-frost-700 font-inter max-w-2xl">Antibiotic-free production, audited labour standards, and an unbroken cold chain — verified by the certifications UK and EU buyers ask for first.</p>
        </FadeUp>
        <FadeUpGrid className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {CERTIFICATIONS.map(cert => (
            <FadeUpItem key={cert.id}>
              <div className="bg-ice-100 border border-ice-300 rounded-xl p-4 text-center h-full flex flex-col items-center justify-center" data-testid={`home-cert-${cert.id}`}>
                {cert.status === 'held' ? (
                  <Award size={26} className="text-neon-700 mb-2" />
                ) : (
                  <Clock size={26} className="text-frost-500 mb-2" />
                )}
                <p className="font-inter font-semibold text-ink-900 text-sm leading-snug mb-1">{cert.name}</p>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded uppercase tracking-wider ${cert.status === 'held' ? 'bg-neon-500/20 text-neon-700' : 'bg-ice-300 text-frost-700'}`}>
                  {cert.status === 'held' ? 'Certified' : 'In progress'}
                </span>
              </div>
            </FadeUpItem>
          ))}
        </FadeUpGrid>
        <FadeUp className="mt-8">
          <Link href="/sustainability" className="inline-flex items-center gap-2 text-sm text-neon-700 hover:text-neon-800 font-medium font-inter transition-colors" data-testid="home-sustainability-link">
            Our full sustainability &amp; traceability statement <ArrowRight size={14} />
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}

/* 02 · Who We Are */
function WhoWeAreSection() {
  return (
    <section className="py-16 md:py-24 bg-ice-100" data-testid="who-we-are-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeUp>
            <SectionLabel number="02" text="Who We Are" />
            <h2 className="font-fraunces text-3xl sm:text-4xl text-ink-900 mb-6">A family aquaculture business, supplying the UK &amp; EU.</h2>
            <p className="text-frost-700 leading-relaxed mb-5 font-inter">Indo Aquatic UK Ltd is an independent, UK-registered seafood importer and distributor, built on more than two decades of hands-on shrimp aquaculture. Our directors' family owns and operates farms and processing plants, grown into an integrated business spanning farming, processing, and global distribution.</p>
            <p className="text-frost-700 leading-relaxed mb-8 font-inter">That reach comes to UK and EU buyers directly: sterling pricing, local contracts, an account team in your time zone — and every lot inspected and documented from pond to plate.</p>
            <Link href="/about" className="inline-flex items-center gap-2 text-sm text-neon-700 hover:text-neon-800 font-medium font-inter transition-colors" data-testid="home-about-link">
              More about us <ArrowRight size={14} />
            </Link>
          </FadeUp>
          <FadeUp delay={0.12}>
            <div className="rounded-2xl overflow-hidden aspect-[4/3] border border-ice-300 shadow-sm">
              <img src={BRAND_IMGS.farmFacility} alt="Shrimp farm ponds with bird netting, Andhra Pradesh" loading="lazy" className="w-full h-full object-cover" />
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* 03 · Products We Serve */
const PRODUCT_CARDS = [
  { icon: Snowflake, name: 'Frozen Raw Shrimp', href: '/products/frozen-raw-shrimp', image: IMG.frozenRaw, desc: 'HOSO, HLSO, PD, PUD, EZ-peel. Every count from U/15 to 61/70.', badge: 'Core range' },
  { icon: Flame, name: 'Cooked Shrimp', href: '/products/cooked-shrimp', image: IMG.cooked, desc: 'Fully cooked peeled and tail-on. Salad-ready, retail-ready. BRC-certified, no cook loss.' },
  { icon: UtensilsCrossed, name: 'Added Value Innovation', href: '/products/ready-to-cook', image: IMG.readyToCook, desc: 'Breaded, tempura, popcorn, noodle-wrapped, coconut and more. Par-fried, cooks direct from frozen.' },
];

function ProductsSection() {
  return (
    <section className="py-16 md:py-24 bg-white" data-testid="product-range-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <SectionLabel number="03" text="Products We Serve" />
            <h2 className="font-fraunces text-3xl sm:text-4xl text-ink-900">Shrimp first. Seafood wide.</h2>
          </div>
          <Link href="/products" className="flex items-center gap-2 text-sm text-frost-700 hover:text-neon-700 font-medium transition-colors whitespace-nowrap font-inter">
            Full range <ArrowRight size={14} />
          </Link>
        </FadeUp>
        <FadeUpGrid className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {PRODUCT_CARDS.map(card => (
            <FadeUpItem key={card.name}>
              <Link href={card.href} className="group block rounded-xl overflow-hidden border border-ice-300 bg-white hover:border-frost-500 hover:shadow-lg transition-all duration-300 h-full shadow-sm" data-testid={`product-card-${card.name.toLowerCase().replace(/ /g, '-')}`}>
                <div className="relative aspect-[16/9] overflow-hidden bg-frost-900">
                  <img src={card.image} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-95 group-hover:scale-105 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-frost-900/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <div className="w-7 h-7 bg-neon-700 rounded flex items-center justify-center">
                      <card.icon size={13} className="text-white" />
                    </div>
                  </div>
                  {card.badge && (
                    <span className="absolute top-3 right-3 bg-neon-700 text-white text-[10px] font-semibold px-2 py-0.5 rounded font-inter uppercase tracking-wide">{card.badge}</span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-fraunces text-xl text-ink-900 mb-2">{card.name}</h3>
                  <p className="text-sm text-frost-700 leading-relaxed font-inter">{card.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-neon-700 text-sm font-medium font-inter group-hover:gap-2 transition-all">View range <ArrowRight size={14} /></div>
                </div>
              </Link>
            </FadeUpItem>
          ))}
        </FadeUpGrid>
        <FadeUp className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3 bg-ice-100 border border-ice-300 rounded-xl px-5 py-4">
          <p className="text-sm text-frost-700 font-inter flex-1">Beyond shrimp: frozen shellfish, whole fish, and fillets — delivered through our world-class global distribution network.</p>
          <Link href="/products/wider-seafood-range" className="inline-flex items-center gap-2 text-sm text-neon-700 hover:text-neon-800 font-semibold font-inter whitespace-nowrap">
            Wider seafood range <ArrowRight size={14} />
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}

/* 04 · Why Indo Aquatic */
const WHY_POINTS = [
  { icon: Target, title: 'Spec consistency, batch to batch', desc: 'Tight count tolerances, glaze, and uniformity across every order, every product line.' },
  { icon: Snowflake, title: 'UK & EU cold-chain delivery', desc: 'Cold storage at Grimsby and Hull, unbroken cold chain from origin to your depot.' },
  { icon: MapPin, title: 'Traceability to source', desc: 'Lot-level provenance on every shipment. Full chain of custody.' },
  { icon: Users, title: 'Dedicated account team', desc: 'Sterling pricing, local contracts, one account manager who knows your spec.' },
];

const COMPARISON = {
  generic: ['Seafood as one of 50+ commodity lines', 'Inconsistent spec across orders', 'Multiple unknown intermediaries', 'No direct farm access'],
  ours: ['Seafood-first specialist', 'Spec locked batch to batch', 'Own farms + global distribution network', 'Full lot traceability'],
};

function WhySection() {
  return (
    <section className="py-16 md:py-24 bg-ice-100" data-testid="why-specialist-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="mb-10">
          <SectionLabel number="04" text="Why Indo Aquatic" />
          <h2 className="font-fraunces text-3xl sm:text-4xl text-ink-900">Specialist depth. Full-range supply.</h2>
        </FadeUp>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <FadeUpGrid className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {WHY_POINTS.map(point => (
                <FadeUpItem key={point.title}>
                  <div className="flex items-start gap-4 bg-white border border-ice-300 rounded-xl p-5 h-full">
                    <div className="w-9 h-9 bg-white border border-ice-300 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                      <point.icon size={16} className="text-neon-700" />
                    </div>
                    <div>
                      <h3 className="font-fraunces text-lg text-ink-900 mb-1">{point.title}</h3>
                      <p className="text-sm text-frost-700 leading-relaxed font-inter">{point.desc}</p>
                    </div>
                  </div>
                </FadeUpItem>
              ))}
            </FadeUpGrid>
          </div>
          <FadeUp className="lg:col-span-2">
            <div className="bg-white border border-ice-300 rounded-xl overflow-hidden shadow-sm h-full">
              <div className="grid grid-cols-2 divide-x divide-ice-300 h-full">
                <div className="p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-frost-500 font-inter mb-5">Commodity trader</p>
                  <ul className="space-y-4">
                    {COMPARISON.generic.map(g => (
                      <li key={g} className="flex items-start gap-2">
                        <X size={13} className="text-frost-500/50 flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-frost-500 font-inter leading-snug">{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-5 bg-ice-100/60">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-neon-700 font-inter mb-5">Indo Aquatic</p>
                  <ul className="space-y-4">
                    {COMPARISON.ours.map(k => (
                      <li key={k} className="flex items-start gap-2">
                        <CheckCircle size={13} className="text-neon-700 flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-ink-900 font-semibold font-inter leading-snug">{k}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* 05 · Supply Chain */
const PROCESS_STEPS = [
  { step: '01', Icon: Leaf, title: 'Farmed & Processed', sub: 'Our own farms & partner network', desc: 'Litopenaeus vannamei farmed and processed at our own facilities, and by trusted partners around the world. HACCP-controlled processing, full lot documentation generated at source.', image: BRAND_IMGS.farmAerial, imageAlt: 'Shrimp aquaculture farm ponds, Andhra Pradesh' },
  { step: '02', Icon: Shield, title: 'Sampled & Tested', sub: 'Verified in-house', desc: 'Samples drawn from every farm and partner are tested and finalised at our own Indo Aquatic facility. Residue testing, count tolerances checked, Certificate of Analysis issued before dispatch.', image: BRAND_IMGS.qualityControl, imageAlt: 'Food quality control inspection' },
  { step: '03', Icon: Ship, title: 'Cold-Chain Shipping', sub: 'Global origins → UK & EU', desc: 'Temperature-controlled from origin to port. Continuous cold chain. Time-temperature records travel with every consignment.', image: BRAND_IMGS.containerShip, imageAlt: 'Container ship carrying frozen cargo' },
  { step: '04', Icon: Warehouse, title: 'UK Cold Storage', sub: 'Grimsby / Hull', desc: 'UK-held cold-chain stock. Sterling pricing, UK contracts, GMT account team. Ready for despatch within agreed lead times.', image: BRAND_IMGS.coldWarehouse, imageAlt: 'UK cold storage' },
];

function ProcessSection() {
  return (
    <section className="py-16 md:py-24 bg-frost-900" data-testid="process-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="mb-14">
          <SectionLabel number="05" text="Supply Chain" dark />
          <h2 className="font-fraunces text-3xl sm:text-4xl text-white mb-3">Farm to warehouse. Transparent at every step.</h2>
          <p className="text-frost-500 font-inter max-w-2xl">Full chain of custody across our own farms, processing plants, and global distribution network — you know exactly where your product comes from and how it got here.</p>
        </FadeUp>
        <FadeUpGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-xl overflow-hidden border border-white/5">
          {PROCESS_STEPS.map((s, i) => (
            <FadeUpItem key={s.step}>
              <div className="bg-frost-900 h-full flex flex-col relative" data-testid={`process-step-${s.step}`}>
                <div className="relative h-40 flex-shrink-0 overflow-hidden">
                  <img src={s.image} alt={s.imageAlt} loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-55" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-frost-900/30 to-frost-900" />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <div className="w-8 h-8 bg-neon-500/20 border border-neon-500/40 rounded-lg flex items-center justify-center backdrop-blur-sm">
                      <s.Icon size={14} className="text-neon-500" />
                    </div>
                    <span className="font-mono text-[10px] text-white/70 font-semibold tracking-[0.2em] bg-frost-900/50 px-1.5 py-0.5 rounded">{s.step}</span>
                  </div>
                </div>
                <div className="px-5 pb-6 pt-3 flex-1">
                  <h3 className="font-fraunces text-base text-white mb-0.5">{s.title}</h3>
                  <p className="text-[10px] text-neon-500 font-inter font-semibold uppercase tracking-widest mb-3">{s.sub}</p>
                  <p className="text-sm text-frost-500 leading-relaxed font-inter">{s.desc}</p>
                </div>
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="hidden lg:flex absolute top-[5rem] right-0 translate-x-1/2 z-10 items-center justify-center w-5 h-5 bg-frost-900 rounded-full border border-white/10">
                    <ArrowRight size={10} className="text-neon-500/50" />
                  </div>
                )}
              </div>
            </FadeUpItem>
          ))}
        </FadeUpGrid>
        <FadeUp className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 bg-neon-700 hover:bg-neon-800 text-white font-medium rounded-md transition-colors font-inter" data-testid="home-contact-cta">
            Contact us <ArrowRight size={15} />
          </Link>
          <Link href="/sustainability" className="inline-flex items-center gap-2 text-sm text-frost-500 hover:text-white font-inter transition-colors">
            Full sustainability &amp; traceability statement <ArrowRight size={13} />
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}

const homeSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Indo Aquatic Frozen Seafood Range',
  description: 'Frozen shrimp range across raw, cooked, and added value formats, plus a wider frozen seafood range',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Frozen Raw Shrimp', url: 'https://www.indoaquaticltd.com/products/frozen-raw-shrimp' },
    { '@type': 'ListItem', position: 2, name: 'IQF Cooked Shrimp', url: 'https://www.indoaquaticltd.com/products/cooked-shrimp' },
    { '@type': 'ListItem', position: 3, name: 'Added Value Innovation', url: 'https://www.indoaquaticltd.com/products/ready-to-cook' },
    { '@type': 'ListItem', position: 4, name: 'Wider Seafood Range', url: 'https://www.indoaquaticltd.com/products/wider-seafood-range' },
  ],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }} />
      <HeroSection />
      <SustainabilitySection />
      <WhoWeAreSection />
      <ProductsSection />
      <WhySection />
      <ProcessSection />
    </>
  );
}
