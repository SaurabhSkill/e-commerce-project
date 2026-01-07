import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log(
      `MongoDB connected successfully on host: ${connection.connection.host}, database: ${connection.connection.db.databaseName}`
    );
    return connection;
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    console.log('Server will continue running without database connection...');
    // Don't retry automatically to avoid infinite loops
    return null;
  }
};

export default connectDB;
