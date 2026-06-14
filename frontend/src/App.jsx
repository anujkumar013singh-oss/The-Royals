import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useLenis } from './hooks/useLenis';
import { ScrollTrigger } from './lib/gsap';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import PageWrapper from './components/layout/PageWrapper';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import AboutPage from './pages/AboutPage';
import ReservationPage from './pages/ReservationPage';
import NotFoundPage from './pages/NotFoundPage';
import ContactMap from './components/sections/ContactMap';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
        <Route path="/menu" element={<PageWrapper><MenuPage /></PageWrapper>} />
        <Route path="/menu/:category" element={<PageWrapper><MenuPage /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
        <Route path="/reservations" element={<PageWrapper><ReservationPage /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><section className="pt-32 pb-0 md:pt-40"><div className="page-container text-center mb-8"><span className="font-ui text-xs uppercase tracking-[0.2em] text-royal-gold">Contact</span><h1 className="font-heading text-4xl md:text-6xl text-white mt-3">Get in Touch</h1></div></section><ContactMap /></PageWrapper>} />
        <Route path="*" element={<PageWrapper><NotFoundPage /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const location = useLocation();
  const lenisRef = useLenis();

  useEffect(() => {
    requestAnimationFrame(() => {
      lenisRef.current?.resize();
      ScrollTrigger.refresh();
    });
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <AnimatedRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
