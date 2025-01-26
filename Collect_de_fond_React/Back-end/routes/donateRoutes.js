const express = require('express');
const router = express.Router();
const {
  getTotalDonationsCount,
  donate,
  getDonations,
} = require('../Controller/donationController'); // Adjust the path as necessary

// Get the total count of donations
router.get('/count', getTotalDonationsCount);

// Create a new donation
router.post('/donate', donate);

// Get donations by donor email
router.get('/by-email/:email', getDonations);

module.exports = router;
