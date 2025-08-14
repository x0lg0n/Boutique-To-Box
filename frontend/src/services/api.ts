
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Style analysis service
export const analyzeStyle = async (userInput: string, userId?: string) => {
  try {
    const response = await api.post('/style/analyze', { userInput, userId });
    return response.data;
  } catch (error) {
    console.error('Style analysis error:', error);
    throw error;
  }
};

// Get saved style preferences
export const getStylePreferences = async (userId: string) => {
  try {
    const response = await api.get(`/style/preferences/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Style preferences fetch error:', error);
    throw error;
  }
};

// Body measurements service
export const analyzeBodyMeasurements = async (imageBase64: string, userId: string) => {
  try {
    const response = await api.post('/measurements/analyze', { imageBase64, userId });
    return response.data;
  } catch (error) {
    console.error('Body measurements analysis error:', error);
    throw error;
  }
};

// Design generation service
export const generateDesign = async (params: {
  userId: string;
  keywords: string[];
  bodyType?: string;
  stylePreference?: string;
  garmentType?: string;
  occasion?: string;
}) => {
  try {
    const response = await api.post('/design/generate', params);
    return response.data;
  } catch (error) {
    console.error('Design generation error:', error);
    throw error;
  }
};

// Design fit adjustment service
export const adjustDesignFit = async (params: {
  userId: string;
  designId: string;
  measurements: {
    shoulderWidth?: number;
    chestSize?: number;
    waistSize?: number;
    hipSize?: number;
    height?: number;
  }
}) => {
  try {
    const response = await api.post('/design/adjust-fit', params);
    return response.data;
  } catch (error) {
    console.error('Design fit adjustment error:', error);
    throw error;
  }
};

export default {
  analyzeStyle,
  getStylePreferences,
  analyzeBodyMeasurements,
  generateDesign,
  adjustDesignFit
};
