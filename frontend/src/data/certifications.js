// Single source of truth for certification status, rendered on the homepage
// strip, the About grid, and the Sustainability roadmap. Update status here
// and every page stays consistent.
export const CERTIFICATIONS = [
  { id: 'haccp', logo: '/images/certs/haccp.png', name: 'HACCP', sub: 'Critical Control Points', desc: 'Hazard Analysis Critical Control Point system in place across all processing operations.', status: 'held', highlight: false },
  { id: 'brc', logo: '/images/certs/brc.png', name: 'BRC Global Standard', sub: 'Food Safety', desc: 'British Retail Consortium Global Standard for Food Safety — held by our processing facilities.', status: 'held', highlight: true },
  { id: 'bap', logo: '/images/certs/bap.png', name: 'BAP Certified', sub: 'Best Aquaculture Practices', desc: 'Best Aquaculture Practices — third-party audit of farm, hatchery, and processing standards.', status: 'held', highlight: false },
  { id: 'iso22000', logo: '/images/certs/iso22000.png', name: 'ISO 22000', sub: 'Food Safety Management', desc: 'International food safety management system standard. Held across processing operations.', status: 'held', highlight: false },
  { id: 'fssc22000', logo: '/images/certs/fssc22000.png', name: 'FSSC 22000', sub: 'Food Safety System', desc: 'Food Safety System Certification — built on ISO 22000 with additional sector-specific requirements.', status: 'held', highlight: false },
  { id: 'fda', logo: '/images/certs/fda.png', name: 'FDA Registered (US)', sub: 'US Market Registration', desc: 'Facilities registered with the US Food & Drug Administration for export to the US market.', status: 'held', highlight: false },
  { id: 'halal', logo: '/images/certs/halal.png', name: 'Halal Certified', sub: 'Processing Lines', desc: 'Halal certification held across applicable processing lines and finished products.', status: 'held', highlight: false },
  { id: 'asc', logo: '/images/certs/asc.png', name: 'ASC Certified', sub: 'Responsible Aquaculture', desc: 'Aquaculture Stewardship Council — environmental and social responsibility standard. Held across our primary supply operations.', status: 'held', highlight: true },
  // Marked as held per team instruction, Sep 2026 meeting follow-up.
  { id: 'eu-approval', logo: '/images/certs/eu-approval.png', name: 'EU Approved', sub: 'EU Market Approval', desc: 'EU establishment approval for export to EU markets.', status: 'held', highlight: false },
];

export const heldCertifications = CERTIFICATIONS.filter(c => c.status === 'held');
