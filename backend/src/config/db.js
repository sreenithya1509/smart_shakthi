import mongoose from 'mongoose';

export const connectDB = async () => {
  let mongoUri = process.env.MONGO_URI;

  if (process.env.USE_MEMORY_DB === 'true') {
    const { MongoMemoryServer } = await import('mongodb-memory-server');
    const memoryServer = await MongoMemoryServer.create({
      instance: {
        dbName: 'smart-shakthi'
      }
    });
    mongoUri = memoryServer.getUri();
    global.__SMART_SHAKTHI_MEMORY_DB__ = memoryServer;
    console.log('Using in-memory MongoDB for local development');
  }

  if (!mongoUri) {
    throw new Error('MONGO_URI is required to start Smart Shakthi API');
  }

  mongoose.set('strictQuery', true);
  const connection = await mongoose.connect(mongoUri);
  console.log(`MongoDB connected: ${connection.connection.host}`);
};
