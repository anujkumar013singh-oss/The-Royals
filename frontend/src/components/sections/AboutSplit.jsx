import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../../lib/gsap';
import { useSiteContext } from '../../context/SiteContext';
import GoldRule from '../ui/GoldRule';
import SectionLabel from '../ui/SectionLabel';

function AboutSplit() {
  const { settings } = useSiteContext();
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  const aboutImage = 'https://upload.wikimedia.org/wikipedia/commons/3/36/Livorno_-_Hotel_Palazzo_-_2025-09-29_20-09-38_001.jpg';
  const story = settings?.story || 'Welcome to The Royals, where culinary artistry meets timeless elegance. Our journey began with a vision to create unforgettable dining experiences that celebrate the finest ingredients, exceptional craftsmanship, and warm hospitality.';

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
    <section ref={sectionRef} className="py-20 md:py-28 bg-royal-black">
      <div className="page-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div ref={imageRef} className="relative">
            {aboutImage ? (
              <img src={aboutImage} alt="About The Royals" className="w-full h-[400px] md:h-[500px] object-cover" />
            ) : (
              <div className="w-full h-[400px] md:h-[500px] bg-royal-dark flex items-center justify-center">
                <span className="font-heading text-royal-gold/30 text-lg">The Royals</span>
              </div>
            )}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-royal-gold/30" />
          </div>
          <div ref={textRef} className="lg:pl-8">
            <SectionLabel>Our Story</SectionLabel>
            <h2 className="font-heading text-3xl md:text-5xl text-white mt-3 mb-4">Where Every Meal is a Royal Affair</h2>
            <GoldRule />
            <p className="font-body text-lg text-royal-cream/70 leading-relaxed mt-6">{story}</p>
            <div className="mt-8">
              <Link to="/about" className="inline-flex items-center gap-2 font-ui text-sm uppercase tracking-[0.15em] text-royal-gold border border-royal-gold px-6 py-3 hover:bg-royal-gold hover:text-royal-black transition-all duration-300">
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSplit;
