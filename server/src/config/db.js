import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import { seedAdmin, seedDocuments, seedProfile, seedServices } from './seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '..', '..', 'data');
const STORE_FILE = path.join(DATA_DIR, 'local_db.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export let isConnectedToMongo = false;

// In-Memory / File Persistent Store for fallback
export const localStore = {
  users: [],
  services: [],
  documents: [],
  inquiries: [],
  profile: seedProfile
};

export const saveLocalStore = () => {
  try {
    fs.writeFileSync(STORE_FILE, JSON.stringify(localStore, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing localStore:', err);
  }
};

export const loadLocalStore = () => {
  try {
    if (fs.existsSync(STORE_FILE)) {
      const data = JSON.parse(fs.readFileSync(STORE_FILE, 'utf-8'));
      localStore.users = data.users || [];
      localStore.services = data.services || [];
      localStore.documents = data.documents || [];
      localStore.inquiries = data.inquiries || [];
      localStore.profile = data.profile || seedProfile;
      console.log('📦 Loaded state from local_db.json');
      return true;
    }
  } catch (err) {
    console.error('Error reading localStore:', err);
  }
  return false;
};

export const initSeedLocal = async () => {
  const loaded = loadLocalStore();
  if (!loaded || localStore.services.length === 0) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(seedAdmin.password, salt);

    localStore.users = [
      {
        _id: 'user_admin_001',
        name: seedAdmin.name,
        email: seedAdmin.email,
        password: hashedPassword,
        role: seedAdmin.role,
        createdAt: new Date().toISOString()
      }
    ];

    localStore.services = seedServices.map((s, index) => ({
      _id: `srv_${index + 1}`,
      ...s,
      createdAt: new Date().toISOString()
    }));

    localStore.documents = seedDocuments.map((d, index) => ({
      _id: `doc_${index + 1}`,
      ...d,
      createdAt: new Date().toISOString()
    }));

    localStore.inquiries = [
      {
        _id: 'inq_1',
        name: "Aarav Sharma",
        email: "aarav.parent@gmail.com",
        phone: "+91 9845012345",
        role: "Parent",
        subject: "Enrollment in Astromath & Concentration Booster",
        message: "Hello Teacher Lakshmipriya! My 8-year-old son has a deep fear of math but loves patterns. We would love to join your upcoming cohort.",
        status: "new",
        serviceInterested: "Astromath & Playful Brain Acceleration",
        createdAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        _id: 'inq_2',
        name: "Meera Krishnan",
        email: "principal@greenwoodschool.edu",
        phone: "+91 9444156789",
        role: "School Principal",
        subject: "Mental Education Teacher Training Workshop",
        message: "We admire your integral education work at Sri Aurobindo Ashram. We want to conduct a 2-day workshop for our elementary teachers.",
        status: "contacted",
        serviceInterested: "Mental Education & Curriculum Architecture",
        createdAt: new Date(Date.now() - 172800000).toISOString()
      }
    ];

    saveLocalStore();
    console.log('🌱 Seeded local fallback storage with Lakshmipriya portfolio data & admin user.');
  }
};

export const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/lakshmipriya_portfolio';
  try {
    console.log(`⏳ Attempting MongoDB connection: ${mongoURI}`);
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 2500
    });
    isConnectedToMongo = true;
    console.log('✅ Connected to MongoDB database successfully!');
  } catch (error) {
    isConnectedToMongo = false;
    console.warn(`⚠️ MongoDB connection unavailable (${error.message}).`);
    console.log('🚀 Using high-performance integrated Local JSON persistence storage mode!');
    await initSeedLocal();
  }
};
