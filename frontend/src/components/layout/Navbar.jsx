import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from '../../lib/gsap';

const links = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const mobileVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const linkVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: { delay: 0.1 + i * 0.08, duration: 0.5, ease: 'easeOut' },
  }),
};

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    if (scrolled) {
      gsap.to(navRef.current, { backgroundColor: 'rgba(10,10,10,0.95)', duration: 0.3, ease: 'power2.out' });
    } else {
      gsap.to(navRef.current, { backgroundColor: 'transparent', duration: 0.3, ease: 'power2.out' });
    }
  }, [scrolled]);

  const linkClass = ({ isActive }) =>
    `font-ui text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${
      isActive ? 'text-royal-gold' : 'text-royal-cream/70 hover:text-royal-gold'
    }`;

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-shadow duration-300"
        style={scrolled ? { boxShadow: '0 4px 30px rgba(0,0,0,0.3)' } : {}}
      >
        <div className="page-container">
          <div className="flex items-center justify-between h-20 md:h-24">
            <NavLink to="/" className="font-heading text-lg md:text-xl text-royal-gold tracking-[0.25em] uppercase">
              THE ROYALS
            </NavLink>

            <div className="hidden md:flex items-center gap-8">
              {links.map((link) => (
                <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === '/'}>
                  {link.label}
                </NavLink>
              ))}
              <NavLink
                to="/reservations"
                className="font-ui text-xs uppercase tracking-[0.15em] px-5 py-2 border border-royal-gold text-royal-gold hover:bg-royal-gold hover:text-royal-black transition-all duration-300"
              >
                Reserve
              </NavLink>
            </div>

            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden flex flex-col gap-1.5 p-2 z-50"
              aria-label="Open menu"
            >
              <span className="block w-6 h-[1px] bg-royal-gold" />
              <span className="block w-6 h-[1px] bg-royal-gold" />
              <span className="block w-6 h-[1px] bg-royal-gold" />
            </button>
          </div>
        </div>
        <div className={`h-[1px] bg-gradient-to-r from-transparent via-royal-gold/40 to-transparent transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={mobileVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 bg-royal-black/98 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-6 right-6 text-royal-gold text-3xl font-thin"
              aria-label="Close menu"
            >
              ✕
            </button>
            <nav className="flex flex-col items-center gap-8">
              {links.map((link, i) => (
                <motion.div key={link.to} custom={i} variants={linkVariants} initial="hidden" animate="visible">
                  <NavLink
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `font-heading text-3xl md:text-4xl uppercase tracking-[0.15em] transition-colors duration-300 ${
                        isActive ? 'text-royal-gold' : 'text-white hover:text-royal-gold'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div custom={links.length} variants={linkVariants} initial="hidden" animate="visible">
                <NavLink
                  to="/reservations"
                  onClick={() => setMobileOpen(false)}
                  className="inline-block font-ui text-sm uppercase tracking-[0.15em] px-8 py-3 border border-royal-gold text-royal-gold hover:bg-royal-gold hover:text-royal-black transition-all duration-300 mt-4"
                >
                  Reserve a Table
                </NavLink>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
