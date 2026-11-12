import Document from '../models/Document.js';
import { isConnectedToMongo, localStore, saveLocalStore } from '../config/db.js';

export const getAllDocuments = async () => {
  if (isConnectedToMongo) {
    return await Document.find().sort({ order: 1, createdAt: 1 });
  }
  return [...localStore.documents].sort((a, b) => (a.order || 0) - (b.order || 0));
};

export const getDocumentBySlug = async (slug) => {
  if (isConnectedToMongo) {
    return await Document.findOne({ slug });
  }
  return localStore.documents.find(d => d.slug === slug) || null;
};

export const createDocument = async (data) => {
  if (isConnectedToMongo) {
    const doc = new Document(data);
    return await doc.save();
  }
  const newDoc = {
    _id: `doc_${Date.now()}`,
    ...data,
    createdAt: new Date().toISOString()
  };
  localStore.documents.push(newDoc);
  saveLocalStore();
  return newDoc;
};

export const updateDocument = async (id, data) => {
  if (isConnectedToMongo) {
    return await Document.findByIdAndUpdate(id, data, { new: true });
  }
  const index = localStore.documents.findIndex(d => d._id === id);
  if (index === -1) return null;
  localStore.documents[index] = { ...localStore.documents[index], ...data, updatedAt: new Date().toISOString() };
  saveLocalStore();
  return localStore.documents[index];
};

export const deleteDocument = async (id) => {
  if (isConnectedToMongo) {
    return await Document.findByIdAndDelete(id);
  }
  const index = localStore.documents.findIndex(d => d._id === id);
  if (index === -1) return null;
  const removed = localStore.documents.splice(index, 1);
  saveLocalStore();
  return removed[0];
};
