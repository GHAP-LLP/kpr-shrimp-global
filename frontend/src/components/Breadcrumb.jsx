import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumb({ items }) {
  return (
    <nav className="flex flex-wrap items-center gap-1.5 text-sm text-frost-500" aria-label="Breadcrumb" data-testid="breadcrumb">
      <Link href="/" className="flex items-center gap-1 hover:text-white transition-colors">
        <Home size={14} />
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight size={12} className="text-frost-700" />
          {item.href ? (
            <Link href={item.href} className="hover:text-white transition-colors">{item.label}</Link>
          ) : (
            <span className="text-white/80">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
