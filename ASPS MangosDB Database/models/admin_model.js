const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 5
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 5
  }
}, {
  timestamps: true,
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;