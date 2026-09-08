const SITE_NAME = 'Indo Aquatic';
export const BASE_URL = 'https://www.indoaquaticltd.com';
export const DEFAULT_OG = `${BASE_URL}/images/hoso.jpg`;

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
