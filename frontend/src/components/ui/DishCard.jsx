import { useState, useRef, useEffect } from 'react';
import { gsap } from '../../lib/gsap';

function DishCard({ image, name, description, price, tags = [], className = '' }) {
  const [loaded, setLoaded] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const img = card.querySelector('img');
    if (!img) return;

    card.addEventListener('mouseenter', () => {
      gsap.to(img, { scale: 1.08, duration: 0.5, ease: 'power2.out' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(img, { scale: 1, duration: 0.5, ease: 'power2.out' });
    });
  }, []);

  return (
    <div ref={cardRef} className={`group relative bg-royal-dark overflow-hidden ${className}`}>
      {image && (
        <div className="relative overflow-hidden aspect-square">
          {!loaded && <div className="absolute inset-0 bg-royal-black animate-pulse" />}
          <img
            src={image}
            alt={name || ''}
            onLoad={() => setLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
          />
          {price && (
            <span className="absolute top-3 right-3 bg-royal-gold text-royal-black px-3 py-1 font-ui text-xs font-medium">
              ${price}
            </span>
          )}
        </div>
      )}
      <div className="p-5">
        {name && <h3 className="font-heading text-xl text-white mb-2">{name}</h3>}
        {description && (
          <p className="font-body text-base text-royal-cream/70 leading-relaxed line-clamp-2">{description}</p>
        )}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag) => (
              <span key={tag} className="font-ui text-[10px] uppercase tracking-wider text-royal-gold">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DishCard;
