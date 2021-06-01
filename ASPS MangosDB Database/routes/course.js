const router = require('express').Router();
let Course = require('../models/course_model');

router.route('/').get((req, res) => {
    Course.find()
    .then(courses => res.json(courses))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const coursecode = req.body.coursecode;
  const coursename = req.body.coursename;
  const credithours = Number(req.body.credithours);
  const semester = Number(req.body.semester);
  const numberoflectures = Number(req.body.numberoflectures)

  const newCourse = new Course({
    coursecode,
    coursename,
    credithours,
    semester,
    numberoflectures
  });

  newCourse.save()
  .then(() => res.json('Course added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Course.findById(req.params.id)
    .then(course => res.json(course))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Course.findByIdAndDelete(req.params.id)
    .then(() => res.json('Course deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Course.findById(req.params.id)
    .then(course => {
        course.coursecode = req.body.coursecode;
        course.coursename = req.body.coursename;
        course.credithours = Number(req.body.credithours);
        course.semester = Number(req.body.semester);
        course.numberoflectures = Number(req.body.numberoflectures);
        course.save()
        .then(() => res.json('Course updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;