import AboutContent from '../models/AboutContent.js';

export const get = async (req, res, next) => {
  try {
    let about = await AboutContent.findOne();
    if (!about) {
      about = await AboutContent.create({
        content: '',
        heroImageUrl: '',
        heroImageId: '',
        quote: '',
        quoteAuthor: '',
        teamMembers: [],
      });
    }
    res.json({ success: true, data: about });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const about = await AboutContent.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
      runValidators: true,
    });
    res.json({ success: true, data: about });
  } catch (error) {
    next(error);
  }
};
