import { useParams, Link, Navigate } from 'react-router-dom';
import { CheckCircle, FileText, ArrowRight } from 'lucide-react';
import { getSectorBySlug, sectors } from '@/data/sectors';
import Breadcrumb from '@/components/Breadcrumb';

export default function SectorPage() {
  const { sector: sectorSlug } = useParams();
  const sector = getSectorBySlug(sectorSlug);
  if (!sector) return <Navigate to="/" replace />;

  return (
    <div className="bg-ice-100 min-h-screen">
      <div className="bg-frost-900 relative py-24 overflow-hidden">
        <img src={sector.image} alt={sector.name} className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-frost-900 to-frost-900/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Sectors' }, { label: sector.name }]} />
          <div className="mt-6">
            <p className="text-xs uppercase tracking-widest text-neon-500 font-semibold mb-3 font-inter">Sector</p>
            <h1 className="font-fraunces text-4xl sm:text-5xl text-white mb-3" data-testid="sector-h1">{sector.name}</h1>
            <p className="text-xl text-neon-500 mb-4 font-inter">{sector.tagline}</p>
            <p className="text-frost-500 max-w-2xl text-lg font-inter">{sector.description}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-fraunces text-2xl text-ink-900 mb-6">How KPR serves {sector.name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sector.benefits.map(benefit => (
                  <div key={benefit.title} className="bg-white border border-ice-300 rounded-xl p-5" data-testid={`benefit-${benefit.title.toLowerCase().replace(/ /g, '-')}`}>
                    <div className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-neon-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-ink-900 text-sm mb-1 font-inter">{benefit.title}</h3>
                        <p className="text-xs text-frost-700 leading-relaxed font-inter">{benefit.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-ice-300 rounded-xl p-6">
              <h2 className="font-fraunces text-xl text-ink-900 mb-4">Pack formats for this sector</h2>
              <div className="overflow-x-auto">
                <table className="w-full font-mono text-sm" data-testid="pack-formats-table">
                  <thead>
                    <tr className="border-b border-ice-300">
                      <th className="text-left py-2 px-3 text-xs uppercase tracking-wider text-frost-700">Format</th>
                      <th className="text-left py-2 px-3 text-xs uppercase tracking-wider text-frost-700">Typical use</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sector.packFormats.map((pf, i) => (
                      <tr key={i} className="border-b border-ice-300/50 hover:bg-ice-100 transition-colors last:border-0">
                        <td className="py-3 px-3 text-ink-900 font-medium">{pf.format}</td>
                        <td className="py-3 px-3 text-frost-700">{pf.use}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white border border-ice-300 rounded-xl p-6">
              <h2 className="font-fraunces text-xl text-ink-900 mb-4">Documentation provided</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sector.documentation.map(doc => (
                  <div key={doc} className="flex items-center gap-2 text-sm text-frost-700 font-inter">
                    <FileText size={14} className="text-neon-500 flex-shrink-0" />
                    {doc}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white border border-ice-300 rounded-xl p-6">
              <h3 className="font-fraunces text-lg text-ink-900 mb-3">Request a sample</h3>
              <p className="text-sm text-frost-700 mb-4 font-inter">Discuss supply requirements and sample the relevant product formats for your operation.</p>
              <Link to="/request-a-sample" className="block w-full text-center py-3 bg-neon-500 hover:bg-neon-600 text-white font-medium rounded-md transition-colors text-sm mb-3 font-inter" data-testid="sector-request-sample">
                Request a sample
              </Link>
              <Link to="/contact" className="block w-full text-center py-3 border border-frost-700 text-frost-900 hover:bg-frost-900 hover:text-white font-medium rounded-md transition-colors text-sm font-inter">
                Contact us
              </Link>
            </div>

            <div className="bg-white border border-ice-300 rounded-xl p-6">
              <h3 className="font-fraunces text-base text-ink-900 mb-4">Other sectors</h3>
              <ul className="space-y-1">
                {sectors.filter(s => s.id !== sector.id).map(s => (
                  <li key={s.id}>
                    <Link to={`/sectors/${s.slug}`} className="flex items-center gap-2 text-sm text-frost-700 hover:text-neon-500 transition-colors py-1.5 border-b border-ice-300/50 last:border-0 font-inter">
                      <ArrowRight size={12} className="flex-shrink-0" />
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
