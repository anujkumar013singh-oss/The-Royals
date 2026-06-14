import mongoose from 'mongoose';

const galleryImageSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
    },
    imageId: {
      type: String,
      required: [true, 'Image ID is required'],
    },
    caption: {
      type: String,
      default: '',
    },
    altText: {
      type: String,
      default: '',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('GalleryImage', galleryImageSchema);
