import { useState, useRef, useEffect, useCallback } from 'react';
import { gsap } from '../../lib/gsap';
import { useSiteContext } from '../../context/SiteContext';
import Lightbox from '../ui/Lightbox';
import GoldRule from '../ui/GoldRule';
import SectionLabel from '../ui/SectionLabel';

const filters = ['All', 'Interior', 'Food', 'Events'];

function GalleryMasonry() {
  const { settings } = useSiteContext();
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);

  const galleryImages = settings?.galleryImages || [];

  const filteredImages = activeFilter === 'All'
    ? galleryImages
    : galleryImages.filter((img) => (img.category || '').toLowerCase() === activeFilter.toLowerCase());

  const openLightbox = (idx) => {
    setCurrentIndex(idx);
    setLightboxOpen(true);
  };

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % filteredImages.length);
  }, [filteredImages.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  }, [filteredImages.length]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: titleRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const items = gridRef.current?.querySelectorAll('.gallery-item');
    if (items?.length) {
      gsap.fromTo(items,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power3.out', scrollTrigger: { trigger: gridRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } }
      );
    }
  }, [activeFilter, filteredImages.length]);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-royal-black">
      <div className="page-container">
        <div ref={titleRef} className="text-center mb-12">
          <SectionLabel>Gallery</SectionLabel>
          <h2 className="font-heading text-3xl md:text-5xl text-white mt-3 mb-4">A Visual Journey</h2>
          <GoldRule align="center" />
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {filters.map((f) => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className={`font-ui text-xs uppercase tracking-[0.15em] px-5 py-2 transition-all duration-300 ${
                activeFilter === f ? 'bg-royal-gold text-royal-black' : 'text-royal-cream/50 border border-royal-cream/20 hover:border-royal-gold/50 hover:text-royal-gold'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div ref={gridRef} className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filteredImages.length > 0 ? (
            filteredImages.map((img, idx) => (
              <div key={img._id || img.id || idx} className="gallery-item break-inside-avoid cursor-pointer group relative" onClick={() => openLightbox(idx)}>
                <img src={img.imageUrl || img.url} alt={img.altText || ''} className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" loading="lazy" />
                <div className="absolute inset-0 bg-royal-black/0 group-hover:bg-royal-black/30 transition-colors duration-300" />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <p className="font-body text-lg text-royal-cream/50">No images found for this category.</p>
            </div>
          )}
        </div>
      </div>

      <Lightbox
        images={filteredImages}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onPrev={goPrev}
        onNext={goNext}
      />
    </section>
  );
}

export default GalleryMasonry;
