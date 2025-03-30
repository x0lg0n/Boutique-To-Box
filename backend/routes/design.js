
import express from 'express';
import fetch from 'node-fetch';
import { appwriteDatabases, appwriteStorage } from '../server.js';
import { ID } from 'node-appwrite';

const router = express.Router();

// Generate clothing design
router.post('/generate', async (req, res) => {
  try {
    const { keywords, userId, bodyType, stylePreference, garmentType, occasion } = req.body;

    if (!keywords || !userId) {
      return res.status(400).json({ error: "Keywords and userId are required" });
    }

    console.log('Generating design for user:', userId);
    console.log('Design parameters:', { keywords, bodyType, stylePreference, garmentType, occasion });
    
    let designUrl;
    let fileId;

    // For demo/hackathon purposes, we can use mock data
    if (process.env.USE_MOCK_DATA === 'true') {
      console.log('Using mock data for design generation');
      const mockDesigns = {
        'dress': 'https://example.com/mock-dress-design.jpg',
        'top': 'https://example.com/mock-top-design.jpg',
        'pants': 'https://example.com/mock-pants-design.jpg',
        'skirt': 'https://example.com/mock-skirt-design.jpg',
        'jacket': 'https://example.com/mock-jacket-design.jpg'
      };
      designUrl = mockDesigns[garmentType] || 'https://example.com/mock-design.jpg';
      fileId = 'mock-file-id';
    } else {
      try {
        // Call RunwayML or other AI image generation API
        const prompt = `Fashion ${garmentType || 'clothing'} design, ${stylePreference || 'modern'} style, for ${occasion || 'casual'} occasions, suitable for ${bodyType || 'average'} body type. ${keywords.join(', ')}`;
        
        // Example with RunwayML (replace with your preferred AI service)
        const runwayResponse = await fetch('https://api.runwayml.com/v1/models/text-to-image/infer', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RUNWAY_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            prompt,
            style: "fashion-sketch"
          })
        });

        const designBuffer = await runwayResponse.arrayBuffer();
        
        // Store in Appwrite
        const designFile = await appwriteStorage.createFile(
          process.env.APPWRITE_DESIGNS_BUCKET_ID,
          ID.unique(),
          Buffer.from(designBuffer)
        );

        fileId = designFile.$id;
        designUrl = appwriteStorage.getFileView(
          process.env.APPWRITE_DESIGNS_BUCKET_ID,
          fileId
        );
        
      } catch (aiError) {
        console.error('AI design generation failed, using mock data:', aiError);
        designUrl = 'https://example.com/mock-design.jpg';
        fileId = 'mock-file-id';
      }
    }
    
    // Create design record in database
    try {
      const designDoc = await appwriteDatabases.createDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_DESIGNS_COLLECTION_ID,
        ID.unique(),
        {
          userId,
          keywords,
          fileId,
          status: 'generated',
          garmentType: garmentType || '',
          occasion: occasion || '',
          stylePreference: stylePreference || '',
          createdAt: new Date().toISOString()
        }
      );
      
      console.log('Design record created:', designDoc.$id);
    } catch (dbError) {
      console.error('Failed to save design to database:', dbError);
      // Continue even if database save fails
    }

    res.json({
      success: true,
      designUrl,
      fileId
    });
    
  } catch (error) {
    console.error('Design generation failed:', error);
    res.status(500).json({ error: "Design generation failed", details: error.message });
  }
});

// Adjust fit of generated design
router.post('/adjust-fit', async (req, res) => {
  try {
    const { designId, measurements, userId } = req.body;

    if (!designId || !userId) {
      return res.status(400).json({ error: "Design ID and user ID are required" });
    }

    console.log('Adjusting fit for design:', designId);
    
    let adjustedUrl;
    let adjustedFileId;
    
    // For demo/hackathon purposes
    if (process.env.USE_MOCK_DATA === 'true' || !process.env.APPWRITE_DESIGNS_BUCKET_ID) {
      console.log('Using mock data for fit adjustment');
      adjustedUrl = 'https://example.com/mock-adjusted-design.jpg';
      adjustedFileId = 'mock-adjusted-file-id';
    } else {
      try {
        // Get design from Appwrite
        const designFile = await appwriteStorage.getFile(
          process.env.APPWRITE_DESIGNS_BUCKET_ID,
          designId
        );
        
        // Download the file
        const fileBlob = await designFile.arrayBuffer();
        const designBuffer = Buffer.from(fileBlob);

        // Process with image processing (simplified mock implementation)
        const adjustedDesign = adjustImageProportions(
          designBuffer,
          measurements
        );

        // Save adjusted design
        const adjustedFile = await appwriteStorage.createFile(
          process.env.APPWRITE_DESIGNS_BUCKET_ID,
          ID.unique(),
          adjustedDesign
        );

        adjustedFileId = adjustedFile.$id;
        adjustedUrl = appwriteStorage.getFileView(
          process.env.APPWRITE_DESIGNS_BUCKET_ID,
          adjustedFileId
        );
        
      } catch (storageError) {
        console.error('Fit adjustment storage operation failed:', storageError);
        adjustedUrl = 'https://example.com/mock-adjusted-design.jpg';
        adjustedFileId = 'mock-adjusted-file-id';
      }
    }

    // Update design record in database
    try {
      const designDoc = await appwriteDatabases.createDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_DESIGNS_COLLECTION_ID,
        ID.unique(),
        {
          userId,
          fileId: adjustedFileId,
          status: 'adjusted',
          originalDesignId: designId,
          measurements: JSON.stringify(measurements),
          createdAt: new Date().toISOString()
        }
      );
      
      console.log('Adjusted design record created:', designDoc.$id);
    } catch (dbError) {
      console.error('Failed to save adjusted design to database:', dbError);
      // Continue even if database save fails
    }

    res.json({
      success: true,
      adjustedUrl,
      adjustedFileId
    });
    
  } catch (error) {
    console.error('Fit adjustment failed:', error);
    res.status(500).json({ error: "Fit adjustment failed", details: error.message });
  }
});

// Helper function for image processing
function adjustImageProportions(imageBuffer, measurements) {
  // This would contain image processing logic with a library like Sharp or Jimp
  // For now, we'll just return the original image
  console.log('Adjusting image with measurements:', measurements);
  return imageBuffer;
}

export default router;
