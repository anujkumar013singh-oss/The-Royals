import { motion } from 'framer-motion';

function TestimonialsColumn({ className, testimonials, duration = 10 }) {
  return (
    <div className={className}>
      <motion.div
        animate={{ translateY: '-50%' }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2)].map((_, index) => (
          <div key={index}>
            {testimonials.map(({ text, image, name, role }, i) => (
              <div
                className="p-6 md:p-8 rounded-3xl border border-royal-cream/10 shadow-lg shadow-royal-gold/5 max-w-xs w-full mb-6 bg-royal-dark/60 backdrop-blur-sm"
                key={`${index}-${i}`}
              >
                <div className="font-body text-base text-royal-cream/80 leading-relaxed">&ldquo;{text}&rdquo;</div>
                <div className="flex items-center gap-3 mt-5">
                  <img
                    width={40}
                    height={40}
                    src={image}
                    alt={name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <div className="font-ui text-sm font-medium tracking-tight text-royal-cream">{name}</div>
                    <div className="font-ui text-xs text-royal-cream/50 tracking-tight">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default TestimonialsColumn;