import { useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { gsap } from '../../lib/gsap';
import { useSiteContext } from '../../context/SiteContext';

const defaultSlides = [
  { heading: 'THE ROYALS', subtitle: 'An Exquisite Fine Dining Experience', imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80', cta1: { text: 'View Menu', to: '/menu' }, cta2: { text: 'Reserve a Table', to: '/reservations' } },
  { heading: 'Culinary Excellence', subtitle: 'Crafted with Passion, Served with Elegance', imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80', cta1: { text: 'Our Story', to: '/about' }, cta2: { text: 'View Menu', to: '/menu' } },
  { heading: 'A Taste of Luxury', subtitle: 'Where Every Meal is a Royal Affair', imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80', cta1: { text: 'Reserve Now', to: '/reservations' }, cta2: { text: 'View Menu', to: '/menu' } },
];

function HeroSlider() {
  const { settings } = useSiteContext();
  const swiperRef = useRef(null);
  const scrollTimerRef = useRef(null);

  const rawSlides = settings?.heroSlides?.length ? settings.heroSlides : null;
  const hasValidImages = rawSlides?.some((s) => s.imageUrl);
  const slides = rawSlides && hasValidImages
    ? rawSlides.map((s) => ({
        heading: s.title || 'THE ROYALS',
        subtitle: s.subtitle || 'An Exquisite Fine Dining Experience',
        cta1: { text: 'View Menu', to: '/menu' },
        cta2: { text: 'Reserve a Table', to: '/reservations' },
        imageUrl: s.imageUrl,
      }))
    : defaultSlides;

  const animateSlide = useCallback((swiper) => {
    const el = swiper?.slides?.[swiper.activeIndex];
    if (!el) return;
    gsap.killTweensOf(el.querySelectorAll('.hero-word, .hero-gold, .hero-subtitle'));
    gsap.killTweensOf(el.querySelector('.hero-cta')?.querySelectorAll('a, button'));
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.15 });
    const words = el.querySelectorAll('.hero-word');
    if (words.length) tl.fromTo(words, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.08 }, 0);
    const gold = el.querySelector('.hero-gold');
    if (gold) tl.fromTo(gold, { scaleX: 0 }, { scaleX: 1, duration: 0.6, transformOrigin: 'left' }, '-=0.35');
    const subtitle = el.querySelector('.hero-subtitle');
    if (subtitle) tl.fromTo(subtitle, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.3');
    const cta = el.querySelector('.hero-cta');
    if (cta) tl.fromTo(cta.querySelectorAll('a, button'), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.12 }, '-=0.2');
  }, []);

  const resetSlide = useCallback((swiper) => {
    const el = swiper?.slides?.[swiper.activeIndex];
    if (!el) return;
    gsap.set(el.querySelectorAll('.hero-word'), { y: 60, opacity: 0 });
    gsap.set(el.querySelector('.hero-gold'), { scaleX: 0 });
    gsap.set(el.querySelector('.hero-subtitle'), { y: 20, opacity: 0 });
    gsap.set(el.querySelector('.hero-cta')?.querySelectorAll('a, button'), { y: 20, opacity: 0 });
  }, []);

  const handleSlideChange = useCallback((swiper) => {
    resetSlide(swiper);
    animateSlide(swiper);
  }, [resetSlide, animateSlide]);

  const handleSwiperInit = useCallback((swiper) => {
    swiperRef.current = swiper;
    const swiperEl = swiper.el;
    if (swiperEl) {
      swiperEl.setAttribute('data-lenis-prevent', '');
    }
    requestAnimationFrame(() => {
      resetSlide(swiper);
      animateSlide(swiper);
    });
  }, [resetSlide, animateSlide]);

  const handleWheel = useCallback(() => {
    const swiper = swiperRef.current;
    if (swiper?.autoplay) {
      swiper.autoplay.stop();
      clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = setTimeout(() => {
        swiper.autoplay.start();
      }, 3000);
    }
  }, []);

  const splitWords = (text) =>
    text.split(' ').map((word, i) => (
      <span key={i} className="hero-word inline-block mr-[0.3em]">{word}</span>
    ));

  return (
    <section className="relative h-screen overflow-hidden" onWheel={handleWheel}>
      <Swiper
        onSwiper={handleSwiperInit}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={800}
        touchStartPreventDefault={false}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true, renderBullet: (_, className) => `<span class="${className}" style="background:#d4af37;width:10px;height:10px"></span>` }}
        navigation={{ prevEl: '.hero-prev', nextEl: '.hero-next' }}
        onSlideChange={handleSlideChange}
        className="h-full w-full"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx} className="relative">
            {slide.imageUrl && (
              <img src={slide.imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60" />
            )}
            <div className="absolute inset-0 bg-royal-black/40" />
            <div className="absolute inset-0 bg-gradient-to-b from-royal-black/70 via-royal-black/40 to-royal-black/80" />
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
              <h1 className="hero-heading font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-light leading-none mb-6">
                {splitWords(slide.heading)}
              </h1>
              <div className="hero-gold h-0.5 w-16 bg-royal-gold mb-6" />
              <p className="hero-subtitle font-body text-lg md:text-xl text-royal-cream/80 max-w-xl leading-relaxed">
                {slide.subtitle}
              </p>
              <div className="hero-cta flex flex-col sm:flex-row gap-4 mt-10">
                <Link to={slide.cta1?.to || '/menu'} className="inline-flex items-center justify-center px-8 py-3 bg-royal-gold text-royal-black font-ui text-sm uppercase tracking-[0.15em] font-medium hover:bg-[#e0c24a] transition-all duration-300">
                  {slide.cta1?.text || 'View Menu'}
                </Link>
                <Link to={slide.cta2?.to || '/reservations'} className="inline-flex items-center justify-center px-8 py-3 border border-royal-gold text-royal-gold font-ui text-sm uppercase tracking-[0.15em] font-medium hover:bg-royal-gold hover:text-royal-black transition-all duration-300">
                  {slide.cta2?.text || 'Reserve a Table'}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button className="hero-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white/60 hover:text-royal-gold transition-colors hidden md:flex items-center justify-center w-10 h-10">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button className="hero-next absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white/60 hover:text-royal-gold transition-colors hidden md:flex items-center justify-center w-10 h-10">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5">
        <span className="font-ui text-[10px] text-royal-cream/50 uppercase tracking-[0.2em]">Scroll</span>
        <svg className="w-4 h-4 text-royal-gold animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}

export default HeroSlider;