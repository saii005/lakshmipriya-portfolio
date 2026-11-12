import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      trim: true,
      default: 'Student Seminars & Bootcamps'
    },
    badge: {
      type: String,
      default: 'Featured'
    },
    color: {
      type: String,
      default: 'sun'
    },
    icon: {
      type: String,
      default: 'Sparkles'
    },
    tagline: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    highlights: [{ type: String }],
    audience: {
      type: String,
      default: 'All'
    },
    duration: {
      type: String,
      default: 'Custom'
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

const Service = mongoose.model('Service', serviceSchema);
export default Service;
