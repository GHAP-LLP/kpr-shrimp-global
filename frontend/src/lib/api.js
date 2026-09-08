// Enquiry API helper shared by the public forms.
// Same-origin by default: next.config.js rewrites /api/* to the FastAPI backend,
// so an empty API_URL works in both dev and production.
export const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Render's free tier cold-starts in ~50s, so the timeout must be generous.
const TIMEOUT_MS = 75000;

export class EnquiryError extends Error {
  constructor(message, { retryable = true } = {}) {
    super(message);
    this.retryable = retryable;
  }
}

export async function postEnquiry(path, payload) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (res.status === 422) {
      throw new EnquiryError(
        'Some details look invalid — please check your email address and phone number and try again.',
        { retryable: false },
      );
    }
    if (res.status === 429) {
      throw new EnquiryError('Too many submissions in a short time. Please wait a minute and try again.');
    }
    if (!res.ok) {
      throw new EnquiryError('Request failed');
    }
    return res.json();
  } catch (err) {
    if (err instanceof EnquiryError) throw err;
    if (err.name === 'AbortError') {
      throw new EnquiryError('The request timed out. Our server may be waking up — please try again in a moment.');
    }
    throw new EnquiryError('Network error — please check your connection and try again.');
  } finally {
    clearTimeout(timer);
  }
}
