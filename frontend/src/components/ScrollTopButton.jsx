'use client';
import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

// Desktop-only back-to-top button. Appears after scrolling past the first
// viewport and sits above the WhatsApp button in the bottom-right stack.
export default function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 500);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      data-testid="scroll-top-button"
      className={`hidden md:flex fixed bottom-24 right-5 z-[70] w-11 h-11 rounded-full bg-frost-900 hover:bg-ink-900 border border-white/20 shadow-lg items-center justify-center transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      <ArrowUp size={18} className="text-white" />
    </button>
  );
}
