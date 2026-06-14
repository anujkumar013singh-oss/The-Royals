import { useEffect, useRef } from 'react';
import { initLenis, lenis as lenisModule } from '../lib/lenis';
import { ScrollTrigger } from '../lib/gsap';

export function useLenis() {
  const lenisRef = useRef(null);

  useEffect(() => {
    lenisRef.current = initLenis();

    const raf = requestAnimationFrame(() => {
      lenisRef.current?.resize();
      ScrollTrigger.refresh();
    });

    const timer = setTimeout(() => {
      lenisRef.current?.resize();
      ScrollTrigger.refresh();
    }, 300);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  return lenisRef;
}
