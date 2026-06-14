import { v2 as cloudinary } from 'cloudinary';
import BlogPost from '../models/BlogPost.js';

export const getAll = async (req, res, next) => {
  try {
    const posts = await BlogPost.find({ status: 'published' })
      .sort({ publishedAt: -1 })
      .select('-content');
    res.json({ success: true, data: posts });
  } catch (error) {
    next(error);
  }
};

export const getBySlug = async (req, res, next) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug, status: 'published' });
    if (!post) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }
    res.json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

export const getAllAdmin = async (req, res, next) => {
  try {
    const posts = await BlogPost.find().sort({ createdAt: -1 });
    res.json({ success: true, data: posts });
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const post = await BlogPost.create(req.body);
    res.status(201).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!post) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }
    res.json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }

    if (post.coverImageId) {
      await cloudinary.uploader.destroy(post.coverImageId);
    }

    await BlogPost.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Blog post deleted' });
  } catch (error) {
    next(error);
  }
};

export const toggleStatus = async (req, res, next) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }

    post.status = post.status === 'published' ? 'draft' : 'published';
    if (post.status === 'published') {
      post.publishedAt = new Date();
    } else {
      post.publishedAt = null;
    }
    await post.save();

    res.json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};
