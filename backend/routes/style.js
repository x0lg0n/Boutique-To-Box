
import express from 'express';
import fetch from 'node-fetch';
import { appwriteDatabases, appwriteClient } from '../server.js';

const router = express.Router();

// Analyze style preferences
router.post('/analyze', async (req, res) => {
  try {
    // Get user input from frontend
    const { userInput } = req.body;

    if (!userInput) {
      return res.status(400).json({ error: "User input is required" });
    }

    console.log('Analyzing style for input:', userInput);
    
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
    
    const keywords = data.choices[0].message.content.split(', ');
    
    console.log('Extracted keywords:', keywords);
    
    res.json({ 
      success: true,
      keywords 
    });
    
  } catch (error) {
    console.error('Style analysis failed:', error);
    res.status(500).json({ error: "Style analysis failed", details: error.message });
  }
});

export default router;
