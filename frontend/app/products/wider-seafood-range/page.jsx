import Link from 'next/link';
import { ArrowRight, CheckCircle, Shell, Fish, Layers, MessageSquare, Search, Truck } from 'lucide-react';
import { WIDER_RANGE } from '@/data/products';
import Breadcrumb from '@/components/Breadcrumb';
import SectionLabel from '@/components/SectionLabel';
import { buildMetadata } from '@/lib/metadata';
import { FadeUp, FadeUpGrid, FadeUpItem } from '@/components/FadeUp';

export const metadata = buildMetadata({
  title: 'Wider Seafood Range',
  description: 'Frozen shellfish, whole fish, and fillets for UK trade buyers — delivered through our world-class global distribution network with the same specification discipline, documentation, and cold-chain standards as our core shrimp range.',
  path: '/products/wider-seafood-range',
});

const RANGE_ICONS = { shellfish: Shell, 'whole-fish': Fish, 'fish-fillets': Layers };

const HOW_IT_WORKS = [
  { icon: MessageSquare, step: '01', title: 'Tell us the requirement', desc: 'Species, format, size grading, volumes, and delivery needs — as specific or as open as your brief allows.' },
  { icon: Search, step: '02', title: 'We spec and confirm it', desc: 'We match the requirement through our global distribution network, lock the specification, and confirm pricing, documentation, and lead time.' },
  { icon: Truck, step: '03', title: 'Documented UK supply', desc: 'Cold-chain shipped and delivered with the same documentation as our shrimp range — spec sheet, origin, temperature records, and lot traceability.' },
];

const STANDARDS = [
  'Full technical spec sheet per product',
  'Country of origin certificate',
  'Cold chain temperature record',
  'Allergen declaration',
  'Lot-level traceability reference',
  'Nutritional information on request',
];

export default function WiderSeafoodRangePage() {
  return (
    <div className="bg-ice-100 min-h-screen">

      <div className="bg-frost-900 py-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Products', href: '/products' }, { label: 'Wider Seafood Range' }]} />
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neon-500 font-inter mt-6 mb-3">Beyond Shrimp</p>
          <h1 className="font-fraunces text-4xl sm:text-5xl text-white mb-3" data-testid="wider-range-h1">Wider Seafood Range</h1>
          <p className="text-xl text-neon-500 font-medium mb-3 font-inter">Supplied to your requirement. Held to our standards.</p>
          <p className="text-frost-500 max-w-2xl font-inter">Alongside our core shrimp range, we supply frozen shellfish, whole fish, and fillets through our world-class global distribution network — with the same specification discipline, documentation, and unbroken cold chain. The range is shaped by what your operation needs, not a fixed catalogue.</p>
        </div>
      </div>

      <section className="py-16" data-testid="wider-range-categories">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="mb-10">
            <SectionLabel number="01" text="What We Supply" />
            <h2 className="font-fraunces text-3xl text-ink-900">Three lines, specified per enquiry.</h2>
          </FadeUp>
          <FadeUpGrid className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WIDER_RANGE.map(item => {
              const Icon = RANGE_ICONS[item.id] || Fish;
              return (
                <FadeUpItem key={item.id}>
                  <div className="bg-white border border-ice-300 rounded-xl p-6 h-full shadow-sm" data-testid={`wider-card-${item.id}`}>
                    <div className="w-11 h-11 bg-ice-100 border border-ice-300 rounded-lg flex items-center justify-center mb-4">
                      <Icon size={20} className="text-neon-700" />
                    </div>
                    <h3 className="font-fraunces text-xl text-ink-900 mb-2">{item.name}</h3>
                    <p className="text-sm text-frost-700 leading-relaxed font-inter mb-4">{item.desc}</p>
                    <ul className="space-y-1.5">
                      {item.formats.map(f => (
                        <li key={f} className="flex items-center gap-2 text-xs text-frost-700 font-inter">
                          <span className="w-1.5 h-1.5 bg-neon-700 rounded-full flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeUpItem>
              );
            })}
          </FadeUpGrid>
          <FadeUp className="mt-6">
            <p className="text-xs text-frost-700 font-inter">Species availability, specifications, and pricing are confirmed per enquiry — this range is flexible by design.</p>
          </FadeUp>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-frost-900" data-testid="wider-range-how">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="mb-12">
            <SectionLabel number="02" text="How It Works" dark />
            <h2 className="font-fraunces text-3xl text-white mb-3">One conversation, not a catalogue.</h2>
            <p className="text-frost-500 font-inter max-w-2xl">This range works the way our shrimp supply does — backed by a global distribution network built to the highest quality standards, spanning the world's leading producing regions.</p>
          </FadeUp>
          <FadeUpGrid className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map(({ icon: Icon, step, title, desc }) => (
              <FadeUpItem key={step}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-neon-500/20 border border-neon-500/40 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={16} className="text-neon-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-neon-500 uppercase tracking-widest font-inter mb-1">{step}</p>
                    <h3 className="font-fraunces text-lg text-white mb-2">{title}</h3>
                    <p className="text-sm text-frost-500 leading-relaxed font-inter">{desc}</p>
                  </div>
                </div>
              </FadeUpItem>
            ))}
          </FadeUpGrid>
        </div>
      </section>

      <section className="py-16" data-testid="wider-range-standards">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <SectionLabel number="03" text="Same Standards" />
            <h2 className="font-fraunces text-3xl text-ink-900 mb-3">Documented like everything else we ship.</h2>
            <p className="text-frost-700 font-inter max-w-2xl">Across the entire range, every consignment carries the paperwork UK retail and foodservice buyers need.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {STANDARDS.map(doc => (
              <div key={doc} className="flex items-center gap-3 bg-white border border-ice-300 rounded-lg px-4 py-3 shadow-sm">
                <CheckCircle size={14} className="text-neon-700 flex-shrink-0" />
                <span className="text-sm text-frost-700 font-inter">{doc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-neon-700">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-fraunces text-3xl text-white mb-3">Tell us what your operation needs.</h2>
          <p className="text-white/90 mb-8 font-inter">Send the species, formats, and volumes you're buying today — we'll come back with specification, pricing, and lead time.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-frost-900 hover:bg-ink-900 text-white font-medium rounded-md transition-colors font-inter" data-testid="wider-range-contact">
              Enquire about the range <ArrowRight size={14} />
            </Link>
            <Link href="/request-a-sample" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/40 text-white hover:bg-white/10 font-medium rounded-md transition-colors font-inter">
              Request a frozen sample
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
