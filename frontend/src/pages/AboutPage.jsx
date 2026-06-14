import AboutSplit from '../components/sections/AboutSplit';
import ChefSection from '../components/sections/ChefSection';
import TimelineSection from '../components/sections/TimelineSection';
import StatsRow from '../components/sections/StatsRow';

function AboutPage() {
  return (
    <>
      <section className="pt-32 pb-0 md:pt-40">
        <div className="page-container text-center mb-8">
          <span className="font-ui text-xs uppercase tracking-[0.2em] text-royal-gold">About</span>
          <h1 className="font-heading text-4xl md:text-6xl text-white mt-3">Our Story</h1>
        </div>
      </section>
      <AboutSplit />
      <ChefSection />
      <TimelineSection />
      <StatsRow />
    </>
  );
}

export default AboutPage;
