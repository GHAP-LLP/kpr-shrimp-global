import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Indo Aquatic';
const BASE_URL = 'https://www.indoaquaticltd.com';
const DEFAULT_OG = 'https://images.unsplash.com/photo-1548587468-971ebe4c8c3b?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200';

export default function SEO({ title, description, path = '', image, schema }) {
  const fullTitle = title
    ? `${title} | ${SITE_NAME} — UK Frozen Prawn Supplier`
    : `UK Frozen Prawn Supplier — IQF, Cooked & Ready-to-Cook | ${SITE_NAME}`;
  const url = `${BASE_URL}${path}`;
  const ogImage = image || DEFAULT_OG;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={`${title || SITE_NAME} — Indo Aquatic UK frozen prawn`} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={`${title || SITE_NAME} — Indo Aquatic UK frozen prawn`} />

      {/* Per-page JSON-LD (Googlebot renders JS and indexes this) */}
      {schema && (Array.isArray(schema) ? schema : [schema]).map((s, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>
      ))}
    </Helmet>
  );
}
