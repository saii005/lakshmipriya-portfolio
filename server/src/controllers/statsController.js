import { seedProfile } from '../config/seedData.js';
import * as documentService from '../services/documentService.js';
import * as serviceService from '../services/serviceService.js';
import * as inquiryService from '../services/inquiryService.js';

export const getStats = async (req, res) => {
  try {
    const docs = await documentService.getAllDocuments();
    const services = await serviceService.getAllServices();
    const inquiries = await inquiryService.getAllInquiries();

    const pendingInquiries = inquiries.filter(i => i.status === 'new').length;

    res.json({
      success: true,
      stats: {
        totalDocuments: docs.length,
        totalServices: services.length,
        totalInquiries: inquiries.length,
        pendingInquiries,
        yearsExperience: 18,
        countriesReached: 10,
        satisfiedLearners: '2000+'
      },
      profile: seedProfile
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
