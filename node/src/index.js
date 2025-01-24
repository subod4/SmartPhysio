const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

// Database connection
require('./db/db');

// Middleware Configuration
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/auth', require('./Routes/AuthRouter'));
app.use('/exercise', require('./Routes/ExerciseRouter'));
app.use('/api/recommendations', require('./Routes/RecommendationRouter'));

// Health check
app.get('/ping', (req, res) => res.status(200).json({ status: 'ok' }));

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});