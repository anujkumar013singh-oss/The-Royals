import { Link } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';

function NotFoundPage() {
  return (
    <PageWrapper>
      <section className="min-h-screen flex items-center justify-center bg-royal-black">
        <div className="text-center px-4">
          <h1 className="font-heading text-8xl md:text-9xl text-royal-gold">404</h1>
          <div className="h-0.5 w-16 bg-royal-gold mx-auto my-6" />
          <p className="font-body text-xl md:text-2xl text-royal-cream/70 mb-8">Page Not Found</p>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-8 py-3 bg-royal-gold text-royal-black font-ui text-sm uppercase tracking-[0.15em] font-medium hover:bg-[#e0c24a] transition-all duration-300"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </PageWrapper>
  );
}

export default NotFoundPage;
