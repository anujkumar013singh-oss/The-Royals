import mongoose from 'mongoose';

const aboutContentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      default: '',
    },
    vision: {
      type: String,
      default: '',
    },
    history: {
      type: String,
      default: '',
    },
    heroImageUrl: {
      type: String,
      default: '',
    },
    heroImageId: {
      type: String,
      default: '',
    },
    quote: {
      type: String,
      default: '',
    },
    quoteAuthor: {
      type: String,
      default: '',
    },
    teamMembers: [
      {
        name: { type: String, default: '' },
        role: { type: String, default: '' },
        photoUrl: { type: String, default: '' },
        photoId: { type: String, default: '' },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('AboutContent', aboutContentSchema);
