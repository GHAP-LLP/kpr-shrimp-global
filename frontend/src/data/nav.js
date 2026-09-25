// Single source of truth for site navigation — used by Navbar and Footer.
// Per the Sep 2026 meeting: header shows Products (dropdown), Sectors (plain
// link), About Us, Sustainability, and a Contact Us button. Corporate Policies
// lives in the footer legal row only; Resources and Request Sample are gone.
export const NAV_PRODUCTS = [
  { name: 'All Products', href: '/products' },
  { name: 'Frozen Raw Shrimp', href: '/products/frozen-raw-shrimp' },
  { name: 'Cooked Shrimp', href: '/products/cooked-shrimp' },
  { name: 'Added Value Innovation', href: '/products/ready-to-cook' },
  { name: 'Wider Seafood Range', href: '/products/wider-seafood-range' },
];

export const NAV_SECTORS = [
  { name: 'All Sectors', href: '/sectors' },
  { name: 'Retail Private Label', href: '/sectors/retail-private-label' },
  { name: 'Retail Processors', href: '/sectors/food-manufacturers' },
  { name: 'Foodservice', href: '/sectors/foodservice-horeca' },
  { name: 'Wholesale Distributors', href: '/sectors/wholesale-distributors' },
];

// Top-level header links after the Products dropdown.
export const NAV_LINKS = [
  { name: 'Sectors', href: '/sectors' },
  { name: 'About Us', href: '/about' },
  { name: 'Sustainability', href: '/sustainability' },
];

// Footer company column.
export const NAV_COMPANY = [
  { name: 'About us', href: '/about' },
  { name: 'Sustainability', href: '/sustainability' },
  { name: 'Contact', href: '/contact' },
];
