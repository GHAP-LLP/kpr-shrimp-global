import Link from 'next/link';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Corporate Policies',
  description: "Indo Aquatic UK Ltd's corporate policies — conduct, ethics, safety, sourcing, and legal compliance for a UK frozen prawn importer and distributor.",
  path: '/policies',
});

const POLICY_INDEX = [
  'Code of Conduct',
  'Human Rights and Modern Slavery',
  'Anti-bribery and Corruption',
  'Fraud',
  'Tax',
  'Risk Management',
  'Inclusion, Diversity and Equal Opportunities',
  'Fire, Health and Safety',
  'Food & Product Safety and Integrity',
  'Data Protection and Privacy',
  'Trading Standards and Consumer Protection',
  'Laws that Protect Grocery Suppliers (GSCOP)',
  'Supply Chain and Responsible Sourcing',
  'Sanctions and Export Controls',
  'Charity Partnerships and Fundraising',
  'Climate and Energy',
  'Food Waste',
  'Product Packaging',
  'Animal Welfare (Aquaculture)',
  'Whistleblowing and Speak Up',
];

function Section({ number, title, children }) {
  return (
    <section id={`policy-${number}`} className="mb-10 scroll-mt-24" data-testid={`policy-${number}`}>
      <h2 className="font-fraunces text-2xl text-ink-900 mb-4">{number}. {title}</h2>
      <div className="space-y-3 text-sm text-frost-700 leading-relaxed font-inter">{children}</div>
    </section>
  );
}

export default function PoliciesPage() {
  return (
    <div className="bg-ice-100 min-h-screen">
      <div className="bg-frost-900 py-16 border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-neon-500 font-inter mb-4">Governance</p>
          <h1 className="font-fraunces text-4xl sm:text-5xl text-white mb-3">Corporate Policies</h1>
          <p className="text-frost-500 font-inter max-w-2xl">
            The commitments detailed below apply to Indo Aquatic UK Ltd's own conduct as a UK-registered
            importer and distributor of frozen prawns. They reflect UK law as it applies to a business of
            our size and sector — not every obligation that applies to a large listed retailer applies to
            us, and we've noted where that's the case. Last updated: 26 August 2026.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <div className="mb-10 p-5 rounded-lg bg-ice-300/60 border border-ice-300 text-sm text-frost-700 font-inter">
          <p><strong className="text-ink-900">Registered company:</strong> Indo Aquatic Ltd.<br />
          <strong className="text-ink-900">Company number:</strong> 17230607<br />
          <strong className="text-ink-900">Registered address:</strong> Hall Farm Burrill Lane, Brantingham, Brough, HU15 1YG, United Kingdom<br />
          <strong className="text-ink-900">Email:</strong> <a href="mailto:info@indoaquaticltd.com" className="text-neon-500 hover:underline">info@indoaquaticltd.com</a></p>
        </div>

        <nav aria-label="Policy sections" className="mb-12 p-5 rounded-lg bg-white/60 border border-ice-300">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-frost-700 font-inter mb-3">On this page</p>
          <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm font-inter">
            {POLICY_INDEX.map((title, i) => (
              <li key={i}>
                <a href={`#policy-${i + 1}`} className="text-frost-700 hover:text-neon-500 transition-colors">{i + 1}. {title}</a>
              </li>
            ))}
          </ol>
        </nav>

        <p className="text-xs text-frost-500 font-inter mb-10 italic">
          These policies are maintained internally and describe our current practice; they are not a substitute
          for legal advice. If you require a formally reviewed copy for a due-diligence process, please contact us.
        </p>

        <Section number={1} title="Code of Conduct">
          <p>We conduct our business honestly, fairly, and in compliance with UK law. Every person acting on
          behalf of Indo Aquatic — employees, agents, and anyone negotiating on our behalf with suppliers or
          customers — is expected to act with integrity, avoid conflicts of interest, and treat suppliers and
          customers fairly. This Code sets the floor for every policy listed below.</p>
        </Section>

        <Section number={2} title="Human Rights and Modern Slavery">
          <p>We do not tolerate forced, bonded, or child labour anywhere in our own operations or in our supply
          chain, and we expect every supplier we work with to uphold the same standard.</p>
          <p>The UK Modern Slavery Act 2015 requires a published annual Modern Slavery Statement only from
          businesses with turnover above £36 million. Indo Aquatic currently falls below that threshold, so we
          are not legally required to publish one — but we support the Act's intent and will produce a
          statement if our business grows to meet that threshold, or voluntarily sooner if requested by a
          major customer.</p>
        </Section>

        <Section number={3} title="Anti-bribery and Corruption">
          <p>The UK Bribery Act 2010 applies to every UK company regardless of size. We do not offer, give,
          request, or accept bribes, kickbacks, or improper payments in connection with any part of our
          business — sourcing, sales, logistics, or customs. Gifts and hospitality between us and suppliers or
          customers must be reasonable, proportionate, and never intended to improperly influence a decision.</p>
        </Section>

        <Section number={4} title="Fraud">
          <p>We maintain basic financial controls appropriate to our size (separation of authorisation and
          payment, invoice verification against purchase orders and shipment documentation) to reduce the risk
          of fraud, whether internal or from a third party.</p>
        </Section>

        <Section number={5} title="Tax">
          <p>Indo Aquatic UK Ltd complies with all applicable UK tax obligations, including Corporation Tax,
          VAT, PAYE, and import duties on goods brought into the UK. We do not engage in artificial tax
          avoidance arrangements.</p>
        </Section>

        <Section number={6} title="Risk Management">
          <p>As an importer of a perishable, cold-chain product sourced from our own facilities and a network of
          partners across multiple origin countries, our main operational risks are supply chain disruption,
          cold chain failure, and currency exposure on international trade. We manage these through supplier
          relationship continuity, temperature-logged shipping, and standard commercial hedging practices
          where applicable.</p>
        </Section>

        <Section number={7} title="Inclusion, Diversity and Equal Opportunities">
          <p>We comply with the Equality Act 2010, which applies to all UK employers. We do not discriminate
          in recruitment, employment, or supplier selection on the basis of a protected characteristic, and we
          make employment decisions based on merit and business need.</p>
        </Section>

        <Section number={8} title="Fire, Health and Safety">
          <p>Where we operate or manage UK cold storage and warehousing, we comply with the Health and Safety
          at Work etc. Act 1974 and associated regulations, including fire safety in cold store environments
          and safe handling of frozen goods. Third-party cold storage partners are expected to hold their own
          appropriate health and safety compliance.</p>
        </Section>

        <Section number={9} title="Food & Product Safety and Integrity">
          <p>Food safety is central to what we do — we deal exclusively in frozen prawns, and every shipment is
          expected to meet UK food safety law (Food Safety Act 1990, Food Information Regulations) covering
          accurate species identification, count/size declaration, allergen labelling, and safe cold-chain
          handling. Certification detail (HACCP, BRC, BAP, and related standards) is set out on our{' '}
          <Link href="/sustainability" className="text-neon-500 hover:underline">Sustainability</Link> page.</p>
        </Section>

        <Section number={10} title="Data Protection and Privacy">
          <p>We comply with UK GDPR and the Data Protection Act 2018 in how we handle personal data from
          enquiries, sample requests, and business contacts. Full detail is in our{' '}
          <Link href="/privacy-policy" className="text-neon-500 hover:underline">Privacy Policy</Link>.</p>
        </Section>

        <Section number={11} title="Trading Standards and Consumer Protection">
          <p>We sell exclusively to trade buyers (retail, foodservice, processors, wholesale) rather than
          consumers, so consumer protection law applies primarily to how our customers label and sell the
          product onward. On our side, we ensure product descriptions, count/size claims, and species naming
          for the prawns we supply are accurate and not misleading, in line with the Business Protection from
          Misleading Marketing Regulations 2008.</p>
        </Section>

        <Section number={12} title="Laws that Protect Grocery Suppliers (GSCOP)">
          <p>The Groceries Supply Code of Practice (GSCOP) regulates how the UK's largest designated grocery
          retailers must treat their suppliers, enforced by the Groceries Code Adjudicator (GCA). Indo Aquatic
          is not itself a GSCOP-designated retailer — GSCOP does not impose obligations on us. Where we supply
          a GSCOP-designated retailer, we rely on and support those protections in our commercial dealings with
          them.</p>
        </Section>

        <Section number={13} title="Supply Chain and Responsible Sourcing">
          <p>Our prawns are sourced from our own farms and processing facilities in Andhra Pradesh, India, together with a vetted network of certified partners across other leading prawn-producing regions. Responsible
          sourcing detail — aquaculture practices, certification roadmap, and traceability — is covered on our{' '}
          <Link href="/sustainability" className="text-neon-500 hover:underline">Sustainability</Link> page.</p>
        </Section>

        <Section number={14} title="Sanctions and Export Controls">
          <p>We screen counterparties against UK sanctions lists maintained by the Office of Financial
          Sanctions Implementation (OFSI) and do not knowingly trade with sanctioned individuals, entities, or
          jurisdictions. As an importer of frozen prawns into the UK, our goods are not subject to strategic
          export control licensing, but we comply with all applicable customs and import declarations.</p>
        </Section>

        <Section number={15} title="Charity Partnerships and Fundraising">
          <p>We do not currently hold any formal, ongoing charity partnerships. We consider community and
          charitable support on a case-by-case basis and will update this section if that changes.</p>
        </Section>

        <Section number={16} title="Climate and Energy">
          <p>Our largest energy footprint is cold chain — refrigeration and frozen transport from processing
          facilities in India and other partner regions worldwide to UK cold storage in Grimsby and Hull. We
          work with cold storage partners on efficient refrigeration and aim to minimise unnecessary handling
          steps that create additional freeze-thaw cycles or energy use.</p>
        </Section>

        <Section number={17} title="Food Waste">
          <p>As a frozen product with a long shelf life, our proposition is designed to reduce food waste
          compared with fresh alternatives — buyers can hold stock without the spoilage pressure of chilled
          seafood. Prawn shell and head by-product at the processing stage is directed to further use where
          feasible rather than disposed of as waste.</p>
        </Section>

        <Section number={18} title="Product Packaging">
          <p>Our packaging is specific to frozen prawns — food-grade, freezer-rated packaging sized to
          count/weight bands (e.g. 1kg/2kg block-frozen or IQF bags, retail-ready packs for private label). We
          look to reduce unnecessary plastic and use recyclable outer cartons where suitable for frozen
          logistics, without compromising food safety or cold-chain integrity.</p>
        </Section>

        <Section number={19} title="Animal Welfare (Aquaculture)">
          <p>As a farmed-species specialist, animal welfare is part of how our own farms operate and what we
          require of every partner. Our production uses closed pond systems with controlled water quality and
          stocking density, and we do not use antibiotics in production — verifiable via third-party residue
          testing. BAP and ASC certification, held across our primary supply operations, include welfare and
          biosecurity criteria within their audit scope. Further detail is on our{' '}
          <Link href="/sustainability" className="text-neon-500 hover:underline">Sustainability</Link> page.</p>
        </Section>

        <Section number={20} title="Whistleblowing and Speak Up">
          <p>We encourage employees, suppliers, and other business contacts to raise concerns about suspected
          misconduct, malpractice, or breaches of these policies without fear of reprisal. As a small company,
          concerns are raised directly to a director at{' '}
          <a href="mailto:info@indoaquaticltd.com" className="text-neon-500 hover:underline">info@indoaquaticltd.com</a>{' '}
          rather than through a third-party hotline, and are handled confidentially and investigated
          proportionately.</p>
        </Section>

        <div className="mt-12 pt-6 border-t border-ice-300">
          <p className="text-xs text-frost-500 font-inter">
            Questions about any of these policies, or need a copy for a supplier due-diligence process?{' '}
            <Link href="/contact" className="text-neon-500 hover:underline">Contact us</Link>.
          </p>
        </div>

      </div>
    </div>
  );
}
