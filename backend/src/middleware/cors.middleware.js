export const corsOptions = {
  origin: function (origin, callback) {
    const frontendURL = process.env.FRONTEND_URL || '';
    const allowed = [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
      frontendURL,
    ].filter(Boolean);
    if (!origin || allowed.includes(origin) || /^http:\/\/localhost:\d+$/.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
