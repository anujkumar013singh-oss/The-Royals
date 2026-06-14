import TeamMember from '../models/TeamMember.js';

export const getActive = async (req, res, next) => {
  try {
    const members = await TeamMember.find({ isActive: true }).sort({ order: 1 });
    res.json({ success: true, data: members });
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const members = await TeamMember.find().sort({ order: 1 });
    res.json({ success: true, data: members });
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const member = await TeamMember.create(req.body);
    res.status(201).json({ success: true, data: member });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const member = await TeamMember.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!member) {
      return res.status(404).json({ success: false, message: 'Team member not found' });
    }
    res.json({ success: true, data: member });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const member = await TeamMember.findByIdAndDelete(req.params.id);
    if (!member) {
      return res.status(404).json({ success: false, message: 'Team member not found' });
    }
    res.json({ success: true, message: 'Team member deleted' });
  } catch (error) {
    next(error);
  }
};
