import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { productCategories, getCategoryBySlug } from '@/data/products';
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
        { '@type': 'ListItem', position: 1, name: 'Products', item: 'https://iaquatic.com/products' },
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
        url: `https://iaquatic.com/products/${categorySlug}/${v.slug}`,
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
                  className="group bg-white border border-ice-300 rounded-xl overflow-hidden hover:border-frost-500 hover:-translate-y-1 hover:shadow-md transition-all duration-200 block h-full shadow-sm"
                  data-testid={`variant-card-${variant.slug}`}>
                  <div className="relative aspect-[16/10] overflow-hidden bg-frost-900">
                    <img src={variant.image} alt={`${variant.fullName} frozen shrimp`} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 text-xs font-mono bg-frost-900/80 text-white px-2.5 py-1 rounded backdrop-blur-sm">{variant.name}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-fraunces text-lg text-ink-900 mb-2">{variant.fullName}</h3>
                    <p className="text-sm text-frost-700 leading-relaxed mb-4 font-inter">{excerpt(variant.description)}</p>
                    <span className="flex items-center gap-1 text-neon-700 text-sm font-medium group-hover:gap-2 transition-all font-inter">
                      View product <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </FadeUpItem>
            ))}
          </FadeUpGrid>
        </div>
      </section>

      <section className="py-16 bg-neon-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-fraunces text-2xl text-white mb-2">Interested in this range?</h3>
              <p className="text-white/90 font-inter">Tell us your sector and volumes — we'll come back with availability and pricing.</p>
            </div>
            <Link href="/contact" className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-3.5 bg-frost-900 hover:bg-ink-900 text-white font-medium rounded-md transition-colors font-inter" data-testid="hub-contact-us">
              Contact us <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
