import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import schoolRoutes from './routes/school.routes.js';

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || '*' }));
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'sis-backend' });
});

app.use('/api/auth', authRoutes);
app.use('/api/school', schoolRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

export default app;
