const SITE_NAME = 'Indo Aquatic';
export const BASE_URL = 'https://iaquatic.com';
// Dedicated 1200×630 landscape share image (generated from the fish-on-ice shot).
export const DEFAULT_OG = `${BASE_URL}/images/og.jpg`;

// Trim to a sensible meta-description length at a word boundary.
export function metaExcerpt(text, maxLength = 155) {
  if (!text || text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : maxLength)}…`;
}

export function buildMetadata({ title, description, path = '', image } = {}) {
  // The root layout's title template appends "| Indo Aquatic", so pass the
  // plain title here — adding the suffix in both places doubled every title.
  const url = `${BASE_URL}${path}`;
  const ogImage = image || DEFAULT_OG;
  const imgAlt = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} frozen seafood`;
  const shortDescription = metaExcerpt(description);

  return {
    ...(title && { title }),
    description: shortDescription,
    alternates: { canonical: url },
    openGraph: {
      ...(title && { title: `${title} | ${SITE_NAME}` }),
      description: shortDescription,
      url,
      siteName: SITE_NAME,
      type: 'website',
      // Only declare dimensions for the default image, whose size we control.
      images: [image ? { url: ogImage, alt: imgAlt } : { url: ogImage, width: 1200, height: 630, alt: imgAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      ...(title && { title: `${title} | ${SITE_NAME}` }),
      description: shortDescription,
      images: [{ url: ogImage, alt: imgAlt }],
    },
  };
}
