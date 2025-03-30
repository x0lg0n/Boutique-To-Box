
import { Client, Databases, Storage, ID } from 'node-appwrite';

async function initializeAppwrite() {
  try {
    const client = new Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT)
      .setProject(process.env.APPWRITE_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    const databases = new Databases(client);
    const storage = new Storage(client);

    // Create database
    let databaseId;
    try {
      const database = await databases.create(ID.unique(), 'ThreadTailorDB');
      databaseId = database.$id;
      console.log(`Database created with ID: ${databaseId}`);
    } catch (error) {
      console.log('Database might already exist, trying to use an existing one');
      const databaseList = await databases.list();
      databaseId = databaseList.databases[0].$id;
    }

    // Create measurements collection
    try {
      await databases.createCollection(
        databaseId,
        ID.unique(),
        'Measurements',
        [
          { key: 'userId', type: 'string', required: true, array: false },
          { key: 'height', type: 'double', required: false, array: false },
          { key: 'shoulderWidth', type: 'double', required: false, array: false },
          { key: 'chestSize', type: 'double', required: false, array: false },
          { key: 'waistSize', type: 'double', required: false, array: false },
          { key: 'hipSize', type: 'double', required: false, array: false },
          { key: 'createdAt', type: 'datetime', required: true, array: false }
        ]
      );
      console.log('Measurements collection created');
    } catch (error) {
      console.log('Measurements collection might already exist', error);
    }

    // Create designs collection
    try {
      await databases.createCollection(
        databaseId,
        ID.unique(),
        'Designs',
        [
          { key: 'userId', type: 'string', required: true, array: false },
          { key: 'keywords', type: 'string', required: false, array: true },
          { key: 'fileId', type: 'string', required: true, array: false },
          { key: 'status', type: 'string', required: true, array: false },
          { key: 'garmentType', type: 'string', required: false, array: false },
          { key: 'occasion', type: 'string', required: false, array: false },
          { key: 'stylePreference', type: 'string', required: false, array: false },
          { key: 'createdAt', type: 'datetime', required: true, array: false }
        ]
      );
      console.log('Designs collection created');
    } catch (error) {
      console.log('Designs collection might already exist', error);
    }

    // Create storage buckets
    try {
      await storage.createBucket(ID.unique(), 'body-scans', ['*'], ['*']);
      console.log('Body scans bucket created');
    } catch (error) {
      console.log('Body scans bucket might already exist', error);
    }

    try {
      await storage.createBucket(ID.unique(), 'designs', ['*'], ['*']);
      console.log('Designs bucket created');
    } catch (error) {
      console.log('Designs bucket might already exist', error);
    }

    console.log('Appwrite initialization completed successfully');
  } catch (error) {
    console.error('Failed to initialize Appwrite:', error);
  }
}

export default initializeAppwrite;
