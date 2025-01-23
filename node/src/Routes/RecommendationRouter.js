const router = require('express').Router();
const Recommendation = require('../models/Recommendation');

router.post('/save', async (req, res) => {
  try {
    const newRecommendation = new Recommendation({
      userId: req.body.user_id,
      injuryType: req.body.injuryDetails.injuryType,
      duration: req.body.injuryDetails.duration,
      severity: req.body.injuryDetails.severity,
      details: req.body.injuryDetails.details,
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

module.exports = router;