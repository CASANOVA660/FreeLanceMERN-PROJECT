const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
  donorName: {
    type: String,
    required: true,  
    trim: true,
  },
  donorEmail: {
    type: String,
    required: true,  
    match: [/.+\@.+\..+/, "L'adresse e-mail doit être valide"],  
  },
  amount: {
    type: Number,
    required: true, 
  },
  campaign: {
    type: mongoose.Schema.Types.ObjectId,  // Référence vers une campagne
    ref: 'Campaign',  
    required: true,
  },
  donationDate: {
    type: Date,
    default: Date.now,  
  },
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'paypal'],  
    required: false,
  },
  status: {
    type: String,
    enum: ['completed', 'pending', 'failed'],  
    default: 'pending',
  },
  receiptUrl: {
    type: String,  
  },
  cardNumber: {
    type: String,
  },
});

module.exports = mongoose.model('Donation', DonationSchema);
