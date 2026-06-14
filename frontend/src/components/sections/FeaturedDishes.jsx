import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useApi } from '../../hooks/useApi'
import { useGSAP } from '../../hooks/useGSAP'
import { gsap } from '../../lib/gsap'
import Card from '../ui/Card'

function FeaturedDishes() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const gridRef = useRef(null)
  const { data, loading } = useApi('/menu')

  const dishes = data?.length ? data.slice(0, 6) : []

  useGSAP((gsap, scope) => {
    if (!scope || !dishes.length) return

    const cards = gridRef.current?.querySelectorAll('.featured-card')
    if (!cards?.length) return

    gsap.fromTo(
      titleRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    gsap.fromTo(
      cards,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    cards.forEach((card) => {
      const img = card.querySelector('img')
      if (img) {
        gsap.to(img, {
          y: () => (1 - 0.8) * 100,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    })
  }, [dishes.length])

  return (
    <section ref={sectionRef} className="section-padding bg-black">
      <div className="section-container">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="gold-line-center mb-6" />
          <h2 className="font-display text-display-sm md:text-display-md text-white mb-4">
            Our Signatures
          </h2>
          <p className="font-body text-body-md text-text-secondary max-w-lg mx-auto">
            Curated dishes that define our culinary philosophy
          </p>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-surface-card rounded-sm overflow-hidden">
                <div className="aspect-[4/3] skeleton" />
                <div className="p-6 space-y-3">
                  <div className="h-6 w-2/3 skeleton" />
                  <div className="h-4 w-full skeleton" />
                  <div className="h-4 w-1/2 skeleton" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {dishes.map((dish) => (
              <div key={dish._id || dish.id} className="featured-card">
                <Card
                  image={dish.imageUrl}
                  title={dish.name}
                  description={dish.description}
                  price={dish.price}
                  tags={dish.tags}
                />
              </div>
            ))}
          </div>
        )}

        {/* Explore Link */}
        {!loading && dishes.length > 0 && (
          <div className="text-center mt-12">
            <Link
              to="/menu"
              className="group inline-flex items-center gap-2 font-body text-body-sm uppercase tracking-[0.15em] text-gold hover:text-gold-light transition-colors duration-300"
            >
              Explore Full Menu
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default FeaturedDishes
