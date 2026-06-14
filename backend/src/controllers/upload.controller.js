import { uploadToCloudinary } from '../middleware/upload.middleware.js';

export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const { url, publicId } = await uploadToCloudinary(req.file.buffer);

    res.json({
      url,
      secure_url: url,
      public_id: publicId,
    });
  } catch (error) {
    next(error);
  }
};
