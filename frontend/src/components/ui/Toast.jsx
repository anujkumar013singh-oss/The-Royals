import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Toast({ message, type = 'success', isOpen, onClose, duration = 4000 }) {
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [isOpen, onClose, duration]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed top-24 right-4 z-[80] px-6 py-4 shadow-lg ${
            type === 'success' ? 'bg-royal-gold text-royal-black' : 'bg-red-600 text-white'
          }`}
        >
          <div className="flex items-center gap-3">
            {type === 'success' ? (
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            <span className="font-ui text-sm">{message}</span>
            <button onClick={onClose} className="ml-4 opacity-60 hover:opacity-100 transition-opacity">
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Toast;
