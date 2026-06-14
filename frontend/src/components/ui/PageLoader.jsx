import { motion } from 'framer-motion';

function PageLoader() {
  return (
    <div className="fixed inset-0 z-[70] bg-royal-black flex flex-col items-center justify-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-heading text-3xl md:text-5xl text-royal-gold tracking-[0.3em]"
      >
        THE ROYALS
      </motion.h1>
      <div className="mt-8 flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
            className="w-2 h-2 rounded-full bg-royal-gold"
          />
        ))}
      </div>
    </div>
  );
}

export default PageLoader;
