export const SECTOR_IMG = {
  horeca: "/images/horeca.jpg",
  manufacturers: "/images/manufacturers.jpg",
  wholesale: "/images/wholesale.jpg",
  retail: "/images/retail.jpg",
};

export const sectors = [
  {
    id: "retail-private-label",
    slug: "retail-private-label",
    name: "Retail Private Label",
    tagline: "Your brand. Our specification.",
    description: "Supermarkets and retail buyers seeking own-brand frozen prawns require a supplier that can match specification to packaging design, provide consistent product quality, and handle all compliance documentation. Indo Aquatic offers private label supply for retail own-brand ranges.",
    image: SECTOR_IMG.retail,
    benefits: [
      { title: "Custom packaging design", description: "Retail-ready packs with your brand. Nutritional labelling, barcodes, and format specifications to your brief." },
      { title: "Specification lock-in", description: "Agreed spec held across all production runs. Full documentation to support range reviews." },
      { title: "Consumer pack formats", description: "350 g, 400 g, and 500 g consumer bags. 1 kg family packs. Transparent and opaque packaging." },
      { title: "Compliance documentation", description: "UK food labelling compliance. Allergen declarations. Country of origin to UK regulations." },
    ],
    packFormats: [
      { format: "350 g consumer bag", use: "Value range, entry price point" },
      { format: "400 g consumer bag", use: "Mainstream retail SKU" },
      { format: "500 g consumer bag", use: "Premium and larger portions" },
      { format: "1 kg family pack", use: "Bulk consumer and value formats" },
    ],
    documentation: ["UK food labelling compliance", "Nutritional information per 100g", "Allergen declarations", "Brand specification sheets", "Barcode and artwork management"],
  },
  {
    id: "food-manufacturers",
    slug: "food-manufacturers",
    name: "Retail Processors",
    tagline: "Consistent input. Reliable output.",
    description: "Retail processors and food manufacturers need prawns that meet precise specification tolerances, deliver consistent yield per batch, and arrive with full traceability documentation. Indo Aquatic supplies IQF block and bulk packs for large-scale production, with technical support for NPD.",
    image: SECTOR_IMG.manufacturers,
    benefits: [
      { title: "Specification consistency", description: "Count tolerances held batch-to-batch. Certificate of Analysis available for every lot." },
      { title: "IQF and block formats", description: "Block frozen for consistent batch weight. IQF for free-flow ingredient use." },
      { title: "Technical support", description: "Assistance with NPD, ingredient specifications, and shelf-life testing." },
      { title: "Full traceability", description: "Farm-to-factory documentation. Batch codes, lot numbers, country of origin." },
    ],
    packFormats: [
      { format: "10 kg IQF bulk cartons", use: "Free-flow ingredient processing" },
      { format: "20 kg IQF bulk cartons", use: "High-volume production lines" },
      { format: "Block frozen 10–20 kg", use: "Consistent batch weight for manufacturing" },
      { format: "Custom pack", use: "Specification-matched for specific production" },
    ],
    documentation: ["Certificate of Analysis (CoA)", "Nutritional breakdown", "Microbiological data", "Full traceability chain", "Allergen declarations", "Supplier audit documentation"],
  },
  {
    id: "foodservice-horeca",
    slug: "foodservice-horeca",
    name: "Foodservice",
    tagline: "From kitchen to plate. Consistent spec, every delivery.",
    description: "Hotels, restaurants, pubs, chains, and caterers need prawns they can rely on — same count, same yield, same colour, every time. Indo Aquatic supplies the full range of formats and pack sizes suited to professional kitchens, from single-site restaurants to national pub chains.",
    image: SECTOR_IMG.horeca,
    benefits: [
      { title: "Consistent specification", description: "Same count, same yield, same quality across every order — no surprises when prep begins." },
      { title: "Full range of formats", description: "HOSO for presentation, PD for speed, cooked for cold starters, added value for low-skill kitchens." },
      { title: "Flexible pack sizes", description: "1 kg portions to 10 kg bulk — matched to your kitchen size and throughput." },
      { title: "UK account management", description: "Dedicated UK-based account manager. One number, direct communication." },
    ],
    packFormats: [
      { format: "1 kg IQF bags", use: "Single portions, a la carte prep" },
      { format: "2 kg retail blocks", use: "Mid-volume prep, consistent thaw" },
      { format: "5 kg catering cartons", use: "High-volume kitchen prep" },
      { format: "10 kg bulk", use: "Central kitchens, chain operations" },
    ],
    documentation: ["Full spec sheets per SKU", "Nutritional information", "HACCP documentation", "Allergen declarations", "Country of origin certification"],
  },
  {
    id: "wholesale-distributors",
    slug: "wholesale-distributors",
    name: "Wholesale Distributors",
    tagline: "Volume supply. Reliable specification. Competitive pricing.",
    description: "Wholesale distributors and cash-and-carry operators need frozen prawns that sell through — the right pack sizes, the right counts, and a consistent product their customers will reorder. Indo Aquatic offers competitive pricing on palletised bulk supply with full documentation.",
    image: SECTOR_IMG.wholesale,
    benefits: [
      { title: "Palletised bulk orders", description: "Full pallet and half pallet supply. Multiple SKUs per delivery possible." },
      { title: "Cash-and-carry formats", description: "Consumer-facing packaging available for direct display and sale." },
      { title: "Competitive UK pricing", description: "Sterling-denominated pricing. No currency exposure. Fixed-term pricing available." },
      { title: "Reliable restocking", description: "Managed inventory cycles with advance notice of availability." },
    ],
    packFormats: [
      { format: "1 kg retail bags", use: "Consumer re-sale, cash-and-carry floor" },
      { format: "5 kg catering packs", use: "Trade buyers, HORECA redistribution" },
      { format: "10 kg bulk cartons", use: "Industrial and processing buyers" },
      { format: "Pallet lots", use: "Container-volume redistribution" },
    ],
    documentation: ["UK food import compliance", "Country of origin declarations", "Cold chain documentation", "HACCP certification"],
  },
];

export function getSectorBySlug(slug) {
  return sectors.find(s => s.slug === slug);
}
