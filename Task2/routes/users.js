var router = require('express').Router();
var passport = require('passport');
var User = require('../models/User');
require('../config/passport');

router.post('/user/login', function(req, res, next){
  if(!req.body.email){
    return res.status(422).json({errors: {email: "can't be blank"}});
  }

  if(!req.body.password){
    return res.status(422).json({errors: {password: "can't be blank"}});
  }

  passport.authenticate('local', {session: false}, function(err, user, info){
    if(err){ return next(err); }

    if(user){
      user.token = user.generateJWT();
      return res.json({user: user.toAuthJSON()});
    } else {
      return res.status(400).json({errors: {error: "User does not exist."}});
    }
  })(req, res, next);
});


router.post('/user/signup', function(req, res, next){
  User.findOne({ where: { email: req.body.email } }).then(function(user){
    if(!user){
      User.create({
        email: req.body.email,
        password: req.body.password})
      .then(user => {
        return res.json({user: user.toAuthJSON()});
      })
      .catch(error => {
        res.status(400).json({errors: {error: error}});
      });
    }
    else
    {
      return res.status(400).json({errors: {error: "User already exists."}});
    }
  
  });
  
});

module.exports = router;
