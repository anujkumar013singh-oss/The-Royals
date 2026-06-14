import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

export function useParallax(speed = 0.5, options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: () => (speed - 1) * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          ...options,
        },
      });
    });

    return () => ctx.revert();
  }, [speed, options]);

  return ref;
}
