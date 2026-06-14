import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

export function useGsapReveal(type = 'fade-up', options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const defaults = {
      'fade-up': { y: 40, opacity: 0, y_: 0, opacity_: 1 },
      'fade-in': { opacity: 0, opacity_: 1 },
      'gold-line': { scaleX: 0, scaleX_: 1, transformOrigin: 'left' },
    };

    const anim = defaults[type] || defaults['fade-up'];
    const vars = {
      [anim.scaleX_ !== undefined ? 'scaleX' : 'y']: anim.y_ ?? anim.scaleX_ ?? 1,
      opacity: anim.opacity_ ?? 1,
      duration: options.duration || 0.8,
      ease: options.ease || 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: options.start || 'top 85%',
        toggleActions: options.toggleActions || 'play none none reverse',
        ...(options.scrollTrigger || {}),
      },
    };
    if (anim.transformOrigin) vars.transformOrigin = anim.transformOrigin;

    gsap.fromTo(el, {
      y: anim.y ?? (anim.scaleX_ !== undefined ? undefined : 40),
      opacity: anim.opacity ?? 0,
      scaleX: anim.scaleX ?? undefined,
    }, vars);

  }, [type, options]);

  return ref;
}
