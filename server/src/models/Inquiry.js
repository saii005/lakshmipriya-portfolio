import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      default: '',
      trim: true
    },
    role: {
      type: String,
      enum: ['Student', 'Parent', 'Teacher', 'School Administrator', 'Corporate Professional', 'Other'],
      default: 'Parent'
    },
    subject: {
      type: String,
      required: true,
      trim: true
    },
    message: {
      type: String,
      required: true
    },
    serviceInterested: {
      type: String,
      default: 'General Inquiry'
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'completed'],
      default: 'new'
    }
  },
  { timestamps: true }
);

const Inquiry = mongoose.model('Inquiry', inquirySchema);
export default Inquiry;
