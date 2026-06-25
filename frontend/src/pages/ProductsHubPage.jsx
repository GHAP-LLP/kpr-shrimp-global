import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { productCategories, COUNT_SIZES } from '@/data/products';
import Breadcrumb from '@/components/Breadcrumb';

export default function ProductsHubPage() {
  return (
    <div className="bg-ice-100 min-h-screen">
      <div className="bg-frost-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Products' }]} />
          <h1 className="font-fraunces text-4xl sm:text-5xl text-white mt-6 mb-3" data-testid="products-hub-h1">Products</h1>
          <p className="text-frost-500 text-lg max-w-2xl font-inter">The complete range of frozen and ready-to-cook shrimp. Consistent specification across all 11 variants, supplied from a single-category specialist.</p>
        </div>
      </div>

      <section className="py-16" data-testid="products-hub">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {productCategories.map(category => (
              <div key={category.id} className="bg-white border border-ice-300 rounded-xl overflow-hidden" data-testid={`category-card-${category.slug}`}>
                <img src={category.image} alt={category.name} className="w-full aspect-[4/3] object-cover" />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <h2 className="font-fraunces text-xl text-ink-900">{category.name}</h2>
                    <span className="text-xs bg-ice-100 text-frost-700 px-2 py-0.5 rounded-full font-mono ml-auto flex-shrink-0">{category.variantCount} variants</span>
                  </div>
                  <p className="text-sm text-frost-700 leading-relaxed mb-4 font-inter">{category.description}</p>
                  <ul className="space-y-1.5 mb-5">
                    {category.highlights.map(h => (
                      <li key={h} className="flex items-center gap-2 text-xs text-frost-700 font-inter">
                        <span className="w-1.5 h-1.5 bg-neon-500 rounded-full flex-shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <Link to={`/products/${category.slug}`} className="flex items-center gap-2 text-sm text-neon-500 font-medium hover:text-neon-600 transition-colors font-inter">
                    View range <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" data-testid="sizing-reference">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-fraunces text-2xl sm:text-3xl text-ink-900 mb-2">Count size reference</h2>
          <p className="text-frost-700 mb-8 font-inter">Shrimp count = number of shrimp per pound (lb). Smaller count number = larger shrimp. Available across our frozen raw range.</p>
          <div className="overflow-x-auto rounded-xl border border-ice-300">
            <table className="w-full font-mono text-sm" data-testid="sizing-table">
              <thead>
                <tr className="bg-frost-900 text-white">
                  <th className="text-left py-3 px-4 text-xs uppercase tracking-wider font-semibold">Count</th>
                  <th className="text-left py-3 px-4 text-xs uppercase tracking-wider font-semibold">Name</th>
                  <th className="text-left py-3 px-4 text-xs uppercase tracking-wider font-semibold">Per kg</th>
                  <th className="text-left py-3 px-4 text-xs uppercase tracking-wider font-semibold hidden sm:table-cell">Typical use</th>
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
    </div>
  );
}
