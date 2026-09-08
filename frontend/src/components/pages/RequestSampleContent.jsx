'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CheckCircle, Package, Phone, Loader2 } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import { productCategories } from '@/data/products';
import { postEnquiry } from '@/lib/api';

const SECTORS = ['Retail Private Label', 'Retail Processors', 'Foodservice', 'Wholesale / Distributor', 'Other'];
const INPUT_CLASS = "w-full px-4 py-2.5 border border-ice-300 rounded-md text-sm text-ink-900 placeholder-frost-500/60 focus:outline-none focus:ring-2 focus:ring-neon-500 focus:border-transparent bg-white font-inter";
const SELECT_CLASS = "w-full px-4 py-2.5 border border-ice-300 rounded-md text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-neon-500 bg-white font-inter";

export default function RequestSampleContent() {
  const pathname = usePathname();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [sectorError, setSectorError] = useState(false);
  const sectorSectionRef = useRef(null);
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', sector: '', products: [], volume: '', timeline: '', notes: '', consent: false, website: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.sector) {
      setSectorError(true);
      sectorSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setSectorError(false);
    setError('');
    setSubmitting(true);
    try {
      await postEnquiry('/api/enquiries/sample-request', { ...form, source_page: pathname });
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Sorry, we couldn't submit your request. Please try again or email us directly at samples@indoaquaticltd.com.");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleProduct = (id) => {
    setForm(prev => ({
      ...prev,
      products: prev.products.includes(id) ? prev.products.filter(p => p !== id) : [...prev.products, id],
    }));
  };

  const selectSector = (s) => {
    setSectorError(false);
    setForm(prev => ({ ...prev, sector: s }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-ice-100 flex items-center justify-center px-4">
        <div className="bg-white border border-ice-300 rounded-2xl p-12 max-w-md w-full text-center shadow-sm" data-testid="sample-success">
          <CheckCircle className="text-neon-700 mx-auto mb-4" size={48} />
          <h2 className="font-fraunces text-2xl text-ink-900 mb-3">Request received</h2>
          <p className="text-frost-700 font-inter mb-6">Thank you. We'll be in touch within 2 business days to discuss your sample requirements.</p>
          <div className="flex flex-col gap-3">
            <Link href="/products" className="px-5 py-2.5 bg-neon-700 hover:bg-neon-800 text-white text-sm font-semibold rounded-md transition-colors font-inter">Browse the full range</Link>
            <Link href="/contact" className="px-5 py-2.5 border border-ice-300 text-frost-700 hover:text-ink-900 hover:border-frost-500 text-sm font-semibold rounded-md transition-colors font-inter">Contact us</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ice-100 min-h-screen">

      <div className="bg-frost-900 py-16 border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Request a frozen sample' }]} />
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neon-500 font-inter mt-6 mb-3">Indo Aquatic</p>
          <h1 className="font-fraunces text-4xl text-white mb-3" data-testid="sample-h1">Request a frozen sample</h1>
          <p className="text-frost-500 font-inter">Complete the form below and we'll arrange samples of the relevant products for your assessment.</p>
        </div>
      </div>

      <div className="border-b border-ice-300 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Phone, step: '01', title: 'We call you back', desc: 'Within 2 business days — to confirm which products and specs are relevant.' },
              { icon: Package, step: '02', title: 'Samples dispatched', desc: 'Correctly spec\'d and labelled samples shipped within 5 working days of confirmation.' },
              { icon: CheckCircle, step: '03', title: 'You assess & decide', desc: 'No obligation. Let us know your feedback and we\'ll take it from there.' },
            ].map(({ icon: Icon, step, title, desc }) => (
              <div key={step} className="flex items-start gap-3">
                <div className="w-8 h-8 bg-neon-500/10 border border-neon-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon size={14} className="text-neon-700" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-neon-700 uppercase tracking-widest font-inter mb-0.5">{step}</p>
                  <p className="text-sm font-medium text-ink-900 font-inter">{title}</p>
                  <p className="text-xs text-frost-700 leading-relaxed font-inter mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <form onSubmit={handleSubmit} className="space-y-6" data-testid="sample-request-form">
          {/* Honeypot: hidden from real users, catches bots that auto-fill every field */}
          <input type="text" name="website" value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

          <div className="bg-white border border-ice-300 rounded-xl p-6 shadow-sm">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neon-700 font-inter mb-1">Step 1</p>
            <h2 className="font-fraunces text-lg text-ink-900 mb-4">Contact details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { field: 'name', label: 'Full name', placeholder: 'Your name', required: true, autoComplete: 'name', testid: 'input-name' },
                { field: 'company', label: 'Company', placeholder: 'Company name', required: true, autoComplete: 'organization', testid: 'input-company' },
                { field: 'email', label: 'Email', placeholder: 'your@company.com', required: true, type: 'email', autoComplete: 'email', testid: 'input-email' },
                { field: 'phone', label: 'Phone', placeholder: '+44 ...', required: false, type: 'tel', autoComplete: 'tel', testid: 'input-phone' },
              ].map(({ field, label, placeholder, required, type, autoComplete, testid }) => (
                <div key={field}>
                  <label htmlFor={`sample-${field}`} className="block text-xs font-medium text-frost-700 mb-1.5 uppercase tracking-wider font-inter">{label}{required && ' *'}</label>
                  <input id={`sample-${field}`} required={required} type={type || 'text'} autoComplete={autoComplete} value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })} className={INPUT_CLASS} placeholder={placeholder} data-testid={testid} />
                </div>
              ))}
            </div>
          </div>

          <div ref={sectorSectionRef} className={`bg-white border rounded-xl p-6 shadow-sm ${sectorError ? 'border-red-400' : 'border-ice-300'}`}>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neon-700 font-inter mb-1">Step 2</p>
            <h2 id="sample-sector-label" className="font-fraunces text-lg text-ink-900 mb-4">Your sector *</h2>
            <div role="radiogroup" aria-labelledby="sample-sector-label" aria-required="true" className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SECTORS.map(s => (
                <button key={s} type="button" role="radio" aria-checked={form.sector === s} onClick={() => selectSector(s)}
                  className={`text-left px-3 py-2.5 text-sm border rounded-md transition-colors font-inter ${form.sector === s ? 'bg-neon-700 border-neon-700 text-white' : 'border-ice-300 text-frost-700 hover:border-frost-500 hover:text-ink-900 bg-white'}`}
                  data-testid={`sector-btn-${s.toLowerCase().replace(/ \/ /g, '-').replace(/ /g, '-')}`}>
                  {s}
                </button>
              ))}
            </div>
            <div role="alert" aria-live="assertive">
              {sectorError && (
                <p className="text-sm text-red-600 mt-3 font-inter" data-testid="sample-sector-error">Please select your sector to continue.</p>
              )}
            </div>
          </div>

          <div className="bg-white border border-ice-300 rounded-xl p-6 shadow-sm">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neon-700 font-inter mb-1">Step 3</p>
            <h2 className="font-fraunces text-lg text-ink-900 mb-4">Products of interest</h2>
            {productCategories.map(cat => (
              <div key={cat.id} className="mb-5 last:mb-0">
                <p className="text-xs uppercase tracking-wider text-neon-700 font-semibold mb-2 font-inter">{cat.name}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {cat.variants.map(v => (
                    <label key={v.id} className="flex items-center gap-2.5 cursor-pointer">
                      <input type="checkbox" checked={form.products.includes(v.id)} onChange={() => toggleProduct(v.id)} className="w-4 h-4 cursor-pointer accent-[#C2410C]" data-testid={`product-check-${v.id}`} />
                      <span className="text-sm text-frost-700 font-inter">{v.fullName} <span className="text-xs text-frost-500 font-mono">({v.name})</span></span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white border border-ice-300 rounded-xl p-6 shadow-sm">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neon-700 font-inter mb-1">Step 4</p>
            <h2 className="font-fraunces text-lg text-ink-900 mb-4">Requirements</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="sample-volume" className="block text-xs font-medium text-frost-700 mb-1.5 uppercase tracking-wider font-inter">Estimated monthly volume</label>
                <select id="sample-volume" value={form.volume} onChange={e => setForm({ ...form, volume: e.target.value })} className={SELECT_CLASS} data-testid="select-volume">
                  <option value="">Select a range</option>
                  {['Under 100 kg/month', '100–500 kg/month', '500 kg–2 t/month', '2–10 t/month', '10 t+/month'].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="sample-timeline" className="block text-xs font-medium text-frost-700 mb-1.5 uppercase tracking-wider font-inter">Procurement timeline</label>
                <select id="sample-timeline" value={form.timeline} onChange={e => setForm({ ...form, timeline: e.target.value })} className={SELECT_CLASS} data-testid="select-timeline">
                  <option value="">Select timeline</option>
                  {['Immediate / Within 30 days', '1–3 months', '3–6 months', 'Exploring options / No timeline'].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="sample-notes" className="block text-xs font-medium text-frost-700 mb-1.5 uppercase tracking-wider font-inter">Additional notes</label>
              <textarea id="sample-notes" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={4} className={`${INPUT_CLASS} resize-none`} placeholder="Specific sizes, counts, certifications, delivery requirements..." data-testid="textarea-notes" />
            </div>
          </div>

          <label className="flex items-start gap-2.5 cursor-pointer">
            <input type="checkbox" required checked={form.consent} onChange={e => setForm({ ...form, consent: e.target.checked })} className="w-4 h-4 mt-0.5 cursor-pointer accent-[#C2410C]" data-testid="sample-check-consent" />
            <span className="text-xs text-frost-700 leading-relaxed font-inter">
              I agree to Indo Aquatic UK Ltd storing my details to arrange samples and respond to this request, as described in the{' '}
              <Link href="/privacy-policy" className="text-neon-700 underline hover:text-neon-800">Privacy Policy</Link>. *
            </span>
          </label>

          <div role="alert" aria-live="assertive">
            {error && (
              <p className="text-sm text-red-600 text-center font-inter" data-testid="sample-form-error">{error}</p>
            )}
          </div>
          <button type="submit" disabled={submitting} aria-busy={submitting} className="w-full py-4 bg-neon-700 hover:bg-neon-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-md transition-colors text-base font-inter flex items-center justify-center gap-2" data-testid="submit-sample-form">
            {submitting && <Loader2 size={18} className="animate-spin" />}
            {submitting ? 'Submitting...' : 'Submit sample request'}
          </button>
          <p className="text-center text-xs text-frost-700 font-inter">We typically respond within 2 business days.</p>
        </form>
      </div>

    </div>
  );
}
