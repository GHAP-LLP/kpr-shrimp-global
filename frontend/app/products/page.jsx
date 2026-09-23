import Link from 'next/link';
import { ArrowRight, Snowflake, Flame, UtensilsCrossed, Shell, Fish, Layers } from 'lucide-react';
import { productCategories, COUNT_SIZES, WIDER_RANGE } from '@/data/products';
import Breadcrumb from '@/components/Breadcrumb';
import SectionLabel from '@/components/SectionLabel';
import { buildMetadata } from '@/lib/metadata';
import { FadeUp, FadeUpGrid, FadeUpItem } from '@/components/FadeUp';

export const metadata = buildMetadata({
  title: 'Products',
  description: "Browse Indo Aquatic's full range: HOSO, HLSO, PD, IQF cooked, tempura, breaded, popcorn and more. All count sizes from U/15 to 61/70. Plus a wider frozen seafood range — shellfish, whole fish, and fillets — on enquiry.",
  path: '/products',
});

const CATEGORY_ICONS = {
  'frozen-raw-shrimp': Snowflake,
  'cooked-shrimp': Flame,
  'ready-to-cook': UtensilsCrossed,
};

export default function ProductsHubPage() {
  return (
    <div className="bg-ice-100 min-h-screen">

      <div className="bg-frost-900 py-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Products' }]} />
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neon-500 font-inter mt-6 mb-3">Indo Aquatic</p>
          <h1 className="font-fraunces text-4xl sm:text-5xl text-white mb-3" data-testid="products-hub-h1">Products</h1>
          <p className="text-frost-500 text-lg max-w-2xl font-inter">The complete range of frozen and added value shrimp, plus a wider frozen seafood range supplied through the same partner network. Consistent specification across every format.</p>
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
                      <img src={category.image} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-95 group-hover:scale-105 transition-all duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-frost-900/70 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 flex items-center gap-2">
                        <div className="w-7 h-7 bg-neon-700 rounded flex items-center justify-center">
                          <Icon size={13} className="text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-fraunces text-xl text-ink-900 mb-2">{category.name}</h3>
                      <p className="text-sm text-frost-700 leading-relaxed mb-4 font-inter">{category.description}</p>
                      <ul className="space-y-1.5 mb-5">
                        {category.highlights.map(h => (
                          <li key={h} className="flex items-center gap-2 text-xs text-frost-700 font-inter">
                            <span className="w-1.5 h-1.5 bg-neon-500 rounded-full flex-shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center gap-1 text-neon-700 text-sm font-medium font-inter group-hover:gap-2 transition-all">
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

      <section id="wider-range" className="py-16 border-t border-ice-300 scroll-mt-24" data-testid="wider-range-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="mb-10">
            <SectionLabel number="02" text="Wider Seafood Range" />
            <h2 className="font-fraunces text-3xl text-ink-900 mb-3">Beyond shrimp.</h2>
            <p className="text-frost-700 font-inter max-w-2xl">Alongside our core shrimp range, we supply frozen seafood through the same vetted partner network — held to the same specification, documentation, and cold-chain standards. The range is shaped by customer requirement rather than a fixed catalogue, so tell us what your operation needs.</p>
          </FadeUp>
          <FadeUpGrid className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            {WIDER_RANGE.map((item, i) => {
              const Icon = [Shell, Fish, Layers][i] || Fish;
              return (
                <FadeUpItem key={item.id}>
                  <div className="bg-white border border-ice-300 rounded-xl p-6 h-full shadow-sm" data-testid={`wider-range-${item.id}`}>
                    <div className="w-10 h-10 bg-ice-100 border border-ice-300 rounded-lg flex items-center justify-center mb-4">
                      <Icon size={18} className="text-neon-700" />
                    </div>
                    <h3 className="font-fraunces text-lg text-ink-900 mb-2">{item.name}</h3>
                    <p className="text-sm text-frost-700 leading-relaxed font-inter">{item.desc}</p>
                  </div>
                </FadeUpItem>
              );
            })}
          </FadeUpGrid>
          <FadeUp className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-neon-700 hover:bg-neon-800 text-white text-sm font-semibold rounded-md transition-colors font-inter w-fit" data-testid="wider-range-enquire">
              Enquire about the wider range <ArrowRight size={14} />
            </Link>
            <p className="text-xs text-frost-700 font-inter">Availability, species, and specifications confirmed per enquiry.</p>
          </FadeUp>
        </div>
      </section>

      <section className="py-16 border-t border-ice-300" data-testid="sizing-reference">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <SectionLabel number="03" text="Sizing Reference" />
            <h2 className="font-fraunces text-3xl text-ink-900 mb-2">Count size reference</h2>
            <p className="text-frost-700 font-inter">Shrimp count = number of shrimp per pound (lb). Smaller count number = larger shrimp. Available across our frozen raw range.</p>
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

      <section className="py-16 bg-neon-700">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-fraunces text-3xl text-white mb-3">Get a sample on your bench.</h2>
          <p className="text-white/90 mb-8 font-inter">Tell us your sector and the spec you're benchmarking. We'll ship samples within 5 working days of confirmation.</p>
          <Link href="/request-a-sample" className="inline-flex items-center gap-2 px-8 py-3.5 bg-frost-900 hover:bg-ink-900 text-white font-medium rounded-md transition-colors font-inter">
            Request a frozen sample <ArrowRight size={14} />
          </Link>
        </div>
      </section>

    </div>
  );
}
