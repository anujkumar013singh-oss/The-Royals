import { Router } from 'express';
import { getActive } from '../../controllers/testimonial.controller.js';

const router = Router();

router.get('/', getActive);

export default router;
