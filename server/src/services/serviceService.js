import Service from '../models/Service.js';
import { isConnectedToMongo, localStore, saveLocalStore } from '../config/db.js';

export const getAllServices = async (category) => {
  if (isConnectedToMongo) {
    const filter = category ? { category } : {};
    return await Service.find(filter).sort({ createdAt: 1 });
  }
  let results = [...localStore.services];
  if (category) {
    results = results.filter(s => s.category.toLowerCase() === category.toLowerCase());
  }
  return results;
};

export const getServiceBySlug = async (slug) => {
  if (isConnectedToMongo) {
    return await Service.findOne({ slug });
  }
  return localStore.services.find(s => s.slug === slug) || null;
};

export const createService = async (data) => {
  if (isConnectedToMongo) {
    const service = new Service(data);
    return await service.save();
  }
  const newService = {
    _id: `srv_${Date.now()}`,
    ...data,
    createdAt: new Date().toISOString()
  };
  localStore.services.push(newService);
  saveLocalStore();
  return newService;
};

export const updateService = async (id, data) => {
  if (isConnectedToMongo) {
    return await Service.findByIdAndUpdate(id, data, { new: true });
  }
  const index = localStore.services.findIndex(s => s._id === id);
  if (index === -1) return null;
  localStore.services[index] = { ...localStore.services[index], ...data, updatedAt: new Date().toISOString() };
  saveLocalStore();
  return localStore.services[index];
};

export const deleteService = async (id) => {
  if (isConnectedToMongo) {
    return await Service.findByIdAndDelete(id);
  }
  const index = localStore.services.findIndex(s => s._id === id);
  if (index === -1) return null;
  const removed = localStore.services.splice(index, 1);
  saveLocalStore();
  return removed[0];
};
