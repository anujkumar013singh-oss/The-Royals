import Reservation from '../models/Reservation.js';

const UPI_ID = '9654673316@mbk';

function staticQRUrl() {
  const uri = `upi://pay?pa=${UPI_ID}&pn=The%20Royals&am=1.00&cu=INR`;
  return `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(uri)}`;
}

export async function createOrder(req, res, next) {
  try {
    const { name, email, phone, date, time, guests, occasion, requests } = req.body;

    if (!name || !email || !phone || !date || !time || !guests) {
      return res.status(400).json({ message: 'All required fields must be filled.' });
    }

    const count = await Reservation.countDocuments();
    const bookingId = `TRY-${new Date().getFullYear()}-${String(count + 1).padStart(5, '0')}`;

    const reservation = await Reservation.create({
      fullName: name,
      email,
      phone,
      date: new Date(date),
      time,
      guests: Number(guests),
      occasion: occasion || 'none',
      specialRequests: requests || '',
      status: 'confirmed',
      bookingId,
      amountPaid: 100,
    });

    res.status(201).json({
      reservationId: reservation._id.toString(),
      bookingId,
      qrImageUrl: staticQRUrl(),
      guestName: name,
      date,
      time,
      guests: Number(guests),
    });
  } catch (err) {
    next(err);
  }
}