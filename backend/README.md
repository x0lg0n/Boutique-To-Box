
# ThreadTailor Backend

This is the backend server for the ThreadTailor application. It provides APIs for AI-powered fashion design generation, body measurements analysis, and style analysis.

## Features

- Style analysis using OpenAI
- Body measurements extraction from images using AWS Rekognition
- AI-powered fashion design generation
- Design fit adjustment
- Data storage using Appwrite

## Prerequisites

- Node.js v14+ and npm
- Appwrite account and project
- OpenAI API key
- AWS account with Rekognition access
- RunwayML API key (or other AI image generation service)

## Installation

1. Clone this repository
2. Navigate to the backend directory:
   ```
   cd backend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Copy the `.env.example` file to `.env`:
   ```
   cp .env.example .env
   ```
5. Edit the `.env` file and add your API keys and configuration

## Appwrite Setup

1. Create a new project in Appwrite
2. Create API keys with the necessary permissions
3. Update the `.env` file with your Appwrite endpoint and API key
4. Run the initialization script to set up collections and buckets:
   ```
   node -e "import('./init/appwrite-init.js').then(m => m.default())"
   ```

## Development

Start the development server:
```
npm run dev
```

## Production

Start the production server:
```
npm start
```

## API Endpoints

### Style Analysis
- `POST /api/style/analyze`: Analyze style preferences from text input

### Body Measurements
- `POST /api/measurements/analyze`: Extract body measurements from image

### Design Generation
- `POST /api/design/generate`: Generate clothing design based on parameters
- `POST /api/design/adjust-fit`: Adjust design fit based on measurements

## Environment Variables

- `APPWRITE_ENDPOINT`: Appwrite API endpoint
- `APPWRITE_PROJECT_ID`: Appwrite project ID
- `APPWRITE_API_KEY`: Appwrite API key
- `APPWRITE_DATABASE_ID`: Appwrite database ID
- `APPWRITE_MEASUREMENTS_COLLECTION_ID`: Appwrite measurements collection ID
- `APPWRITE_DESIGNS_COLLECTION_ID`: Appwrite designs collection ID
- `APPWRITE_BODY_SCANS_BUCKET_ID`: Appwrite body scans bucket ID
- `APPWRITE_DESIGNS_BUCKET_ID`: Appwrite designs bucket ID
- `OPENAI_KEY`: OpenAI API key
- `AWS_ACCESS_KEY`: AWS access key
- `AWS_SECRET_KEY`: AWS secret key
- `AWS_REGION`: AWS region
- `RUNWAY_KEY`: RunwayML API key
- `PORT`: Server port (default: 5000)
- `USE_MOCK_DATA`: Set to 'true' for development without third-party APIs

## Demo Mode

For hackathon or demo purposes, you can set `USE_MOCK_DATA=true` in your `.env` file to use mock responses instead of calling real third-party APIs.
