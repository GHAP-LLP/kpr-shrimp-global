import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { productCategories, getCategoryBySlug, getVariantBySlug } from '@/data/products';
import Breadcrumb from '@/components/Breadcrumb';
import { buildMetadata } from '@/lib/metadata';
import { FadeUp } from '@/components/FadeUp';

export async function generateStaticParams() {
  return productCategories.flatMap(cat =>
    cat.variants.map(v => ({ category: cat.slug, variant: v.slug }))
  );
}

export async function generateMetadata({ params }) {
  const { category: categorySlug, variant: variantSlug } = await params;
  const variant = getVariantBySlug(categorySlug, variantSlug);
  if (!variant) return {};
  return buildMetadata({
    title: variant.fullName,
    description: `${variant.fullName} frozen prawn from Indo Aquatic. ${variant.description.split('.')[0]}.`,
    path: `/products/${categorySlug}/${variantSlug}`,
    image: variant.image,
  });
}

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
    <div className="overflow-x-auto rounded-xl border border-ice-300 shadow-sm" data-testid="spec-table">
      <table className="w-full font-mono text-sm">
        <thead>
          <tr className="bg-ice-300 border-b border-ice-300">
            <th className="text-left py-3 px-4 text-xs uppercase tracking-wider w-1/3 text-frost-700">Specification</th>
            <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-frost-700">Value</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.label} className={`border-t border-ice-300/50 hover:bg-ice-100 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-ice-100/50'}`}>
              <td className="py-3 px-4 text-frost-700">{row.label}</td>
              <td className="py-3 px-4 text-ink-900 font-medium">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function ProductVariantPage({ params }) {
  const { category: categorySlug, variant: variantSlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  const variant = getVariantBySlug(categorySlug, variantSlug);
  if (!category || !variant) notFound();

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: variant.fullName,
    description: variant.description,
    image: variant.image,
    category: `Frozen Seafood / ${category.name}`,
    brand: { '@type': 'Brand', name: 'Indo Aquatic' },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'GBP',
      seller: { '@type': 'Organization', '@id': 'https://www.indoaquaticltd.com/#organization', name: 'Indo Aquatic UK Ltd' },
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Products', item: 'https://www.indoaquaticltd.com/products' },
      { '@type': 'ListItem', position: 2, name: category.name, item: `https://www.indoaquaticltd.com/products/${categorySlug}` },
      { '@type': 'ListItem', position: 3, name: variant.fullName },
    ],
  };

  return (
    <div className="bg-ice-100 min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([productSchema, breadcrumbSchema]) }} />

      <div className="bg-frost-900 py-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Products', href: '/products' },
            { label: category.name, href: `/products/${categorySlug}` },
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

          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border border-ice-300 rounded-xl overflow-hidden shadow-sm">
              <img src={variant.image} alt={variant.fullName} className="w-full aspect-video object-cover" />
              <div className="p-6">
                <SectionLabel number="01" text="About This Product" />
                <h2 className="font-fraunces text-xl text-ink-900 mb-3">About this product</h2>
                <p className="text-frost-700 leading-relaxed font-inter">{variant.description}</p>
              </div>
            </div>

            <div data-testid="spec-table-section">
              <SectionLabel number="02" text="Product Specification" />
              <h2 className="font-fraunces text-xl text-ink-900 mb-4">Product specification</h2>
              <SpecTable specs={variant.specs} />
            </div>

            <div className="bg-white border border-ice-300 rounded-xl p-6 shadow-sm">
              <SectionLabel number="03" text="Use Cases" />
              <h2 className="font-fraunces text-xl text-ink-900 mb-4">Typical use cases</h2>
              <ul className="space-y-3">
                {variant.useCases.map(use => (
                  <li key={use} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-500 flex-shrink-0 mt-2" />
                    <span className="text-frost-700 text-sm font-inter">{use}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-neon-500 rounded-xl p-6">
              <h3 className="font-fraunces text-lg text-white mb-3">Request a frozen sample</h3>
              <p className="text-white/80 text-sm mb-4 font-inter">Assess this product's specification and quality before committing to volume.</p>
              <Link href="/request-a-sample" className="block w-full text-center py-3 bg-frost-900 hover:bg-ink-900 text-white font-medium rounded-md transition-colors text-sm font-inter" data-testid="sidebar-request-sample">
                Request a frozen sample
              </Link>
            </div>

            <div className="bg-white border border-ice-300 rounded-xl p-6 shadow-sm">
              <h3 className="font-fraunces text-base text-ink-900 mb-4">Other variants</h3>
              <ul className="space-y-1">
                {category.variants.filter(v => v.id !== variant.id).map(v => (
                  <li key={v.id}>
                    <Link href={`/products/${categorySlug}/${v.slug}`} className="flex items-center gap-2 text-sm text-frost-700 hover:text-neon-500 transition-colors py-1.5 border-b border-ice-300 last:border-0 font-inter">
                      <ArrowRight size={12} className="flex-shrink-0" />
                      {v.fullName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-ice-300 rounded-xl p-6 shadow-sm">
              <h3 className="font-fraunces text-base text-ink-900 mb-2">Need a specific spec?</h3>
              <p className="text-xs text-frost-700 mb-3 font-inter">Custom specifications available for volume buyers.</p>
              <Link href="/contact" className="block w-full text-center py-2 border border-ice-300 text-ink-900 hover:bg-ice-100 font-medium rounded-md transition-colors text-sm font-inter">
                Contact us
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
