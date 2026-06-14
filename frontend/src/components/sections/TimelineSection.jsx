import { useRef, useEffect } from 'react';
import { gsap } from '../../lib/gsap';
import { useSiteContext } from '../../context/SiteContext';
import GoldRule from '../ui/GoldRule';
import SectionLabel from '../ui/SectionLabel';

const defaultMilestones = [
  { year: '2008', title: 'The Vision Begins', description: 'Chef William Harrington conceives the idea of The Royals — a restaurant that would redefine fine dining.' },
  { year: '2010', title: 'Grand Opening', description: 'The Royals opens its doors in the heart of the city, immediately capturing the attention of food enthusiasts.' },
  { year: '2013', title: 'First Michelin Star', description: 'Awarded our first Michelin star, recognizing our commitment to culinary excellence.' },
  { year: '2016', title: 'Expansion & Renovation', description: 'A major renovation expands our dining room and introduces a private chef\'s table experience.' },
  { year: '2020', title: 'Second Michelin Star', description: 'Awarded our second Michelin star, cementing our place among the world\'s finest restaurants.' },
  { year: '2024', title: 'A New Chapter', description: 'Launch of our CMS v2.0 platform and continued dedication to unforgettable dining experiences.' },
];

function TimelineSection() {
  const { settings } = useSiteContext();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const lineRef = useRef(null);

  const milestones = settings?.milestones?.length ? settings.milestones : defaultMilestones;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: titleRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } }
      );

      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        { scaleY: 1, duration: 1.5, ease: 'power3.inOut', scrollTrigger: { trigger: lineRef.current, start: 'top 80%', end: 'bottom 20%', scrub: 1 } }
      );

      gsap.utils.toArray('.timeline-item').forEach((item, i) => {
        gsap.fromTo(item,
          { x: i % 2 === 0 ? -40 : 40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: item, start: 'top 85%', toggleActions: 'play none none reverse' } }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [milestones.length]);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-royal-black">
      <div className="page-container">
        <div ref={titleRef} className="text-center mb-16">
          <SectionLabel>History</SectionLabel>
          <h2 className="font-heading text-3xl md:text-5xl text-white mt-3 mb-4">Our Journey</h2>
          <GoldRule align="center" />
        </div>
        <div className="relative max-w-3xl mx-auto">
          <div ref={lineRef} className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-0.5 bg-royal-gold/30 origin-top" />
          <div className="space-y-12">
            {milestones.map((m, i) => (
              <div key={i} className="timeline-item relative flex flex-col md:flex-row items-start gap-6">
                <div className="hidden md:flex md:w-1/2 justify-end pr-8">
                  {i % 2 === 0 && (
                    <div className="text-right">
                      <span className="font-heading text-2xl text-royal-gold">{m.year}</span>
                      <h3 className="font-heading text-lg text-white mt-1">{m.title}</h3>
                      <p className="font-body text-base text-royal-cream/70 mt-2">{m.description}</p>
                    </div>
                  )}
                </div>
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-10 h-10 rounded-full border-2 border-royal-gold bg-royal-black flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-royal-gold" />
                  </div>
                </div>
                <div className="md:w-1/2 pl-4 md:pl-8">
                  {i % 2 !== 0 ? (
                    <>
                      <span className="font-heading text-2xl text-royal-gold md:hidden">{m.year}</span>
                      <span className="font-heading text-2xl text-royal-gold hidden md:block">{m.year}</span>
                      <h3 className="font-heading text-lg text-white mt-1">{m.title}</h3>
                      <p className="font-body text-base text-royal-cream/70 mt-2">{m.description}</p>
                    </>
                  ) : (
                    <div className="md:hidden">
                      <span className="font-heading text-2xl text-royal-gold">{m.year}</span>
                      <h3 className="font-heading text-lg text-white mt-1">{m.title}</h3>
                      <p className="font-body text-base text-royal-cream/70 mt-2">{m.description}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TimelineSection;
