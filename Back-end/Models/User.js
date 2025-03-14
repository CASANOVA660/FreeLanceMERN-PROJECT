const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,  
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,  
    match: [/.+\@.+\..+/, "L'adresse e-mail doit être valide"],
  },
  password: {
    type: String,
    required: true,  
  },
  role: {
    type: String,
    enum: ['association', 'donor'],  
    lowercase: true, 
  },
  createdAt: {
    type: Date,
    default: Date.now,  
  },
});


UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


UserSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
