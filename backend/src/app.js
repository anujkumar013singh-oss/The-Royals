import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import connectDB from './config/db.js';
import { corsOptions } from './middleware/cors.middleware.js';
import errorHandler from './middleware/error.middleware.js';

import publicMenuRoutes from './routes/public/menu.routes.js';
import publicSettingsRoutes from './routes/public/settings.routes.js';
import publicAboutRoutes from './routes/public/about.routes.js';
import publicTestimonialRoutes from './routes/public/testimonial.routes.js';
import publicReservationRoutes from './routes/public/reservation.routes.js';

const app = express();

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('dev'));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

app.use('/api/menu', publicMenuRoutes);
app.use('/api/settings', publicSettingsRoutes);
app.use('/api/about', publicAboutRoutes);
app.use('/api/testimonials', publicTestimonialRoutes);
app.use('/api/reservations', publicReservationRoutes);

app.use(errorHandler);

export { connectDB };
export default app;
