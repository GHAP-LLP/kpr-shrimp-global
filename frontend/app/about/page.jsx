import Link from 'next/link';
import { ArrowRight, Target, MapPin, Users, Snowflake, Award, Mail } from 'lucide-react';
import { buildMetadata } from '@/lib/metadata';
import { FadeUp, FadeUpGrid, FadeUpItem } from '@/components/FadeUp';
import { BRAND_IMGS } from '@/data/images';

export const metadata = buildMetadata({
  title: 'About Us',
  description: 'Indo Aquatic UK Ltd — UK-registered specialist importer and distributor of frozen prawns, backed by two decades of family aquaculture expertise. Single-category focus, full traceability, sterling pricing.',
  path: '/about',
});

function SectionLabel({ number, text }) {
  return (
    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neon-500 font-inter mb-3">
      {number} · {text}
    </p>
  );
}

const PILLARS = [
  { icon: Target, title: 'Single-category focus', desc: 'We only do prawns. That means every decision — buying, spec, logistics, QC — is made by people whose entire career is prawns. Generalist importers carry prawns alongside hundreds of other lines. We don\'t.' },
  { icon: Snowflake, title: 'Full UK cold-chain', desc: 'Cold storage at Grimsby and Hull. Nationwide frozen delivery. Sterling pricing and UK contracts — no currency conversion risk for your procurement team.' },
  { icon: MapPin, title: 'Traceable origin', desc: 'Lot-level provenance on every shipment. Full chain of custody from farm to UK warehouse, backed by our directors\' two decades of hands-on aquaculture expertise and long-term sourcing partnerships that most importers simply can\'t match.' },
  { icon: Users, title: 'UK-based account team', desc: 'GMT response times. A single account manager who knows your spec, your volumes, and your delivery requirements. No overseas call centres, no lost emails.' },
];

const STATS = [
  { value: '3', label: 'Processing formats' },
  { value: '4', label: 'Sectors served' },
  { value: '20+', label: 'Years aquaculture expertise' },
];

const OPERATIONS_STRIP = [
  { img: BRAND_IMGS.farmAerial, label: 'Nellore, India', sub: 'Sourcing partner facility', alt: 'Prawn aquaculture farm ponds, Andhra Pradesh' },
  { img: BRAND_IMGS.packagingLine, label: 'HACCP facility', sub: 'Processing & packaging', alt: 'Food packaging production line' },
  { img: BRAND_IMGS.coldWarehouse, label: 'Grimsby / Hull', sub: 'UK cold storage', alt: 'UK cold storage warehouse' },
];

const CERTS = [
  { name: 'BRC Global Standard', status: 'Held', held: true },
  { name: 'BAP Certified', status: 'Held', held: true },
  { name: 'HACCP', status: 'Held', held: true },
  { name: 'ISO 22000', status: 'Held', held: true },
  { name: 'FSSC 22000', status: 'Held', held: true },
  { name: 'FDA Registered', status: 'Held', held: true },
  { name: 'Halal Certified', status: 'Held', held: true },
  { name: 'ASC Certified', status: 'Held', held: true },
];

const TEAM = [
  { name: 'Santosh Kumar Reddy Ogili', role: 'Director', focus: 'Commercial strategy, key accounts, and supply partnerships for the UK market.', email: 'sales@indoaquaticltd.com' },
  { name: 'Sahithya Reddy Ogili', role: 'Director', focus: 'Operations, compliance, and logistics across the UK supply chain.', email: 'sales@indoaquaticltd.com' },
  { name: 'Technical & QA', role: 'Documentation & Compliance', focus: 'Spec sheets, allergen declarations, HACCP documentation, and CoA requests.', email: 'samples@indoaquaticltd.com' },
];

export default function AboutPage() {
  return (
    <div className="bg-ice-100 min-h-screen">

      <div className="bg-frost-900 relative py-20 md:py-28 overflow-hidden border-b border-white/10">
        <img src={BRAND_IMGS.processingWorkers} alt="Indo Aquatic prawn processing facility" className="absolute inset-0 w-full h-full object-cover opacity-10" />
        <div className="absolute inset-0 bg-frost-900/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-neon-500 font-inter mb-6">Indo Aquatic UK Ltd</p>
          <h1 className="font-fraunces text-5xl sm:text-6xl lg:text-7xl text-white font-normal leading-[1.05] mb-6 max-w-4xl" data-testid="about-h1">
            The UK's specialist prawn supplier.
          </h1>
          <p className="text-lg text-frost-500 leading-relaxed max-w-2xl font-inter">
            We don't supply everything. We supply prawns — every format, every count, every processing style — with the specification consistency that comes from doing one thing and doing it well.
          </p>
        </div>
      </div>

      <section className="py-0 border-b border-ice-300 bg-white" data-testid="about-stats">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-ice-300">
            {STATS.map(stat => (
              <div key={stat.label} className="px-6 py-6 text-center sm:text-left">
                <div className="font-fraunces text-4xl text-ink-900 mb-1">{stat.value}</div>
                <div className="text-xs uppercase tracking-widest text-frost-700 font-inter">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24" data-testid="about-story">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeUp>
              <SectionLabel number="01" text="Who We Are" />
              <h2 className="font-fraunces text-3xl sm:text-4xl text-ink-900 mb-6">A UK entity built on a decade of aquaculture expertise.</h2>
              <p className="text-frost-700 leading-relaxed mb-5 font-inter">Indo Aquatic UK Ltd is an independent, UK-registered specialist importer and distributor of frozen prawns. We supply retailers, foodservice operators, retail processors, and wholesale distributors across the United Kingdom. <span className="text-frost-500">(Indo Aquatic Ltd. · Company No. 17230607)</span></p>
              <p className="text-frost-700 leading-relaxed mb-5 font-inter">Indo Aquatic is a family business, led by directors with over 20 years of hands-on experience in prawn aquaculture — spanning farm ownership, processing, and international export. That same family built one of the industry's leading integrated prawn operations, encompassing farms, processing plants, and a global distribution network valued at over $100 million.</p>
              <p className="text-frost-700 leading-relaxed mb-5 font-inter">Indo Aquatic UK Ltd brings that depth of expertise directly to the UK market — launching as an independent company with the buying power, technical knowledge, and supplier relationships of an organisation many times its size, built on the belief that UK buyers deserve direct access to genuine aquaculture expertise, not just another importer.</p>
              <p className="text-frost-700 leading-relaxed font-inter">This heritage gives UK buyers a real advantage: a team who understands prawn production from the pond up, backed by long-term relationships with some of the best certified sourcing partners in the industry.</p>
            </FadeUp>
            <FadeUp delay={0.12}>
              <div className="rounded-2xl overflow-hidden aspect-[4/3] border border-ice-300 shadow-sm">
                <img src={BRAND_IMGS.farmAerial} alt="Prawn aquaculture farm ponds, Nellore, Andhra Pradesh" className="w-full h-full object-cover" />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="border-t border-ice-300" data-testid="about-operations">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-ice-300">
          {OPERATIONS_STRIP.map(item => (
            <div key={item.label} className="relative overflow-hidden aspect-[4/3] sm:aspect-auto sm:h-56">
              <img src={item.img} alt={item.alt} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-frost-900/80 via-frost-900/30 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="font-fraunces text-white text-sm mb-0.5">{item.label}</p>
                <p className="text-white/60 text-xs font-inter uppercase tracking-wider">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24 border-t border-ice-300" data-testid="about-pillars">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="mb-12">
            <SectionLabel number="02" text="The Indo Aquatic Difference" />
            <h2 className="font-fraunces text-3xl sm:text-4xl text-ink-900 max-w-2xl">Why single-category focus produces better outcomes for buyers.</h2>
          </FadeUp>
          <FadeUpGrid className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {PILLARS.map(pillar => (
              <FadeUpItem key={pillar.title}>
                <div className="flex items-start gap-4" data-testid={`pillar-${pillar.title.split(' ')[0].toLowerCase()}`}>
                  <div className="w-10 h-10 bg-white border border-ice-300 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <pillar.icon size={18} className="text-neon-500" />
                  </div>
                  <div>
                    <h3 className="font-fraunces text-lg text-ink-900 mb-2">{pillar.title}</h3>
                    <p className="text-sm text-frost-700 leading-relaxed font-inter">{pillar.desc}</p>
                  </div>
                </div>
              </FadeUpItem>
            ))}
          </FadeUpGrid>
        </div>
      </section>

      <section className="py-16 md:py-24 border-t border-ice-300" data-testid="about-sourcing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeUp delay={0.12} className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl overflow-hidden aspect-[4/3] border border-ice-300 shadow-sm col-span-2">
                  <img src={BRAND_IMGS.processingWorkers} alt="Seafood processing facility workers" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-xl overflow-hidden aspect-[4/3] border border-ice-300 shadow-sm">
                  <img src={BRAND_IMGS.qualityControl} alt="Food quality control inspection" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-xl overflow-hidden aspect-[4/3] border border-ice-300 shadow-sm">
                  <img src={BRAND_IMGS.coldWarehouse} alt="Cold storage warehouse" className="w-full h-full object-cover" />
                </div>
              </div>
            </FadeUp>
            <FadeUp className="order-1 lg:order-2">
              <SectionLabel number="03" text="Sourcing" />
              <h2 className="font-fraunces text-3xl sm:text-4xl text-ink-900 mb-6">Backed by two decades of aquaculture expertise.</h2>
              <p className="text-frost-700 leading-relaxed mb-5 font-inter">We work with a carefully vetted network of sourcing partners across leading prawn-producing regions, including Kodavalur, Nellore, Andhra Pradesh — chosen for their certification standards, processing quality, and consistency.</p>
              <p className="text-frost-700 leading-relaxed mb-5 font-inter">We don't rely on spot market purchasing. Our directors' hands-on experience in farm ownership and processing means spec, quality, and lot-level traceability are controlled at every stage — from pond to processing to UK cold store.</p>
              <p className="text-frost-700 leading-relaxed mb-8 font-inter">UK buyers get the benefit of this expertise — sterling pricing, UK contracts, and an account team in the same time zone.</p>
              <Link href="/contact" className="inline-flex items-center gap-2 text-sm text-neon-500 hover:text-neon-600 font-medium font-inter transition-colors" data-testid="about-contact-link">
                Get in touch <ArrowRight size={14} />
              </Link>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-ice-300" data-testid="about-certs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="mb-10">
            <SectionLabel number="04" text="Certifications" />
            <h2 className="font-fraunces text-3xl text-ink-900 mb-3">Standards we hold and work towards.</h2>
            <p className="text-frost-700 font-inter max-w-2xl">Our supply chain is built to meet the documentation and certification requirements of UK retail and foodservice buyers.</p>
          </FadeUp>
          <FadeUpGrid className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {CERTS.map(cert => (
              <FadeUpItem key={cert.name}>
                <div className="bg-white border border-ice-300 rounded-xl p-4 text-center shadow-sm" data-testid={`cert-${cert.name.toLowerCase().replace(/ /g, '-')}`}>
                  <Award size={20} className={`${cert.held ? 'text-neon-500' : 'text-frost-500'} mx-auto mb-3`} />
                  <p className="font-inter font-semibold text-ink-900 text-sm mb-1">{cert.name}</p>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded uppercase tracking-wider ${cert.held ? 'bg-neon-500/20 text-neon-500' : 'bg-ice-300 text-frost-700'}`}>{cert.status}</span>
                </div>
              </FadeUpItem>
            ))}
          </FadeUpGrid>
        </div>
      </section>

      <section className="py-16 border-t border-ice-300" data-testid="about-team">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="mb-10">
            <SectionLabel number="05" text="Our Team" />
            <h2 className="font-fraunces text-3xl text-ink-900 mb-3">A UK team dedicated to one product.</h2>
            <p className="text-frost-700 font-inter max-w-2xl">All commercial, technical, and logistics conversations happen with people whose entire focus is prawns. One contact, full continuity.</p>
          </FadeUp>
          <FadeUpGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TEAM.map(member => (
              <FadeUpItem key={member.name}>
                <div className="bg-white border border-ice-300 rounded-xl p-6 h-full flex flex-col shadow-sm">
                  <div className="mb-4">
                    <h3 className="font-fraunces text-lg text-ink-900 mb-0.5">{member.name}</h3>
                    <p className="text-xs font-semibold text-neon-500 uppercase tracking-wider font-inter">{member.role}</p>
                  </div>
                  <p className="text-sm text-frost-700 leading-relaxed font-inter flex-1 mb-4">{member.focus}</p>
                  <div className="space-y-1.5 border-t border-ice-300 pt-4">
                    <a href={`mailto:${member.email}`} className="flex items-center gap-2 text-xs text-frost-700 hover:text-neon-500 transition-colors font-inter">
                      <Mail size={12} className="flex-shrink-0" />{member.email}
                    </a>
                  </div>
                </div>
              </FadeUpItem>
            ))}
          </FadeUpGrid>
        </div>
      </section>

      <section className="py-16 bg-neon-500">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-fraunces text-3xl text-white mb-3">Ready to talk supply?</h2>
          <p className="text-white/80 mb-8 font-inter">Get in touch with our UK account team to discuss volumes, specifications, and sample arrangements.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/request-a-sample" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-frost-900 hover:bg-ink-900 text-white font-medium rounded-md transition-colors font-inter" data-testid="about-request-sample">
              Request a frozen sample <ArrowRight size={14} />
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/40 text-white hover:bg-white/10 font-medium rounded-md transition-colors font-inter">
              Contact us
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
