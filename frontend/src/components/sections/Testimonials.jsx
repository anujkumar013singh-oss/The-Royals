import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from '../../lib/gsap';
import GoldRule from '../ui/GoldRule';
import SectionLabel from '../ui/SectionLabel';
import TestimonialsColumn from '../ui/TestimonialsColumn';

const testimonials = [
  {
    text: 'The presidential suite was absolutely breathtaking. Stunning views, impeccable service, and a bed so comfortable I didn\'t want to leave. Truly a royal stay.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop',
    name: 'Briana Patton',
    role: 'Frequent Guest',
  },
  {
    text: 'From the warm welcome to the flawless housekeeping, every detail was perfect. The Royal\'s staff made us feel like actual royalty. Will be back every year.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop',
    name: 'Bilal Ahmed',
    role: 'Business Traveler',
  },
  {
    text: 'The spa and infinity pool overlooking the city skyline were pure magic. This hotel sets the standard for luxury hospitality in every way.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop',
    name: 'Saman Malik',
    role: 'Travel Blogger',
  },
  {
    text: 'Our honeymoon at The Royals was unforgettable. The suite was beautifully decorated, the room service was prompt, and the turndown service was a lovely touch.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop',
    name: 'Omar Raza',
    role: 'Honeymooner',
  },
  {
    text: 'The concierge arranged an incredible city tour and secured last-minute theater tickets. Their attention to detail made our entire trip seamless and enjoyable.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=96&h=96&fit=crop',
    name: 'Zainab Hussain',
    role: 'Corporate Guest',
  },
  {
    text: 'Best hotel experience I\'ve ever had. The room was spacious and elegantly designed, the breakfast buffet was world-class, and the location couldn\'t be better.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=96&h=96&fit=crop',
    name: 'Aliza Khan',
    role: 'Vacationer',
  },
  {
    text: 'I stayed for a week-long business conference and was blown away by the meeting facilities and the attentive banquet staff. Five-star service throughout.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop',
    name: 'Farhan Siddiqui',
    role: 'Conference Attendee',
  },
  {
    text: 'The rooftop restaurant had the most incredible sunset views. Paired with their signature cocktails and live piano, it was a perfect evening.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&h=96&fit=crop',
    name: 'Sana Sheikh',
    role: 'Weekend Guest',
  },
  {
    text: 'Checked in for a family getaway and the staff went above and beyond for our kids. The kids\' club and family suite made it a stress-free vacation for us parents.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=96&h=96&fit=crop',
    name: 'Hassan Ali',
    role: 'Family Traveler',
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: titleRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-royal-black overflow-hidden">
      <div className="container z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div ref={titleRef} className="text-center mb-4">
            <SectionLabel>Testimonials</SectionLabel>
            <h2 className="font-heading text-3xl md:text-5xl text-white mt-3 mb-4">What Our guests Say</h2>
            <GoldRule align="center" />
            <p className="font-body text-lg text-royal-cream/70 max-w-lg mx-auto mt-6">
              See what our guests have to say about their royal experience.
            </p>
          </div>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
}