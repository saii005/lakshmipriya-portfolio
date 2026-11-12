import Inquiry from '../models/Inquiry.js';
import { isConnectedToMongo, localStore, saveLocalStore } from '../config/db.js';

export const createInquiry = async (data) => {
  if (isConnectedToMongo) {
    const inquiry = new Inquiry(data);
    return await inquiry.save();
  }
  const newInquiry = {
    _id: `inq_${Date.now()}`,
    ...data,
    status: 'new',
    createdAt: new Date().toISOString()
  };
  localStore.inquiries.unshift(newInquiry);
  saveLocalStore();
  return newInquiry;
};

export const getAllInquiries = async (status) => {
  if (isConnectedToMongo) {
    const filter = status ? { status } : {};
    return await Inquiry.find(filter).sort({ createdAt: -1 });
  }
  let results = [...localStore.inquiries];
  if (status) {
    results = results.filter(i => i.status === status);
  }
  return results;
};

export const updateInquiryStatus = async (id, status) => {
  if (isConnectedToMongo) {
    return await Inquiry.findByIdAndUpdate(id, { status }, { new: true });
  }
  const index = localStore.inquiries.findIndex(i => i._id === id);
  if (index === -1) return null;
  localStore.inquiries[index].status = status;
  localStore.inquiries[index].updatedAt = new Date().toISOString();
  saveLocalStore();
  return localStore.inquiries[index];
};

export const deleteInquiry = async (id) => {
  if (isConnectedToMongo) {
    return await Inquiry.findByIdAndDelete(id);
  }
  const index = localStore.inquiries.findIndex(i => i._id === id);
  if (index === -1) return null;
  const removed = localStore.inquiries.splice(index, 1);
  saveLocalStore();
  return removed[0];
};
