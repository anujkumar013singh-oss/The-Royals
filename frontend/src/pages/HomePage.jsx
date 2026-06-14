import HeroSlider from '../components/sections/HeroSlider';
import MarqueeBar from '../components/sections/MarqueeBar';
import SignatureDishes from '../components/sections/SignatureDishes';
import AboutSplit from '../components/sections/AboutSplit';
import StatsRow from '../components/sections/StatsRow';
import MenuPreview from '../components/sections/MenuPreview';
import Testimonials from '../components/sections/Testimonials';
import ReservationCTA from '../components/sections/ReservationCTA';

function HomePage() {
  return (
    <>
      <HeroSlider />
      <MarqueeBar />
      <SignatureDishes />
      <AboutSplit />
      <StatsRow />
      <MenuPreview />
      <Testimonials />
      <ReservationCTA />
    </>
  );
}

export default HomePage;
