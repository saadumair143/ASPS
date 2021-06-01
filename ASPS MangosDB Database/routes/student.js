const router = require('express').Router();
let Student = require('../models/student_model');

router.route('/').get((req, res) => {
    Student.find()
    .then(students => res.json(students))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;
  const image_url = req.body.image_url;
  const semester = Number(req.body.semester);
  const educationlevel = req.body.educationlevel;
  const phonenumber = Number(req.body.phonenumber);
  const address = req.body.address;
  const city = req.body.city;
  const country = req.body.country;
  const postalcode = Number(req.body.postalcode);

  const newStudent = new Student({
    firstname,
    lastname,
    email,
    password,
    image_url,
    semester,
    educationlevel,
    phonenumber,
    address,
    city,
    country,
    postalcode
  });

  newStudent.save()
  .then(() => res.json('Student added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Student.findById(req.params.id)
    .then(course => res.json(course))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Student.findByIdAndDelete(req.params.id)
    .then(() => res.json('Student deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Student.findById(req.params.id)
    .then(student => {
        student.firstname = req.body.firstname;
        student.lastname = req.body.lastname;
        student.email = req.body.email;
        student.semester = Number(req.body.semester);
        student.phonenumber = Number(req.body.phonenumber);
        student.address = req.body.address;
        student.city = req.body.city;
        student.country = req.body.country;
        student.postalcode = Number(req.body.postalcode);
        student.image_url = req.body.image_url;
        student.password = req.body.password;
        student.educationlevel = req.body.educationlevel;
        student.save()
        .then(() => res.json('Student updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;