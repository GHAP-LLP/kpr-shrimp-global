import { Link } from 'react-router-dom';
import { ArrowRight, Snowflake, Flame, UtensilsCrossed } from 'lucide-react';
import { productCategories, COUNT_SIZES } from '@/data/products';
import Breadcrumb from '@/components/Breadcrumb';

const CATEGORY_ICONS = {
  'frozen-raw-shrimp': Snowflake,
  'cooked-shrimp': Flame,
  'ready-to-cook': UtensilsCrossed,
};

function SectionLabel({ number, text }) {
  return (
    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neon-500 font-inter mb-3">
      {number} · {text}
    </p>
  );
}

export default function ProductsHubPage() {
  return (
    <div className="bg-frost-900 min-h-screen">

      {/* Page header */}
      <div className="py-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Products' }]} />
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neon-500 font-inter mt-6 mb-3">KPR Shrimp Global</p>
          <h1 className="font-fraunces text-4xl sm:text-5xl text-white mb-3" data-testid="products-hub-h1">Products</h1>
          <p className="text-frost-500 text-lg max-w-2xl font-inter">The complete range of frozen and ready-to-cook shrimp. Consistent specification across all 11 variants, supplied from a single-category specialist.</p>
        </div>
      </div>

      {/* 01 Categories */}
      <section className="py-16" data-testid="products-hub">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <SectionLabel number="01" text="Product Categories" />
            <h2 className="font-fraunces text-3xl text-white">Three formats. One specialist.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {productCategories.map(category => {
              const Icon = CATEGORY_ICONS[category.slug] || Snowflake;
              return (
                <div key={category.id} className="bg-white/5 border border-white/10 rounded-xl p-7 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-200" data-testid={`category-card-${category.slug}`}>
                  <div className="mb-4 text-frost-500">
                    <Icon size={28} />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <h2 className="font-fraunces text-xl text-white">{category.name}</h2>
                    <span className="text-xs bg-neon-500/20 text-neon-500 px-2 py-0.5 rounded-full font-mono ml-auto flex-shrink-0">{category.variantCount} variants</span>
                  </div>
                  <p className="text-sm text-frost-500 leading-relaxed mb-4 font-inter">{category.description}</p>
                  <ul className="space-y-1.5 mb-6">
                    {category.highlights.map(h => (
                      <li key={h} className="flex items-center gap-2 text-xs text-frost-500 font-inter">
                        <span className="w-1.5 h-1.5 bg-neon-500 rounded-full flex-shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <Link to={`/products/${category.slug}`} className="flex items-center gap-2 text-sm text-neon-500 font-medium hover:text-neon-600 transition-colors font-inter">
                    View range <ArrowRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 02 Count Size Reference */}
      <section className="py-16 border-t border-white/10" data-testid="sizing-reference">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <SectionLabel number="02" text="Sizing Reference" />
            <h2 className="font-fraunces text-3xl text-white mb-2">Count size reference</h2>
            <p className="text-frost-500 font-inter">Shrimp count = number of shrimp per pound (lb). Smaller count number = larger shrimp. Available across our frozen raw range.</p>
          </div>
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full font-mono text-sm" data-testid="sizing-table">
              <thead>
                <tr className="bg-white/10 border-b border-white/10">
                  <th className="text-left py-3 px-4 text-xs uppercase tracking-wider font-semibold text-frost-500">Count</th>
                  <th className="text-left py-3 px-4 text-xs uppercase tracking-wider font-semibold text-frost-500">Name</th>
                  <th className="text-left py-3 px-4 text-xs uppercase tracking-wider font-semibold text-frost-500">Per kg</th>
                  <th className="text-left py-3 px-4 text-xs uppercase tracking-wider font-semibold text-frost-500 hidden sm:table-cell">Typical use</th>
                </tr>
              </thead>
              <tbody>
                {COUNT_SIZES.map((row, i) => (
                  <tr key={row.count} className={`border-t border-white/5 hover:bg-white/5 transition-colors ${i % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.03]'}`}>
                    <td className="py-3 px-4 text-white font-semibold">{row.count}</td>
                    <td className="py-3 px-4 text-white">{row.name}</td>
                    <td className="py-3 px-4 text-frost-500">{row.perKg}</td>
                    <td className="py-3 px-4 text-frost-500 hidden sm:table-cell">{row.typicalUse}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-16 bg-neon-500">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-fraunces text-3xl text-white mb-3">Get a sample on your bench.</h2>
          <p className="text-white/80 mb-8 font-inter">Tell us your sector and the spec you're benchmarking. We'll ship samples within 5 working days.</p>
          <Link to="/request-a-sample"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-frost-900 hover:bg-ink-900 text-white font-medium rounded-md transition-colors font-inter">
            Request a sample <ArrowRight size={14} />
          </Link>
        </div>
      </section>

    </div>
  );
}
