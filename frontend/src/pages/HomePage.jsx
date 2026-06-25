import { Link } from 'react-router-dom';
import { ArrowRight, Award, CheckCircle, MapPin, TrendingUp } from 'lucide-react';
import { productCategories } from '@/data/products';
import { sectors } from '@/data/sectors';

const HERO_IMAGE = "https://images.unsplash.com/photo-1756364084889-9a8d9ece6112?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920";
const FARM_IMAGE = "https://images.unsplash.com/photo-1611119260234-521fc340d9c4?crop=entropy&cs=srgb&fm=jpg&q=85&w=900";

const TRUST_ITEMS = ["BAP certification (working towards)", "ASC certification (working towards)", "BRC Global Standard (working towards)", "HACCP compliant", "UK-based entity"];

const WHY_ITEMS = [
  { icon: Award, title: "Single-category focus", description: "Every product, every decision, every relationship is built around shrimp. Not frozen food broadly — shrimp." },
  { icon: CheckCircle, title: "Specification consistency", description: "Same count, same yield, same colour across every batch. Built-in spec management from farm to carton." },
  { icon: TrendingUp, title: "Range depth", description: "HOSO to ready-to-cook. U/15 to 61/70. IQF or block. All from one supplier, one spec relationship." },
  { icon: MapPin, title: "UK-based operations", description: "Sterling pricing, UK contracts, UK invoicing. A UK account manager who picks up the phone." },
];

const STATS = [
  { value: "11+", label: "Product variants" },
  { value: "8", label: "Count sizes" },
  { value: "4", label: "Sectors served" },
  { value: "24mo", label: "Shelf life" },
];

function HeroSection() {
  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-frost-900" data-testid="hero-section">
      <div className="absolute inset-0">
        <img src={HERO_IMAGE} alt="Frozen raw shrimp on ice, UK wholesale supply" className="w-full h-full object-cover" style={{ opacity: 0.12 }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #1E293B 40%, rgba(30,41,59,0.85) 100%)' }} />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-12 bg-neon-500 rounded-full" />
            <p className="text-xs uppercase tracking-[0.2em] text-frost-500 font-medium font-inter">UK B2B shrimp specialist</p>
          </div>
          <h1 className="font-fraunces text-5xl sm:text-6xl lg:text-7xl text-white font-normal leading-[1.05] mb-6" data-testid="hero-h1">
            The UK's specialist shrimp supplier.
          </h1>
          <p className="text-lg text-white/70 leading-relaxed mb-10 max-w-xl font-inter">
            Frozen and ready-to-cook shrimp, supplied direct. Sterling pricing, UK contracts, and dedicated UK account management backed by an established Indian aquaculture operation.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/request-a-sample" className="inline-flex items-center gap-2 px-6 py-3.5 bg-neon-500 hover:bg-neon-600 text-white font-medium rounded-md transition-colors font-inter" data-testid="hero-cta-sample">
              Request a sample <ArrowRight size={16} />
            </Link>
            <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/30 text-white hover:bg-white/10 font-medium rounded-md transition-colors font-inter" data-testid="hero-cta-products">
              View products
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-10 mt-10 border-t border-white/10">
            {STATS.map(stat => (
              <div key={stat.label}>
                <div className="font-fraunces text-3xl text-white">{stat.value}</div>
                <div className="text-xs text-frost-500 mt-1 font-inter">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  return (
    <section className="bg-ice-300 border-b border-frost-500/20 py-4" data-testid="trust-bar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
          <span className="text-xs uppercase tracking-widest text-frost-700 font-semibold whitespace-nowrap font-inter">Working towards:</span>
          {TRUST_ITEMS.map(item => (
            <span key={item} className="flex items-center gap-1.5 text-xs text-frost-700 whitespace-nowrap font-inter">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-500 flex-shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductRangeSection() {
  return (
    <section className="py-16 md:py-24 bg-ice-100" data-testid="product-range-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs uppercase tracking-widest text-neon-500 font-semibold mb-2 font-inter">Product range</p>
            <h2 className="font-fraunces text-3xl sm:text-4xl text-ink-900">Every format. One supplier.</h2>
          </div>
          <Link to="/products" className="flex items-center gap-2 text-sm text-frost-700 hover:text-neon-500 font-medium transition-colors whitespace-nowrap font-inter">
            View all products <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {productCategories.map(category => (
            <Link key={category.id} to={`/products/${category.slug}`}
              className="group bg-white border border-ice-300 rounded-xl overflow-hidden hover:-translate-y-1 hover:border-frost-500 hover:shadow-md transition-all duration-200"
              data-testid={`product-card-${category.slug}`}>
              <div className="aspect-[4/3] overflow-hidden">
                <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-fraunces text-lg text-ink-900">{category.name}</h3>
                  <span className="text-xs bg-ice-100 text-frost-700 px-2 py-0.5 rounded-full font-mono">{category.variantCount} variants</span>
                </div>
                <p className="text-sm text-frost-700 leading-relaxed mb-3 font-inter">{category.tagline}</p>
                <span className="flex items-center gap-1 text-neon-500 text-sm font-medium font-inter">
                  View range <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectorsSection() {
  return (
    <section className="py-16 md:py-24 bg-white" data-testid="sectors-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-neon-500 font-semibold mb-2 font-inter">Sectors we serve</p>
          <h2 className="font-fraunces text-3xl sm:text-4xl text-ink-900">Built for the UK food trade.</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {sectors.map(sector => (
            <Link key={sector.id} to={`/sectors/${sector.slug}`}
              className="group relative bg-frost-900 rounded-xl overflow-hidden flex flex-col justify-end"
              style={{ minHeight: '320px' }}
              data-testid={`sector-card-${sector.slug}`}>
              <img src={sector.image} alt={sector.name} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-frost-900 via-frost-900/40 to-transparent" />
              <div className="relative z-10 p-5">
                <h3 className="font-fraunces text-lg text-white mb-1">{sector.name}</h3>
                <p className="text-xs text-white/60 leading-relaxed mb-3 font-inter">{sector.tagline}</p>
                <span className="inline-flex items-center gap-1 text-neon-500 text-xs font-medium font-inter">
                  Learn more <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhySpecialistSection() {
  return (
    <section className="py-16 md:py-24 bg-ice-100" data-testid="why-specialist-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-xs uppercase tracking-widest text-neon-500 font-semibold mb-2 font-inter">Why specialist matters</p>
          <h2 className="font-fraunces text-3xl sm:text-4xl text-ink-900 mb-4">The difference a category specialist makes.</h2>
          <p className="text-frost-700 leading-relaxed font-inter">Generalist distributors stock shrimp alongside hundreds of other products. We stock only shrimp. That single focus changes everything — from specification management to category knowledge to service depth.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WHY_ITEMS.map(item => (
            <div key={item.title} className="bg-white border border-ice-300 rounded-xl p-6 hover:border-frost-500 hover:-translate-y-1 hover:shadow-sm transition-all duration-200" data-testid={`why-item-${item.title.toLowerCase().replace(/ /g, '-')}`}>
              <item.icon size={22} className="text-neon-500 mb-4" />
              <h3 className="font-fraunces text-lg text-ink-900 mb-2">{item.title}</h3>
              <p className="text-sm text-frost-700 leading-relaxed font-inter">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SourcingSection() {
  return (
    <section className="py-16 md:py-24 bg-frost-900 overflow-hidden" data-testid="sourcing-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs uppercase tracking-widest text-neon-500 font-semibold mb-4 font-inter">Our sourcing</p>
            <h2 className="font-fraunces text-3xl sm:text-4xl text-white mb-6">Backed by Green House Agro Products, Nellore, Andhra Pradesh.</h2>
            <p className="text-frost-500 leading-relaxed mb-5 font-inter">KPR Shrimp Global is the UK trading entity of Green House Agro Products — an established aquaculture and processing operation in Nellore, Andhra Pradesh, one of India's primary shrimp-producing regions.</p>
            <p className="text-frost-500 leading-relaxed mb-8 font-inter">The UK entity provides British buyers with sterling-denominated pricing, UK contracts, UK-based account management, and simplified procurement — backed by the supply chain depth and category expertise of the Indian operation.</p>
            <div className="grid grid-cols-2 gap-6">
              <div className="border-l-2 border-neon-500 pl-4">
                <div className="font-fraunces text-2xl text-white">Nellore</div>
                <div className="text-xs text-frost-500 mt-1 font-inter">Andhra Pradesh, India</div>
              </div>
              <div className="border-l-2 border-neon-500 pl-4">
                <div className="font-fraunces text-2xl text-white">UK-based</div>
                <div className="text-xs text-frost-500 mt-1 font-inter">Contracts & account management</div>
              </div>
            </div>
          </div>
          <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
            <img src={FARM_IMAGE} alt="Shrimp aquaculture facility, Andhra Pradesh, India" className="w-full h-full object-cover opacity-75" />
            <div className="absolute inset-0 bg-gradient-to-t from-frost-900/60 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

function LeadCaptureSection() {
  return (
    <section className="py-16 md:py-24 bg-ice-100" data-testid="lead-capture-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-ice-300 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-lg">
            <h2 className="font-fraunces text-2xl sm:text-3xl text-ink-900 mb-3">Ready to discuss supply?</h2>
            <p className="text-frost-700 leading-relaxed font-inter">Request a sample to assess quality and specification fit, or contact us directly to discuss volume requirements and pricing.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link to="/request-a-sample" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-neon-500 hover:bg-neon-600 text-white font-medium rounded-md transition-colors font-inter" data-testid="cta-request-sample">
              Request a sample
            </Link>
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border-2 border-frost-900 text-frost-900 hover:bg-frost-900 hover:text-white font-medium rounded-md transition-colors font-inter" data-testid="cta-contact">
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <ProductRangeSection />
      <SectorsSection />
      <WhySpecialistSection />
      <SourcingSection />
      <LeadCaptureSection />
    </>
  );
}
