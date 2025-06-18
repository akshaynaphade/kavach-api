const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// ✅ Load environment variables early
require('dotenv').config({
  path: path.resolve(__dirname, '.env')
});

const userRoutes = require('./routes/userRoutes');
const passwordRoutes = require('./routes/passwordRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Show all env variables in development (optional)
// console.log('Loaded ENV:', process.env);

// ✅ Check if MONGODB_URI is defined
if (!process.env.MONGODB_URI) {
  console.error('❌ MONGODB_URI is missing in environment variables!');
  process.exit(1); // graceful shutdown
}

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB connected');

  // ✅ Start the server only after DB is ready
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1); // prevent app from running with bad DB
});

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ API Routes
app.use('/api/users', userRoutes);
app.use('/api/passwords', passwordRoutes);

// ✅ Serve frontend static files
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Root route fallback
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
