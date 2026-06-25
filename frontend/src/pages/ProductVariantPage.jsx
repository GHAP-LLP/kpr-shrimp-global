import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getCategoryBySlug, getVariantBySlug } from '@/data/products';
import Breadcrumb from '@/components/Breadcrumb';

function SectionLabel({ number, text }) {
  return (
    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neon-500 font-inter mb-3">
      {number} · {text}
    </p>
  );
}

function SpecTable({ specs }) {
  const rows = Object.entries(specs).map(([key, value]) => ({
    label: key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()),
    value: Array.isArray(value) ? value.join(' · ') : value,
  }));
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10" data-testid="spec-table">
      <table className="w-full font-mono text-sm">
        <thead>
          <tr className="bg-white/10 border-b border-white/10">
            <th className="text-left py-3 px-4 text-xs uppercase tracking-wider w-1/3 text-frost-500">Specification</th>
            <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-frost-500">Value</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.label} className={`border-t border-white/5 hover:bg-white/5 transition-colors ${i % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.03]'}`}>
              <td className="py-3 px-4 text-frost-500">{row.label}</td>
              <td className="py-3 px-4 text-white font-medium">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ProductVariantPage() {
  const { category: categorySlug, variant: variantSlug } = useParams();
  const category = getCategoryBySlug(categorySlug);
  const variant = getVariantBySlug(categorySlug, variantSlug);
  if (!category || !variant) return <Navigate to={`/products/${categorySlug || ''}`} replace />;

  return (
    <div className="bg-frost-900 min-h-screen">

      {/* Header */}
      <div className="py-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Products', to: '/products' },
            { label: category.name, to: `/products/${categorySlug}` },
            { label: variant.fullName },
          ]} />
          <div className="mt-6 mb-3">
            <span className="inline-block text-xs font-mono bg-neon-500/20 text-neon-500 px-2.5 py-1 rounded">{variant.name}</span>
          </div>
          <h1 className="font-fraunces text-4xl sm:text-5xl text-white mb-3" data-testid="variant-h1">{variant.fullName}</h1>
          <p className="text-frost-500 max-w-2xl text-lg font-inter">{variant.description.split('.')[0]}.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <img src={variant.image} alt={variant.fullName} className="w-full aspect-video object-cover opacity-80" />
              <div className="p-6">
                <SectionLabel number="01" text="About This Product" />
                <h2 className="font-fraunces text-xl text-white mb-3">About this product</h2>
                <p className="text-frost-500 leading-relaxed font-inter">{variant.description}</p>
              </div>
            </div>

            <div data-testid="spec-table-section">
              <SectionLabel number="02" text="Product Specification" />
              <h2 className="font-fraunces text-xl text-white mb-4">Product specification</h2>
              <SpecTable specs={variant.specs} />
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <SectionLabel number="03" text="Use Cases" />
              <h2 className="font-fraunces text-xl text-white mb-4">Typical use cases</h2>
              <ul className="space-y-3">
                {variant.useCases.map(use => (
                  <li key={use} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-500 flex-shrink-0 mt-2" />
                    <span className="text-frost-500 text-sm font-inter">{use}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-neon-500 rounded-xl p-6">
              <h3 className="font-fraunces text-lg text-white mb-3">Request a sample</h3>
              <p className="text-white/80 text-sm mb-4 font-inter">Assess this product's specification and quality before committing to volume.</p>
              <Link to="/request-a-sample" className="block w-full text-center py-3 bg-frost-900 hover:bg-ink-900 text-white font-medium rounded-md transition-colors text-sm font-inter" data-testid="sidebar-request-sample">
                Request a sample
              </Link>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="font-fraunces text-base text-white mb-4">Other variants</h3>
              <ul className="space-y-1">
                {category.variants.filter(v => v.id !== variant.id).map(v => (
                  <li key={v.id}>
                    <Link to={`/products/${categorySlug}/${v.slug}`} className="flex items-center gap-2 text-sm text-frost-500 hover:text-neon-500 transition-colors py-1.5 border-b border-white/5 last:border-0 font-inter">
                      <ArrowRight size={12} className="flex-shrink-0" />
                      {v.fullName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="font-fraunces text-base text-white mb-2">Need a specific spec?</h3>
              <p className="text-xs text-frost-500 mb-3 font-inter">Custom specifications available for volume buyers.</p>
              <Link to="/contact" className="block w-full text-center py-2 border border-white/20 text-white hover:bg-white/10 font-medium rounded-md transition-colors text-sm font-inter">
                Contact us
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
