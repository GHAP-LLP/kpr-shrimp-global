'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { adminFetch } from '@/lib/adminApi';

const INPUT_CLASS = "w-full px-4 py-2.5 border border-white/10 rounded-md text-sm text-white placeholder-frost-500/60 focus:outline-none focus:ring-2 focus:ring-neon-500 focus:border-transparent bg-white/5 font-inter";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await adminFetch('/admin/login', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        throw new Error('Invalid username or password');
      }
      router.push('/admin');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-frost-900 flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-xl p-8 max-w-sm w-full space-y-4" data-testid="admin-login-form">
        <h1 className="font-fraunces text-2xl text-white mb-1">Admin login</h1>
        <p className="text-frost-500 text-sm font-inter mb-4">Sign in to view enquiries.</p>
        <div>
          <label className="block text-xs font-medium text-frost-500 mb-1.5 uppercase tracking-wider font-inter">Username</label>
          <input required value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} className={INPUT_CLASS} data-testid="admin-input-username" />
        </div>
        <div>
          <label className="block text-xs font-medium text-frost-500 mb-1.5 uppercase tracking-wider font-inter">Password</label>
          <input required type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className={INPUT_CLASS} data-testid="admin-input-password" />
        </div>
        {error && <p className="text-sm text-red-400 font-inter" data-testid="admin-login-error">{error}</p>}
        <button type="submit" disabled={submitting} className="w-full py-3 bg-neon-700 hover:bg-neon-800 disabled:opacity-60 text-white font-semibold rounded-md transition-colors font-inter flex items-center justify-center gap-2" data-testid="admin-login-submit">
          {submitting && <Loader2 size={16} className="animate-spin" />}
          {submitting ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
