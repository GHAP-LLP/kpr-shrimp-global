import Link from 'next/link';
import { ArrowRight, Eye, Thermometer, Leaf, Shield, CheckCircle, Clock, Users, Scale } from 'lucide-react';
import { buildMetadata } from '@/lib/metadata';
import { FadeUp, FadeUpGrid, FadeUpItem } from '@/components/FadeUp';
import { BRAND_IMGS } from '@/data/images';

export const metadata = buildMetadata({
  title: 'Sustainability',
  description: "Indo Aquatic's commitment to responsible aquaculture, lot-level traceability, unbroken cold chain, and certification. HACCP in place, BRC and BAP held.",
  path: '/sustainability',
});

const CERT_ROADMAP = [
  { name: "HACCP", desc: "Hazard Analysis Critical Control Point system in place across all processing operations.", status: "active" },
  { name: "BRC Global Standard", desc: "British Retail Consortium Global Standard for Food Safety — held by our processing facilities.", status: "active" },
  { name: "BAP Certified", desc: "Best Aquaculture Practices — third-party audit of farm, hatchery, and processing standards.", status: "active" },
  { name: "ISO 22000", desc: "International food safety management system standard. Held across processing operations.", status: "active" },
  { name: "FSSC 22000", desc: "Food Safety System Certification — built on ISO 22000 with additional sector-specific requirements.", status: "active" },
  { name: "FDA Registered (US)", desc: "Facilities registered with the US Food & Drug Administration for export to the US market.", status: "active" },
  { name: "Halal Certified", desc: "Halal certification held across applicable processing lines and finished products.", status: "active" },
  { name: "EU Approved", desc: "EU establishment approval for export to EU markets — application in progress.", status: "progress" },
  { name: "ASC Certified", desc: "Aquaculture Stewardship Council — environmental and social responsibility standard. Held across our primary supply operations.", status: "active" },
];

const COMMITMENTS = [
  { icon: Eye, title: "Lot-level traceability", desc: "Every shipment carries full provenance documentation — farm lot, processing date, cold chain record, and country of origin. Chain of custody available on request for any SKU." },
  { icon: Thermometer, title: "Unbroken cold chain", desc: "Temperature-controlled from processing facility to UK cold storage. All shipments logged with time-temperature records. No breaks between Andhra Pradesh and your warehouse." },
  { icon: Leaf, title: "Responsible aquaculture", desc: "Our own farms and partner operations hold BAP and ASC certification, subject to ongoing third-party audit. ASC is now in place across our primary supply operations, covering environmental and social responsibility standards." },
  { icon: Shield, title: "Documentation on demand", desc: "Full spec sheets, nutritional data, allergen declarations, HACCP documentation, and country of origin certificates available for every product in our range." },
];

const PRACTICES = [
  { title: "No antibiotic use", desc: "Committed to antibiotic-free production across farmed stock. Verifiable via third-party residue testing." },
  { title: "Feed provenance", desc: "Feed ingredients tracked to certified mills. No use of prohibited species or unapproved additives." },
  { title: "Water management", desc: "Closed pond systems with controlled water exchange. Effluent treatment before discharge." },
  { title: "Worker welfare", desc: "Operations audited for labour standards. No use of forced or child labour across processing facilities." },
  { title: "Waste minimisation", desc: "Prawn heads, shells, and trimmings directed to by-product processing where feasible. Packaging waste targets in place." },
  { title: "Energy efficiency", desc: "Cold chain infrastructure designed to minimise refrigerant use. LED and energy-efficient processing equipment." },
];

// NEEDS REVIEW: generic, defensible commitment language for Indo Aquatic UK Ltd (the importer/distributor) — confirm with a director before publishing. Do not add specific standards/memberships not actually held.
const ETHICAL_COMMITMENTS = [
  { icon: Scale, title: "Fair and lawful trading", desc: "Indo Aquatic conducts business in line with UK trading law and expects the same of every supplier we work with — clear contracts, fair payment terms, and no tolerance for bribery or corruption." },
  { icon: Users, title: "No forced or child labour", desc: "We do not tolerate forced, bonded, or child labour anywhere in our supply chain, and we expect suppliers to uphold the same standard across their own operations." },
  { icon: Shield, title: "Right to review our supply chain", desc: "We reserve the right to request evidence of labour and safety standards from any supplier, and to review or end a supplier relationship where standards are not met." },
  { icon: Eye, title: "Open to scrutiny", desc: "We welcome questions from customers on how our supply chain operates and will respond directly rather than pointing to a certificate alone." },
];

function SectionLabel({ number, text }) {
  return (
    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neon-500 font-inter mb-3">
      {number} · {text}
    </p>
  );
}

export default function SustainabilityPage() {
  const FARM_IMG = BRAND_IMGS.farmFacility;
  const PRACTICES_IMG = BRAND_IMGS.farmAerial;
  const WORKERS_IMG = BRAND_IMGS.processingWorkers;

  return (
    <div className="bg-ice-100 min-h-screen">

      <div className="bg-frost-900 relative py-20 md:py-28 overflow-hidden border-b border-white/10">
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

      <section className="py-16 md:py-24" data-testid="cert-roadmap">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="mb-12">
            <SectionLabel number="01" text="Certification Roadmap" />
            <h2 className="font-fraunces text-3xl sm:text-4xl text-ink-900 mb-3">Standards we hold and are actively pursuing.</h2>
            <p className="text-frost-700 font-inter max-w-2xl">Certification is a process, not a moment. Here is exactly where we stand — and what we are working towards.</p>
          </FadeUp>
          <FadeUpGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CERT_ROADMAP.map(cert => (
              <FadeUpItem key={cert.name}>
                <div className="bg-white border border-ice-300 rounded-xl p-5 h-full shadow-sm" data-testid={`cert-${cert.name.toLowerCase().replace(/ /g, '-')}`}>
                  <div className="flex items-start gap-3 mb-3">
                    {cert.status === 'active' ? (
                      <CheckCircle size={18} className="text-neon-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <Clock size={18} className="text-frost-500 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-inter font-semibold text-ink-900 text-sm">{cert.name}</h3>
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded uppercase tracking-wider ${cert.status === 'active' ? 'bg-neon-500/20 text-neon-500' : 'bg-ice-300 text-frost-700'}`}>
                          {cert.status === 'active' ? 'In place' : 'In progress'}
                        </span>
                      </div>
                      <p className="text-xs text-frost-700 leading-relaxed font-inter">{cert.desc}</p>
                    </div>
                  </div>
                </div>
              </FadeUpItem>
            ))}
          </FadeUpGrid>
        </div>
      </section>

      <section className="py-16 md:py-24 border-t border-ice-300" data-testid="commitments">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="mb-12">
            <SectionLabel number="02" text="Our Commitments" />
            <h2 className="font-fraunces text-3xl sm:text-4xl text-ink-900">What we guarantee on every shipment.</h2>
          </FadeUp>
          <FadeUpGrid className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {COMMITMENTS.map(item => (
              <FadeUpItem key={item.title}>
                <div className="flex items-start gap-4" data-testid={`commitment-${item.title.split(' ')[0].toLowerCase()}`}>
                  <div className="w-10 h-10 bg-white border border-ice-300 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <item.icon size={18} className="text-neon-500" />
                  </div>
                  <div>
                    <h3 className="font-fraunces text-lg text-ink-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-frost-700 leading-relaxed font-inter">{item.desc}</p>
                  </div>
                </div>
              </FadeUpItem>
            ))}
          </FadeUpGrid>
        </div>
      </section>

      <section className="py-16 md:py-24 border-t border-ice-300" data-testid="practices">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionLabel number="03" text="Aquaculture Practices" />
              <h2 className="font-fraunces text-3xl sm:text-4xl text-ink-900 mb-6">Responsible aquaculture at farm level.</h2>
              <p className="text-frost-700 leading-relaxed mb-8 font-inter">We operate our own prawn farms and processing facilities in Kodavalur, Nellore, Andhra Pradesh, alongside partnerships with certified operations in other leading prawn-producing regions. The practices below represent the operating standards we hold across our own facilities and require of our partners, subject to ongoing third-party audit.</p>
              <div className="space-y-4">
                {PRACTICES.map(p => (
                  <div key={p.title} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-500 flex-shrink-0 mt-2" />
                    <div>
                      <span className="text-sm font-semibold text-ink-900 font-inter">{p.title} — </span>
                      <span className="text-sm text-frost-700 font-inter">{p.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl overflow-hidden aspect-[4/3] border border-ice-300 col-span-2">
                  <img src={PRACTICES_IMG} alt="Prawn aquaculture farm ponds, Nellore" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-xl overflow-hidden aspect-[4/3] border border-ice-300">
                  <img src={WORKERS_IMG} alt="Processing facility workers" className="w-full h-full object-cover" />
                </div>
                <div className="bg-white border border-ice-300 rounded-xl p-4 shadow-sm flex flex-col justify-center">
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neon-500 font-inter mb-2">Our farm & plant</p>
                  <h3 className="font-fraunces text-base text-ink-900 mb-2">SS Agro Products</h3>
                  <p className="text-xs text-frost-700 font-inter leading-relaxed">Kodavalur, Nellore, Andhra Pradesh, India. Farming, processing, and cold storage.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEEDS REVIEW: all commitments below describe Indo Aquatic UK Ltd's own trading conduct as importer/distributor — confirm accuracy with a director before publishing. Do not add named standards (ETI Base Code, SEDEX, SSC, GDST, MarinTrust, etc.) or a Modern Slavery Statement claim unless Indo Aquatic has actually adopted/signed them. */}
      <section className="py-16 md:py-24 border-t border-ice-300" data-testid="ethical-sourcing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="mb-12">
            <SectionLabel number="04" text="Ethical Trading" />
            <h2 className="font-fraunces text-3xl sm:text-4xl text-ink-900 mb-3">How we expect our supply chain to operate.</h2>
            <p className="text-frost-700 font-inter max-w-2xl">As the UK importer and distributor, Indo Aquatic is responsible for the conduct of the supply chain we sell into. These are the standards we hold ourselves and our suppliers to.</p>
          </FadeUp>
          <FadeUpGrid className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {ETHICAL_COMMITMENTS.map(item => (
              <FadeUpItem key={item.title}>
                <div className="flex items-start gap-4" data-testid={`ethical-${item.title.split(' ')[0].toLowerCase()}`}>
                  <div className="w-10 h-10 bg-white border border-ice-300 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <item.icon size={18} className="text-neon-500" />
                  </div>
                  <div>
                    <h3 className="font-fraunces text-lg text-ink-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-frost-700 leading-relaxed font-inter">{item.desc}</p>
                  </div>
                </div>
              </FadeUpItem>
            ))}
          </FadeUpGrid>
        </div>
      </section>

      <section className="py-16 border-t border-ice-300" data-testid="documentation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <SectionLabel number="05" text="Documentation" />
            <h2 className="font-fraunces text-3xl text-ink-900 mb-3">Available for every product, every order.</h2>
            <p className="text-frost-700 font-inter max-w-2xl">We don't ask buyers to request documentation weeks in advance. Everything listed below is available as standard, issued with or before shipment.</p>
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
              <div key={doc} className="flex items-center gap-3 bg-white border border-ice-300 rounded-lg px-4 py-3 shadow-sm">
                <CheckCircle size={14} className="text-neon-500 flex-shrink-0" />
                <span className="text-sm text-frost-700 font-inter">{doc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-neon-500">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-fraunces text-3xl text-white mb-3">Request our full certification pack.</h2>
          <p className="text-white/80 mb-8 font-inter">We'll send you the complete documentation set for any product in our range. Procurement, QA, and technical teams only — no marketing materials.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-frost-900 hover:bg-ink-900 text-white font-medium rounded-md transition-colors font-inter" data-testid="sustainability-contact-btn">
              Contact us <ArrowRight size={14} />
            </Link>
            <Link href="/request-a-sample" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/40 text-white hover:bg-white/10 font-medium rounded-md transition-colors font-inter">
              Request a frozen sample
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
