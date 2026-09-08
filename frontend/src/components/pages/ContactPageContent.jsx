'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, MapPin, CheckCircle, Linkedin, Loader2 } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import { postEnquiry } from '@/lib/api';

const CONTACT_INFO = [
  { icon: Mail, label: 'Sales enquiries', value: 'sales@indoaquaticltd.com', href: 'mailto:sales@indoaquaticltd.com' },
  { icon: Mail, label: 'Sample requests', value: 'samples@indoaquaticltd.com', href: 'mailto:samples@indoaquaticltd.com' },
  { icon: MapPin, label: 'Registered office', value: 'Hall Farm Burrill Lane, Brantingham, Brough, HU15 1YG', href: null },
  { icon: Linkedin, label: 'LinkedIn', value: 'Indo Aquatic UK Ltd', href: 'https://www.linkedin.com/company/indo-aquatic-limited/' },
];

const ENQUIRY_TYPES = [
  'Sales & pricing',
  'Sample request',
  'Technical & QA',
  'Documentation & certification',
  'Other',
];

const INPUT_CLASS = "w-full px-4 py-2.5 border border-ice-300 rounded-md text-sm text-ink-900 placeholder-frost-500/60 focus:outline-none focus:ring-2 focus:ring-neon-500 focus:border-transparent bg-white font-inter";

const EMPTY_FORM = { name: '', company: '', email: '', phone: '', enquiry_type: '', message: '', consent: false, website: '' };

export default function ContactPageContent() {
  const pathname = usePathname();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState(EMPTY_FORM);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await postEnquiry('/api/enquiries/contact', { ...form, source_page: pathname });
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Sorry, we couldn't send your message. Please try again or email us directly at sales@indoaquaticltd.com.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setSubmitted(false);
    setError('');
  };

  return (
    <div className="bg-ice-100 min-h-screen">

      <div className="bg-frost-900 py-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Contact' }]} />
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neon-500 font-inter mt-6 mb-3">Indo Aquatic</p>
          <h1 className="font-fraunces text-4xl text-white mb-3" data-testid="contact-h1">Contact us</h1>
          <p className="text-frost-500 max-w-xl font-inter">Get in touch to discuss supply requirements, request samples, or find out more about our products.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="space-y-4">
            <div className="bg-white border border-ice-300 rounded-xl p-6 shadow-sm">
              <h2 className="font-fraunces text-xl text-ink-900 mb-5">Get in touch</h2>
              <div className="space-y-4">
                {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-3">
                    <Icon size={16} className="text-neon-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-frost-500 mb-0.5 font-inter">{label}</p>
                      {href ? (
                        <a href={href} className="text-sm text-frost-700 hover:text-neon-700 transition-colors font-inter">{value}</a>
                      ) : (
                        <span className="text-sm text-frost-700 font-inter">{value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-ice-300 rounded-xl p-6 shadow-sm">
              <h3 className="font-fraunces text-base text-ink-900 mb-2">Response times</h3>
              <p className="text-xs text-frost-700 leading-relaxed font-inter">Sales &amp; samples: within 2 business days.<br />Technical &amp; QA queries: within 3 business days.<br />Office hours: Mon–Fri, 09:00–17:30 GMT.</p>
            </div>

            <div className="bg-white border border-ice-300 rounded-xl p-6 shadow-sm">
              <h3 className="font-fraunces text-base text-ink-900 mb-2">Our farm & plant</h3>
              <p className="text-xs text-frost-700 leading-relaxed font-inter">SS Agro Products<br />Kodavalur, SPSR Nellore, Andhra Pradesh 524366, India</p>
            </div>
          </div>

          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-white border border-ice-300 rounded-xl p-12 shadow-sm text-center flex flex-col items-center justify-center min-h-[400px]" data-testid="contact-success">
                <CheckCircle size={48} className="text-neon-700 mb-4" />
                <h2 className="font-fraunces text-2xl text-ink-900 mb-2">Message sent</h2>
                <p className="text-frost-700 font-inter mb-6">Thank you for getting in touch. We'll respond within 2 business days.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/products" className="px-5 py-2.5 bg-neon-700 hover:bg-neon-800 text-white text-sm font-semibold rounded-md transition-colors font-inter">Browse our products</Link>
                  <button onClick={resetForm} className="px-5 py-2.5 border border-ice-300 text-frost-700 hover:text-ink-900 hover:border-frost-500 text-sm font-semibold rounded-md transition-colors font-inter" data-testid="contact-send-another">Send another message</button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white border border-ice-300 rounded-xl p-6 shadow-sm space-y-4" data-testid="contact-form">
                {/* Honeypot: hidden from real users, catches bots that auto-fill every field */}
                <input type="text" name="website" value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neon-700 font-inter mb-1">Send us a message</p>
                <h2 className="font-fraunces text-xl text-ink-900 mb-2">Send a message</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-medium text-frost-700 mb-1.5 uppercase tracking-wider font-inter">Name *</label>
                    <input id="contact-name" required autoComplete="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={INPUT_CLASS} placeholder="Your name" data-testid="contact-input-name" />
                  </div>
                  <div>
                    <label htmlFor="contact-company" className="block text-xs font-medium text-frost-700 mb-1.5 uppercase tracking-wider font-inter">Company *</label>
                    <input id="contact-company" required autoComplete="organization" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} className={INPUT_CLASS} placeholder="Company name" data-testid="contact-input-company" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-medium text-frost-700 mb-1.5 uppercase tracking-wider font-inter">Email *</label>
                    <input id="contact-email" required type="email" autoComplete="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={INPUT_CLASS} placeholder="your@company.com" data-testid="contact-input-email" />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-medium text-frost-700 mb-1.5 uppercase tracking-wider font-inter">Mobile / phone *</label>
                    <input id="contact-phone" required type="tel" autoComplete="tel" minLength={7} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className={INPUT_CLASS} placeholder="+44 7000 000000" data-testid="contact-input-phone" />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-enquiry-type" className="block text-xs font-medium text-frost-700 mb-1.5 uppercase tracking-wider font-inter">Enquiry type</label>
                  <select id="contact-enquiry-type" value={form.enquiry_type} onChange={e => setForm({ ...form, enquiry_type: e.target.value })} className={INPUT_CLASS} data-testid="contact-select-type">
                    <option value="">Select (optional)</option>
                    {ENQUIRY_TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-medium text-frost-700 mb-1.5 uppercase tracking-wider font-inter">Message *</label>
                  <textarea id="contact-message" required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={6} className={`${INPUT_CLASS} resize-none`} placeholder="Tell us about your requirements..." data-testid="contact-textarea-message" />
                </div>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input type="checkbox" required checked={form.consent} onChange={e => setForm({ ...form, consent: e.target.checked })} className="w-4 h-4 mt-0.5 cursor-pointer accent-[#C2410C]" data-testid="contact-check-consent" />
                  <span className="text-xs text-frost-700 leading-relaxed font-inter">
                    I agree to Indo Aquatic UK Ltd storing my details to respond to this enquiry, as described in the{' '}
                    <Link href="/privacy-policy" className="text-neon-700 underline hover:text-neon-800">Privacy Policy</Link>. *
                  </span>
                </label>
                <button type="submit" disabled={submitting} aria-busy={submitting} className="w-full py-3.5 bg-neon-700 hover:bg-neon-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-md transition-colors font-inter flex items-center justify-center gap-2" data-testid="contact-submit">
                  {submitting && <Loader2 size={18} className="animate-spin" />}
                  {submitting ? 'Sending...' : 'Send message'}
                </button>
                <div role="alert" aria-live="assertive">
                  {error && (
                    <p className="text-sm text-red-600 text-center font-inter" data-testid="contact-form-error">{error}</p>
                  )}
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
