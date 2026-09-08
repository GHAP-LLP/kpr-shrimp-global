import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { productCategories, getCategoryBySlug, COUNT_SIZES } from '@/data/products';
import Breadcrumb from '@/components/Breadcrumb';
import SectionLabel from '@/components/SectionLabel';
import { buildMetadata } from '@/lib/metadata';
import { FadeUp, FadeUpGrid, FadeUpItem } from '@/components/FadeUp';

export async function generateStaticParams() {
  return productCategories.map(cat => ({ category: cat.slug }));
}

export async function generateMetadata({ params }) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) return {};
  return buildMetadata({
    title: category.name,
    description: `${category.name} from Indo Aquatic. ${category.description}`,
    path: `/products/${categorySlug}`,
  });
}

// Truncate at a word boundary; only append an ellipsis when text was actually cut.
function excerpt(text, maxLength = 110) {
  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : maxLength)}…`;
}

export default async function ProductHubPage({ params }) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) notFound();

  const categorySchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Products', item: 'https://www.indoaquaticltd.com/products' },
        { '@type': 'ListItem', position: 2, name: category.name },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: category.name,
      description: category.description,
      itemListElement: category.variants.map((v, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: v.fullName,
        url: `https://www.indoaquaticltd.com/products/${categorySlug}/${v.slug}`,
      })),
    },
  ];

  return (
    <div className="bg-ice-100 min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }} />

      <div className="bg-frost-900 py-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Products', href: '/products' }, { label: category.name }]} />
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neon-500 font-inter mt-6 mb-3">Product Category</p>
          <h1 className="font-fraunces text-4xl sm:text-5xl text-white mb-2" data-testid="product-hub-h1">{category.name}</h1>
          <p className="text-xl text-neon-500 font-medium mb-3 font-inter">{category.tagline}</p>
          <p className="text-frost-500 max-w-2xl font-inter">{category.description}</p>
        </div>
      </div>

      <section className="py-16" data-testid="product-hub-variants">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="mb-10">
            <SectionLabel number="01" text="Available Variants" />
            <h2 className="font-fraunces text-3xl text-ink-900">Choose your specification.</h2>
          </FadeUp>
          <FadeUpGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.variants.map(variant => (
              <FadeUpItem key={variant.id}>
                <Link href={`/products/${categorySlug}/${variant.slug}`}
                  className="group bg-white border border-ice-300 rounded-xl p-6 hover:bg-ice-100 hover:border-frost-500 hover:-translate-y-1 hover:shadow-md transition-all duration-200 block h-full shadow-sm"
                  data-testid={`variant-card-${variant.slug}`}>
                  <div className="mb-3">
                    <span className="inline-block text-xs font-mono bg-neon-500/20 text-neon-700 px-2.5 py-1 rounded mb-2">{variant.name}</span>
                    <h3 className="font-fraunces text-lg text-ink-900">{variant.fullName}</h3>
                  </div>
                  <p className="text-sm text-frost-700 leading-relaxed mb-4 font-inter">{excerpt(variant.description)}</p>
                  <div className="space-y-1.5 mb-4">
                    {variant.specs.availableSizes ? (
                      <div className="flex gap-2 text-xs font-mono">
                        <span className="text-frost-500 w-20 flex-shrink-0">Sizes:</span>
                        <span className="text-frost-700 truncate">{variant.specs.availableSizes.join(' · ')}</span>
                      </div>
                    ) : variant.specs.basePrawn ? (
                      <div className="flex gap-2 text-xs font-mono">
                        <span className="text-frost-500 w-20 flex-shrink-0">Base:</span>
                        <span className="text-frost-700 truncate">{variant.specs.basePrawn}</span>
                      </div>
                    ) : null}
                    <div className="flex gap-2 text-xs font-mono">
                      <span className="text-frost-500 w-20 flex-shrink-0">Pack:</span>
                      <span className="text-frost-700">{variant.specs.packFormats[0]}</span>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-neon-700 text-sm font-medium group-hover:gap-2 transition-all font-inter">
                    View full spec <ArrowRight size={14} />
                  </span>
                </Link>
              </FadeUpItem>
            ))}
          </FadeUpGrid>
        </div>
      </section>

      {category.slug === 'frozen-raw-prawns' && (
        <section className="py-16 border-t border-ice-300" data-testid="size-guide">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <SectionLabel number="02" text="Count Size Guide" />
              <h2 className="font-fraunces text-3xl text-ink-900 mb-2">Count size guide</h2>
              <p className="text-frost-700 font-inter">All frozen raw prawns are available in the following count sizes, subject to variant.</p>
            </div>
            <div className="overflow-x-auto rounded-xl border border-ice-300 shadow-sm">
              <table className="w-full font-mono text-sm" data-testid="count-size-table">
                <thead>
                  <tr className="bg-ice-300 border-b border-ice-300">
                    <th className="text-left py-3 px-4 text-xs uppercase tracking-wider font-semibold text-frost-700">Count</th>
                    <th className="text-left py-3 px-4 text-xs uppercase tracking-wider font-semibold text-frost-700">Name</th>
                    <th className="text-left py-3 px-4 text-xs uppercase tracking-wider font-semibold text-frost-700">Per kg</th>
                    <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-frost-700 hidden sm:table-cell">Typical use</th>
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
      )}

      <section className="py-16 bg-neon-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-fraunces text-2xl text-white mb-2">Try it before you commit</h3>
              <p className="text-white/90 font-inter">Assess specification and quality fit before committing to volume.</p>
            </div>
            <Link href="/request-a-sample" className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-3.5 bg-frost-900 hover:bg-ink-900 text-white font-medium rounded-md transition-colors font-inter" data-testid="hub-request-sample">
              Request a frozen sample <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
