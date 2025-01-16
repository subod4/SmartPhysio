const { signup, login } = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');

const router = require('express').Router();

// Signup Route
router.post('/signup', signupValidation, signup);

// Login Route
router.post('/login', loginValidation, login);

module.exports = router;
