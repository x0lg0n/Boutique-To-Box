
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { Client, Databases, Storage, ID, Query } from 'node-appwrite';
import { RekognitionClient } from '@aws-sdk/client-rekognition';
import { DetectProtectiveEquipmentCommand } from '@aws-sdk/client-rekognition';

import styleRoutes from './routes/style.js';
import measurementsRoutes from './routes/measurements.js';
import designRoutes from './routes/design.js';

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Initialize Appwrite
export const appwriteClient = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

export const appwriteDatabases = new Databases(appwriteClient);
export const appwriteStorage = new Storage(appwriteClient);

// Initialize AWS Rekognition
export const rekognition = new RekognitionClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
  }
});

// Routes
app.use('/api/style', styleRoutes);
app.use('/api/measurements', measurementsRoutes);
app.use('/api/design', designRoutes);

// Home route
app.get('/', (req, res) => {
  res.send('ThreadTailor Backend API is running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
  // Log initialization
  console.log(`Appwrite endpoint: ${process.env.APPWRITE_ENDPOINT}`);
  console.log(`AWS region: ${process.env.AWS_REGION}`);
});
