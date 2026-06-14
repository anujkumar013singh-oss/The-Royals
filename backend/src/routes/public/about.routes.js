import { Router } from 'express';
import { get } from '../../controllers/about.controller.js';

const router = Router();

router.get('/', get);

export default router;
