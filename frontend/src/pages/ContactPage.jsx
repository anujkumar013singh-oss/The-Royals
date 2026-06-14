import { useState, useRef } from 'react'
import { useSiteData } from '../context/SiteDataContext'
import { useGSAP } from '../hooks/useGSAP'
import { gsap } from '../lib/gsap'
import PageWrapper from '../components/layout/PageWrapper'

function ContactPage() {
  const { settings } = useSiteData()
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const headerRef = useRef(null)
  const infoRef = useRef(null)
  const formRef = useRef(null)

  const address = settings?.address || '123 Gourmet Street, New York, NY 10001'
  const phone = settings?.phone || '+1 (555) 123-4567'
  const email = settings?.email || 'info@restaurant.com'
  const openingHours = settings?.openingHours || {
    Monday: '17:00 - 22:00',
    Tuesday: '17:00 - 22:00',
    Wednesday: '17:00 - 22:00',
    Thursday: '17:00 - 22:00',
    Friday: '17:00 - 23:00',
    Saturday: '17:00 - 23:00',
    Sunday: 'Closed',
  }
  const mapsQuery = encodeURIComponent(address)

  useGSAP((gsap, scope) => {
    if (!scope) return

    gsap.fromTo(
      headerRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: headerRef.current, start: 'top 85%' } }
    )

    gsap.fromTo(
      infoRef.current?.querySelectorAll('.info-item'),
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: infoRef.current, start: 'top 80%' } }
    )

    gsap.fromTo(
      formRef.current,
      { x: 30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: formRef.current, start: 'top 80%' } }
    )
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setFormSubmitted(false), 5000)
  }

  return (
    <PageWrapper>
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-black min-h-screen">
        <div className="section-container">
          <div ref={headerRef} className="text-center mb-16">
            <div className="gold-line-center mb-6" />
            <h1 className="font-display text-display-sm md:text-display-md text-white mb-4">
              Contact
            </h1>
            <p className="font-body text-body-md text-text-secondary max-w-lg mx-auto">
              We would love to hear from you
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div ref={infoRef}>
              <div className="space-y-8">
                {/* Address */}
                <div className="info-item flex gap-4">
                  <div className="w-10 h-10 shrink-0 flex items-center justify-center border border-gold/30">
                    <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-accent text-heading-md text-gold uppercase tracking-[0.1em] mb-1">
                      Address
                    </h3>
                    <p className="font-body text-body-md text-text-secondary">{address}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="info-item flex gap-4">
                  <div className="w-10 h-10 shrink-0 flex items-center justify-center border border-gold/30">
                    <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-accent text-heading-md text-gold uppercase tracking-[0.1em] mb-1">
                      Phone
                    </h3>
                    <p className="font-body text-body-md text-text-secondary">{phone}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="info-item flex gap-4">
                  <div className="w-10 h-10 shrink-0 flex items-center justify-center border border-gold/30">
                    <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-accent text-heading-md text-gold uppercase tracking-[0.1em] mb-1">
                      Email
                    </h3>
                    <p className="font-body text-body-md text-text-secondary">{email}</p>
                  </div>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="mt-10">
                <div className="gold-line mb-6" />
                <h3 className="font-accent text-heading-md text-gold uppercase tracking-[0.1em] mb-6">
                  Opening Hours
                </h3>
                <div className="space-y-3 max-w-xs">
                  {Object.entries(openingHours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between font-body text-body-sm">
                      <span className="text-text-secondary capitalize">{day}</span>
                      <span className="text-text-primary">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form / Map */}
            <div ref={formRef}>
              {/* Maps Embed */}
              <div className="w-full h-64 bg-surface-card rounded-sm overflow-hidden mb-8">
                <iframe
                  title="Restaurant Location"
                  src={`https://maps.google.com/maps?q=${mapsQuery}&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ filter: 'invert(0.9) hue-rotate(180deg)' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Contact Form */}
              <div className="bg-surface-card p-6 md:p-8 rounded-sm border-t border-gold/20">
                <h3 className="font-accent text-heading-md text-gold uppercase tracking-[0.1em] mb-6">
                  Send a Message
                </h3>
                {formSubmitted ? (
                  <div className="bg-gold/10 border border-gold/30 rounded-sm p-6 text-center">
                    <p className="font-body text-body-md text-gold">
                      Thank you for your message. We will be in touch soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        required
                        className="w-full bg-transparent border border-border-subtle px-4 py-3 font-body text-body-sm text-white placeholder:text-text-muted focus:outline-none focus:border-gold/60 transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        required
                        className="w-full bg-transparent border border-border-subtle px-4 py-3 font-body text-body-sm text-white placeholder:text-text-muted focus:outline-none focus:border-gold/60 transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <textarea
                        rows={4}
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                        required
                        className="w-full bg-transparent border border-border-subtle px-4 py-3 font-body text-body-sm text-white placeholder:text-text-muted focus:outline-none focus:border-gold/60 transition-colors duration-300 resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gold text-black font-body text-body-sm uppercase tracking-[0.15em] font-medium px-6 py-3 hover:bg-gold-light transition-all duration-300"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}

export default ContactPage
