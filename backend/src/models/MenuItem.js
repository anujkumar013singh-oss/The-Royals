import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Menu item name is required'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    imageUrl: {
      type: String,
      default: '',
    },
    imageId: {
      type: String,
      default: '',
    },
    tags: {
      type: [String],
      enum: ['veg', 'spicy', 'chef-rec'],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    categoryOrder: {
      type: Number,
      default: 0,
    },
    isSignature: {
      type: Boolean,
      default: false,
    },
    spicyLevel: {
      type: Number,
      min: 0,
      max: 3,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('MenuItem', menuItemSchema);
