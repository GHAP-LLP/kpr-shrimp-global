import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getCategoryBySlug, COUNT_SIZES } from '@/data/products';
import Breadcrumb from '@/components/Breadcrumb';
import SEO from '@/components/SEO';
import { FadeUp, FadeUpGrid, FadeUpItem } from '@/components/FadeUp';

function SectionLabel({ number, text }) {
  return (
    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neon-500 font-inter mb-3">
      {number} · {text}
    </p>
  );
}

export default function ProductHubPage() {
  const { category: categorySlug } = useParams();
  const category = getCategoryBySlug(categorySlug);
  if (!category) return <Navigate to="/products" replace />;

  return (
    <div className="bg-frost-900 min-h-screen">

      {/* Header */}
      <div className="py-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SEO
            title={category.name}
            description={`${category.name} from KPR Shrimp Global. ${category.description}`}
            path={`/products/${categorySlug}`}
          />
          <Breadcrumb items={[{ label: 'Products', to: '/products' }, { label: category.name }]} />
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neon-500 font-inter mt-6 mb-3">Product Category</p>
          <h1 className="font-fraunces text-4xl sm:text-5xl text-white mb-2" data-testid="product-hub-h1">{category.name}</h1>
          <p className="text-xl text-neon-500 font-medium mb-3 font-inter">{category.tagline}</p>
          <p className="text-frost-500 max-w-2xl font-inter">{category.description}</p>
        </div>
      </div>

      {/* 01 Variants */}
      <section className="py-16" data-testid="product-hub-variants">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="mb-10">
            <SectionLabel number="01" text="Available Variants" />
            <h2 className="font-fraunces text-3xl text-white">Choose your specification.</h2>
          </FadeUp>
          <FadeUpGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.variants.map(variant => (
              <FadeUpItem key={variant.id}>
                <Link to={`/products/${categorySlug}/${variant.slug}`}
                  className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 block h-full"
                  data-testid={`variant-card-${variant.slug}`}>
                  <div className="mb-3">
                    <span className="inline-block text-xs font-mono bg-neon-500/20 text-neon-500 px-2.5 py-1 rounded mb-2">{variant.name}</span>
                    <h3 className="font-fraunces text-lg text-white">{variant.fullName}</h3>
                  </div>
                  <p className="text-sm text-frost-500 leading-relaxed mb-4 font-inter">{variant.description.substring(0, 110)}...</p>
                  <div className="space-y-1.5 mb-4">
                    <div className="flex gap-2 text-xs font-mono">
                      <span className="text-frost-500/60 w-20 flex-shrink-0">Sizes:</span>
                      <span className="text-frost-500 truncate">{variant.specs.availableSizes.join(' · ')}</span>
                    </div>
                    <div className="flex gap-2 text-xs font-mono">
                      <span className="text-frost-500/60 w-20 flex-shrink-0">Pack:</span>
                      <span className="text-frost-500">{variant.specs.packFormats[0]}</span>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-neon-500 text-sm font-medium group-hover:gap-2 transition-all font-inter">
                    View full spec <ArrowRight size={14} />
                  </span>
                </Link>
              </FadeUpItem>
            ))}
          </FadeUpGrid>
        </div>
      </section>

      {/* 02 Count size guide — frozen raw only */}
      {category.slug === 'frozen-raw-shrimp' && (
        <section className="py-16 border-t border-white/10" data-testid="size-guide">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <SectionLabel number="02" text="Count Size Guide" />
              <h2 className="font-fraunces text-3xl text-white mb-2">Count size guide</h2>
              <p className="text-frost-500 font-inter">All frozen raw shrimp are available in the following count sizes, subject to variant.</p>
            </div>
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full font-mono text-sm" data-testid="count-size-table">
                <thead>
                  <tr className="bg-white/10 border-b border-white/10">
                    <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-frost-500">Count</th>
                    <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-frost-500">Name</th>
                    <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-frost-500">Per kg</th>
                    <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-frost-500 hidden sm:table-cell">Typical use</th>
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
      )}

      {/* CTA Strip */}
      <section className="py-16 bg-neon-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-fraunces text-2xl text-white mb-2">Request a sample</h3>
              <p className="text-white/80 font-inter">Assess specification and quality fit before committing to volume.</p>
            </div>
            <Link to="/request-a-sample" className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-3.5 bg-frost-900 hover:bg-ink-900 text-white font-medium rounded-md transition-colors font-inter" data-testid="hub-request-sample">
              Request a sample <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
