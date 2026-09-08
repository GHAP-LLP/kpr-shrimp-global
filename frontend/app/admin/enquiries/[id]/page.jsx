'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Loader2, ArrowLeft } from 'lucide-react';
import { adminFetch } from '@/lib/adminApi';

const STATUSES = ['new', 'read', 'responded', 'archived'];
const FIELD_LABELS = {
  name: 'Name', company: 'Company', email: 'Email', phone: 'Phone', sector: 'Sector',
  products: 'Products of interest', volume: 'Estimated volume', timeline: 'Timeline',
  notes: 'Notes', message: 'Message', source_ip: 'Source IP',
};

export default function AdminEnquiryDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [enquiry, setEnquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await adminFetch(`/admin/enquiries/${params.id}`);
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      if (res.ok) {
        setEnquiry(await res.json());
      }
      setLoading(false);
    })();
  }, [params.id, router]);

  const updateStatus = async (status) => {
    setSaving(true);
    const res = await adminFetch(`/admin/enquiries/${params.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setEnquiry(await res.json());
    }
    setSaving(false);
  };

  if (loading) {
    return <div className="min-h-screen bg-frost-900 flex items-center justify-center"><Loader2 className="animate-spin text-frost-500" size={28} /></div>;
  }

  if (!enquiry) {
    return <div className="min-h-screen bg-frost-900 flex items-center justify-center text-frost-500 font-inter">Enquiry not found.</div>;
  }

  return (
    <div className="min-h-screen bg-frost-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-frost-500 hover:text-white transition-colors font-inter mb-6">
          <ArrowLeft size={16} /> Back to enquiries
        </Link>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-fraunces text-2xl text-white">{enquiry.type === 'sample_request' ? 'Sample request' : 'Contact enquiry'}</h1>
            <select value={enquiry.status} onChange={e => updateStatus(e.target.value)} disabled={saving} className="px-3 py-2 text-sm bg-white/10 border border-white/10 rounded-md text-white font-inter" data-testid="status-select">
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <dl className="space-y-4">
            {Object.entries(enquiry)
              .filter(([key]) => FIELD_LABELS[key])
              .map(([key, value]) => (
                <div key={key}>
                  <dt className="text-xs uppercase tracking-wider text-frost-500 font-inter mb-1">{FIELD_LABELS[key]}</dt>
                  <dd className="text-sm text-white font-inter whitespace-pre-wrap">
                    {Array.isArray(value) ? (value.length ? value.join(', ') : '—') : (value || '—')}
                  </dd>
                </div>
              ))}
            <div>
              <dt className="text-xs uppercase tracking-wider text-frost-500 font-inter mb-1">Received</dt>
              <dd className="text-sm text-white font-inter">{new Date(enquiry.created_at).toLocaleString('en-GB')}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
