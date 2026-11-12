import express from 'express';
import { body } from 'express-validator';
import {
  createInquiry,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry
} from '../controllers/inquiryController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

// Public Lead Generation form
router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('subject').trim().notEmpty().withMessage('Subject is required'),
    body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters long'),
    validate
  ],
  createInquiry
);

// Protected Admin review
router.get('/', protect, getInquiries);
router.patch('/:id/status', protect, updateInquiryStatus);
router.delete('/:id', protect, deleteInquiry);

export default router;
