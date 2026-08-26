import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-frost-900 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <p className="text-neon-500 font-mono text-sm tracking-widest uppercase mb-6">404</p>
        <h1 className="font-fraunces text-5xl text-white mb-4">Page not found</h1>
        <p className="text-frost-500 font-inter mb-10">The page you're looking for doesn't exist or has been moved.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-neon-500 hover:bg-neon-600 text-white font-medium rounded-md transition-colors font-inter">
            Back to home <ArrowRight size={14} />
          </Link>
          <Link href="/products" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/20 text-white hover:bg-white/10 font-medium rounded-md transition-colors font-inter">
            View products
          </Link>
        </div>
      </div>
    </div>
  );
}
