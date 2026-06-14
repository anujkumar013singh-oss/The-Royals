import { Router } from 'express';
import SiteSettings from '../../models/SiteSettings.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const settings = await SiteSettings.findOne();
    res.json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
});

export default router;
