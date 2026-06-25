import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowRight, CheckCircle, Download, Shield, Leaf, Package, ClipboardList } from 'lucide-react';
import { productCategories } from '@/data/products';
import SEO from '@/components/SEO';
import { FadeUp, FadeUpGrid, FadeUpItem } from '@/components/FadeUp';

// ─── Data ──────────────────────────────────────────────────────────────────────

const COMPLIANCE_DOCS = [
  {
    id: 'allergen-all',
    name: 'Allergen Declaration — Full Range',
    type: 'Compliance',
    desc: 'Allergen status for all 11 variants. Covers the 14 major EU/UK allergens. Issued per lot on request.',
    icon: Shield,
  },
  {
    id: 'nutritional-frozen-raw',
    name: 'Nutritional Information — Frozen Raw',
    type: 'Compliance',
    desc: 'Per-100g nutritional values for all Frozen Raw Shrimp variants. Energy, protein, fat, carbohydrate breakdown.',
    icon: ClipboardList,
  },
  {
    id: 'nutritional-cooked',
    name: 'Nutritional Information — Cooked Shrimp',
    type: 'Compliance',
    desc: 'Per-100g nutritional values for IQF Cooked PD and IQF Cooked HLSO.',
    icon: ClipboardList,
  },
  {
    id: 'nutritional-rtc',
    name: 'Nutritional Information — Ready-to-Cook',
    type: 'Compliance',
    desc: 'Nutritional breakdown for Tempura, Breaded, Marinated, and Skewers. Includes batter and marinade contributions.',
    icon: ClipboardList,
  },
  {
    id: 'ingredient-rtc',
    name: 'Ingredient Declarations — Ready-to-Cook Range',
    type: 'Compliance',
    desc: 'Full ingredient lists for all value-added products. Includes sub-ingredient breakdown for coatings and marinades.',
    icon: FileText,
  },
  {
    id: 'coo-certificate',
    name: 'Country of Origin Certificate',
    type: 'Compliance',
    desc: 'Certificate of origin: India (Andhra Pradesh). Issued per shipment lot. Available as template on request.',
    icon: FileText,
  },
];

const QUALITY_DOCS = [
  {
    id: 'haccp-summary',
    name: 'HACCP Process Summary',
    type: 'Quality',
    desc: 'High-level HACCP documentation covering critical control points across farming, processing, and cold chain. Full HACCP plan available under NDA.',
    icon: Shield,
  },
  {
    id: 'eu-approval',
    name: 'EU Approval Documentation',
    type: 'Quality',
    desc: 'Processing facility EU approval reference. Confirms compliance with Regulation (EC) No 853/2004 hygiene requirements.',
    icon: Shield,
  },
  {
    id: 'fsa-registration',
    name: 'FSA Registration Certificate',
    type: 'Quality',
    desc: 'UK Food Standards Agency registration for import and distribution operations.',
    icon: Shield,
  },
  {
    id: 'cold-chain-protocol',
    name: 'Cold Chain Temperature Protocol',
    type: 'Quality',
    desc: 'Standard operating procedure for temperature monitoring from processing to UK delivery. Continuous temperature log provided per shipment.',
    icon: ClipboardList,
  },
  {
    id: 'traceability-guide',
    name: 'Lot-Level Traceability Guide',
    type: 'Quality',
    desc: 'Explains our traceability system from farm lot to UK shipment. Each lot reference links back to harvest date, pond, and processing batch.',
    icon: FileText,
  },
  {
    id: 'packaging-spec',
    name: 'Packaging Specifications',
    type: 'Quality',
    desc: 'Master carton dimensions, labelling requirements, pallet configuration, and retail-ready packaging options for all SKUs.',
    icon: Package,
  },
];

const RANGE_DOCS = [
  {
    id: 'range-frozen-raw',
    name: 'Frozen Raw Shrimp — Range Overview',
    type: 'Product Range',
    desc: 'Overview of all 5 Frozen Raw variants (HOSO, HLSO, PD, PUD, EZ-peel) with count sizes, pack formats, and key spec highlights on a single sheet.',
    icon: FileText,
  },
  {
    id: 'range-cooked',
    name: 'Cooked Shrimp — Range Overview',
    type: 'Product Range',
    desc: 'Overview of IQF Cooked PD and IQF Cooked HLSO with application recommendations and pack format options.',
    icon: FileText,
  },
  {
    id: 'range-rtc',
    name: 'Ready-to-Cook — Range Overview',
    type: 'Product Range',
    desc: 'Overview of Tempura, Breaded, Marinated, and Skewer formats. Includes cooking instructions, portion weights, and available retail vs foodservice packs.',
    icon: FileText,
  },
  {
    id: 'count-size-guide',
    name: 'Count Size Reference Guide',
    type: 'Product Range',
    desc: 'Full count size chart from U/15 (Super Colossal) to 61/70 (Small) with pieces-per-kg, nomenclature, and typical application guide.',
    icon: FileText,
  },
];

const TYPE_COLOURS = {
  'Spec Sheet': 'bg-neon-500/20 text-neon-500',
  'Product Range': 'bg-blue-500/20 text-blue-400',
  'Compliance': 'bg-yellow-500/20 text-yellow-400',
  'Quality': 'bg-emerald-500/20 text-emerald-400',
};

// ─── Document card ─────────────────────────────────────────────────────────────

function DocCard({ doc, requested, onRequest }) {
  const Icon = doc.icon || FileText;
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col gap-3 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-200" data-testid={`doc-card-${doc.id}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="w-9 h-9 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
            <Icon size={16} className="text-neon-500" />
          </div>
          <div className="min-w-0">
            <span className={`inline-block text-[10px] font-mono px-1.5 py-0.5 rounded uppercase tracking-wider mb-1.5 ${TYPE_COLOURS[doc.type] || 'bg-white/10 text-frost-500'}`}>
              {doc.type}
            </span>
            <h3 className="font-inter font-semibold text-white text-sm leading-snug">{doc.name}</h3>
          </div>
        </div>
      </div>
      <p className="text-xs text-frost-500 leading-relaxed font-inter pl-12">{doc.desc}</p>
      <div className="pl-12">
        {requested ? (
          <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-inter font-medium" data-testid={`requested-${doc.id}`}>
            <CheckCircle size={13} /> Requested — we'll be in touch
          </span>
        ) : (
          <button
            onClick={() => onRequest(doc.id)}
            className="inline-flex items-center gap-1.5 text-xs text-neon-500 hover:text-neon-600 font-inter font-medium transition-colors"
            data-testid={`request-btn-${doc.id}`}
          >
            <Download size={13} /> Request document
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Section header ────────────────────────────────────────────────────────────

function SectionLabel({ number, text }) {
  return (
    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neon-500 font-inter mb-3">
      {number} · {text}
    </p>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ResourcesPage() {
  const [requested, setRequested] = useState(new Set());
  const [emailForm, setEmailForm] = useState({ email: '', submitted: false });

  const handleRequest = (id) => {
    setRequested(prev => new Set([...prev, id]));
  };

  const handlePackRequest = (e) => {
    e.preventDefault();
    setEmailForm(prev => ({ ...prev, submitted: true }));
  };

  // Build per-variant spec sheet docs from products data
  const specSheetDocs = productCategories.flatMap(cat =>
    cat.variants.map(v => ({
      id: `spec-${v.id}`,
      name: `${v.fullName} — Technical Spec Sheet`,
      type: 'Spec Sheet',
      desc: `Species, processing form, available count sizes, glaze options, pack formats, shelf life, and origin. Issued per lot on request.`,
      icon: FileText,
      to: `/products/${cat.slug}/${v.slug}`,
    }))
  );

  return (
    <div className="bg-frost-900 min-h-screen">

      {/* Header */}
      <div className="py-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neon-500 font-inter mb-3">KPR Shrimp Global</p>
          <h1 className="font-fraunces text-4xl sm:text-5xl text-white mb-3" data-testid="resources-h1">Resources & Documents</h1>
          <p className="text-frost-500 max-w-2xl font-inter text-lg">Technical specification sheets, compliance documents, allergen declarations, and quality certifications for the full KPR Shrimp Global range.</p>
          <p className="text-frost-500/60 font-inter text-sm mt-3">Click <span className="text-neon-500">Request document</span> on any item and we'll send it to you within one working day. Or request the full pack below.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

        {/* 01 — Product Spec Sheets */}
        <section data-testid="spec-sheets-section">
          <SEO
            title="Resources & Documents"
            description="Download technical spec sheets, allergen declarations, nutritional information, and quality certifications for the full KPR Shrimp Global range."
            path="/resources"
          />
          <FadeUp className="mb-8">
            <SectionLabel number="01" text="Product Specification Sheets" />
            <h2 className="font-fraunces text-2xl sm:text-3xl text-white mb-2">Individual variant spec sheets</h2>
            <p className="text-frost-500 font-inter text-sm max-w-2xl">Full technical specification for each of our 11 variants — species, process form, count sizes, glaze, pack formats, shelf life, and origin. You can also <span className="text-white">view the live spec</span> for any product on its detail page.</p>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {specSheetDocs.map(doc => (
              <div key={doc.id} className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col gap-3 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-200" data-testid={`doc-card-${doc.id}`}>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FileText size={16} className="text-neon-500" />
                  </div>
                  <div className="min-w-0">
                    <span className={`inline-block text-[10px] font-mono px-1.5 py-0.5 rounded uppercase tracking-wider mb-1.5 ${TYPE_COLOURS['Spec Sheet']}`}>
                      Spec Sheet
                    </span>
                    <h3 className="font-inter font-semibold text-white text-sm leading-snug">{doc.name}</h3>
                  </div>
                </div>
                <p className="text-xs text-frost-500 leading-relaxed font-inter pl-12">{doc.desc}</p>
                <div className="pl-12 flex items-center gap-4">
                  {requested.has(doc.id) ? (
                    <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-inter font-medium" data-testid={`requested-${doc.id}`}>
                      <CheckCircle size={13} /> Requested
                    </span>
                  ) : (
                    <button
                      onClick={() => handleRequest(doc.id)}
                      className="inline-flex items-center gap-1.5 text-xs text-neon-500 hover:text-neon-600 font-inter font-medium transition-colors"
                      data-testid={`request-btn-${doc.id}`}
                    >
                      <Download size={13} /> Request
                    </button>
                  )}
                  <Link to={doc.to} className="inline-flex items-center gap-1 text-xs text-frost-500 hover:text-white transition-colors font-inter">
                    View live spec <ArrowRight size={11} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 02 — Range Overview Sheets */}
        <section data-testid="range-docs-section">
          <FadeUp className="mb-8">
            <SectionLabel number="02" text="Range Overview Sheets" />
            <h2 className="font-fraunces text-2xl sm:text-3xl text-white mb-2">Category-level overviews</h2>
            <p className="text-frost-500 font-inter text-sm max-w-2xl">Single-page overviews covering an entire product category. Suitable for buyer briefings, category reviews, and initial supplier assessment.</p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {RANGE_DOCS.map(doc => (
                <DocCard key={doc.id} doc={doc} requested={requested.has(doc.id)} onRequest={handleRequest} />
              ))}
            </div>
          </FadeUp>
        </section>

        {/* 03 — Compliance & Allergen */}
        <section data-testid="compliance-docs-section">
          <FadeUp className="mb-8">
            <SectionLabel number="03" text="Compliance & Allergen" />
            <h2 className="font-fraunces text-2xl sm:text-3xl text-white mb-2">Allergen, nutritional & ingredient docs</h2>
            <p className="text-frost-500 font-inter text-sm max-w-2xl">Required documentation for retail listing, food manufacturing use, and foodservice QA teams. All documents issued to current UK food labelling regulations.</p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {COMPLIANCE_DOCS.map(doc => (
                <DocCard key={doc.id} doc={doc} requested={requested.has(doc.id)} onRequest={handleRequest} />
              ))}
            </div>
          </FadeUp>
        </section>

        {/* 04 — Quality & Certifications */}
        <section data-testid="quality-docs-section">
          <FadeUp className="mb-8">
            <SectionLabel number="04" text="Quality & Certifications" />
            <h2 className="font-fraunces text-2xl sm:text-3xl text-white mb-2">HACCP, certifications & traceability</h2>
            <p className="text-frost-500 font-inter text-sm max-w-2xl">Quality management documentation, current certification references, and traceability system guides. Full HACCP plan and audit reports available under NDA for qualified buyers.</p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {QUALITY_DOCS.map(doc => (
                <DocCard key={doc.id} doc={doc} requested={requested.has(doc.id)} onRequest={handleRequest} />
              ))}
            </div>
          </FadeUp>
        </section>

        {/* Request full pack */}
        <section className="border-t border-white/10 pt-12" data-testid="full-pack-section">
          <FadeUp className="max-w-2xl">
            <SectionLabel number="05" text="Full Documentation Pack" />
            <h2 className="font-fraunces text-2xl sm:text-3xl text-white mb-3">Request everything in one go.</h2>
            <p className="text-frost-500 font-inter mb-8">Enter your work email and we'll send the complete documentation set — all spec sheets, allergen declarations, compliance docs, and quality certificates — within one working day.</p>
            {emailForm.submitted ? (
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-5 py-4" data-testid="pack-request-success">
                <CheckCircle size={20} className="text-neon-500 flex-shrink-0" />
                <div>
                  <p className="text-white font-inter font-medium text-sm">Pack requested</p>
                  <p className="text-frost-500 text-xs font-inter">We'll send the full documentation set to {emailForm.email} within one working day.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handlePackRequest} className="flex flex-col sm:flex-row gap-3" data-testid="pack-request-form">
                <input
                  required
                  type="email"
                  value={emailForm.email}
                  onChange={e => setEmailForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your@company.com"
                  className="flex-1 px-4 py-3 border border-white/20 rounded-md text-sm text-white placeholder-frost-500 focus:outline-none focus:ring-2 focus:ring-neon-500 bg-white/10 font-inter"
                  data-testid="pack-email-input"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-neon-500 hover:bg-neon-600 text-white font-medium rounded-md transition-colors font-inter whitespace-nowrap"
                  data-testid="pack-submit-btn"
                >
                  Send full pack <ArrowRight size={14} />
                </button>
              </form>
            )}
          </FadeUp>
        </section>

      </div>

      {/* CTA strip */}
      <section className="mt-16 py-16 bg-neon-500">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-fraunces text-3xl text-white mb-3">Need something specific?</h2>
          <p className="text-white/80 mb-8 font-inter">If you need a document that isn't listed here — a bespoke CoA, audit report, or lot-specific traceability record — get in touch with our team directly.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 bg-frost-900 hover:bg-ink-900 text-white font-medium rounded-md transition-colors font-inter" data-testid="resources-contact-btn">
            Contact us <ArrowRight size={14} />
          </Link>
        </div>
      </section>

    </div>
  );
}
