import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/family-tree';
    
    console.log('Connecting to MongoDB...');
    
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    
    console.log('✅ MongoDB connected successfully');
    
    return mongoose.connection;
  } catch (error: any) {
    console.error('\n❌ MongoDB Connection Error:');
    console.error(`Error Code: ${error.code}`);
    console.error(`Error Message: ${error.message}`);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.error('\n💡 Tip: Make sure MongoDB is running locally at http://localhost:27017');
      console.error('   Or update MONGODB_URI in .env with a valid MongoDB connection string');
    }
    
    if (error.message.includes('authentication')) {
      console.error('\n💡 Tip: Check your MongoDB credentials in the connection string');
    }
    
    console.error('\n📝 Current connection string (first 50 chars):');
    console.error(`   ${process.env.MONGODB_URI?.substring(0, 50)}...`);
    
    throw error;
  }
};

export default connectDB;
