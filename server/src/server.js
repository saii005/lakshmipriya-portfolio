import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import documentRoutes from './routes/documentRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import statsRoutes from './routes/statsRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Security and utility middleware
app.use(helmet({
  crossOriginResourcePolicy: false,
  contentSecurityPolicy: false
}));
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// Connect to Database
await connectDB();

// API Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    theme: "Children's Playing Area Playground Edition",
    architect: 'Lakshmipriya Vinothkumar Platform'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/stats', statsRoutes);

// Static Client Serving (Production & Unified Preview)
const clientDistPath = path.join(__dirname, '..', '..', 'client', 'dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
} else {
  // 404 Handler for API
  app.use((req, res) => {
    res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` });
  });
}

// Central error handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`🎈 Playground Backend Server running smoothly on http://localhost:${PORT}`);
  console.log(`✨ Healthcheck: http://localhost:${PORT}/api/health`);
  if (fs.existsSync(clientDistPath)) {
    console.log(`🚀 Unified MERN Fullstack App running on http://localhost:${PORT}`);
  }
});
