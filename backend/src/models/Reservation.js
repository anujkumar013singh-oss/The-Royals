import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: [true, 'Guest name is required'], trim: true },
    email: { type: String, required: [true, 'Email is required'], trim: true, lowercase: true },
    phone: { type: String, default: '' },
    venue: { type: String, enum: ['Party Place', 'Ground', 'Basement', 'Terrace', 'Floor'] },
    date: { type: Date },
    time: { type: String, required: [true, 'Time is required'] },
    guests: { type: Number, required: [true, 'Number of guests is required'], min: 1 },
    occasion: { type: String, default: '' },
    specialRequests: { type: String, default: '' },
    status: {
      type: String,
      enum: ['payment_pending', 'confirmed', 'cancelled', 'failed'],
      default: 'payment_pending',
    },
    bookingId: { type: String, unique: true, sparse: true },
    razorpayOrderId: { type: String },
    razorpayQRId: { type: String },
    razorpayQRImageUrl: { type: String },
    razorpayPaymentId: { type: String },
    amountPaid: { type: Number, default: 100 },
    paymentVerifiedAt: { type: Date },
    receiptSentTo: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Reservation', reservationSchema);