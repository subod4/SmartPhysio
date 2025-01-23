const mongoose = require('mongoose');

const RecommendationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  injuryType: String,
  duration: String,
  severity: String,
  details: String,
  exercises: [{
    name: String,
    description: String,
    duration: String,
    frequency: String
  }],
  acceptanceDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Recommendation', RecommendationSchema);