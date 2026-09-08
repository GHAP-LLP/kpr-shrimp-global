'use client';
import { useEffect, useState } from 'react';

// The site is statically generated, so a server-rendered year would freeze at
// build time. Render the build year first, then correct on the client.
export default function Year() {
  const [year, setYear] = useState(new Date().getFullYear());
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return <>{year}</>;
}
