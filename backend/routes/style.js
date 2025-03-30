
import express from 'express';
import fetch from 'node-fetch';
import { appwriteDatabases, appwriteClient } from '../server.js';
import { ID } from 'node-appwrite';

const router = express.Router();

// Analyze style preferences
router.post('/analyze', async (req, res) => {
  try {
    // Get user input from frontend
    const { userInput, userId } = req.body;

    if (!userInput) {
      return res.status(400).json({ error: "User input is required" });
    }

    console.log('Analyzing style for input:', userInput);
    
    let keywords;
    
    // For demo/hackathon purposes
    if (process.env.USE_MOCK_DATA === 'true') {
      console.log('Using mock data for style analysis');
      keywords = [
        'minimalist',
        'casual',
        'modern',
        'comfortable',
        'neutral colors',
        'sustainable',
        'versatile'
      ];
    } else {
      try {
        // Call OpenAI API
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_KEY}`
          },
          body: JSON.stringify({
            model: "gpt-4",
            messages: [{
              role: "user",
              content: `Extract fashion keywords as comma-separated values from: ${userInput}`
            }]
          })
        });

        const data = await response.json();
        
        if (!data.choices || data.choices.length === 0) {
          console.error('OpenAI API error:', data);
          return res.status(500).json({ error: "Failed to analyze style: OpenAI API error" });
        }
        
        keywords = data.choices[0].message.content.split(',').map(keyword => keyword.trim());
      } catch (aiError) {
        console.error('OpenAI processing failed, falling back to mock data:', aiError);
        keywords = [
          'minimalist',
          'casual',
          'modern',
          'comfortable',
          'neutral colors'
        ];
      }
    }
    
    console.log('Extracted keywords:', keywords);
    
    // Save to database if userId is provided
    if (userId) {
      try {
        const document = await appwriteDatabases.createDocument(
          process.env.APPWRITE_DATABASE_ID,
          process.env.APPWRITE_STYLE_COLLECTION_ID,
          ID.unique(),
          {
            userId,
            keywords,
            rawInput: userInput,
            createdAt: new Date().toISOString()
          }
        );
        console.log('Saved style analysis to database:', document.$id);
      } catch (dbError) {
        console.error('Failed to save style analysis to database:', dbError);
        // Continue even if database save fails
      }
    }
    
    res.json({ 
      success: true,
      keywords 
    });
    
  } catch (error) {
    console.error('Style analysis failed:', error);
    res.status(500).json({ error: "Style analysis failed", details: error.message });
  }
});

// Get user's saved style preferences
router.get('/preferences/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    
    // Query Appwrite for user's style preferences
    const response = await appwriteDatabases.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_STYLE_COLLECTION_ID,
      [
        { field: 'userId', operator: 'equal', value: userId }
      ]
    );
    
    if (response.documents.length === 0) {
      return res.json({ 
        success: true,
        preferences: [] 
      });
    }
    
    // Get most recent style preferences
    const latestPreference = response.documents.sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    )[0];
    
    res.json({
      success: true,
      preferences: {
        keywords: latestPreference.keywords,
        createdAt: latestPreference.createdAt,
        id: latestPreference.$id
      }
    });
    
  } catch (error) {
    console.error('Failed to fetch style preferences:', error);
    res.status(500).json({ error: "Failed to fetch style preferences", details: error.message });
  }
});

export default router;
