// Numbered eyebrow label used above section headings site-wide.
// `dark` variant is for frost-900 backgrounds, where neon-500 has sufficient
// contrast; on light backgrounds neon-700 is required to pass WCAG AA.
export default function SectionLabel({ number, text, dark = false }) {
  return (
    <p className={`text-xs font-semibold tracking-[0.2em] uppercase ${dark ? 'text-neon-500' : 'text-neon-700'} font-inter mb-3`}>
      {number} · {text}
    </p>
  );
}
