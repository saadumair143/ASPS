const router = require('express').Router();
let UserSession = require('../models/user_session');

router.route('/').get((req, res, next) => {
  const { query } = req;
  const { token } = query;

  UserSession.findOneAndUpdate({
      userId: token,
      isDeleted: false
  },{
      $set: {isDeleted: true}
  },null,(err, sessions)=>{
      if(err){
          console.log(err)
          return res.send({
              success: false,
              message: 'Error: Server error.'
          });
      }
      return res.send({
            success: true,
            message: 'Logout.'
        });
  })
});

module.exports = router;