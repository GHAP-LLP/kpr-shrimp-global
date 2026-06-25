import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-ice-100 px-4" data-testid="not-found-page">
      <div className="text-center max-w-md">
        <div className="font-mono text-7xl font-bold text-frost-500 mb-4">404</div>
        <h1 className="font-fraunces text-2xl text-ink-900 mb-3">Page not found</h1>
        <p className="text-frost-700 mb-8 font-inter">The page you're looking for doesn't exist or has moved.</p>
        <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-neon-500 hover:bg-neon-600 text-white font-medium rounded-md transition-colors font-inter" data-testid="not-found-home-link">
          <ArrowLeft size={16} /> Back to homepage
        </Link>
      </div>
    </div>
  );
}
