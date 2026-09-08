import { productCategories } from '@/data/products';
import { sectors } from '@/data/sectors';
import { BASE_URL } from '@/lib/metadata';

// Derived from the same data files that drive the routes, so adding a product
// or sector automatically updates the sitemap.
export default function sitemap() {
  const now = new Date();
  const staticPaths = [
    '', '/products', '/sectors', '/about', '/sustainability', '/policies',
    '/resources', '/contact', '/request-a-sample',
    '/privacy-policy', '/terms-of-service', '/cookie-policy',
  ];

  const categoryPaths = productCategories.map(c => `/products/${c.slug}`);
  const variantPaths = productCategories.flatMap(c =>
    c.variants.map(v => `/products/${c.slug}/${v.slug}`)
  );
  const sectorPaths = sectors.map(s => `/sectors/${s.slug}`);

  return [...staticPaths, ...categoryPaths, ...variantPaths, ...sectorPaths].map(path => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
  }));
}
