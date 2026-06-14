import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../../lib/gsap';
import GoldRule from '../ui/GoldRule';
import SectionLabel from '../ui/SectionLabel';

const defaultCategories = [
  { name: 'Chinese', slug: 'chinese', image: 'https://popmenucloud.com/cdn-cgi/image/width=1920,height=1920,format=auto,fit=scale-down/wlqenuza/a1ccb6d0-30e6-43eb-a599-d8e6e7d840d1.jpg', count: 12 },
  { name: 'Main Course Thali', slug: 'main-course-thali', image: 'https://platform.eater.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/20059022/shutterstock_1435374326.jpg?quality=90&strip=all&crop=0%2C0.054288816503799%2C100%2C99.891422366992&w=2400', count: 10 },
  { name: 'Desserts & Ice Cream', slug: 'desserts-&-ice-cream', image: 'https://images.ctfassets.net/0dkgxhks0leg/2W0e0i39df3qb9O05tsm8W/877bbaef4e6158eef162496144faf2f5/TF_20FW_22_20Dessert_20Collection_498.jpg', count: 8 },
];

function MenuPreview() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);

  const categories = defaultCategories;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: titleRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } }
      );
      gsap.fromTo(gridRef.current?.querySelectorAll('.cat-card'),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: gridRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [categories.length]);

  return (
    <section ref={sectionRef} className="py-12 md:py-16 bg-royal-dark">
      <div className="page-container">
        <div ref={titleRef} className="text-center mb-16">
          <SectionLabel>Menu</SectionLabel>
          <h2 className="font-heading text-3xl md:text-5xl text-white mt-3 mb-4">Explore Our Menu</h2>
          <GoldRule align="center" />
          <p className="font-body text-lg text-royal-cream/70 max-w-lg mx-auto mt-6">
            From starters to desserts, each dish tells a story
          </p>
        </div>
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <Link key={cat.slug || i} to={`/menu/${cat.slug}`} className="cat-card group relative bg-royal-black overflow-hidden aspect-[4/3]">
              {cat.image && (
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-royal-black/90 via-royal-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-heading text-2xl text-white group-hover:text-royal-gold transition-colors duration-300">{cat.name}</h3>
                <p className="font-ui text-xs text-royal-cream/50 mt-2">{cat.count} Dishes</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MenuPreview;
