import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Document from './models/Document.js';
import Service from './models/Service.js';
import Inquiry from './models/Inquiry.js';
import { seedAdmin, seedDocuments, seedServices } from './config/seedData.js';

dotenv.config();

const seedMongoDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/lakshmipriya_portfolio';
    console.log(`Connecting to ${mongoURI}...`);
    await mongoose.connect(mongoURI);

    console.log('Clearing old documents...');
    await User.deleteMany({});
    await Document.deleteMany({});
    await Service.deleteMany({});
    await Inquiry.deleteMany({});

    console.log('Seeding admin user...');
    await User.create(seedAdmin);

    console.log('Seeding services catalog...');
    await Service.insertMany(seedServices);

    console.log('Seeding documents & presentation decks...');
    await Document.insertMany(seedDocuments);

    console.log('Seeding sample student and school inquiries...');
    await Inquiry.insertMany([
      {
        name: "Aarav Sharma",
        email: "aarav.parent@gmail.com",
        phone: "+91 9845012345",
        role: "Parent",
        subject: "Enrollment in Astromath & Concentration Booster",
        message: "Hello Teacher Lakshmipriya! My 8-year-old son has a deep fear of math but loves patterns. We would love to join your upcoming cohort.",
        status: "new",
        serviceInterested: "Astromath & Playful Brain Acceleration"
      },
      {
        name: "Meera Krishnan",
        email: "principal@greenwoodschool.edu",
        phone: "+91 9444156789",
        role: "School Administrator",
        subject: "Mental Education Teacher Training Workshop",
        message: "We admire your integral education work at Sri Aurobindo Ashram. We want to conduct a 2-day workshop for our elementary teachers.",
        status: "contacted",
        serviceInterested: "Mental Education & Curriculum Architecture"
      },
      {
        name: "Vikram Sengupta",
        email: "vikram@techventures.in",
        phone: "+91 9820098200",
        role: "Corporate Professional",
        subject: "Systems Thinking & Stress Relief Keynote",
        message: "Your transition story from Zoho/Wipro tech leadership to human transformation is deeply inspiring. We'd love to invite you to speak at our annual summit.",
        status: "completed",
        serviceInterested: "Self to Self: Mindfulness, Pranic & Holistic Healing"
      }
    ]);

    console.log('🎉 Seeding successfully completed into MongoDB!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding MongoDB:', error);
    process.exit(1);
  }
};

seedMongoDB();
