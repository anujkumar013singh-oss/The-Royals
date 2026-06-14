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
      enum: ['confirmed', 'cancelled'],
      default: 'confirmed',
    },
    bookingId: { type: String, unique: true, sparse: true },
  },
  { timestamps: true }
);

export default mongoose.model('Reservation', reservationSchema);
