'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText, ArrowRight, CheckCircle, Download, Shield, Loader2, Package, ClipboardList, X } from 'lucide-react';
import { productCategories } from '@/data/products';
import Breadcrumb from '@/components/Breadcrumb';
import { FadeUp } from '@/components/FadeUp';
import { postEnquiry } from '@/lib/api';

const COMPLIANCE_DOCS = [
  { id: 'allergen-all', name: 'Allergen Declaration — Full Range', type: 'Compliance', desc: 'Allergen status for all 12 variants. Covers the 14 major EU/UK allergens. Issued per lot on request.', icon: Shield },
  { id: 'nutritional-frozen-raw', name: 'Nutritional Information — Frozen Raw', type: 'Compliance', desc: 'Per-100g nutritional values for all Frozen Raw Prawn variants. Energy, protein, fat, carbohydrate breakdown.', icon: ClipboardList },
  { id: 'nutritional-cooked', name: 'Nutritional Information — Cooked Prawns', type: 'Compliance', desc: 'Per-100g nutritional values for IQF Cooked PD and IQF Cooked Tail-on.', icon: ClipboardList },
  { id: 'nutritional-rtc', name: 'Nutritional Information — Added Value', type: 'Compliance', desc: 'Nutritional breakdown for Tempura, Breaded, Marinated, and Skewers. Includes batter and marinade contributions.', icon: ClipboardList },
  { id: 'ingredient-rtc', name: 'Ingredient Declarations — Added Value Range', type: 'Compliance', desc: 'Full ingredient lists for all value-added products. Includes sub-ingredient breakdown for coatings and marinades.', icon: FileText },
  { id: 'coo-certificate', name: 'Country of Origin Certificate', type: 'Compliance', desc: 'Certificate of origin: India (Andhra Pradesh). Issued per shipment lot. Available as template on request.', icon: FileText },
];

const QUALITY_DOCS = [
  { id: 'haccp-summary', name: 'HACCP Process Summary', type: 'Quality', desc: 'High-level HACCP documentation covering critical control points across farming, processing, and cold chain. Full HACCP plan available under NDA.', icon: Shield },
  { id: 'eu-approval', name: 'EU Approval Documentation', type: 'Quality', desc: 'Processing facility approval status under Regulation (EC) No 853/2004. Approval is in progress — current status documentation issued on request.', icon: Shield },
  { id: 'fsa-registration', name: 'FSA Registration Certificate', type: 'Quality', desc: 'UK Food Standards Agency registration for import and distribution operations.', icon: Shield },
  { id: 'cold-chain-protocol', name: 'Cold Chain Temperature Protocol', type: 'Quality', desc: 'Standard operating procedure for temperature monitoring from processing to UK delivery. Continuous temperature log provided per shipment.', icon: ClipboardList },
  { id: 'traceability-guide', name: 'Lot-Level Traceability Guide', type: 'Quality', desc: 'Explains our traceability system from farm lot to UK shipment. Each lot reference links back to harvest date, pond, and processing batch.', icon: FileText },
  { id: 'packaging-spec', name: 'Packaging Specifications', type: 'Quality', desc: 'Master carton dimensions, labelling requirements, pallet configuration, and retail-ready packaging options for all SKUs.', icon: Package },
];

const RANGE_DOCS = [
  { id: 'range-frozen-raw', name: 'Frozen Raw Prawns — Range Overview', type: 'Product Range', desc: 'Overview of all 5 Frozen Raw variants (HOSO, HLSO, PD, PUD, EZ-peel) with count sizes, pack formats, and key spec highlights on a single sheet.', icon: FileText },
  { id: 'range-cooked', name: 'Cooked Prawns — Range Overview', type: 'Product Range', desc: 'Overview of IQF Cooked PD and IQF Cooked Tail-on with application recommendations and pack format options.', icon: FileText },
  { id: 'range-rtc', name: 'Added Value Innovation — Range Overview', type: 'Product Range', desc: 'Overview of Tempura, Breaded, Butterfly, Marinated, and Skewer formats. Includes cooking instructions, portion weights, and available retail vs foodservice packs.', icon: FileText },
  { id: 'count-size-guide', name: 'Count Size Reference Guide', type: 'Product Range', desc: 'Full count size chart from U/15 (Super Colossal) to 61/70 (Small) with pieces-per-kg, nomenclature, and typical application guide.', icon: FileText },
];

const TYPE_COLOURS = {
  'Spec Sheet': 'bg-neon-500/20 text-neon-700',
  'Product Range': 'bg-blue-500/20 text-blue-600',
  'Compliance': 'bg-yellow-500/20 text-yellow-700',
  'Quality': 'bg-emerald-500/20 text-emerald-700',
};

function SectionLabel({ number, text }) {
  return (
    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neon-700 font-inter mb-3">
      {number} · {text}
    </p>
  );
}

function DocCard({ doc, selected, onToggle, extraLink }) {
  const Icon = doc.icon || FileText;
  return (
    <div className="bg-white border border-ice-300 rounded-xl p-5 flex flex-col gap-3 hover:bg-ice-100 hover:border-frost-500 transition-all duration-200 shadow-sm" data-testid={`doc-card-${doc.id}`}>
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 bg-ice-100 border border-ice-300 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
          <Icon size={16} className="text-neon-700" />
        </div>
        <div className="min-w-0">
          <span className={`inline-block text-[10px] font-mono px-1.5 py-0.5 rounded uppercase tracking-wider mb-1.5 ${TYPE_COLOURS[doc.type] || 'bg-ice-300 text-frost-700'}`}>
            {doc.type}
          </span>
          <h3 className="font-inter font-semibold text-ink-900 text-sm leading-snug">{doc.name}</h3>
        </div>
      </div>
      <p className="text-xs text-frost-700 leading-relaxed font-inter pl-12">{doc.desc}</p>
      <div className="pl-12 flex items-center gap-4">
        {selected ? (
          <button
            onClick={() => onToggle(doc)}
            className="inline-flex items-center gap-1.5 text-xs text-emerald-700 hover:text-red-600 font-inter font-medium transition-colors"
            data-testid={`selected-${doc.id}`}
          >
            <CheckCircle size={13} /> Added to request — remove
          </button>
        ) : (
          <button
            onClick={() => onToggle(doc)}
            className="inline-flex items-center gap-1.5 text-xs text-neon-700 hover:text-neon-800 font-inter font-medium transition-colors"
            data-testid={`request-btn-${doc.id}`}
          >
            <Download size={13} /> Add to request
          </button>
        )}
        {extraLink}
      </div>
    </div>
  );
}

export default function ResourcesContent() {
  const pathname = usePathname();
  const formSectionRef = useRef(null);
  const [selected, setSelected] = useState([]); // [{id, name}]
  const [form, setForm] = useState({ name: '', company: '', email: '', consent: false, website: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const toggleDoc = (doc) => {
    setSubmitted(false);
    setSelected(prev =>
      prev.some(d => d.id === doc.id) ? prev.filter(d => d.id !== doc.id) : [...prev, { id: doc.id, name: doc.name }]
    );
  };

  const isSelected = (id) => selected.some(d => d.id === id);

  const scrollToForm = () => formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const documents = selected.length > 0 ? selected.map(d => d.name) : ['Full documentation pack'];
      await postEnquiry('/api/enquiries/document-request', { ...form, documents, source_page: pathname });
      setSubmitted(true);
      setSelected([]);
    } catch (err) {
      setError(err.message || "Sorry, we couldn't send your document request. Please try again or email us directly at sales@indoaquaticltd.com.");
    } finally {
      setSubmitting(false);
    }
  };

  const specSheetDocs = productCategories.flatMap(cat =>
    cat.variants.map(v => ({
      id: `spec-${v.id}`,
      name: `${v.fullName} — Technical Spec Sheet`,
      type: 'Spec Sheet',
      desc: `Species, processing form, available count sizes, glaze options, pack formats, shelf life, and origin. Issued per lot on request.`,
      icon: FileText,
      href: `/products/${cat.slug}/${v.slug}`,
    }))
  );

  return (
    <div className="bg-ice-100 min-h-screen">

      <div className="bg-frost-900 py-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Resources & Documents' }]} />
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neon-500 font-inter mt-6 mb-3">Indo Aquatic</p>
          <h1 className="font-fraunces text-4xl sm:text-5xl text-white mb-3" data-testid="resources-h1">Resources & Documents</h1>
          <p className="text-frost-500 max-w-2xl font-inter text-lg">Technical specification sheets, compliance documents, allergen declarations, and quality certifications for the full Indo Aquatic range.</p>
          <p className="text-frost-500 font-inter text-sm mt-3">Add the documents you need to your request, complete your details below, and we'll send them within 2 business days.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

        <section data-testid="spec-sheets-section">
          <FadeUp className="mb-8">
            <SectionLabel number="01" text="Product Specification Sheets" />
            <h2 className="font-fraunces text-2xl sm:text-3xl text-ink-900 mb-2">Individual variant spec sheets</h2>
            <p className="text-frost-700 font-inter text-sm max-w-2xl">Full technical specification for each of our 12 variants — species, process form, count sizes, glaze, pack formats, shelf life, and origin. You can also <span className="text-ink-900">view the live spec</span> for any product on its detail page.</p>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {specSheetDocs.map(doc => (
              <DocCard
                key={doc.id}
                doc={doc}
                selected={isSelected(doc.id)}
                onToggle={toggleDoc}
                extraLink={
                  <Link href={doc.href} className="inline-flex items-center gap-1 text-xs text-frost-700 hover:text-ink-900 transition-colors font-inter">
                    View live spec <ArrowRight size={11} />
                  </Link>
                }
              />
            ))}
          </div>
        </section>

        <section data-testid="range-docs-section">
          <FadeUp className="mb-8">
            <SectionLabel number="02" text="Range Overview Sheets" />
            <h2 className="font-fraunces text-2xl sm:text-3xl text-ink-900 mb-2">Category-level overviews</h2>
            <p className="text-frost-700 font-inter text-sm max-w-2xl">Single-page overviews covering an entire product category. Suitable for buyer briefings, category reviews, and initial supplier assessment.</p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {RANGE_DOCS.map(doc => (
                <DocCard key={doc.id} doc={doc} selected={isSelected(doc.id)} onToggle={toggleDoc} />
              ))}
            </div>
          </FadeUp>
        </section>

        <section data-testid="compliance-docs-section">
          <FadeUp className="mb-8">
            <SectionLabel number="03" text="Compliance & Allergen" />
            <h2 className="font-fraunces text-2xl sm:text-3xl text-ink-900 mb-2">Allergen, nutritional & ingredient docs</h2>
            <p className="text-frost-700 font-inter text-sm max-w-2xl">Required documentation for retail listing, food manufacturing use, and foodservice QA teams. All documents issued to current UK food labelling regulations.</p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {COMPLIANCE_DOCS.map(doc => (
                <DocCard key={doc.id} doc={doc} selected={isSelected(doc.id)} onToggle={toggleDoc} />
              ))}
            </div>
          </FadeUp>
        </section>

        <section data-testid="quality-docs-section">
          <FadeUp className="mb-8">
            <SectionLabel number="04" text="Quality & Certifications" />
            <h2 className="font-fraunces text-2xl sm:text-3xl text-ink-900 mb-2">HACCP, certifications & traceability</h2>
            <p className="text-frost-700 font-inter text-sm max-w-2xl">Quality management documentation, current certification references, and traceability system guides. Full HACCP plan and audit reports available under NDA for qualified buyers.</p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {QUALITY_DOCS.map(doc => (
                <DocCard key={doc.id} doc={doc} selected={isSelected(doc.id)} onToggle={toggleDoc} />
              ))}
            </div>
          </FadeUp>
        </section>

        <section ref={formSectionRef} className="border-t border-ice-300 pt-12 scroll-mt-24" data-testid="full-pack-section">
          <FadeUp className="max-w-2xl">
            <SectionLabel number="05" text="Complete Your Request" />
            <h2 className="font-fraunces text-2xl sm:text-3xl text-ink-900 mb-3">
              {selected.length > 0 ? `Request ${selected.length} selected document${selected.length > 1 ? 's' : ''}.` : 'Request the full documentation pack.'}
            </h2>
            <p className="text-frost-700 font-inter mb-6">
              {selected.length > 0
                ? "Complete your details and we'll send the selected documents within 2 business days."
                : "No documents selected yet — submit below and we'll send the complete documentation set (all spec sheets, allergen declarations, compliance docs, and quality certificates) within 2 business days."}
            </p>

            {selected.length > 0 && (
              <ul className="flex flex-wrap gap-2 mb-6" data-testid="selected-doc-list">
                {selected.map(d => (
                  <li key={d.id}>
                    <button
                      onClick={() => toggleDoc(d)}
                      className="inline-flex items-center gap-1.5 text-xs bg-white border border-ice-300 hover:border-red-400 text-frost-700 rounded-full px-3 py-1.5 font-inter transition-colors"
                      aria-label={`Remove ${d.name} from request`}
                    >
                      {d.name} <X size={11} />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {submitted ? (
              <div className="flex items-center gap-3 bg-white border border-ice-300 rounded-xl px-5 py-4 shadow-sm" data-testid="pack-request-success">
                <CheckCircle size={20} className="text-neon-700 flex-shrink-0" />
                <div>
                  <p className="text-ink-900 font-inter font-medium text-sm">Request received</p>
                  <p className="text-frost-700 text-xs font-inter">We'll send the requested documents to {form.email} within 2 business days.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" data-testid="pack-request-form">
                {/* Honeypot: hidden from real users, catches bots that auto-fill every field */}
                <input type="text" name="website" value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="pack-name" className="block text-xs font-medium text-frost-700 mb-1.5 uppercase tracking-wider font-inter">Name *</label>
                    <input id="pack-name" required autoComplete="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="w-full px-4 py-3 border border-ice-300 rounded-md text-sm text-ink-900 placeholder-frost-500/60 focus:outline-none focus:ring-2 focus:ring-neon-500 focus:border-transparent bg-white font-inter" data-testid="pack-name-input" />
                  </div>
                  <div>
                    <label htmlFor="pack-company" className="block text-xs font-medium text-frost-700 mb-1.5 uppercase tracking-wider font-inter">Company *</label>
                    <input id="pack-company" required autoComplete="organization" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Company name" className="w-full px-4 py-3 border border-ice-300 rounded-md text-sm text-ink-900 placeholder-frost-500/60 focus:outline-none focus:ring-2 focus:ring-neon-500 focus:border-transparent bg-white font-inter" data-testid="pack-company-input" />
                  </div>
                </div>
                <div>
                  <label htmlFor="pack-email" className="block text-xs font-medium text-frost-700 mb-1.5 uppercase tracking-wider font-inter">Work email *</label>
                  <input id="pack-email" required type="email" autoComplete="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="your@company.com" className="w-full px-4 py-3 border border-ice-300 rounded-md text-sm text-ink-900 placeholder-frost-500/60 focus:outline-none focus:ring-2 focus:ring-neon-500 focus:border-transparent bg-white font-inter" data-testid="pack-email-input" />
                </div>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input type="checkbox" required checked={form.consent} onChange={e => setForm({ ...form, consent: e.target.checked })} className="w-4 h-4 mt-0.5 cursor-pointer accent-[#C2410C]" data-testid="pack-check-consent" />
                  <span className="text-xs text-frost-700 leading-relaxed font-inter">
                    I agree to Indo Aquatic UK Ltd storing my details to fulfil this document request, as described in the{' '}
                    <Link href="/privacy-policy" className="text-neon-700 underline hover:text-neon-800">Privacy Policy</Link>. *
                  </span>
                </label>
                <button
                  type="submit"
                  disabled={submitting}
                  aria-busy={submitting}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-neon-700 hover:bg-neon-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium rounded-md transition-colors font-inter whitespace-nowrap"
                  data-testid="pack-submit-btn"
                >
                  {submitting && <Loader2 size={16} className="animate-spin" />}
                  {submitting ? 'Sending...' : selected.length > 0 ? 'Send document request' : 'Send full pack'} {!submitting && <ArrowRight size={14} />}
                </button>
                <div role="alert" aria-live="assertive">
                  {error && (
                    <p className="text-sm text-red-600 font-inter" data-testid="pack-request-error">{error}</p>
                  )}
                </div>
              </form>
            )}
          </FadeUp>
        </section>

      </div>

      {selected.length > 0 && !submitted && (
        <div className="sticky bottom-4 z-40 flex justify-center px-4">
          <button
            onClick={scrollToForm}
            className="inline-flex items-center gap-2 px-5 py-3 bg-frost-900 hover:bg-ink-900 text-white text-sm font-semibold rounded-full shadow-xl transition-colors font-inter"
            data-testid="selected-docs-pill"
          >
            {selected.length} document{selected.length > 1 ? 's' : ''} selected — complete request <ArrowRight size={14} />
          </button>
        </div>
      )}

      <section className="mt-16 py-16 bg-neon-700">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-fraunces text-3xl text-white mb-3">Need something specific?</h2>
          <p className="text-white/90 mb-8 font-inter">If you need a document that isn't listed here — a bespoke CoA, audit report, or lot-specific traceability record — get in touch with our team directly.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 bg-frost-900 hover:bg-ink-900 text-white font-medium rounded-md transition-colors font-inter" data-testid="resources-contact-btn">
            Contact us <ArrowRight size={14} />
          </Link>
        </div>
      </section>

    </div>
  );
}
