const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
  },
  targetAmount: {
    type: Number,
    required: false,
  },
  currentAmount: {
    type: Number,
  },
  startDate: {
    type: Date,
    required: true,
  },

  endDate: {
    type: Date,
    required: true,
  },
  association: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Association',
    required: false,
  },
  donations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donation',
  }],
  status: {
    type: String,
    enum: ['active', 'completed', 'pending', 'canceled'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bannerImage: {
    type: String,
  },
});

// Export du modèle correctement
const Campaign = mongoose.model('Campaign', CampaignSchema);
module.exports = Campaign;
