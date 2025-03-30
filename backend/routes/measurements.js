
import express from 'express';
import { appwriteDatabases, appwriteStorage, rekognition } from '../server.js';
import { DetectProtectiveEquipmentCommand } from '@aws-sdk/client-rekognition';
import { ID } from 'node-appwrite';

const router = express.Router();

// Process body measurements from image
router.post('/analyze', async (req, res) => {
  try {
    // Get image from frontend (base64)
    const { imageBase64, userId } = req.body;

    if (!imageBase64 || !userId) {
      return res.status(400).json({ error: "Image and userId are required" });
    }

    console.log('Analyzing body measurements for user:', userId);
    
    // Remove base64 prefix if present
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
    const imageBuffer = Buffer.from(base64Data, 'base64');

    // For demo/hackathon purposes, we can use mock data if AWS is not set up
    let measurements;
    
    if (process.env.USE_MOCK_DATA === 'true') {
      console.log('Using mock data for body measurements');
      measurements = getMockMeasurements();
    } else {
      try {
        // Upload to Appwrite Storage
        const file = await appwriteStorage.createFile(
          process.env.APPWRITE_BODY_SCANS_BUCKET_ID,
          ID.unique(),
          imageBuffer
        );
        console.log('Uploaded body scan image:', file.$id);

        // Analyze with AWS Rekognition
        const command = new DetectProtectiveEquipmentCommand({
          Image: { Bytes: imageBuffer }
        });
        
        const data = await rekognition.send(command);
        measurements = processBodyData(data);
        console.log('Processed measurements from AWS Rekognition');
      } catch (awsError) {
        console.error('AWS processing failed, falling back to mock data:', awsError);
        measurements = getMockMeasurements();
      }
    }
    
    // Save to Appwrite Database
    try {
      const document = await appwriteDatabases.createDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_MEASUREMENTS_COLLECTION_ID,
        ID.unique(),
        {
          userId,
          ...measurements,
          createdAt: new Date().toISOString()
        }
      );
      console.log('Saved measurements to database:', document.$id);
    } catch (dbError) {
      console.error('Failed to save measurements to database:', dbError);
      // Continue even if database save fails
    }

    res.json({ 
      success: true,
      measurements 
    });
    
  } catch (error) {
    console.error('Body analysis failed:', error);
    res.status(500).json({ error: "Body analysis failed", details: error.message });
  }
});

// Helper function to process AWS Rekognition data
function processBodyData(data) {
  // In reality, this would extract precise body measurements 
  // from Rekognition's response. For now, we'll return mock data.
  return getMockMeasurements();
}

// Helper function to get mock measurements
function getMockMeasurements() {
  return {
    height: 175,
    shoulderWidth: 45,
    chestSize: 95,
    waistSize: 80,
    hipSize: 100
  };
}

export default router;
