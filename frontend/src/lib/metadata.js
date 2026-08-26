const SITE_NAME = 'Indo Aquatic';
const BASE_URL = 'https://www.indoaquaticltd.com';
const DEFAULT_OG = 'https://images.unsplash.com/photo-1548587468-971ebe4c8c3b?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200';

export function buildMetadata({ title, description, path = '', image } = {}) {
  const fullTitle = title ? `${title} | ${SITE_NAME} — UK Frozen Prawn Supplier` : undefined;
  const url = `${BASE_URL}${path}`;
  const ogImage = image || DEFAULT_OG;
  const imgAlt = `${title || SITE_NAME} — Indo Aquatic UK frozen prawn`;

  return {
    ...(fullTitle && { title: fullTitle }),
    description,
    alternates: { canonical: url },
    openGraph: {
      ...(fullTitle && { title: fullTitle }),
      description,
      url,
      images: [{ url: ogImage, width: 1200, height: 630, alt: imgAlt }],
    },
    twitter: {
      ...(fullTitle && { title: fullTitle }),
      description,
      images: [{ url: ogImage, alt: imgAlt }],
    },
  };
}
