import * as serviceService from '../services/serviceService.js';

export const getServices = async (req, res) => {
  try {
    const services = await serviceService.getAllServices(req.query.category);
    res.json({ success: true, count: services.length, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getServiceBySlug = async (req, res) => {
  try {
    const service = await serviceService.getServiceBySlug(req.params.slug);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    res.json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createService = async (req, res) => {
  try {
    const service = await serviceService.createService(req.body);
    res.status(201).json({ success: true, data: service });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const service = await serviceService.updateService(req.params.id, req.body);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    res.json({ success: true, data: service });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const service = await serviceService.deleteService(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    res.json({ success: true, message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
