import { Link } from 'react-router-dom';
import { useSiteContext } from '../../context/SiteContext';

function Footer() {
  const { settings } = useSiteContext();

  const address = settings?.address || '123 Royal Street, New York, NY 10001';
  const phone = settings?.phone || '+1 (555) 123-4567';
  const email = settings?.email || 'info@theroyals.com';
  const instagram = settings?.socialLinks?.instagram || '#';
  const facebook = settings?.socialLinks?.facebook || '#';
  const twitter = settings?.socialLinks?.twitter || '#';

  return (
    <footer className="bg-royal-dark border-t border-royal-gold/10">
      <div className="page-container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div className="footer-col">
            <Link to="/" className="font-heading text-xl text-royal-gold tracking-[0.25em] uppercase">THE ROYALS</Link>
            <p className="font-body text-base text-royal-cream/60 mt-4 leading-relaxed">Where Every Stay is a Royal Affair</p>
            <p className="font-body text-base text-royal-cream/60 mt-3 leading-relaxed">
              A luxury hotel experience crafted with passion, tradition, and an unwavering commitment to hospitality excellence.
            </p>
            <div className="flex gap-4 mt-6">
              <a href={instagram} target="_blank" rel="noopener noreferrer" className="text-royal-cream/40 hover:text-royal-gold transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href={facebook} target="_blank" rel="noopener noreferrer" className="text-royal-cream/40 hover:text-royal-gold transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href={twitter} target="_blank" rel="noopener noreferrer" className="text-royal-cream/40 hover:text-royal-gold transition-colors" aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="font-heading text-base text-royal-gold uppercase tracking-[0.1em] mb-6">Quick Links</h4>
            <div className="space-y-3">
              {['Home', 'Menu', 'About', 'Reservations', 'Contact'].map((label) => {
                const to = label === 'Home' ? '/' : label === 'Reservations' ? '/reservations' : label === 'Contact' ? '/contact' : `/${label.toLowerCase()}`;
                return (
                  <Link key={label} to={to} className="block font-body text-base text-royal-cream/60 hover:text-royal-gold transition-colors">
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="footer-col">
            <h4 className="font-heading text-base text-royal-gold uppercase tracking-[0.1em] mb-6">Contact</h4>
            <div className="space-y-4">
              <p className="font-body text-base text-royal-cream/60 leading-relaxed">{address}</p>
              <p className="font-body text-base text-royal-cream/60">
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-royal-gold transition-colors">{phone}</a>
              </p>
              <p className="font-body text-base text-royal-cream/60">
                <a href={`mailto:${email}`} className="hover:text-royal-gold transition-colors">{email}</a>
              </p>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="font-heading text-base text-royal-gold uppercase tracking-[0.1em] mb-6">Stay Connected</h4>
            <p className="font-body text-base text-royal-cream/60 mb-4">Subscribe for exclusive offers and updates.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-transparent border border-royal-cream/20 px-3 py-2 font-ui text-sm text-white placeholder:text-royal-cream/30 focus:outline-none focus:border-royal-gold/60 transition-colors"
              />
              <button type="submit" className="bg-royal-gold text-royal-black px-4 font-ui text-xs uppercase tracking-wider font-medium hover:bg-[#e0c24a] transition-colors shrink-0">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-royal-cream/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-ui text-xs text-royal-cream/40">&copy; {new Date().getFullYear()} THE ROYALS. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/menu" className="font-ui text-xs text-royal-cream/40 hover:text-royal-gold transition-colors uppercase tracking-wider">Menu</Link>
            <Link to="/about" className="font-ui text-xs text-royal-cream/40 hover:text-royal-gold transition-colors uppercase tracking-wider">About</Link>
            <Link to="/contact" className="font-ui text-xs text-royal-cream/40 hover:text-royal-gold transition-colors uppercase tracking-wider">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;