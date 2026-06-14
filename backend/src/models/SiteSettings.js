import mongoose from 'mongoose';

const siteSettingsSchema = new mongoose.Schema(
  {
    restaurantName: {
      type: String,
      default: 'The Royals',
    },
    tagline: {
      type: String,
      default: 'Where Every Meal is a Royal Affair',
    },
    heroSlides: [
      {
        imageUrl: { type: String, default: '' },
        imageId: { type: String, default: '' },
        title: { type: String, default: '' },
        subtitle: { type: String, default: '' },
      },
    ],
    address: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
    mapEmbedUrl: {
      type: String,
      default: '',
    },
    openingHours: [
      {
        day: { type: String, default: '' },
        hours: { type: String, default: '' },
      },
    ],
    socialLinks: {
      instagram: { type: String, default: '' },
      facebook: { type: String, default: '' },
      twitter: { type: String, default: '' },
      youtube: { type: String, default: '' },
    },
    seo: {
      metaTitle: { type: String, default: '' },
      metaDescription: { type: String, default: '' },
      ogImage: { type: String, default: '' },
    },
    faviconUrl: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('SiteSettings', siteSettingsSchema);
