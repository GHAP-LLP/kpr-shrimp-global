import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import { productCategories } from '@/data/products';

const SECTORS = ["Foodservice / HORECA", "Food Manufacturer", "Wholesale / Distributor", "Retail / Private Label", "Other"];

export default function RequestSamplePage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', sector: '', products: [], volume: '', timeline: '', notes: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const toggleProduct = (id) => {
    setForm(prev => ({
      ...prev,
      products: prev.products.includes(id) ? prev.products.filter(p => p !== id) : [...prev.products, id],
    }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-ice-100 flex items-center justify-center px-4">
        <div className="bg-white border border-ice-300 rounded-2xl p-12 max-w-md w-full text-center" data-testid="sample-success">
          <CheckCircle className="text-neon-500 mx-auto mb-4" size={48} />
          <h2 className="font-fraunces text-2xl text-ink-900 mb-3">Request received</h2>
          <p className="text-frost-700 font-inter">Thank you. We'll be in touch within 2 business days to discuss your sample requirements.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ice-100 min-h-screen">
      <div className="bg-frost-900 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Request a sample' }]} />
          <h1 className="font-fraunces text-4xl text-white mt-6 mb-3" data-testid="sample-h1">Request a sample</h1>
          <p className="text-frost-500 font-inter">Complete the form below and we'll arrange samples of the relevant products for your assessment.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <form onSubmit={handleSubmit} className="space-y-6" data-testid="sample-request-form">
          <div className="bg-white border border-ice-300 rounded-xl p-6">
            <h2 className="font-fraunces text-lg text-ink-900 mb-4">Contact details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { field: 'name', label: 'Full name', placeholder: 'Your name', required: true, testid: 'input-name' },
                { field: 'company', label: 'Company', placeholder: 'Company name', required: true, testid: 'input-company' },
                { field: 'email', label: 'Email', placeholder: 'your@company.com', required: true, type: 'email', testid: 'input-email' },
                { field: 'phone', label: 'Phone', placeholder: '+44 ...', required: false, testid: 'input-phone' },
              ].map(({ field, label, placeholder, required, type, testid }) => (
                <div key={field}>
                  <label className="block text-xs font-medium text-frost-700 mb-1.5 uppercase tracking-wider font-inter">{label}{required && ' *'}</label>
                  <input required={required} type={type || 'text'} value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })}
                    className="w-full px-4 py-2.5 border border-ice-300 rounded-md text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-neon-500 focus:border-transparent bg-white font-inter"
                    placeholder={placeholder} data-testid={testid} />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-ice-300 rounded-xl p-6">
            <h2 className="font-fraunces text-lg text-ink-900 mb-4">Your sector *</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SECTORS.map(s => (
                <button key={s} type="button" onClick={() => setForm({ ...form, sector: s })}
                  className={`text-left px-3 py-2.5 text-sm border rounded-md transition-colors font-inter ${form.sector === s ? 'bg-frost-900 border-frost-900 text-white' : 'border-ice-300 text-ink-900 hover:border-frost-500'}`}
                  data-testid={`sector-btn-${s.toLowerCase().replace(/ \/ /g, '-').replace(/ /g, '-')}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border border-ice-300 rounded-xl p-6">
            <h2 className="font-fraunces text-lg text-ink-900 mb-4">Products of interest</h2>
            {productCategories.map(cat => (
              <div key={cat.id} className="mb-5 last:mb-0">
                <p className="text-xs uppercase tracking-wider text-frost-500 font-semibold mb-2 font-inter">{cat.name}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {cat.variants.map(v => (
                    <label key={v.id} className="flex items-center gap-2.5 cursor-pointer">
                      <input type="checkbox" checked={form.products.includes(v.id)} onChange={() => toggleProduct(v.id)}
                        className="w-4 h-4 cursor-pointer accent-orange-500" data-testid={`product-check-${v.id}`} />
                      <span className="text-sm text-ink-900 font-inter">{v.fullName} <span className="text-xs text-frost-500 font-mono">({v.name})</span></span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white border border-ice-300 rounded-xl p-6">
            <h2 className="font-fraunces text-lg text-ink-900 mb-4">Requirements</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-frost-700 mb-1.5 uppercase tracking-wider font-inter">Estimated monthly volume</label>
                <select value={form.volume} onChange={e => setForm({ ...form, volume: e.target.value })}
                  className="w-full px-4 py-2.5 border border-ice-300 rounded-md text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-neon-500 bg-white font-inter"
                  data-testid="select-volume">
                  <option value="">Select a range</option>
                  {["Under 100 kg/month", "100–500 kg/month", "500 kg–2 t/month", "2–10 t/month", "10 t+/month"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-frost-700 mb-1.5 uppercase tracking-wider font-inter">Procurement timeline</label>
                <select value={form.timeline} onChange={e => setForm({ ...form, timeline: e.target.value })}
                  className="w-full px-4 py-2.5 border border-ice-300 rounded-md text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-neon-500 bg-white font-inter"
                  data-testid="select-timeline">
                  <option value="">Select timeline</option>
                  {["Immediate / Within 30 days", "1–3 months", "3–6 months", "Exploring options / No timeline"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-frost-700 mb-1.5 uppercase tracking-wider font-inter">Additional notes</label>
              <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={4}
                className="w-full px-4 py-2.5 border border-ice-300 rounded-md text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-neon-500 bg-white resize-none font-inter"
                placeholder="Specific sizes, counts, certifications, delivery requirements..." data-testid="textarea-notes" />
            </div>
          </div>

          <button type="submit" className="w-full py-4 bg-neon-500 hover:bg-neon-600 text-white font-semibold rounded-md transition-colors text-base font-inter" data-testid="submit-sample-form">
            Submit sample request
          </button>
          <p className="text-center text-xs text-frost-500 font-inter">We typically respond within 2 business days.</p>
        </form>
      </div>
    </div>
  );
}
