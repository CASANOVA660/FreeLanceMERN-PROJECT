const express = require('express');
const router = express.Router();
const {
  getTotalUserCount,
  register,
  login,
} = require('../controller/authController'); // Adjust the path as needed

// Get the total number of users
router.get('/count', getTotalUserCount);

// Register a new user
router.post('/users/register', register);

// Login a user
router.post('/login', login);

module.exports = router;
