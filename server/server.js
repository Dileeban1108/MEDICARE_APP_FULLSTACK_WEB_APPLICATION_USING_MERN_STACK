const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require("dotenv").config();
const connectDB = require('./config/dbConnection'); // Corrected typo in filename
const PORT = process.env.PORT || 3001;

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/register', require('./routes/register'));
app.use('/email', require('./routes/email')); // Ensure correct path to email route
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/purchaseRoutes', require('./routes/purchaseRoutes'));

// Error handling middleware (should be placed at the end)
app.use((err, res) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start server
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
