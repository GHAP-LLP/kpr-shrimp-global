import { Link } from 'react-router-dom';
import { ArrowRight, Target, MapPin, Users, Snowflake, Award, TrendingUp } from 'lucide-react';
import SEO from '@/components/SEO';
import { FadeUp, FadeUpGrid, FadeUpItem } from '@/components/FadeUp';

const FARM_IMG = "https://images.unsplash.com/photo-1611119260234-521fc340d9c4?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200";
const FISHING_IMG = "https://images.unsplash.com/photo-1761529729790-b3cdcc25fe24?crop=entropy&cs=srgb&fm=jpg&q=85&w=900";

function SectionLabel({ number, text }) {
  return (
    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neon-500 font-inter mb-3">
      {number} · {text}
    </p>
  );
}

const PILLARS = [
  {
    icon: Target,
    title: "Single-category focus",
    desc: "We only do shrimp. That means every decision — buying, spec, logistics, QC — is made by people whose entire career is shrimp. Generalist importers carry shrimp alongside hundreds of other lines. We don't.",
  },
  {
    icon: Snowflake,
    title: "Full UK cold-chain",
    desc: "Bonded storage at Felixstowe and Tilbury. Nationwide frozen delivery. Sterling pricing and UK contracts — no currency conversion risk for your procurement team.",
  },
  {
    icon: MapPin,
    title: "Traceable origin",
    desc: "Lot-level provenance on every shipment. Full chain of custody from farm to UK warehouse. Integrated supply lines through our parent group give us visibility that most importers simply can't provide.",
  },
  {
    icon: Users,
    title: "UK-based account team",
    desc: "GMT response times. A single account manager who knows your spec, your volumes, and your delivery requirements. No overseas call centres, no lost emails.",
  },
];

const STATS = [
  { value: "11", label: "Product variants" },
  { value: "3", label: "Processing formats" },
  { value: "4", label: "Sectors served" },
  { value: "30+", label: "Years group experience" },
];

export default function AboutPage() {
  return (
    <div className="bg-frost-900 min-h-screen">

      {/* Header */}
      <div className="py-20 md:py-28 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SEO
            title="About Us"
            description="KPR Shrimp Global Ltd is a UK-registered specialist importer backed by Green House Agro Products, Nellore. Single-category shrimp focus, full traceability, sterling pricing."
            path="/about"
          />
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-neon-500 font-inter mb-6">KPR Shrimp Global</p>
          <h1 className="font-fraunces text-5xl sm:text-6xl lg:text-7xl text-white font-normal leading-[1.05] mb-6 max-w-4xl" data-testid="about-h1">
            The UK's specialist shrimp supplier.
          </h1>
          <p className="text-lg text-frost-500 leading-relaxed max-w-2xl font-inter">
            We don't supply everything. We supply shrimp — every format, every count, every processing style — with the specification consistency that comes from doing one thing and doing it well.
          </p>
        </div>
      </div>

      {/* Stats strip */}
      <section className="py-12 border-b border-white/10" data-testid="about-stats">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUpGrid className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {STATS.map(stat => (
              <FadeUpItem key={stat.label}>
                <div className="text-center">
                  <div className="font-fraunces text-4xl text-white mb-1">{stat.value}</div>
                  <div className="text-xs uppercase tracking-widest text-frost-500 font-inter">{stat.label}</div>
                </div>
              </FadeUpItem>
            ))}
          </FadeUpGrid>
        </div>
      </section>

      {/* 01 — Company story */}
      <section className="py-16 md:py-24" data-testid="about-story">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionLabel number="01" text="Who We Are" />
              <h2 className="font-fraunces text-3xl sm:text-4xl text-white mb-6">A UK entity built on three decades of aquaculture expertise.</h2>
              <p className="text-frost-500 leading-relaxed mb-5 font-inter">KPR Shrimp Global Ltd is a UK-registered specialist importer and distributor of frozen shrimp. We supply retailers, foodservice operators, food manufacturers, and wholesale distributors across the United Kingdom.</p>
              <p className="text-frost-500 leading-relaxed mb-5 font-inter">The company is the UK trading arm of Green House Agro Products, a long-established aquaculture and processing operation based in Nellore, Andhra Pradesh — one of India's most productive shrimp-farming regions.</p>
              <p className="text-frost-500 leading-relaxed font-inter">This structure gives UK buyers direct access to the supply chain: consistent raw material, full traceability, and the flexibility that comes from owning the production relationship rather than brokering it.</p>
            </div>
            <div className="rounded-2xl overflow-hidden aspect-[4/3] border border-white/10">
              <img src={FARM_IMG} alt="Aquaculture facility in Andhra Pradesh" className="w-full h-full object-cover opacity-80" />
            </div>
          </div>
        </div>
      </section>

      {/* 02 — Why single-category */}
      <section className="py-16 md:py-24 border-t border-white/10" data-testid="about-pillars">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="mb-12">
            <SectionLabel number="02" text="The KPR Difference" />
            <h2 className="font-fraunces text-3xl sm:text-4xl text-white max-w-2xl">Why single-category focus produces better outcomes for buyers.</h2>
          </FadeUp>
          <FadeUpGrid className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {PILLARS.map(pillar => (
              <FadeUpItem key={pillar.title}>
                <div className="flex items-start gap-4" data-testid={`pillar-${pillar.title.split(' ')[0].toLowerCase()}`}>
                  <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <pillar.icon size={18} className="text-neon-500" />
                  </div>
                  <div>
                    <h3 className="font-fraunces text-lg text-white mb-2">{pillar.title}</h3>
                    <p className="text-sm text-frost-500 leading-relaxed font-inter">{pillar.desc}</p>
                  </div>
                </div>
              </FadeUpItem>
            ))}
          </FadeUpGrid>
        </div>
      </section>

      {/* 03 — Sourcing & parent group */}
      <section className="py-16 md:py-24 border-t border-white/10" data-testid="about-sourcing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] border border-white/10 order-2 lg:order-1">
              <img src={FISHING_IMG} alt="Fishermen casting nets" className="w-full h-full object-cover opacity-75" />
            </div>
            <div className="order-1 lg:order-2">
              <SectionLabel number="03" text="Sourcing" />
              <h2 className="font-fraunces text-3xl sm:text-4xl text-white mb-6">Backed by Green House Agro Products.</h2>
              <p className="text-frost-500 leading-relaxed mb-5 font-inter">Our parent group operates shrimp farming and processing facilities in Nellore, Andhra Pradesh — a coastal region that accounts for a significant portion of India's total shrimp export volume.</p>
              <p className="text-frost-500 leading-relaxed mb-5 font-inter">This integrated structure means we don't rely on spot market purchasing. Our raw material supply is planned, the spec is controlled at farm level, and lot-level traceability is available on every shipment.</p>
              <p className="text-frost-500 leading-relaxed mb-8 font-inter">UK buyers get the benefit of this supply chain integration — sterling pricing, UK contracts, and an account team in the same time zone.</p>
              <Link to="/contact" className="inline-flex items-center gap-2 text-sm text-neon-500 hover:text-neon-600 font-medium font-inter transition-colors" data-testid="about-contact-link">
                Get in touch <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — Certifications */}
      <section className="py-16 border-t border-white/10" data-testid="about-certs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="mb-10">
            <SectionLabel number="04" text="Certifications" />
            <h2 className="font-fraunces text-3xl text-white mb-3">Standards we hold and work towards.</h2>
            <p className="text-frost-500 font-inter max-w-2xl">Our supply chain is built to meet the documentation and certification requirements of UK retail and foodservice buyers.</p>
          </FadeUp>
          <FadeUpGrid className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: "BRC AA", status: "Working towards", icon: Award },
              { name: "BAP Certified", status: "Working towards", icon: Award },
              { name: "HACCP", status: "In place", icon: Award },
              { name: "EU Approved", status: "In place", icon: Award },
              { name: "FSA Registered", status: "In place", icon: Award },
            ].map(cert => (
              <FadeUpItem key={cert.name}>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center" data-testid={`cert-${cert.name.toLowerCase().replace(/ /g, '-')}`}>
                  <Award size={20} className="text-neon-500 mx-auto mb-3" />
                  <p className="font-inter font-semibold text-white text-sm mb-1">{cert.name}</p>
                  <p className="text-xs text-frost-500 font-inter">{cert.status}</p>
                </div>
              </FadeUpItem>
            ))}
          </FadeUpGrid>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-neon-500">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-fraunces text-3xl text-white mb-3">Ready to talk supply?</h2>
          <p className="text-white/80 mb-8 font-inter">Get in touch with our UK account team to discuss volumes, specifications, and sample arrangements.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/request-a-sample" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-frost-900 hover:bg-ink-900 text-white font-medium rounded-md transition-colors font-inter" data-testid="about-request-sample">
              Request a sample <ArrowRight size={14} />
            </Link>
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/40 text-white hover:bg-white/10 font-medium rounded-md transition-colors font-inter">
              Contact us
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
