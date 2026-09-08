import { BASE_URL } from '@/lib/metadata';

export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: '/admin' }],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
