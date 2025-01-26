const express = require('express');
const router = express.Router();
const {
  getTotalCampaigns,
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
} = require('../Controller/campaignController'); 

// Get the total number of campaigns
router.get('/count', getTotalCampaigns);

// Create a new campaign
router.post('/create', createCampaign);

// Get all campaigns
router.get('/', getAllCampaigns);

// Get a campaign by ID
router.get('/:id', getCampaignById);

// Update a campaign by ID
router.put('/:id', updateCampaign);

// Delete a campaign by ID
router.delete('/:id', deleteCampaign);

module.exports = router;
