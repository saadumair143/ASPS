const router = require('express').Router();
let Admin = require('../models/admin_model');

router.route('/').get((req, res) => {
  Admin.find()
    .then(admin => res.json(admin))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const password = req.body.password;

  const newAdmin = new Admin({
    name,
    password
  });

  newAdmin.save()
    .then(() => res.json('Admin added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;