const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    image_url: { type: String },
    course: { type: String, required: true },
    educationlevel: { type: String , required: true },
    phonenumber: { type: Number, required: true },
    address: { type: String, required: true },
    city: { type: String },
    country: { type: String },
    postalcode: { type: Number }
}, {
  timestamps: true,
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;