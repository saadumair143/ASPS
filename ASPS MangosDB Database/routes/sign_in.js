const router = require('express').Router();
let Admin = require('../models/admin_model');
let Teacher = require('../models/teacher_model');
let Student = require('../models/student_model');
let UserSession = require('../models/user_session');

router.route('/auth').post((req, res) => {
  const password = req.body.password;
  let user = req.body.user;
  const user_type = req.body.user_type;
  user = user.toLowerCase();

  if(user_type=="admin"){
      Admin.find({
          name: user
      }).then(admin => {
          if(admin.length!=1){
            res.json("Invalid user.")
          }else{
            const user = admin[0];
            if(user.password != password){
                res.json("Invalid password")
            }else{
                let userSession = new UserSession();
                userSession.userId = user._id;
                userSession.save((err,doc)=>{
                    res.json({
                        message: 'Sign in successfully.',
                        token: doc.userId
                    });
                })
            }
          }
        })
      .catch(err => res.status(400).json('Error: ' + err));
  }else if(user_type=="teacher"){
    Teacher.find({
        name: user
    }).then(teacher => {
        if(teacher.length!=1){
            res.json("Invalid user.")
        }else{
          const user = teacher[0];
          if(user.password != password){
              res.json("Invalid password")
          }else{
              let userSession = new UserSession();
              userSession.userId = user._id;
              userSession.save((err,doc)=>{
                  res.json({
                      message: 'Sign in successfully.',
                      token: doc.userId
                  });
              })
          }
        }
      })
    .catch(err => res.status(400).json('Error: ' + err));
  }
  else if(user_type=="student"){
    Student.find({
        name: user
    }).then(student => {
        if(admin.length!=1){
            res.json("Invalid user.")
        }else{
          const user = student[0];
          if(user.password != password){
              res.json("Invalid password")
          }else{
              let userSession = new UserSession();
              userSession.userId = user._id;
              userSession.save((err,doc)=>{
                  res.json({
                      message: 'Sign in successfully.',
                      token: doc.userId
                  });
              })
          }
        }
      })
    .catch(err => res.status(400).json('Error: ' + err));
}
});

module.exports = router;