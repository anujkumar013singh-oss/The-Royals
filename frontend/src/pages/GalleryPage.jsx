import PageWrapper from '../components/layout/PageWrapper';
import GalleryMasonry from '../components/sections/GalleryMasonry';

function GalleryPage() {
  return (
    <PageWrapper>
      <section className="pt-32 pb-0 md:pt-40">
        <div className="page-container text-center mb-8">
          <span className="font-ui text-xs uppercase tracking-[0.2em] text-royal-gold">Gallery</span>
          <h1 className="font-heading text-4xl md:text-6xl text-white mt-3">A Visual Journey</h1>
        </div>
      </section>
      <GalleryMasonry />
    </PageWrapper>
  );
}

export default GalleryPage;
