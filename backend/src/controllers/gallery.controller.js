import { v2 as cloudinary } from 'cloudinary';
import GalleryImage from '../models/GalleryImage.js';
import { uploadToCloudinary } from '../middleware/upload.middleware.js';

export const getAll = async (req, res, next) => {
  try {
    const images = await GalleryImage.find().sort({ order: 1 });
    res.json({ success: true, data: images });
  } catch (error) {
    next(error);
  }
};

export const upload = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No files uploaded' });
    }

    const uploads = await Promise.all(
      req.files.map((file) => uploadToCloudinary(file.buffer))
    );

    const images = uploads.map(({ url, publicId }) => ({
      imageUrl: url,
      imageId: publicId,
      caption: '',
      altText: '',
    }));

    const saved = await GalleryImage.insertMany(images);
    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const { imageUrl, imageId, caption, altText } = req.body;
    if (!imageUrl) {
      return res.status(400).json({ success: false, message: 'imageUrl is required' });
    }
    const image = await GalleryImage.create({ imageUrl, imageId, caption, altText });
    res.status(201).json({ success: true, data: image });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const { caption, altText } = req.body;
    const image = await GalleryImage.findByIdAndUpdate(
      req.params.id,
      { caption, altText },
      { new: true, runValidators: true }
    );
    if (!image) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }
    res.json({ success: true, data: image });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const image = await GalleryImage.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }

    if (image.imageId) {
      await cloudinary.uploader.destroy(image.imageId);
    }

    await GalleryImage.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Image deleted' });
  } catch (error) {
    next(error);
  }
};

export const reorder = async (req, res, next) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items)) {
      return res.status(400).json({ success: false, message: 'items array is required' });
    }

    const operations = items.map(({ id, order }) => ({
      updateOne: { filter: { _id: id }, update: { order } },
    }));
    await GalleryImage.bulkWrite(operations);

    res.json({ success: true, message: 'Reorder successful' });
  } catch (error) {
    next(error);
  }
};
