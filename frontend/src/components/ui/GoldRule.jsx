import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';

function GoldRule({ width = 'w-16', align = 'left', className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' },
      }
    );
  }, []);

  const alignClass = align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : '';

  return (
    <div
      ref={ref}
      className={`h-0.5 bg-royal-gold ${width} ${alignClass} origin-left ${className}`}
    />
  );
}

export default GoldRule;
