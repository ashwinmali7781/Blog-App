import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';

<<<<<<< HEAD
dotenv.config();  
=======
dotenv.config();
>>>>>>> 7a128ed1b4280188d3e16a6c3f9dcf1f14539422
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'technical-blog-api' });
});

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: 'Server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
