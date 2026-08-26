'use client';
import { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, Linkedin } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

const CONTACT_INFO = [
  { icon: Mail, label: 'Sales enquiries', value: 'sales@indoaquaticltd.com', href: 'mailto:sales@indoaquaticltd.com' },
  { icon: Mail, label: 'Sample requests', value: 'samples@indoaquaticltd.com', href: 'mailto:samples@indoaquaticltd.com' },
  { icon: Phone, label: 'Phone', value: '+44 (0) 20 7946 0832', href: 'tel:+442079460832' },
  { icon: MapPin, label: 'Registered office', value: 'Hall Farm Burrill Lane, Brantingham, Brough, HU15 1YG', href: null },
  { icon: Linkedin, label: 'LinkedIn', value: 'Indo Aquatic UK Ltd', href: 'https://www.linkedin.com/company/indo-aquatic-limited/' },
];

const INPUT_CLASS = "w-full px-4 py-2.5 border border-ice-300 rounded-md text-sm text-ink-900 placeholder-frost-500/60 focus:outline-none focus:ring-2 focus:ring-neon-500 focus:border-transparent bg-white font-inter";

export default function ContactPageContent() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', company: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
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
                    <Icon size={16} className="text-neon-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-frost-500 mb-0.5 font-inter">{label}</p>
                      {href ? (
                        <a href={href} className="text-sm text-frost-700 hover:text-neon-500 transition-colors font-inter">{value}</a>
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
              <h3 className="font-fraunces text-base text-ink-900 mb-2">Sourcing partner</h3>
              <p className="text-xs text-frost-700 leading-relaxed font-inter">SS Agro Products<br />Kodavalur, SPSR Nellore, Andhra Pradesh 524366, India</p>
            </div>
          </div>

          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-white border border-ice-300 rounded-xl p-12 shadow-sm text-center flex flex-col items-center justify-center min-h-[400px]" data-testid="contact-success">
                <CheckCircle size={48} className="text-neon-500 mb-4" />
                <h2 className="font-fraunces text-2xl text-ink-900 mb-2">Message sent</h2>
                <p className="text-frost-700 font-inter">Thank you for getting in touch. We'll respond within 2 business days.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white border border-ice-300 rounded-xl p-6 shadow-sm space-y-4" data-testid="contact-form">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neon-500 font-inter mb-1">Send us a message</p>
                <h2 className="font-fraunces text-xl text-ink-900 mb-2">Send a message</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-frost-700 mb-1.5 uppercase tracking-wider font-inter">Name *</label>
                    <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={INPUT_CLASS} placeholder="Your name" data-testid="contact-input-name" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-frost-700 mb-1.5 uppercase tracking-wider font-inter">Company</label>
                    <input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} className={INPUT_CLASS} placeholder="Company name" data-testid="contact-input-company" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-frost-700 mb-1.5 uppercase tracking-wider font-inter">Email *</label>
                  <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={INPUT_CLASS} placeholder="your@company.com" data-testid="contact-input-email" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-frost-700 mb-1.5 uppercase tracking-wider font-inter">Message *</label>
                  <textarea required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={6} className={`${INPUT_CLASS} resize-none`} placeholder="Tell us about your requirements..." data-testid="contact-textarea-message" />
                </div>
                <button type="submit" className="w-full py-3.5 bg-neon-500 hover:bg-neon-600 text-white font-semibold rounded-md transition-colors font-inter" data-testid="contact-submit">
                  Send message
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
