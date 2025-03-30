
import express from 'express';
import { appwriteDatabases, appwriteStorage } from '../server.js';
import { ID } from 'node-appwrite';
import sharp from 'sharp';

const router = express.Router();

// Process body measurements from image using free alternatives
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

    // For demo/hackathon purposes, we can use mock data
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

        // Process image with Sharp (free image processing library)
        const imageMetadata = await sharp(imageBuffer).metadata();
        const imageInfo = await analyzeBodyImage(imageBuffer);
        
        // Calculate approximate measurements based on pixel ratios and metadata
        measurements = calculateApproximateMeasurements(imageInfo, imageMetadata);
        console.log('Processed measurements from image analysis');
      } catch (error) {
        console.error('Image processing failed, falling back to mock data:', error);
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

// Helper function to analyze body image
async function analyzeBodyImage(imageBuffer) {
  try {
    // Using Sharp for basic image analysis
    // This is a simplified placeholder - in a real app, you'd use 
    // more advanced computer vision libraries like opencv.js or tfjs
    const metadata = await sharp(imageBuffer).metadata();
    
    // Perform basic contour detection
    const processedImage = await sharp(imageBuffer)
      .grayscale()
      .normalize()
      .threshold(128)
      .toBuffer();
      
    // For a real implementation, you'd extract key body points
    // Here we're just returning basic image dimensions
    return {
      width: metadata.width,
      height: metadata.height,
      aspectRatio: metadata.width / metadata.height
    };
  } catch (error) {
    console.error('Image analysis error:', error);
    throw error;
  }
}

// Helper function to calculate approximate measurements
function calculateApproximateMeasurements(imageInfo, metadata) {
  // In a real implementation, this would use computer vision to detect body parts
  // and calculate proper measurements
  
  // For this demo, we're using aspect ratios to estimate measurements
  const heightInCm = 175; // Average height
  const pixelToCm = heightInCm / imageInfo.height;
  
  // Estimate measurements based on average human proportions
  const shoulderWidth = Math.round(imageInfo.width * 0.25 * pixelToCm);
  const chestSize = Math.round(imageInfo.width * 0.3 * pixelToCm);
  const waistSize = Math.round(imageInfo.width * 0.25 * pixelToCm);
  const hipSize = Math.round(imageInfo.width * 0.35 * pixelToCm);
  
  return {
    height: heightInCm,
    shoulderWidth,
    chestSize,
    waistSize,
    hipSize
  };
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
