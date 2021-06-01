const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    coursecode: { type: String, required: true },
    coursename: { type: String, required: true },
    credithours: { type: Number, required: true },
    semester: { type: Number, required: true },
    numberoflectures: { type: Number, required: true }
}, {
  timestamps: true,
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;