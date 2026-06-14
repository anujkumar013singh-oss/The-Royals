import { useState } from 'react';
import useReservationPayment from '../../hooks/useReservationPayment';
import PaymentModal from './PaymentModal';

const occasions = ['Birthday', 'Anniversary', 'Business Dinner', 'Date Night', 'Family Gathering', 'Other'];
const venues = ['Party Place', 'Ground', 'Basement', 'Terrace', 'Floor'];

function ReservationForm({ onSuccess, onError }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', venue: 'Party Place', date: '', time: '', guests: '2', occasion: '', requests: '',
  });

  const {
    modalState, orderData,
    initiatePayment, handleClose,
  } = useReservationPayment();

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const occasionMap = {
      Birthday: 'birthday',
      Anniversary: 'anniversary',
      'Business Dinner': 'business',
      'Date Night': 'other',
      'Family Gathering': 'other',
      Other: 'other',
    };
    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      venue: form.venue,
      date: form.date,
      time: form.time,
      guests: Number(form.guests),
      occasion: form.occasion ? occasionMap[form.occasion] || 'other' : '',
      requests: form.specialRequests || '',
    };
    await initiatePayment(payload);
  };

  const onModalClose = () => {
    if (modalState === 'qr_active' && onSuccess) onSuccess('Reservation confirmed!');
    else if (modalState === 'error' && onError) onError('Something went wrong.');
    handleClose();
  };

  const inputClass = 'w-full bg-transparent border border-royal-cream/20 px-4 py-3 font-body text-base text-white placeholder:text-royal-cream/30 focus:outline-none focus:border-royal-gold/60 transition-colors duration-300';

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required className={inputClass} />
          <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} required className={inputClass} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input type="tel" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required className={inputClass} />
          <select name="venue" value={form.venue} onChange={handleChange} className={inputClass}>
            {venues.map((v) => (
              <option key={v} value={v} className="bg-royal-black">{v}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input type="date" name="date" value={form.date} onChange={handleChange} required className={inputClass} />
          <input type="time" name="time" value={form.time} onChange={handleChange} required className={inputClass} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <select name="guests" value={form.guests} onChange={handleChange} className={inputClass}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <option key={n} value={n} className="bg-royal-black">{n} {n === 1 ? 'Guest' : 'Guests'}</option>
            ))}
          </select>
          <select name="occasion" value={form.occasion} onChange={handleChange} className={inputClass}>
            <option value="" className="bg-royal-black">Select Occasion (optional)</option>
            {occasions.map((o) => (
              <option key={o} value={o} className="bg-royal-black">{o}</option>
            ))}
          </select>
        </div>
        <textarea name="specialRequests" rows={3} placeholder="Special Requests (optional)" value={form.specialRequests} onChange={handleChange} className={`${inputClass} resize-none`} />
        <button
          type="submit"
          disabled={modalState === 'loading'}
          className="w-full bg-royal-gold text-royal-black font-ui text-sm uppercase tracking-[0.15em] font-medium px-6 py-3 hover:bg-[#e0c24a] transition-all duration-300 disabled:opacity-50"
        >
          {modalState === 'loading' ? 'Processing…' : 'Book My Table'}
        </button>
      </form>

      <PaymentModal
        modalState={modalState}
        orderData={orderData}
        onClose={onModalClose}
      />
    </>
  );
}

export default ReservationForm;
