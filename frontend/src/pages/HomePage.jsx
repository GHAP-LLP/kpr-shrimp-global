import { Link } from 'react-router-dom';
import { ArrowRight, Snowflake, Flame, UtensilsCrossed, ShoppingBag, ChefHat, Truck, Factory, Target, MapPin, Users } from 'lucide-react';

// ─── Reusable section label ───────────────────────────────────────────────────
function SectionLabel({ number, text }) {
  return (
    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neon-500 font-inter mb-3">
      {number} · {text}
    </p>
  );
}

// ─── 01 Hero ──────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="bg-frost-900 py-20 md:py-28" data-testid="hero-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-neon-500 font-inter mb-6" data-testid="hero-eyebrow">
            Specialist Shrimp · UK Supply
          </p>
          <h1 className="font-fraunces text-5xl sm:text-6xl lg:text-7xl text-white font-normal leading-[1.05] mb-6" data-testid="hero-h1">
            The UK's specialist shrimp supplier. Frozen, cooked, and ready-to-cook.
          </h1>
          <p className="text-lg text-frost-500 leading-relaxed mb-10 max-w-2xl font-inter">
            Single-category focus, full range. Supplying retailers, foodservice operators, and food manufacturers across the UK — with the spec consistency that comes from doing one thing well.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/request-a-sample"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-neon-500 hover:bg-neon-600 text-white font-medium rounded-md transition-colors font-inter"
              data-testid="hero-cta-sample">
              Request a sample
            </Link>
            <Link to="/products"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-frost-500 text-white hover:border-white hover:bg-white/5 font-medium rounded-md transition-colors font-inter"
              data-testid="hero-cta-catalogue">
              Download catalogue
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Trust bar ────────────────────────────────────────────────────────────────
const TRUST_LABELS = ["BRC AA", "BAP Certified", "HACCP", "EU Approved", "FSA Registered"];

function TrustBar() {
  return (
    <section className="bg-white border-b border-ice-300 py-5" data-testid="trust-bar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          {TRUST_LABELS.map((label, i) => (
            <span key={label} className="flex items-center gap-8 text-[11px] uppercase tracking-[0.18em] font-semibold text-frost-700 font-inter">
              {i > 0 && <span className="w-1 h-1 rounded-full bg-frost-500 hidden sm:block" />}
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 01 Product Range ─────────────────────────────────────────────────────────
const PRODUCT_CARDS = [
  {
    icon: Snowflake, name: "Frozen raw", to: "/products/frozen-raw-shrimp",
    desc: "HOSO, HLSO, PD, PUD, EZ-peel. Counts from U/15 to 61/70.",
  },
  {
    icon: Flame, name: "IQF cooked", to: "/products/cooked-shrimp",
    desc: "Cooked peeled and shell-on. Salad-ready, retail-ready.",
  },
  {
    icon: UtensilsCrossed, name: "Ready-to-cook", to: "/products/ready-to-cook",
    desc: "Breaded, tempura, marinated skewers. Branded or private label.",
  },
];

function ProductRangeSection() {
  return (
    <section className="py-16 md:py-24 bg-white" data-testid="product-range-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <SectionLabel number="01" text="Product Range" />
            <h2 className="font-fraunces text-3xl sm:text-4xl text-ink-900">Three formats. One specialist.</h2>
          </div>
          <Link to="/products" className="flex items-center gap-2 text-sm text-frost-700 hover:text-neon-500 font-medium transition-colors whitespace-nowrap font-inter">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {PRODUCT_CARDS.map(card => (
            <Link key={card.name} to={card.to}
              className="group bg-ice-100 border border-ice-300 rounded-xl p-7 hover:border-frost-500 hover:bg-white hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200"
              data-testid={`product-card-${card.name.toLowerCase().replace(/ /g, '-')}`}>
              <div className="mb-4 text-frost-500 group-hover:text-neon-500 transition-colors">
                <card.icon size={28} />
              </div>
              <h3 className="font-fraunces text-xl text-ink-900 mb-2">{card.name}</h3>
              <p className="text-sm text-frost-700 leading-relaxed font-inter">{card.desc}</p>
              <div className="mt-5 flex items-center gap-1 text-neon-500 text-xs font-semibold font-inter uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                View range <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 02 Who We Serve ──────────────────────────────────────────────────────────
const SECTOR_CARDS = [
  { icon: ShoppingBag, name: "Retail", desc: "Private label and branded packs.", to: "/sectors/retail-private-label" },
  { icon: ChefHat, name: "Foodservice", desc: "HORECA, chains, contract caterers.", to: "/sectors/foodservice-horeca" },
  { icon: Truck, name: "Wholesale", desc: "Frozen distributors and importers.", to: "/sectors/wholesale-distributors" },
  { icon: Factory, name: "Manufacturers", desc: "Bulk ingredient supply at scale.", to: "/sectors/food-manufacturers" },
];

function SectorsSection() {
  return (
    <section className="py-16 md:py-24 bg-ice-100" data-testid="sectors-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <SectionLabel number="02" text="Who We Serve" />
          <h2 className="font-fraunces text-3xl sm:text-4xl text-ink-900">Built for serious UK buyers.</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {SECTOR_CARDS.map(card => (
            <Link key={card.name} to={card.to}
              className="group bg-white border border-ice-300 rounded-xl p-5 hover:border-frost-500 hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200"
              data-testid={`sector-card-${card.name.toLowerCase()}`}>
              <div className="mb-3 text-frost-500 group-hover:text-neon-500 transition-colors">
                <card.icon size={22} />
              </div>
              <h3 className="font-fraunces text-base text-ink-900 mb-1">{card.name}</h3>
              <p className="text-xs text-frost-700 leading-relaxed font-inter">{card.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 03 Why Specialist Matters ────────────────────────────────────────────────
const WHY_POINTS = [
  { icon: Target, title: "Spec consistency, batch to batch", desc: "Tight count tolerances, glaze, and uniformity across every order." },
  { icon: Snowflake, title: "UK cold-chain partners", desc: "Bonded storage in Felixstowe and Tilbury, nationwide delivery." },
  { icon: MapPin, title: "Traceability to farm", desc: "Lot-level provenance on every shipment. Full chain of custody." },
  { icon: Users, title: "UK-based account team", desc: "Sterling pricing, UK contracts, GMT response." },
];

function WhySpecialistSection() {
  return (
    <section className="py-16 md:py-24 bg-white" data-testid="why-specialist-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <SectionLabel number="03" text="Why Specialist Matters" />
          <h2 className="font-fraunces text-3xl sm:text-4xl text-ink-900">Generalists carry shrimp. We are shrimp.</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {WHY_POINTS.map(point => (
            <div key={point.title} className="flex items-start gap-4" data-testid={`why-${point.title.split(',')[0].toLowerCase().replace(/ /g, '-')}`}>
              <div className="w-9 h-9 bg-ice-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <point.icon size={16} className="text-neon-500" />
              </div>
              <div>
                <h3 className="font-fraunces text-lg text-ink-900 mb-1">{point.title}</h3>
                <p className="text-sm text-frost-700 leading-relaxed font-inter">{point.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 04 Sizing & Specifications ───────────────────────────────────────────────
const SIZING_DATA = [
  { label: "Count", value: "16/20" },
  { label: "Pieces/kg", value: "35–44" },
  { label: "Glaze", value: "10–20%" },
  { label: "Pack", value: "10×1 kg" },
];

function SizingSection() {
  return (
    <section className="py-16 md:py-20 bg-ice-100" data-testid="sizing-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <SectionLabel number="04" text="Sizing & Specifications" />
          <h2 className="font-fraunces text-3xl sm:text-4xl text-ink-900">Speak the buyer's language.</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {SIZING_DATA.map(item => (
            <div key={item.label} className="bg-white border border-ice-300 rounded-xl p-5" data-testid={`sizing-${item.label.toLowerCase()}`}>
              <div className="text-xs font-mono uppercase tracking-widest text-frost-500 mb-2">{item.label}</div>
              <div className="font-fraunces text-3xl text-ink-900">{item.value}</div>
            </div>
          ))}
        </div>
        <Link to="/products"
          className="inline-flex items-center gap-2 px-5 py-3 bg-frost-900 hover:bg-ink-900 text-white text-sm font-medium rounded-md transition-colors font-inter"
          data-testid="sizing-guide-btn">
          Download full sizing guide
        </Link>
      </div>
    </section>
  );
}

// ─── 05 Sourcing ──────────────────────────────────────────────────────────────
const FARM_IMAGE = "https://images.unsplash.com/photo-1611119260234-521fc340d9c4?crop=entropy&cs=srgb&fm=jpg&q=85&w=800";

function SourcingSection() {
  return (
    <section className="py-16 md:py-24 bg-white" data-testid="sourcing-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionLabel number="05" text="Sourcing" />
            <h2 className="font-fraunces text-3xl sm:text-4xl text-ink-900 mb-6">Backed by three decades of aquaculture expertise.</h2>
            <p className="text-frost-700 leading-relaxed mb-5 font-inter">Our sourcing is anchored by our parent group's established farming and processing operations — giving us direct supply lines, full traceability, and volume reliability most importers can't match.</p>
            <p className="text-frost-700 leading-relaxed mb-8 font-inter">Green House Agro Products, Nellore, Andhra Pradesh. The UK entity provides British buyers with sterling pricing, UK contracts, and a dedicated account team.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 text-sm text-neon-500 hover:text-neon-600 font-medium font-inter transition-colors" data-testid="sourcing-link">
              Read our story <ArrowRight size={14} />
            </Link>
          </div>
          <div className="rounded-2xl overflow-hidden aspect-[4/3] border border-ice-300">
            <img src={FARM_IMAGE} alt="Shrimp aquaculture facility, Andhra Pradesh, India" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Lead Capture (orange bg) ─────────────────────────────────────────────────
function LeadCaptureSection() {
  return (
    <section className="py-16 md:py-20 bg-neon-500" data-testid="lead-capture-section">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-fraunces text-3xl sm:text-4xl text-white mb-3">Get a sample on your bench.</h2>
        <p className="text-white/80 mb-8 font-inter">Tell us your sector, volume, and the spec you're benchmarking. We'll ship samples within 5 working days.</p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <input type="email" placeholder="work email"
            className="flex-1 px-4 py-3.5 rounded-md bg-white text-ink-900 placeholder-frost-500 text-sm font-inter focus:outline-none focus:ring-2 focus:ring-frost-900 border-0"
            data-testid="lead-email-input" />
          <Link to="/request-a-sample"
            className="inline-flex items-center justify-center px-6 py-3.5 bg-frost-900 hover:bg-ink-900 text-white font-medium rounded-md transition-colors font-inter whitespace-nowrap"
            data-testid="lead-request-btn">
            Request sample
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <ProductRangeSection />
      <SectorsSection />
      <WhySpecialistSection />
      <SizingSection />
      <SourcingSection />
      <LeadCaptureSection />
    </>
  );
}
