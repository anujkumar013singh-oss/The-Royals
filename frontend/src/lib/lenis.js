import Lenis from 'lenis';
import { gsap } from './gsap.js';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let lenis;

export function initLenis() {
  lenis = new Lenis({
    duration: 0.9,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    wheelMultiplier: 1.2,
    touchMultiplier: 1.5,
    infinite: false,
    autoResize: true,
  });

  lenis.on('scroll', () => {
    ScrollTrigger.update();
  });

  gsap.ticker.add(() => {
    lenis.raf(performance.now());
  });
  gsap.ticker.lagSmoothing(0);

  const refresh = () => ScrollTrigger.refresh();

  requestAnimationFrame(refresh);

  return lenis;
}

export { lenis };