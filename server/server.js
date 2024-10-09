const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConnection'); // Corrected typo in filename
const PORT = process.env.PORT || 3001;
const app = express();
const cookieParser = require("cookie-parser");


app.use(express.json());
app.use(cors());  
app.use(cookieParser());  

// Error handling middleware (should be placed at the end)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});


require("dotenv").config();


// Connect to MongoDB
connectDB();


// Routes
app.use('/register', require('./routes/register'));
app.use('/email', require('./routes/email')); // Ensure correct path to email route
app.use('/auth', require('./routes/auth'));
app.use('/purchaseRoutes', require('./routes/purchaseRoutes'));



// Start server
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
