const router = require('express').Router();
let Teacher = require('../models/teacher_model');

router.route('/').get((req, res) => {
    Teacher.find()
    .then(teachers => res.json(teachers))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;
  const image_url = req.body.image_url;
  const course = req.body.course;
  const educationlevel = req.body.educationlevel;
  const phonenumber = Number(req.body.phonenumber);
  const address = req.body.address;
  const city = req.body.city;
  const country = req.body.country;
  const postalcode = Number(req.body.postalcode);

  const newTeacher = new Teacher({
    firstname,
    lastname,
    email,
    password,
    image_url,
    course,
    educationlevel,
    phonenumber,
    address,
    city,
    country,
    postalcode
  });

  newTeacher.save()
  .then(() => res.json('Teacher added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Teacher.findById(req.params.id)
    .then(course => res.json(course))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Teacher.findByIdAndDelete(req.params.id)
    .then(() => res.json('Teacher deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Teacher.findById(req.params.id)
    .then(teacher => {
        teacher.firstname = req.body.firstname;
        teacher.lastname = req.body.lastname;
        teacher.email = req.body.email;
        teacher.phonenumber = Number(req.body.phonenumber);
        teacher.address = req.body.address;
        teacher.city = req.body.city;
        teacher.country = req.body.country;
        teacher.postalcode = Number(req.body.postalcode);
        teacher.image_url = req.body.image_url;
        teacher.password = req.body.password;
        teacher.educationlevel = req.body.educationlevel;
        teacher.save()
        .then(() => res.json('Teacher updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;