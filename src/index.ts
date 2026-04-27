import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db.js';
import authRouter from './routes/auth.js';
import personsRouter from './routes/persons.js';
import familyTreesRouter from './routes/familyTrees.js';
import suggestionsRouter from './routes/suggestions.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:8080',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check (works without DB)
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() });
});

// Connect to MongoDB and setup routes
try {
  await connectDB();

  // Auth routes (available even without full DB connection)
  app.use('/api/auth', authRouter);

  // Routes (only available after successful DB connection)
  app.use('/api/persons', personsRouter);
  app.use('/api/family-trees', familyTreesRouter);
  app.use('/api/suggestions', suggestionsRouter);
  
  console.log('✅ API routes initialized');
  console.log('✍️  Available endpoints:');
  console.log(`     POST   /api/auth/register  - Register new admin user`);
  console.log(`     POST   /api/auth/login     - Login with credentials`);
  console.log(`     GET    /api/auth/verify    - Verify token`);
  console.log(`     PUT    /api/auth/profile   - Update profile`);
  console.log(`     GET    /api/auth/users     - Get all users (Admin only)`);
  console.log(`     GET    /api/persons         - Get all persons`);
  console.log(`     POST   /api/persons         - Create person`);
  console.log(`     GET    /api/family-trees    - Get all family trees`);
  console.log(`     GET    /api/suggestions     - Get all suggestions`);
  console.log(`     POST   /api/suggestions     - Create suggestion`);
} catch (error) {
  console.warn('\n⚠️  Warning: API routes disabled (MongoDB connection failed)');
  console.warn('Health check still available at /api/health\n');
  
  // Provide error response for API routes when DB is not connected
  const dbErrorHandler = (req: any, res: any) => {
    res.status(503).json({ 
      error: 'Database connection failed', 
      message: 'Please check MongoDB configuration and try again' 
    });
  };
  
  app.use('/api/persons', dbErrorHandler);
  app.use('/api/family-trees', dbErrorHandler);
  app.use('/api/suggestions', dbErrorHandler);
}

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
  console.log('\n💡 Available endpoints:');
  console.log(`   GET  /api/health          - Server health check`);
  console.log(`   POST /api/auth/register   - Register new admin user`);
  console.log(`   POST /api/auth/login      - Login with credentials`);
  console.log(`   GET  /api/auth/verify     - Verify token (requires auth)`);
  console.log(`   PUT  /api/auth/profile    - Update profile (requires auth)`);
  console.log(`   GET  /api/auth/users      - Get all users (requires admin auth)`);
  console.log(`   GET  /api/persons         - Get all persons`);
  console.log(`   GET  /api/family-trees    - Get all family trees`);
  console.log(`   GET  /api/suggestions     - Get all suggestions\n`);
});
