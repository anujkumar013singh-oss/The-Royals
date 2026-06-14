import MenuItem from '../models/MenuItem.js';

export const getAll = async (req, res, next) => {
  try {
    const items = await MenuItem.find({ isActive: true }).sort({ order: 1 });
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
