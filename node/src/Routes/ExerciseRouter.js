const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middlewares/auth');
const ExerciseSession = require('../Models/ExerciseSession');

// Get all exercise sessions for logged-in user
router.get('/sessions', authMiddleware, async (req, res) => {
  try {
    const sessions = await ExerciseSession.find({ userId: req.user._id })
      .sort({ date: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: sessions.length,
      data: sessions
    });
  } catch (error) {
    console.error('Error fetching sessions:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// Create new exercise session
router.post('/session', authMiddleware, async (req, res) => {
  try {
    const session = new ExerciseSession({
      userId: req.user._id,
      ...req.body
    });

    await session.save();
    
    res.status(201).json({
      success: true,
      data: session
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to save session'
    });
  }
});

// DELETE exercise session by ID
router.delete('/sessions/:id', authMiddleware, async (req, res) => {
  try {
    const sessionId = req.params.id;
    const session = await ExerciseSession.findOne({ _id: sessionId, userId: req.user._id });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Exercise session not found or not authorized'
      });
    }

    await ExerciseSession.deleteOne({ _id: sessionId });
    
    res.status(200).json({
      success: true,
      message: 'Exercise session deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting session:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete session'
    });
  }
});

module.exports = router;