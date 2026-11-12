import express from 'express';
import { body } from 'express-validator';
import {
  getServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService
} from '../controllers/serviceController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

// Public routes
router.get('/', getServices);
router.get('/:slug', getServiceBySlug);

// Protected Admin routes
router.post(
  '/',
  protect,
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('slug').notEmpty().withMessage('Slug is required'),
    body('category').notEmpty().withMessage('Category is required'),
    validate
  ],
  createService
);

router.put('/:id', protect, updateService);
router.delete('/:id', protect, deleteService);

export default router;
