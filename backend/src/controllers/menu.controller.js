import { v2 as cloudinary } from 'cloudinary';
import MenuItem from '../models/MenuItem.js';

export const getAll = async (req, res, next) => {
  try {
    const items = await MenuItem.find({ isActive: true }).sort({ order: 1 });
    res.json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
};

export const getAllAdmin = async (req, res, next) => {
  try {
    const items = await MenuItem.find().sort({ order: 1 });
    res.json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
};

export const getByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const items = await MenuItem.find({ category, isActive: true }).sort({ order: 1 });
    res.json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const item = await MenuItem.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }
    res.json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }

    if (item.imageId) {
      await cloudinary.uploader.destroy(item.imageId);
    }

    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Menu item deleted' });
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
    await MenuItem.bulkWrite(operations);

    res.json({ success: true, message: 'Reorder successful' });
  } catch (error) {
    next(error);
  }
};
