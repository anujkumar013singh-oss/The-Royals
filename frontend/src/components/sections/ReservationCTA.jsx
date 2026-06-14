import { useRef, useEffect } from 'react';
import { gsap } from '../../lib/gsap';
import { useSiteContext } from '../../context/SiteContext';
import GoldRule from '../ui/GoldRule';
import ReservationForm from '../ui/ReservationForm';

function ReservationCTA() {
  const { settings } = useSiteContext();
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  const bgImage = settings?.reservationBgImage || settings?.heroImage || '';

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: contentRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0">
        {bgImage && <img src={bgImage} alt="" className="w-full h-full object-cover" />}
        <div className="absolute inset-0 bg-royal-black/80" />
      </div>
      <div ref={contentRef} className="relative z-10 page-container">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="font-ui text-xs uppercase tracking-[0.2em] text-royal-gold">Reservations</span>
          <h2 className="font-heading text-3xl md:text-5xl text-white mt-3 mb-4">Make a Reservation</h2>
          <GoldRule align="center" />
          <p className="font-body text-lg text-royal-cream/70 mt-6">
            Experience the finest dining. Book your table today.
          </p>
        </div>
        <div className="max-w-lg mx-auto">
          <ReservationForm />
        </div>
      </div>
    </section>
  );
}

export default ReservationCTA;
