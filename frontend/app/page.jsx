import Link from 'next/link';
import {
  ArrowRight, Snowflake, Flame, UtensilsCrossed,
  ShoppingBag, ChefHat, Truck, Factory,
  Target, MapPin, Users, CheckCircle, X,
  Leaf, Ship, Warehouse, Shield,
} from 'lucide-react';
import { buildMetadata } from '@/lib/metadata';
import { FadeUp, FadeUpGrid, FadeUpItem } from '@/components/FadeUp';
import HeroSection from '@/components/HeroSection';
import { IMG } from '@/data/products';
import { SECTOR_IMG } from '@/data/sectors';
import { BRAND_IMGS } from '@/data/images';

export const metadata = {
  ...buildMetadata({
    description: 'UK wholesale frozen prawn supplier. Indo Aquatic supplies IQF raw (HOSO, HLSO, PD), cooked, and added value prawns to UK retailers, foodservice operators, food manufacturers, and distributors. Traceable origin, vetted global sourcing partners.',
    path: '/',
  }),
};

function SectionLabel({ number, text }) {
  return (
    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neon-500 font-inter mb-3">
      {number} · {text}
    </p>
  );
}

const METRICS = [
  { value: 'U/15–61/70', label: 'Count range', sub: 'Every commercial size' },
  { value: '5 days', label: 'Sample dispatch', sub: 'From confirmed request' },
  { value: '20+ yrs', label: 'Aquaculture heritage', sub: 'Director-led family expertise' },
];

function MetricsStrip() {
  return (
    <section className="bg-white border-b border-ice-300" data-testid="metrics-strip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-ice-300">
          {METRICS.map((m) => (
            <div key={m.label} className="px-4 sm:px-6 py-5">
              <p className="font-fraunces text-2xl sm:text-3xl text-ink-900">{m.value}</p>
              <p className="text-sm font-semibold text-ink-900 font-inter mt-0.5">{m.label}</p>
              <p className="text-xs text-frost-500 font-inter">{m.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const CERTS = [
  { name: 'BRC Global Standard', sub: 'Food Safety', highlight: true },
  { name: 'ASC Certified', sub: 'Responsible Aquaculture', highlight: true },
  { name: 'BAP Certified', sub: 'Best Aquaculture Practices', highlight: false },
  { name: 'HACCP', sub: 'Critical Control Points', highlight: false },
  { name: 'ISO 22000', sub: 'Food Safety Management', highlight: false },
  { name: 'Halal Certified', sub: 'Processing Lines', highlight: false },
];

function CertificationStrip() {
  return (
    <section className="bg-ice-100 border-b border-ice-300 py-5" data-testid="cert-strip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-frost-500 font-inter whitespace-nowrap flex-shrink-0">
            Audited &amp; certified
          </p>
          <div className="flex flex-wrap gap-2">
            {CERTS.map(cert => (
              <div
                key={cert.name}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded border text-xs font-inter ${
                  cert.highlight
                    ? 'bg-white border-neon-500/40 shadow-sm'
                    : 'bg-white border-ice-300'
                }`}
              >
                <CheckCircle size={12} className={cert.highlight ? 'text-neon-500' : 'text-frost-500'} />
                <span className={`font-semibold ${cert.highlight ? 'text-ink-900' : 'text-frost-700'}`}>{cert.name}</span>
                <span className="text-frost-500 hidden sm:inline">· {cert.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const PRODUCT_CARDS = [
  { icon: Snowflake, name: 'Frozen Raw Prawns', href: '/products/frozen-raw-shrimp', image: IMG.frozenRaw, desc: 'HOSO, HLSO, PD, PUD, EZ-peel. Every count from U/15 to 61/70.', badge: 'Core range' },
  { icon: Flame, name: 'Cooked Prawns', href: '/products/cooked-shrimp', image: IMG.cooked, desc: 'Fully cooked peeled and tail-on. Salad-ready, retail-ready. BRC-certified, no cook loss.' },
  { icon: UtensilsCrossed, name: 'Added Value Innovation', href: '/products/ready-to-cook', image: IMG.readyToCook, desc: 'Tempura, breaded, butterfly, marinated, skewers. Cooks direct from frozen.' },
];

function ProductRangeSection() {
  return (
    <section className="py-16 md:py-24 bg-ice-100" data-testid="product-range-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <SectionLabel number="01" text="Product Range" />
            <h2 className="font-fraunces text-3xl sm:text-4xl text-ink-900">Three formats. One specialist.</h2>
          </div>
          <Link href="/products" className="flex items-center gap-2 text-sm text-frost-700 hover:text-neon-500 font-medium transition-colors whitespace-nowrap font-inter">
            Full range <ArrowRight size={14} />
          </Link>
        </FadeUp>
        <FadeUpGrid className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {PRODUCT_CARDS.map(card => (
            <FadeUpItem key={card.name}>
              <Link href={card.href} className="group block rounded-xl overflow-hidden border border-ice-300 bg-white hover:border-frost-500 hover:shadow-lg transition-all duration-300 h-full shadow-sm" data-testid={`product-card-${card.name.toLowerCase().replace(/ /g, '-')}`}>
                <div className="relative aspect-[16/9] overflow-hidden bg-frost-900">
                  <img src={card.image} alt={card.name} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-95 group-hover:scale-105 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-frost-900/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <div className="w-7 h-7 bg-neon-500 rounded flex items-center justify-center">
                      <card.icon size={13} className="text-white" />
                    </div>
                  </div>
                  {card.badge && (
                    <span className="absolute top-3 right-3 bg-neon-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded font-inter uppercase tracking-wide">{card.badge}</span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-fraunces text-xl text-ink-900 mb-2">{card.name}</h3>
                  <p className="text-sm text-frost-700 leading-relaxed font-inter">{card.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-neon-500 text-sm font-medium font-inter group-hover:gap-2 transition-all">View range <ArrowRight size={14} /></div>
                </div>
              </Link>
            </FadeUpItem>
          ))}
        </FadeUpGrid>
      </div>
    </section>
  );
}

const PROCESS_STEPS = [
  { step: '01', Icon: Leaf, title: 'Farmed & Processed', sub: 'Certified partner farms', desc: 'Litopenaeus vannamei farmed by our vetted sourcing partners. HACCP-controlled processing, full lot documentation generated at source.', image: BRAND_IMGS.farmAerial, imageAlt: 'Prawn aquaculture farm ponds, Andhra Pradesh' },
  { step: '02', Icon: Shield, title: 'QC & Documentation', sub: 'Pre-export', desc: 'Residue testing, count tolerances checked, Certificate of Analysis issued. Spec locked and documented before the product leaves the facility.', image: BRAND_IMGS.qualityControl, imageAlt: 'Food quality control inspection' },
  { step: '03', Icon: Ship, title: 'Cold-Chain Shipping', sub: 'India → UK port', desc: 'Temperature-controlled from processing to UK port. Continuous cold chain. Time-temperature records travel with every consignment.', image: BRAND_IMGS.containerShip, imageAlt: 'Container ship carrying frozen cargo' },
  { step: '04', Icon: Warehouse, title: 'UK Cold Storage', sub: 'Grimsby / Hull', desc: 'UK-held cold-chain stock. Sterling pricing, UK contracts, GMT account team. Ready for despatch within agreed lead times.', image: BRAND_IMGS.coldWarehouse, imageAlt: 'UK cold storage warehouse' },
];

function ProcessSection() {
  return (
    <section className="py-16 md:py-24 bg-frost-900" data-testid="process-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="mb-14">
          <SectionLabel number="02" text="Supply Chain" />
          <h2 className="font-fraunces text-3xl sm:text-4xl text-white mb-3">Farm to UK warehouse. Transparent at every step.</h2>
          <p className="text-frost-500 font-inter max-w-2xl">Full chain of custody through our vetted sourcing partners. No opaque intermediary network — you know exactly where your product comes from and how it got here.</p>
        </FadeUp>
        <FadeUpGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-xl overflow-hidden border border-white/5">
          {PROCESS_STEPS.map((s, i) => (
            <FadeUpItem key={s.step}>
              <div className="bg-frost-900 h-full flex flex-col relative" data-testid={`process-step-${s.step}`}>
                <div className="relative h-40 flex-shrink-0 overflow-hidden">
                  <img src={s.image} alt={s.imageAlt} className="absolute inset-0 w-full h-full object-cover opacity-55" />
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
                  <p className="text-[10px] text-neon-500/70 font-inter font-semibold uppercase tracking-widest mb-3">{s.sub}</p>
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
        <FadeUp className="mt-8 flex justify-center">
          <Link href="/sustainability" className="inline-flex items-center gap-2 text-sm text-frost-500 hover:text-white font-inter transition-colors">
            Full sustainability & traceability statement <ArrowRight size={13} />
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}

const SECTOR_CARDS = [
  { icon: ShoppingBag, name: 'Retail', desc: 'Private label and branded packs. UK food labelling compliance.', href: '/sectors/retail-private-label', image: SECTOR_IMG.retail },
  { icon: Factory, name: 'Retail Processors', desc: 'Bulk ingredient supply. Block frozen and IQF at scale.', href: '/sectors/food-manufacturers', image: SECTOR_IMG.manufacturers },
  { icon: ChefHat, name: 'Foodservice', desc: 'Hotels, restaurants, chains, and caterers. Every format, every pack size.', href: '/sectors/foodservice-horeca', image: SECTOR_IMG.horeca },
  { icon: Truck, name: 'Wholesale', desc: 'Frozen distributors and importers. Palletised bulk supply.', href: '/sectors/wholesale-distributors', image: SECTOR_IMG.wholesale },
];

function SectorsSection() {
  return (
    <section className="py-16 md:py-24 bg-white" data-testid="sectors-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="mb-10">
          <SectionLabel number="03" text="Who We Serve" />
          <h2 className="font-fraunces text-3xl sm:text-4xl text-ink-900">Built for serious UK buyers.</h2>
        </FadeUp>
        <FadeUpGrid className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {SECTOR_CARDS.map(card => (
            <FadeUpItem key={card.name}>
              <Link href={card.href} className="group relative rounded-xl overflow-hidden border border-ice-300 h-56 flex flex-col justify-end hover:border-neon-500/40 hover:shadow-md transition-all duration-300" data-testid={`sector-card-${card.name.toLowerCase()}`}>
                <img src={card.image} alt={card.name} className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:opacity-40 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-frost-900 via-frost-900/70 to-frost-900/20" />
                <div className="relative z-10 p-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <card.icon size={15} className="text-neon-500 flex-shrink-0" />
                    <h3 className="font-fraunces text-base text-white">{card.name}</h3>
                  </div>
                  <p className="text-xs text-frost-500 leading-snug font-inter">{card.desc}</p>
                  <div className="flex items-center gap-1 text-neon-500 text-xs font-medium mt-2 opacity-0 group-hover:opacity-100 transition-opacity font-inter">Learn more <ArrowRight size={11} /></div>
                </div>
              </Link>
            </FadeUpItem>
          ))}
        </FadeUpGrid>
      </div>
    </section>
  );
}

const WHY_POINTS = [
  { icon: Target, title: 'Spec consistency, batch to batch', desc: 'Tight count tolerances, glaze, and uniformity across every order.' },
  { icon: Snowflake, title: 'UK cold-chain partners', desc: 'Cold storage at Grimsby and Hull, nationwide frozen delivery.' },
  { icon: MapPin, title: 'Traceability to farm', desc: 'Lot-level provenance on every shipment. Full chain of custody.' },
  { icon: Users, title: 'UK-based account team', desc: 'Sterling pricing, UK contracts, GMT response.' },
];

const COMPARISON = {
  generic: ['Prawns are one of 50+ products', 'Inconsistent spec across orders', 'Multiple unknown intermediaries', 'No direct farm access'],
  ours: ['Single-category specialist', 'Spec locked batch to batch', 'Direct sourcing partner relationships', 'Full lot traceability to farm'],
};

function WhySpecialistSection() {
  return (
    <section className="py-16 md:py-24 bg-ice-100" data-testid="why-specialist-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="mb-10">
          <SectionLabel number="04" text="Why Specialist Matters" />
          <h2 className="font-fraunces text-3xl sm:text-4xl text-ink-900">Generalists carry prawns. We are prawns.</h2>
        </FadeUp>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <FadeUpGrid className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {WHY_POINTS.map(point => (
                <FadeUpItem key={point.title}>
                  <div className="flex items-start gap-4 bg-white border border-ice-300 rounded-xl p-5 h-full">
                    <div className="w-9 h-9 bg-white border border-ice-300 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                      <point.icon size={16} className="text-neon-500" />
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
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-frost-500 font-inter mb-5">Generic importer</p>
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
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-neon-500 font-inter mb-5">Indo Aquatic</p>
                  <ul className="space-y-4">
                    {COMPARISON.ours.map(k => (
                      <li key={k} className="flex items-start gap-2">
                        <CheckCircle size={13} className="text-neon-500 flex-shrink-0 mt-0.5" />
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

const FARM_IMAGE = 'https://images.unsplash.com/photo-1611119260234-521fc340d9c4?crop=entropy&cs=srgb&fm=jpg&q=85&w=800';
const SOURCING_FACTS = [
  { label: 'Origin', value: 'India & global sourcing partners' },
  { label: 'Species', value: 'Litopenaeus vannamei (Whiteleg prawn)' },
  { label: 'Processing', value: 'HACCP-controlled, EU-approved facility' },
  { label: 'UK storage', value: 'Grimsby & Hull cold stores' },
];

function SourcingSection() {
  return (
    <section className="py-16 md:py-24 bg-white" data-testid="sourcing-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeUp>
            <SectionLabel number="05" text="Sourcing" />
            <h2 className="font-fraunces text-3xl sm:text-4xl text-ink-900 mb-6">Backed by two decades of aquaculture expertise.</h2>
            <p className="text-frost-700 leading-relaxed mb-6 font-inter">Our sourcing is anchored by our directors' two decades of hands-on aquaculture experience and long-term partnerships with certified farming and processing operations — giving us direct supply lines, full traceability, and volume reliability most importers can't match.</p>
            <div className="space-y-3 mb-8 border border-ice-300 rounded-xl p-5 bg-ice-100">
              {SOURCING_FACTS.map(f => (
                <div key={f.label} className="flex gap-4 items-baseline">
                  <span className="text-xs font-mono uppercase tracking-wider text-frost-500 w-24 flex-shrink-0">{f.label}</span>
                  <span className="text-sm text-ink-900 font-inter font-medium">{f.value}</span>
                </div>
              ))}
            </div>
            <Link href="/about" className="inline-flex items-center gap-2 text-sm text-neon-500 hover:text-neon-600 font-medium font-inter transition-colors" data-testid="sourcing-link">
              Read our story <ArrowRight size={14} />
            </Link>
          </FadeUp>
          <FadeUp delay={0.12}>
            <div className="rounded-2xl overflow-hidden aspect-[4/3] border border-ice-300 shadow-sm">
              <img src={FARM_IMAGE} alt="Prawn aquaculture facility, Andhra Pradesh, India" className="w-full h-full object-cover" />
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function LeadCaptureSection() {
  return (
    <section className="py-16 md:py-20 bg-neon-500" data-testid="lead-capture-section">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-center">
          <div className="sm:col-span-2">
            <p className="text-white/70 text-xs font-semibold uppercase tracking-widest font-inter mb-3">Ready to evaluate?</p>
            <h2 className="font-fraunces text-3xl sm:text-4xl text-white mb-3">Get a sample on your bench.</h2>
            <p className="text-white/80 font-inter leading-relaxed">Tell us your sector, volume, and the spec you're benchmarking. We'll ship samples within 5 working days. No commitment required.</p>
          </div>
          <div className="flex flex-col gap-3">
            <Link href="/request-a-sample" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-frost-900 hover:bg-ink-900 text-white font-medium rounded-md transition-colors font-inter" data-testid="lead-request-btn">
              Request a frozen sample <ArrowRight size={15} />
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center px-7 py-3.5 border border-white/40 text-white hover:bg-white/10 font-medium rounded-md transition-colors font-inter" data-testid="lead-contact-btn">
              Speak to us
            </Link>
            <p className="text-white/50 text-xs text-center font-inter">Trade buyers and procurement teams only</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const homeSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Indo Aquatic Frozen Prawn Range',
  description: 'Frozen prawn range across raw, cooked, and added value formats',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Frozen Raw Prawns', url: 'https://www.indoaquaticltd.com/products/frozen-raw-shrimp' },
    { '@type': 'ListItem', position: 2, name: 'IQF Cooked Prawns', url: 'https://www.indoaquaticltd.com/products/cooked-shrimp' },
    { '@type': 'ListItem', position: 3, name: 'Added Value Innovation', url: 'https://www.indoaquaticltd.com/products/ready-to-cook' },
  ],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }} />
      <HeroSection />
      <MetricsStrip />
      <CertificationStrip />
      <ProductRangeSection />
      <ProcessSection />
      <SectorsSection />
      <WhySpecialistSection />
      <SourcingSection />
      <LeadCaptureSection />
    </>
  );
}
