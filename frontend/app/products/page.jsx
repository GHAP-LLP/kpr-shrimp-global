import Link from 'next/link';
import { ArrowRight, Snowflake, Flame, UtensilsCrossed } from 'lucide-react';
import { productCategories, COUNT_SIZES } from '@/data/products';
import Breadcrumb from '@/components/Breadcrumb';
import { buildMetadata } from '@/lib/metadata';
import { FadeUp, FadeUpGrid, FadeUpItem } from '@/components/FadeUp';

export const metadata = buildMetadata({
  title: 'Products',
  description: "Browse Indo Aquatic's full range: HOSO, HLSO, PD, IQF cooked, tempura, breaded, butterfly and more. All count sizes from U/15 to 61/70. UK specialist importer.",
  path: '/products',
});

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
    <div className="bg-ice-100 min-h-screen">

      <div className="bg-frost-900 py-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Products' }]} />
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neon-500 font-inter mt-6 mb-3">Indo Aquatic</p>
          <h1 className="font-fraunces text-4xl sm:text-5xl text-white mb-3" data-testid="products-hub-h1">Products</h1>
          <p className="text-frost-500 text-lg max-w-2xl font-inter">The complete range of frozen and added value prawns. Consistent specification across all formats, supplied from a single-category specialist.</p>
        </div>
      </div>

      <section className="py-16" data-testid="products-hub">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="mb-10">
            <SectionLabel number="01" text="Product Categories" />
            <h2 className="font-fraunces text-3xl text-ink-900">Three formats. One specialist.</h2>
          </FadeUp>
          <FadeUpGrid className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {productCategories.map(category => {
              const Icon = CATEGORY_ICONS[category.slug] || Snowflake;
              return (
                <FadeUpItem key={category.id}>
                  <Link href={`/products/${category.slug}`} className="group block rounded-xl overflow-hidden border border-ice-300 bg-white hover:border-frost-500 hover:shadow-lg transition-all duration-300 h-full shadow-sm" data-testid={`category-card-${category.slug}`}>
                    <div className="relative aspect-[16/9] overflow-hidden bg-frost-900">
                      <img src={category.image} alt={category.name} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-95 group-hover:scale-105 transition-all duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-frost-900/70 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 flex items-center gap-2">
                        <div className="w-7 h-7 bg-neon-500 rounded flex items-center justify-center">
                          <Icon size={13} className="text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h2 className="font-fraunces text-xl text-ink-900 mb-2">{category.name}</h2>
                      <p className="text-sm text-frost-700 leading-relaxed mb-4 font-inter">{category.description}</p>
                      <ul className="space-y-1.5 mb-5">
                        {category.highlights.map(h => (
                          <li key={h} className="flex items-center gap-2 text-xs text-frost-700 font-inter">
                            <span className="w-1.5 h-1.5 bg-neon-500 rounded-full flex-shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center gap-1 text-neon-500 text-sm font-medium font-inter group-hover:gap-2 transition-all">
                        View range <ArrowRight size={14} />
                      </div>
                    </div>
                  </Link>
                </FadeUpItem>
              );
            })}
          </FadeUpGrid>
        </div>
      </section>

      <section className="py-16 border-t border-ice-300" data-testid="sizing-reference">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <SectionLabel number="02" text="Sizing Reference" />
            <h2 className="font-fraunces text-3xl text-ink-900 mb-2">Count size reference</h2>
            <p className="text-frost-700 font-inter">Prawn count = number of prawns per pound (lb). Smaller count number = larger prawn. Available across our frozen raw range.</p>
          </div>
          <div className="overflow-x-auto rounded-xl border border-ice-300 shadow-sm">
            <table className="w-full font-mono text-sm" data-testid="sizing-table">
              <thead>
                <tr className="bg-ice-300 border-b border-ice-300">
                  <th className="text-left py-3 px-4 text-xs uppercase tracking-wider font-semibold text-frost-700">Count</th>
                  <th className="text-left py-3 px-4 text-xs uppercase tracking-wider font-semibold text-frost-700">Name</th>
                  <th className="text-left py-3 px-4 text-xs uppercase tracking-wider font-semibold text-frost-700">Per kg</th>
                  <th className="text-left py-3 px-4 text-xs uppercase tracking-wider font-semibold text-frost-700 hidden sm:table-cell">Typical use</th>
                </tr>
              </thead>
              <tbody>
                {COUNT_SIZES.map((row, i) => (
                  <tr key={row.count} className={`border-t border-ice-300/50 hover:bg-ice-100 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-ice-100/50'}`}>
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

      <section className="py-16 bg-neon-500">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-fraunces text-3xl text-white mb-3">Get a sample on your bench.</h2>
          <p className="text-white/80 mb-8 font-inter">Tell us your sector and the spec you're benchmarking. We'll ship samples within 5 working days.</p>
          <Link href="/request-a-sample" className="inline-flex items-center gap-2 px-8 py-3.5 bg-frost-900 hover:bg-ink-900 text-white font-medium rounded-md transition-colors font-inter">
            Request a frozen sample <ArrowRight size={14} />
          </Link>
        </div>
      </section>

    </div>
  );
}
