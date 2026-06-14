import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../../lib/gsap';
import GoldRule from '../ui/GoldRule';
import SectionLabel from '../ui/SectionLabel';

const dishes = [
  {
    name: 'Hyderabadi Biryani',
    description: 'Fragrant basmati rice layered with tender marinated meat, saffron, and caramelized onions — a royal legacy from the Nizam\'s kitchen.',
    image: 'https://vismaifood.com/storage/app/uploads/public/980/eb9/ed6/thumb__1200_0_0_0_auto.jpg',
    badge: 'BESTSELLER',
  },
  {
    name: 'Butter Chicken',
    description: 'Succulent tandoori chicken simmered in a rich, creamy tomato gravy with butter and aromatic spices — born in the heart of Delhi.',
    image: 'https://nickskitchen.com/wp-content/uploads/2025/08/NK_Butter-Ckn_1-scaled.jpg',
    badge: 'ORIGIN: DELHI',
  },
  {
    name: 'Shahi Paneer',
    description: 'Cottage cheese cubes in a velvety cashew-cream gravy infused with royal spices and a hint of saffron.',
    image: 'https://www.oetker.in/assets/recipes/assets/6c0ac2f3ce204d3d9bb1df9709fc06c9/1272x764/shahi-paneer.webp',
    badge: 'VEG SIGNATURE',
  },
  {
    name: 'Wood-Fired Pizza',
    description: 'Hand-tossed artisan pizza baked in a traditional wood-fired oven with San Marzano tomatoes and fresh mozzarella.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Pizza-3007395.jpg',
    badge: '20% OFF',
  },
];

function SignatureDishes() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(titleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: titleRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } }
        );
      }
      const cards = gridRef.current?.querySelectorAll('.dish-card');
      if (cards?.length) {
        gsap.fromTo(cards,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: gridRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28">
      <div className="page-container">
        <div ref={titleRef} className="text-center mb-16">
          <SectionLabel>Our Signature</SectionLabel>
          <h2 className="font-heading text-3xl md:text-5xl text-white mt-3 mb-4">Chef&apos;s Specialties</h2>
          <GoldRule align="center" />
          <p className="font-body text-lg text-royal-cream/70 max-w-lg mx-auto mt-6">
            Handpicked creations that define our culinary heritage
          </p>
        </div>
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dishes.map((dish, i) => (
            <div key={i} className="dish-card group relative bg-royal-dark overflow-hidden">
              <div className="relative overflow-hidden aspect-square">
                <img src={dish.image} alt={dish.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <span className="absolute top-3 right-3 bg-royal-gold text-royal-black px-3 py-1 font-ui text-[10px] font-bold uppercase tracking-wider">
                  {dish.badge}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-heading text-xl text-white mb-2">{dish.name}</h3>
                <p className="font-body text-base text-royal-cream/70 leading-relaxed line-clamp-2">{dish.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/menu" className="group inline-flex items-center gap-2 font-ui text-sm uppercase tracking-[0.15em] text-royal-gold hover:text-[#e0c24a] transition-colors">
            View Full Menu
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default SignatureDishes;