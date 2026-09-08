const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Cross-origin admin session cookie is set by the backend (onrender.com), so every call must send credentials.
export async function adminFetch(path, options = {}) {
  const res = await fetch(`${API_URL}/api${path}`, {
    ...options,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
  });
  return res;
}
