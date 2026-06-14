import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

const panelVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 28 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, scale: 0.94, y: 16, transition: { duration: 0.3 } },
};

const stateVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.32 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.22 } },
};

function CrownSpinner() {
  const pathRef = useRef(null);

  useEffect(() => {
    if (!pathRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        pathRef.current,
        { strokeDashoffset: 0 },
        { strokeDashoffset: 100, duration: 1.2, ease: 'power2.inOut', repeat: -1, yoyo: true }
      );
    }, pathRef);
    return () => ctx.revert();
  }, []);

  return (
    <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
      <path
        ref={pathRef}
        d="M6 22l3-9 4 6 4-6 3 9"
        stroke="#C9A84C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="100"
      />
    </svg>
  );
}

export default function PaymentModal({
  modalState, orderData, onClose,
}) {
  const show = modalState !== null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: 'rgba(8,8,8,0.92)', backdropFilter: 'blur(20px)' }}
        >
          <motion.div
            key="panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full"
            style={{
              maxWidth: 'min(460px, 92vw)',
              background: '#111111',
              border: '1px solid rgba(201,168,76,0.35)',
              borderRadius: '16px',
              boxShadow: '0 48px 120px rgba(0,0,0,0.75), 0 0 0 1px rgba(201,168,76,0.06), inset 0 1px 0 rgba(255,255,255,0.04)',
              overflow: 'hidden',
            }}
          >
            <div style={{ height: '4px', background: '#C9A84C' }} />

            <AnimatePresence mode="wait">
              {modalState === 'loading' && (
                <motion.div
                  key="loading" variants={stateVariants} initial="hidden" animate="visible" exit="exit"
                  style={{ padding: '56px 40px', textAlign: 'center' }}
                >
                  <CrownSpinner />
                  <p style={{
                    fontFamily: 'var(--font-accent)', color: 'rgba(250,250,248,0.4)',
                    fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: '20px',
                  }}>
                    Confirming your reservation...
                  </p>
                </motion.div>
              )}

              {modalState === 'qr_active' && orderData && (
                <motion.div
                  key="qr_active" variants={stateVariants} initial="hidden" animate="visible" exit="exit"
                  style={{ textAlign: 'center' }}
                >
                  <p style={{
                    fontFamily: 'var(--font-accent)', color: '#C9A84C', fontSize: '10px',
                    letterSpacing: '0.24em', textTransform: 'uppercase', paddingTop: '28px',
                  }}>
                    ✦ &nbsp; SCAN & PAY &nbsp; ✦
                  </p>

                  <p style={{
                    fontFamily: 'var(--font-accent)', color: '#FAFAF8', fontSize: '12px',
                    letterSpacing: '0.12em', marginTop: '8px',
                  }}>
                    Pay ₹1 to confirm your table
                  </p>

                  <div style={{ padding: '20px' }}>
                    <div style={{
                      background: '#FFFFFF', padding: '10px', borderRadius: '10px',
                      border: '2px solid rgba(201,168,76,0.5)',
                      boxShadow: '0 0 48px rgba(201,168,76,0.12)',
                      display: 'inline-block',
                    }}>
                      <img src={orderData.qrImageUrl} width={200} height={200} alt="UPI QR Code" style={{ display: 'block', borderRadius: '4px' }} />
                    </div>

                    <p style={{
                      fontFamily: 'var(--font-heading)', color: '#C9A84C',
                      fontSize: '36px', margin: '16px 0 2px',
                    }}>
                      ₹1.00
                    </p>
                    <p style={{
                      fontFamily: 'var(--font-ui)', color: 'rgba(250,250,248,0.4)',
                      fontSize: '11px', letterSpacing: '0.1em',
                    }}>
                      Advance Reservation Fee
                    </p>
                  </div>

                  <div style={{ height: '1px', background: 'rgba(201,168,76,0.2)', margin: '0 32px' }} />

                  <div style={{ padding: '20px 32px', textAlign: 'left' }}>
                    <p style={{
                      fontFamily: 'var(--font-accent)', fontSize: '9px', color: '#C9A84C',
                      letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px',
                    }}>
                      Booking Details
                    </p>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <tbody>
                        {[
                          ['Guest', orderData.guestName],
                          ['Date', new Date(orderData.date).toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })],
                          ['Time', orderData.time],
                          ['Guests', `${orderData.guests} Persons`],
                        ].map(([label, value]) => (
                          <tr key={label}>
                            <td style={{
                              fontFamily: 'var(--font-accent)', fontSize: '9px', color: 'rgba(201,168,76,0.6)',
                              letterSpacing: '0.12em', textTransform: 'uppercase', padding: '3px 0', width: '70px',
                            }}>
                              {label}
                            </td>
                            <td style={{
                              fontFamily: 'var(--font-ui)', fontSize: '13px', color: '#FAFAF8', padding: '3px 0',
                            }}>
                              {value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div style={{ height: '1px', background: 'rgba(201,168,76,0.2)', margin: '0 32px' }} />

                  <div style={{ padding: '16px 32px 28px' }}>
                    <p style={{
                      fontFamily: 'var(--font-ui)', color: 'rgba(250,250,248,0.4)',
                      fontSize: '12px', marginBottom: '12px',
                    }}>
                      Open GPay, PhonePe, Paytm or any UPI app<br />and scan this code to pay
                    </p>
                    <button
                      onClick={onClose}
                      className="w-full bg-royal-gold text-royal-black font-ui text-sm uppercase tracking-[0.15em] font-medium px-6 py-3 hover:bg-[#e0c24a] transition-all duration-300"
                    >
                      Done
                    </button>
                  </div>
                </motion.div>
              )}

              {modalState === 'error' && (
                <motion.div
                  key="error" variants={stateVariants} initial="hidden" animate="visible" exit="exit"
                  style={{ padding: '48px 40px', textAlign: 'center' }}
                >
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mx-auto mb-4">
                    <circle cx="24" cy="24" r="20" stroke="#E05252" strokeWidth="1.5" />
                    <path d="M24 16v8M24 28v2" stroke="#E05252" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <p style={{
                    fontFamily: 'var(--font-heading)', color: '#E05252', fontSize: '15px', marginBottom: '8px',
                  }}>
                    Something went wrong
                  </p>
                  <p style={{
                    color: 'rgba(250,250,248,0.4)', fontSize: '13px', lineHeight: '1.7', marginBottom: '28px',
                  }}>
                    Unable to process your request.<br />Please try again.
                  </p>
                  <button
                    onClick={onClose}
                    className="w-full bg-royal-gold text-royal-black font-ui text-sm uppercase tracking-[0.15em] font-medium px-6 py-3 hover:bg-[#e0c24a] transition-all duration-300"
                  >
                    Try Again
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
