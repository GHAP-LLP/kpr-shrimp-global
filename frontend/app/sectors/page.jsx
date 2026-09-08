import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { sectors } from '@/data/sectors';
import Breadcrumb from '@/components/Breadcrumb';
import SectionLabel from '@/components/SectionLabel';
import { buildMetadata } from '@/lib/metadata';
import { FadeUp, FadeUpGrid, FadeUpItem } from '@/components/FadeUp';

export const metadata = buildMetadata({
  title: 'Sectors',
  description: 'Frozen prawn supply for UK retail private label, retail processors, foodservice, and wholesale distributors. Sector-matched formats, pack sizes, and documentation from Indo Aquatic.',
  path: '/sectors',
});

export default function SectorsHubPage() {
  return (
    <div className="bg-ice-100 min-h-screen">

      <div className="bg-frost-900 py-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Sectors' }]} />
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neon-500 font-inter mt-6 mb-3">Indo Aquatic</p>
          <h1 className="font-fraunces text-4xl sm:text-5xl text-white mb-3" data-testid="sectors-hub-h1">Sectors we serve</h1>
          <p className="text-frost-500 text-lg max-w-2xl font-inter">Different buyers need different formats, pack sizes, and paperwork. We supply four UK trade sectors, each with sector-matched specification and documentation.</p>
        </div>
      </div>

      <section className="py-16" data-testid="sectors-hub">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="mb-10">
            <SectionLabel number="01" text="Who We Supply" />
            <h2 className="font-fraunces text-3xl text-ink-900">Choose your sector.</h2>
          </FadeUp>
          <FadeUpGrid className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {sectors.map(sector => (
              <FadeUpItem key={sector.id}>
                <Link href={`/sectors/${sector.slug}`} className="group block rounded-xl overflow-hidden border border-ice-300 bg-white hover:border-frost-500 hover:shadow-lg transition-all duration-300 h-full shadow-sm" data-testid={`sector-hub-card-${sector.slug}`}>
                  <div className="relative aspect-[16/7] overflow-hidden bg-frost-900">
                    <img src={sector.image} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-frost-900/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4">
                      <h3 className="font-fraunces text-xl text-white">{sector.name}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm font-medium text-neon-700 font-inter mb-2">{sector.tagline}</p>
                    <p className="text-sm text-frost-700 leading-relaxed mb-4 font-inter">{sector.description}</p>
                    <div className="flex items-center gap-1 text-neon-700 text-sm font-medium font-inter group-hover:gap-2 transition-all">
                      How we serve this sector <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              </FadeUpItem>
            ))}
          </FadeUpGrid>
        </div>
      </section>

      <section className="py-16 bg-neon-700">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-fraunces text-3xl text-white mb-3">Not sure which fits?</h2>
          <p className="text-white/90 mb-8 font-inter">Tell us how you buy and we'll recommend the right formats, counts, and pack sizes for your operation.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 bg-frost-900 hover:bg-ink-900 text-white font-medium rounded-md transition-colors font-inter" data-testid="sectors-hub-contact-btn">
            Talk to our team <ArrowRight size={14} />
          </Link>
        </div>
      </section>

    </div>
  );
}
