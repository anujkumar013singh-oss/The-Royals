import { useRef, useEffect } from 'react';
import { gsap } from '../../lib/gsap';
import { useSiteContext } from '../../context/SiteContext';
import GoldRule from '../ui/GoldRule';
import SectionLabel from '../ui/SectionLabel';

function ChefSection() {
  const { settings } = useSiteContext();
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  const chefName = settings?.chefName || 'Chef William Harrington';
  const chefTitle = settings?.chefTitle || 'Executive Chef';
  const chefBio = settings?.chefBio || 'With over two decades of culinary mastery, Chef Harrington brings a profound passion for seasonal ingredients and artistic presentation. Trained in Paris and influenced by global cuisines, every plate is a canvas.';
  const chefImage = settings?.chefImage || 'https://cdn.cpdonline.co.uk/wp-content/uploads/2021/10/28122622/Commis-chef-in-chef-hierarchy-is-lower-than-head-chef.jpg';
  const chefQuote = settings?.chefQuote || 'Cooking is not just about food — it is about creating moments that linger long after the meal.';

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(imageRef.current,
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: imageRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );
      gsap.fromTo(textRef.current,
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: textRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-royal-dark">
      <div className="page-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div ref={imageRef} className="relative lg:order-2">
            {chefImage ? (
              <img src={chefImage} alt={chefName} className="w-full h-[400px] md:h-[500px] object-cover" />
            ) : (
              <div className="w-full h-[400px] md:h-[500px] bg-royal-black flex items-center justify-center">
                <span className="font-heading text-royal-gold/30 text-lg">Chef</span>
              </div>
            )}
          </div>
          <div ref={textRef} className="lg:order-1 lg:pr-8">
            <SectionLabel>Chef</SectionLabel>
            <h2 className="font-heading text-3xl md:text-5xl text-white mt-3 mb-1">{chefName}</h2>
            <p className="font-ui text-sm uppercase tracking-[0.15em] text-royal-gold mb-4">{chefTitle}</p>
            <GoldRule />
            <p className="font-body text-lg text-royal-cream/70 leading-relaxed mt-6">{chefBio}</p>
            {chefQuote && (
              <div className="mt-8 pl-6 border-l-2 border-royal-gold">
                <p className="font-body text-xl italic text-royal-cream/80 leading-relaxed">&ldquo;{chefQuote}&rdquo;</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChefSection;
