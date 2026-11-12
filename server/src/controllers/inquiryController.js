import * as inquiryService from '../services/inquiryService.js';

export const createInquiry = async (req, res) => {
  try {
    const inquiry = await inquiryService.createInquiry(req.body);
    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been sent to Teacher Lakshmipriya.',
      data: inquiry
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getInquiries = async (req, res) => {
  try {
    const inquiries = await inquiryService.getAllInquiries(req.query.status);
    res.json({ success: true, count: inquiries.length, data: inquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateInquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const inquiry = await inquiryService.updateInquiryStatus(req.params.id, status);
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }
    res.json({ success: true, data: inquiry });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteInquiry = async (req, res) => {
  try {
    const inquiry = await inquiryService.deleteInquiry(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }
    res.json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
