'use client';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, LogOut } from 'lucide-react';
import { adminFetch } from '@/lib/adminApi';

const STATUS_COLORS = {
  new: 'bg-neon-500/20 text-neon-500 border-neon-500/30',
  read: 'bg-white/10 text-frost-500 border-white/10',
  responded: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  archived: 'bg-white/5 text-frost-500/60 border-white/10',
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (type) params.set('type', type);
    if (status) params.set('status', status);
    const res = await adminFetch(`/admin/enquiries?${params.toString()}`);
    if (res.status === 401) {
      router.push('/admin/login');
      return;
    }
    const data = await res.json();
    setItems(data.items || []);
    setTotal(data.total || 0);
    setLoading(false);
  }, [type, status, router]);

  useEffect(() => { load(); }, [load]);

  const handleLogout = async () => {
    await adminFetch('/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-frost-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-fraunces text-3xl text-white mb-1">Enquiries</h1>
            <p className="text-frost-500 text-sm font-inter">{total} total</p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-frost-500 hover:text-white transition-colors font-inter" data-testid="admin-logout">
            <LogOut size={16} /> Log out
          </button>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <select value={type} onChange={e => setType(e.target.value)} className="px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-md text-white font-inter" data-testid="filter-type">
            <option value="">All types</option>
            <option value="sample_request">Sample request</option>
            <option value="contact">Contact</option>
          </select>
          <select value={status} onChange={e => setStatus(e.target.value)} className="px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-md text-white font-inter" data-testid="filter-status">
            <option value="">All statuses</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="responded">Responded</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20"><Loader2 className="animate-spin text-frost-500" size={28} /></div>
        ) : items.length === 0 ? (
          <p className="text-frost-500 font-inter py-12 text-center">No enquiries found.</p>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <table className="w-full text-sm font-inter">
              <thead className="bg-white/10 text-frost-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="text-left px-4 py-3">Type</th>
                  <th className="text-left px-4 py-3">Name</th>
                  <th className="text-left px-4 py-3">Company</th>
                  <th className="text-left px-4 py-3">Email</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-left px-4 py-3">Received</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id} className="border-t border-white/10 hover:bg-white/5 cursor-pointer" onClick={() => router.push(`/admin/enquiries/${item.id}`)} data-testid={`enquiry-row-${item.id}`}>
                    <td className="px-4 py-3 text-frost-500">{item.type === 'sample_request' ? 'Sample request' : 'Contact'}</td>
                    <td className="px-4 py-3 text-white">{item.name}</td>
                    <td className="px-4 py-3 text-frost-500">{item.company || '—'}</td>
                    <td className="px-4 py-3 text-frost-500">{item.email}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded border text-xs ${STATUS_COLORS[item.status] || STATUS_COLORS.new}`}>{item.status}</span>
                    </td>
                    <td className="px-4 py-3 text-frost-500 whitespace-nowrap">{new Date(item.created_at).toLocaleString('en-GB')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
