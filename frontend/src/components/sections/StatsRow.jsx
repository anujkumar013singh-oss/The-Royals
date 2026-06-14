import { useRef, useEffect } from 'react';
import { gsap } from '../../lib/gsap';
import { useSiteContext } from '../../context/SiteContext';
import SectionLabel from '../ui/SectionLabel';
import GoldRule from '../ui/GoldRule';

const defaultStats = [
  { value: 15, suffix: '+', label: 'Years of Excellence' },
  { value: 50, suffix: 'K+', label: 'Guests Served' },
  { value: 200, suffix: '+', label: 'Signature Dishes' },
  { value: 5, suffix: '', label: 'Star Rating' },
];

function StatsRow() {
  const { settings } = useSiteContext();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  const stats = settings?.stats?.length ? settings.stats : defaultStats;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: titleRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } }
      );

      const statEls = sectionRef.current?.querySelectorAll('.stat-item');
      if (statEls?.length) {
        gsap.fromTo(statEls,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
        );
      }

      statEls.forEach((el) => {
        const numEl = el.querySelector('.stat-number');
        if (!numEl) return;
        const target = parseInt(numEl.dataset.value, 10);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2.5,
          ease: 'power3.out',
          onUpdate: () => { numEl.textContent = Math.round(obj.val); },
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 md:py-16 bg-royal-dark">
      <div className="page-container w-full">
        <div ref={titleRef} className="text-center mb-10">
          <SectionLabel>By the Numbers</SectionLabel>
          <h2 className="font-heading text-3xl md:text-5xl text-white mt-3 mb-4">Our Legacy in Numbers</h2>
          <GoldRule align="center" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <div key={i} className="stat-item text-center">
              <div className="relative inline-flex items-baseline">
                <span className="stat-number font-heading text-5xl md:text-6xl lg:text-7xl text-royal-gold font-light" data-value={stat.value}>0</span>
                <span className="font-heading text-3xl md:text-4xl text-royal-gold/80 ml-0.5">{stat.suffix}</span>
              </div>
              <div className="w-8 h-0.5 bg-royal-gold/40 mx-auto mt-3 mb-3" />
              <p className="font-body text-base md:text-lg text-royal-cream/60 uppercase tracking-[0.1em]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsRow;
