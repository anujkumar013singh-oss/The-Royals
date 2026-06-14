import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSiteData } from '../../context/SiteDataContext'
import { useGSAP } from '../../hooks/useGSAP'
import { gsap } from '../../lib/gsap'

function HeroSection() {
  const { settings } = useSiteData()
  const sectionRef = useRef(null)
  const eyebrowRef = useRef(null)
  const headlineRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)
  const scrollRef = useRef(null)
  const bgRef = useRef(null)
  const [imgLoaded, setImgLoaded] = useState(false)

  const restaurantName = settings?.restaurantName || 'Restaurant Name'
  const tagline = settings?.tagline || 'An exquisite fine dining experience'
  const heroImage = settings?.heroImageUrl || ''
  const establishedYear = '2010'

  useGSAP((gsap, scope) => {
    if (!scope) return

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(eyebrowRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
    tl.fromTo(
      headlineRef.current?.querySelectorAll('.word'),
      { y: 80, opacity: 0, rotateX: -40 },
      { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.12 },
      '-=0.3'
    )
    tl.fromTo(subRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, '-=0.2')
    tl.fromTo(ctaRef.current?.querySelectorAll('a, button'), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.15 }, '-=0.1')
    tl.fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.2')

    if (bgRef.current) {
      gsap.to(bgRef.current, {
        scale: 1.08,
        duration: 15,
        ease: 'none',
        repeat: -1,
        yoyo: true,
      })
    }
  }, [imgLoaded])

  const splitHeadline = (text) => {
    return text.split(' ').map((word, i) => (
      <span key={i} className="word inline-block mr-[0.3em]">
        {word}
      </span>
    ))
  }

  return (
    <section ref={sectionRef} className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
      {/* Background */}
      {heroImage && (
        <>
          <div className={`absolute inset-0 bg-black ${imgLoaded ? 'hidden' : 'block'}`} />
          <img
            ref={bgRef}
            src={heroImage}
            alt=""
            onLoad={() => setImgLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              imgLoaded ? 'opacity-60' : 'opacity-0'
            }`}
          />
        </>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        {/* Eyebrow */}
        <p
          ref={eyebrowRef}
          className="font-accent text-eyebrow text-gold tracking-[0.2em] uppercase mb-6"
        >
          Est. {establishedYear}
        </p>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="font-display text-display-sm sm:text-display-md md:text-display-lg lg:text-display-xl text-white font-light leading-none mb-6 text-balance"
        >
          {splitHeadline(restaurantName)}
        </h1>

        {/* Gold line */}
        <div className="w-16 h-[1px] bg-gold mb-6" />

        {/* Subheadline */}
        <p
          ref={subRef}
          className="font-body text-body-md md:text-body-lg text-text-secondary max-w-xl leading-relaxed"
        >
          {tagline}
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 mt-10">
          <Link
            to="/menu"
            className="inline-flex items-center justify-center px-8 py-3 bg-gold text-black font-body text-body-sm uppercase tracking-[0.15em] font-medium hover:bg-gold-light transition-all duration-300"
          >
            View Menu
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center justify-center px-8 py-3 border border-gold/60 text-gold font-body text-body-sm uppercase tracking-[0.15em] font-medium hover:bg-gold hover:text-black transition-all duration-300"
          >
            Our Story
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="font-body text-caption text-text-muted uppercase tracking-[0.2em]">
          Scroll
        </span>
        <svg className="w-4 h-4 text-gold animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}

export default HeroSection
