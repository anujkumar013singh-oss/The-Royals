import { useRef, useEffect } from 'react';
import { gsap } from '../lib/gsap';
import GoldRule from '../components/ui/GoldRule';
import SectionLabel from '../components/ui/SectionLabel';
import ReservationForm from '../components/ui/ReservationForm';
import { useSiteContext } from '../context/SiteContext';

function ReservationPage() {
  const { settings } = useSiteContext();
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);

  const address = settings?.address || '123 Gourmet Street, New York, NY 10001';
  const phone = settings?.phone || '+1 (555) 123-4567';
  const email = settings?.email || 'info@theroyals.com';
  const openingHours = settings?.openingHours || [
    { day: 'Monday - Thursday', hours: '5:00 PM - 10:00 PM' },
    { day: 'Friday - Saturday', hours: '5:00 PM - 11:00 PM' },
    { day: 'Sunday', hours: 'Closed' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: headerRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } }
      );
      gsap.fromTo(formRef.current,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: formRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );
      gsap.fromTo(infoRef.current,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: infoRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 min-h-screen">
        <div className="page-container">
          <div ref={headerRef} className="text-center mb-16">
            <SectionLabel>Reservations</SectionLabel>
            <h1 className="font-heading text-4xl md:text-6xl text-white mt-3 mb-4">Book a Table</h1>
            <GoldRule align="center" />
            <p className="font-body text-lg text-royal-cream/70 max-w-lg mx-auto mt-6">
              Reserve your experience at The Royals
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            <div ref={formRef} className="lg:col-span-3">
              <div className="bg-royal-dark p-6 md:p-8">
                <h2 className="font-heading text-2xl text-white mb-6">Reservation Details</h2>
                <ReservationForm />
              </div>
            </div>
            <div ref={infoRef} className="lg:col-span-2">
              <div className="space-y-8">
                <div>
                  <h3 className="font-heading text-lg text-royal-gold uppercase tracking-[0.1em] mb-4">Contact</h3>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <svg className="w-4 h-4 mt-1 text-royal-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <p className="font-body text-base text-royal-cream/70">{address}</p>
                    </div>
                    <div className="flex gap-3">
                      <svg className="w-4 h-4 mt-1 text-royal-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <p className="font-body text-base text-royal-cream/70">{phone}</p>
                    </div>
                    <div className="flex gap-3">
                      <svg className="w-4 h-4 mt-1 text-royal-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <p className="font-body text-base text-royal-cream/70">{email}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-heading text-lg text-royal-gold uppercase tracking-[0.1em] mb-4">Opening Hours</h3>
                  <div className="space-y-2">
                    {openingHours.map((item, i) => (
                      <div key={i} className="flex justify-between font-body text-base text-royal-cream/70">
                        <span>{item.day || item.dayOfWeek}</span>
                        <span>{item.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="h-48 overflow-hidden">
                  <iframe
                    title="Restaurant Location"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ filter: 'invert(0.9) hue-rotate(180deg)' }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}

export default ReservationPage;
