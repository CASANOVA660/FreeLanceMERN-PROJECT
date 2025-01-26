const mongoose = require('mongoose');

const AssociationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,  
  },
  description: {
    type: String,
    required: true,  
  },
  website: {
    type: String,
    trim: true,
    required : false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, "L'adresse e-mail doit être valide"],  
  },
  phone: {
    type: String,
    trim: true,
  },
  address: {
    type : String,
    require: true,
  },
  logo: {
    type: String,  
  },
  campaigns: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign', 
  }],
  createdAt: {
    type: Date,
    default: Date.now,  
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  
    required: false,
  },
});

module.exports = mongoose.model('Association', AssociationSchema);
