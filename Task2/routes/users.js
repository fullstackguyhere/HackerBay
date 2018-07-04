var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var User = require('../models/User');
var auth = require('../auth');

router.post('/user/login', function(req, res, next){
  if(!req.body.user.email){
    return res.status(422).json({errors: {email: "can't be blank"}});
  }

  if(!req.body.user.password){
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
  User.findOne({ where: { username: req.body.user.username } }).then(function(user){
    if(!user){
      User.create({
        username: req.body.user.username,
        email: req.body.user.email,
        password: req.body.user.password})
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