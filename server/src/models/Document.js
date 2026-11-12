import mongoose from 'mongoose';

const slideSchema = new mongoose.Schema({
  slideNumber: { type: Number, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  icon: { type: String, default: 'Sparkles' },
  color: { type: String, default: 'sun' },
  bulletPoints: [{ type: String }],
  quote: { type: String, default: '' },
  mediaUrl: { type: String, default: '' },
  tags: [{ type: String }]
});

const documentSchema = new mongoose.Schema(
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
      default: 'General'
    },
    badge: {
      type: String,
      default: 'Deck'
    },
    summary: {
      type: String,
      default: ''
    },
    order: {
      type: Number,
      default: 0
    },
    slides: [slideSchema]
  },
  { timestamps: true }
);

const Document = mongoose.model('Document', documentSchema);
export default Document;
