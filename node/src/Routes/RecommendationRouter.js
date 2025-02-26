const router = require('express').Router();
const Recommendation = require('../models/Recommendation');

// Middleware to verify JWT and extract user ID
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract Bearer token
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }
  // Here you'd typically verify the token with jwt.verify() and set req.userId
  // For simplicity, assuming token is userId (replace with actual JWT logic)
  req.userId = token; // Replace with decoded user ID from JWT
  next();
};

// POST /save route
router.post('/save', verifyToken, async (req, res) => {
  try {
    const newRecommendation = new Recommendation({
      userId: req.body.userId || req.userId,
      injuryType: req.body.injuryType,
      duration: req.body.duration,
      severity: req.body.severity,
      details: req.body.details,
      exercises: req.body.exercises,
      acceptanceDate: req.body.acceptanceDate
    });

    const savedRecommendation = await newRecommendation.save();
    
    res.status(201).json({
      success: true,
      recommendation: savedRecommendation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to save recommendation'
    });
  }
});

// GET /api/recommendations route to fetch user's recommendations
router.get('/', verifyToken, async (req, res) => {
  try {
    const recommendations = await Recommendation.find({ userId: req.userId });
    res.status(200).json({
      success: true,
      recommendations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch recommendations'
    });
  }
});

// DELETE recommendation by ID
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const recId = req.params.id;
    const recommendation = await Recommendation.findOne({ _id: recId, userId: req.userId });

    if (!recommendation) {
      return res.status(404).json({
        success: false,
        message: 'Recommendation not found or not authorized'
      });
    }

    await Recommendation.deleteOne({ _id: recId });
    
    res.status(200).json({
      success: true,
      message: 'Recommendation deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting recommendation:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete recommendation'
    });
  }
});

module.exports = router;