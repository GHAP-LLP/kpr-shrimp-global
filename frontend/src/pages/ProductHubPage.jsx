import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getCategoryBySlug, COUNT_SIZES } from '@/data/products';
import Breadcrumb from '@/components/Breadcrumb';

export default function ProductHubPage() {
  const { category: categorySlug } = useParams();
  const category = getCategoryBySlug(categorySlug);
  if (!category) return <Navigate to="/products" replace />;

  return (
    <div className="bg-ice-100 min-h-screen">
      <div className="bg-frost-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Products', to: '/products' }, { label: category.name }]} />
          <h1 className="font-fraunces text-4xl sm:text-5xl text-white mt-6 mb-2" data-testid="product-hub-h1">{category.name}</h1>
          <p className="text-xl text-neon-500 font-medium mb-3 font-inter">{category.tagline}</p>
          <p className="text-frost-500 max-w-2xl font-inter">{category.description}</p>
        </div>
      </div>

      <section className="py-16" data-testid="product-hub-variants">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-fraunces text-2xl text-ink-900 mb-8">Available variants</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.variants.map(variant => (
              <Link key={variant.id} to={`/products/${categorySlug}/${variant.slug}`}
                className="group bg-white border border-ice-300 rounded-xl p-5 hover:border-frost-500 hover:-translate-y-1 hover:shadow-sm transition-all duration-200"
                data-testid={`variant-card-${variant.slug}`}>
                <div className="mb-3">
                  <span className="inline-block text-xs font-mono bg-frost-900 text-white px-2.5 py-1 rounded mb-2">{variant.name}</span>
                  <h3 className="font-fraunces text-lg text-ink-900">{variant.fullName}</h3>
                </div>
                <p className="text-sm text-frost-700 leading-relaxed mb-4 font-inter">{variant.description.substring(0, 110)}...</p>
                <div className="space-y-1.5 mb-4">
                  <div className="flex gap-2 text-xs font-mono">
                    <span className="text-frost-500 w-20 flex-shrink-0">Sizes:</span>
                    <span className="text-ink-900 truncate">{variant.specs.availableSizes.join(' · ')}</span>
                  </div>
                  <div className="flex gap-2 text-xs font-mono">
                    <span className="text-frost-500 w-20 flex-shrink-0">Pack:</span>
                    <span className="text-ink-900">{variant.specs.packFormats[0]}</span>
                  </div>
                </div>
                <span className="flex items-center gap-1 text-neon-500 text-sm font-medium group-hover:gap-2 transition-all font-inter">
                  View full spec <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {category.slug === 'frozen-raw-shrimp' && (
        <section className="py-16 bg-white" data-testid="size-guide">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-fraunces text-2xl text-ink-900 mb-2">Count size guide</h2>
            <p className="text-frost-700 mb-6 font-inter">All frozen raw shrimp are available in the following count sizes, subject to variant.</p>
            <div className="overflow-x-auto rounded-xl border border-ice-300">
              <table className="w-full font-mono text-sm" data-testid="count-size-table">
                <thead>
                  <tr className="bg-frost-900 text-white">
                    <th className="text-left py-3 px-4 text-xs uppercase tracking-wider">Count</th>
                    <th className="text-left py-3 px-4 text-xs uppercase tracking-wider">Name</th>
                    <th className="text-left py-3 px-4 text-xs uppercase tracking-wider">Per kg</th>
                    <th className="text-left py-3 px-4 text-xs uppercase tracking-wider hidden sm:table-cell">Typical use</th>
                  </tr>
                </thead>
                <tbody>
                  {COUNT_SIZES.map((row, i) => (
                    <tr key={row.count} className={`border-t border-ice-300 hover:bg-ice-100 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-ice-100/40'}`}>
                      <td className="py-3 px-4 text-ink-900 font-semibold">{row.count}</td>
                      <td className="py-3 px-4 text-ink-900">{row.name}</td>
                      <td className="py-3 px-4 text-frost-700">{row.perKg}</td>
                      <td className="py-3 px-4 text-frost-700 hidden sm:table-cell">{row.typicalUse}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      <section className="py-12 bg-ice-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-ice-300 rounded-xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-fraunces text-xl text-ink-900 mb-2">Request a sample</h3>
              <p className="text-sm text-frost-700 font-inter">Assess specification and quality fit before committing to volume.</p>
            </div>
            <Link to="/request-a-sample" className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-neon-500 hover:bg-neon-600 text-white font-medium rounded-md transition-colors font-inter" data-testid="hub-request-sample">
              Request a sample <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
