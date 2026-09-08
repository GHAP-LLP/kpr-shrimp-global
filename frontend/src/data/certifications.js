// Single source of truth for certification status, rendered on the homepage
// strip, the About grid, and the Sustainability roadmap. Update status here
// and every page stays consistent.
export const CERTIFICATIONS = [
  { id: 'haccp', name: 'HACCP', sub: 'Critical Control Points', desc: 'Hazard Analysis Critical Control Point system in place across all processing operations.', status: 'held', highlight: false },
  { id: 'brc', name: 'BRC Global Standard', sub: 'Food Safety', desc: 'British Retail Consortium Global Standard for Food Safety — held by our processing facilities.', status: 'held', highlight: true },
  { id: 'bap', name: 'BAP Certified', sub: 'Best Aquaculture Practices', desc: 'Best Aquaculture Practices — third-party audit of farm, hatchery, and processing standards.', status: 'held', highlight: false },
  { id: 'iso22000', name: 'ISO 22000', sub: 'Food Safety Management', desc: 'International food safety management system standard. Held across processing operations.', status: 'held', highlight: false },
  { id: 'fssc22000', name: 'FSSC 22000', sub: 'Food Safety System', desc: 'Food Safety System Certification — built on ISO 22000 with additional sector-specific requirements.', status: 'held', highlight: false },
  { id: 'fda', name: 'FDA Registered (US)', sub: 'US Market Registration', desc: 'Facilities registered with the US Food & Drug Administration for export to the US market.', status: 'held', highlight: false },
  { id: 'halal', name: 'Halal Certified', sub: 'Processing Lines', desc: 'Halal certification held across applicable processing lines and finished products.', status: 'held', highlight: false },
  { id: 'asc', name: 'ASC Certified', sub: 'Responsible Aquaculture', desc: 'Aquaculture Stewardship Council — environmental and social responsibility standard. Held across our primary supply operations.', status: 'held', highlight: true },
  { id: 'eu-approval', name: 'EU Approved', sub: 'Application In Progress', desc: 'EU establishment approval for export to EU markets — application in progress.', status: 'in-progress', highlight: false },
];

export const heldCertifications = CERTIFICATIONS.filter(c => c.status === 'held');
