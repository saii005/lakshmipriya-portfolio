import * as documentService from '../services/documentService.js';

export const getDocuments = async (req, res) => {
  try {
    const docs = await documentService.getAllDocuments();
    res.json({ success: true, count: docs.length, data: docs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getDocumentBySlug = async (req, res) => {
  try {
    const doc = await documentService.getDocumentBySlug(req.params.slug);
    if (!doc) {
      return res.status(404).json({ success: false, message: 'Document deck not found' });
    }
    res.json({ success: true, data: doc });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createDocument = async (req, res) => {
  try {
    const doc = await documentService.createDocument(req.body);
    res.status(201).json({ success: true, data: doc });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateDocument = async (req, res) => {
  try {
    const doc = await documentService.updateDocument(req.params.id, req.body);
    if (!doc) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }
    res.json({ success: true, data: doc });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    const doc = await documentService.deleteDocument(req.params.id);
    if (!doc) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }
    res.json({ success: true, message: 'Document deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
