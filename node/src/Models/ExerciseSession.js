const mongoose = require('mongoose');

const exerciseSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  exerciseType: {
    type: String,
    required: true,
    default: 'bicep_curl'
  },
  duration: {
    type: Number,
    required: true
  },
  reps: {
    type: Number,
    required: true
  },
  avgTimePerRep: {
    type: Number,
    required: true
  },
  energy: {
    type: Number,
    required: true // Add energy field
  },
  formScore: {
    type: Number,
    required: true // Add formScore field
  },
  timestamp: { // Rename 'date' to 'timestamp' for consistency
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ExerciseSession', exerciseSessionSchema);