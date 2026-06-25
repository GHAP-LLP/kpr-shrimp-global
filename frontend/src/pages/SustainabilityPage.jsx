import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Shield, Eye, Thermometer, CheckCircle, Clock } from 'lucide-react';

const FARM_IMG = "https://images.unsplash.com/photo-1611119260234-521fc340d9c4?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200";
const FISHING_IMG = "https://images.unsplash.com/photo-1761529729790-b3cdcc25fe24?crop=entropy&cs=srgb&fm=jpg&q=85&w=900";

function SectionLabel({ number, text }) {
  return (
    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neon-500 font-inter mb-3">
      {number} · {text}
    </p>
  );
}

const CERT_ROADMAP = [
  { name: "HACCP", desc: "Hazard Analysis Critical Control Point system in place across processing operations.", status: "active" },
  { name: "EU Approved", desc: "Facilities approved for export to EU markets, confirming hygiene and processing standards.", status: "active" },
  { name: "FSA Registered", desc: "Registered with the UK Food Standards Agency for import and distribution.", status: "active" },
  { name: "BAP Certified", desc: "Best Aquaculture Practices — third-party audit of farm, hatchery, and processing standards.", status: "progress" },
  { name: "BRC AA", desc: "British Retail Consortium Global Standard for Food Safety — highest grade. Priority for retail supply.", status: "progress" },
  { name: "ASC Certified", desc: "Aquaculture Stewardship Council — environmental and social responsibility standard.", status: "progress" },
];

const COMMITMENTS = [
  {
    icon: Eye,
    title: "Lot-level traceability",
    desc: "Every shipment carries full provenance documentation — farm lot, processing date, cold chain record, and country of origin. Chain of custody available on request for any SKU.",
  },
  {
    icon: Thermometer,
    title: "Unbroken cold chain",
    desc: "Temperature-controlled from processing facility to UK bonded storage. All shipments logged with time-temperature records. No breaks between Andhra Pradesh and your warehouse.",
  },
  {
    icon: Leaf,
    title: "Responsible aquaculture",
    desc: "Our parent group's farming operations are subject to ongoing third-party audit. We are actively working towards BAP and ASC certification across all supply lots.",
  },
  {
    icon: Shield,
    title: "Documentation on demand",
    desc: "Full spec sheets, nutritional data, allergen declarations, HACCP documentation, and country of origin certificates available for every product in our range.",
  },
];

const PRACTICES = [
  { title: "No antibiotic use", desc: "Committed to antibiotic-free production across farmed stock. Verifiable via third-party residue testing." },
  { title: "Feed provenance", desc: "Feed ingredients tracked to certified mills. No use of prohibited species or unapproved additives." },
  { title: "Water management", desc: "Closed pond systems with controlled water exchange. Effluent treatment before discharge." },
  { title: "Worker welfare", desc: "Operations audited for labour standards. No use of forced or child labour across processing facilities." },
  { title: "Waste minimisation", desc: "Shrimp heads, shells, and trimmings directed to by-product processing where feasible. Packaging waste targets in place." },
  { title: "Energy efficiency", desc: "Cold chain infrastructure designed to minimise refrigerant use. LED and energy-efficient processing equipment." },
];

export default function SustainabilityPage() {
  return (
    <div className="bg-frost-900 min-h-screen">

      {/* Header */}
      <div className="relative py-20 md:py-28 overflow-hidden border-b border-white/10">
        <img src={FARM_IMG} alt="Aquaculture facility" className="absolute inset-0 w-full h-full object-cover opacity-10" />
        <div className="absolute inset-0 bg-frost-900/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-neon-500 font-inter mb-6">Responsible Sourcing</p>
          <h1 className="font-fraunces text-5xl sm:text-6xl lg:text-7xl text-white font-normal leading-[1.05] mb-6 max-w-4xl" data-testid="sustainability-h1">
            Supply chain integrity, from farm to UK warehouse.
          </h1>
          <p className="text-lg text-frost-500 leading-relaxed max-w-2xl font-inter">
            Sustainability in seafood supply isn't just environmental — it's also about traceability, labour standards, documentation, and the kind of consistency that lets buyers trust what's in their product. We take all of it seriously.
          </p>
        </div>
      </div>

      {/* 01 — Certification roadmap */}
      <section className="py-16 md:py-24" data-testid="cert-roadmap">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <SectionLabel number="01" text="Certification Roadmap" />
            <h2 className="font-fraunces text-3xl sm:text-4xl text-white mb-3">Standards we hold and are actively pursuing.</h2>
            <p className="text-frost-500 font-inter max-w-2xl">Certification is a process, not a moment. Here is exactly where we stand — and what we are working towards.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CERT_ROADMAP.map(cert => (
              <div key={cert.name} className="bg-white/5 border border-white/10 rounded-xl p-5" data-testid={`cert-${cert.name.toLowerCase().replace(/ /g, '-')}`}>
                <div className="flex items-start gap-3 mb-3">
                  {cert.status === 'active' ? (
                    <CheckCircle size={18} className="text-neon-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <Clock size={18} className="text-frost-500 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-inter font-semibold text-white text-sm">{cert.name}</h3>
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded uppercase tracking-wider ${
                        cert.status === 'active'
                          ? 'bg-neon-500/20 text-neon-500'
                          : 'bg-white/10 text-frost-500'
                      }`}>
                        {cert.status === 'active' ? 'In place' : 'In progress'}
                      </span>
                    </div>
                    <p className="text-xs text-frost-500 leading-relaxed font-inter">{cert.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 02 — Our commitments */}
      <section className="py-16 md:py-24 border-t border-white/10" data-testid="commitments">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <SectionLabel number="02" text="Our Commitments" />
            <h2 className="font-fraunces text-3xl sm:text-4xl text-white">What we guarantee on every shipment.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {COMMITMENTS.map(item => (
              <div key={item.title} className="flex items-start gap-4" data-testid={`commitment-${item.title.split(' ')[0].toLowerCase()}`}>
                <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <item.icon size={18} className="text-neon-500" />
                </div>
                <div>
                  <h3 className="font-fraunces text-lg text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-frost-500 leading-relaxed font-inter">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — Responsible practices */}
      <section className="py-16 md:py-24 border-t border-white/10" data-testid="practices">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionLabel number="03" text="Aquaculture Practices" />
              <h2 className="font-fraunces text-3xl sm:text-4xl text-white mb-6">Responsible aquaculture at farm level.</h2>
              <p className="text-frost-500 leading-relaxed mb-8 font-inter">Our parent group, Green House Agro Products, operates shrimp farming and processing in Nellore, Andhra Pradesh — a region with a long history of commercial aquaculture. The practices below represent our current operating standards, subject to ongoing third-party audit.</p>
              <div className="space-y-4">
                {PRACTICES.map(p => (
                  <div key={p.title} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-500 flex-shrink-0 mt-2" />
                    <div>
                      <span className="text-sm font-semibold text-white font-inter">{p.title} — </span>
                      <span className="text-sm text-frost-500 font-inter">{p.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden aspect-[4/3] border border-white/10">
                <img src={FISHING_IMG} alt="Fishermen at aquaculture facility" className="w-full h-full object-cover opacity-75" />
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neon-500 font-inter mb-3">Parent operation</p>
                <h3 className="font-fraunces text-lg text-white mb-2">Green House Agro Products</h3>
                <p className="text-sm text-frost-500 font-inter leading-relaxed">Nellore, Andhra Pradesh, India. Farming, processing, and cold storage operations. Supply integrated with KPR Shrimp Global UK for direct supply chain access.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — Documentation */}
      <section className="py-16 border-t border-white/10" data-testid="documentation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <SectionLabel number="04" text="Documentation" />
            <h2 className="font-fraunces text-3xl text-white mb-3">Available for every product, every order.</h2>
            <p className="text-frost-500 font-inter max-w-2xl">We don't ask buyers to request documentation weeks in advance. Everything listed below is available as standard, issued with or before shipment.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              "Full technical spec sheet per SKU",
              "Nutritional information (per 100g)",
              "Allergen declaration",
              "HACCP process documentation",
              "Country of origin certificate",
              "Health certificate (EU-equivalent)",
              "Cold chain temperature record",
              "Lot-level traceability reference",
              "Packaging and labelling spec",
            ].map(doc => (
              <div key={doc} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-3">
                <CheckCircle size={14} className="text-neon-500 flex-shrink-0" />
                <span className="text-sm text-frost-500 font-inter">{doc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-neon-500">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-fraunces text-3xl text-white mb-3">Request our full certification pack.</h2>
          <p className="text-white/80 mb-8 font-inter">We'll send you the complete documentation set for any product in our range. Procurement, QA, and technical teams only — no marketing materials.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-frost-900 hover:bg-ink-900 text-white font-medium rounded-md transition-colors font-inter" data-testid="sustainability-contact-btn">
              Contact us <ArrowRight size={14} />
            </Link>
            <Link to="/request-a-sample" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/40 text-white hover:bg-white/10 font-medium rounded-md transition-colors font-inter">
              Request a sample
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
