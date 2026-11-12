import express from 'express';
import { body } from 'express-validator';
import {
  getDocuments,
  getDocumentBySlug,
  createDocument,
  updateDocument,
  deleteDocument
} from '../controllers/documentController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

// Public routes
router.get('/', getDocuments);
router.get('/:slug', getDocumentBySlug);

// Protected Admin routes
router.post(
  '/',
  protect,
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('slug').notEmpty().withMessage('Slug is required'),
    validate
  ],
  createDocument
);

router.put('/:id', protect, updateDocument);
router.delete('/:id', protect, deleteDocument);

export default router;
