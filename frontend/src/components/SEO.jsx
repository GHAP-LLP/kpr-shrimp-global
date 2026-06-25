import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'KPR Shrimp Global';
const BASE_URL = 'https://www.kprshrimpglobal.com';
const DEFAULT_OG = 'https://images.unsplash.com/photo-1548587468-971ebe4c8c3b?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200';

export default function SEO({ title, description, path = '', image }) {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} | UK Specialist Frozen Shrimp Supplier`;
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
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
