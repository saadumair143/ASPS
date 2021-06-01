const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true},
    image_url: { type: String },
    semester: { type: Number, required: true },
    educationlevel: { type: String , required: true },
    phonenumber: { type: Number, required: true },
    address: { type: String, required: true },
    city: { type: String },
    country: { type: String },
    postalcode: { type: Number }
}, {
  timestamps: true,
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;