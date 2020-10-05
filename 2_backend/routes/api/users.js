var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var User = mongoose.model('User');
var auth = require('../auth');

router.get('/user', auth.required, function(req, res, next){
  User.findById(req.payload.id).then(function(user){
    if(!user){ return res.sendStatus(401); }

    return res.json({user: user.toAuthJSON()});
  }).catch(next);
});

router.put('/user', auth.required, function(req, res, next){
  User.findById(req.payload.id).then(function(user){
    if(!user){ return res.sendStatus(401); }

    // only update fields that were actually passed...
    if(typeof req.body.user.username !== 'undefined'){
      user.username = req.body.user.username;
    }
    if(typeof req.body.user.email !== 'undefined'){
      user.email = req.body.user.email;
    }
    if(typeof req.body.user.bio !== 'undefined'){
      user.bio = req.body.user.bio;
    }
    if(typeof req.body.user.image !== 'undefined'){
      user.image = req.body.user.image;
    }
    if(typeof req.body.user.password !== 'undefined'){
      user.setPassword(req.body.user.password);
    }

    return user.save().then(function(){
      return res.json({user: user.toAuthJSON()});
    });
  }).catch(next);
});

router.post('/users/login', function(req, res, next){
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
      return res.status(422).json(info);
    }
  })(req, res, next);
});

router.post('/users', function(req, res, next){

  Promise.all([
    User.findOne({'email': req.body.user.email}),
    User.findOne({'username': req.body.user.username})
  ]).then(function(results) {

    if (results[0] == null && results[1] == null) {
      var user = new User();

      user.username = req.body.user.username;
      user.email = req.body.user.email;
      user.setPassword(req.body.user.password);
      user.idsocial = req.body.user.email;

      user.save().then(function(){
        return res.json({user: user.toAuthJSON()});
      }).catch(next);

    }else {
      res.status(422).json('User duplicated');
      console.log('fail');
    }

  });

  // User.findOne({ 'email' : req.body.user.email }, function(err, response) {
  //   if (response == null) {
  //     var user = new User();
    
  //     user.username = req.body.user.username;
  //     user.email = req.body.user.email;
  //     user.setPassword(req.body.user.password);
  //     user.idsocial = req.body.user.email;
    
  //     user.save().then(function(){
  //       return res.json({user: user.toAuthJSON()});
  //     }).catch(next);
  //   }else {
  //     res.status(422).json(err);
  //     console.log('fail');
  //   }
  // })
});

router.post('/users/sociallogin', function(req, res, next){
  let memorystore = req.sessionStore;
  let sessions = memorystore.sessions;
  let sessionUser;
  for(var key in sessions){
    sessionUser = (JSON.parse(sessions[key]).passport.user);
  }

  User.findOne({ '_id' : sessionUser }, function(err, user) {
    if (err)
      return done(err);
    // if the user is found then log them in
    if (user) {
        user.token = user.generateJWT();
        return res.json({user: user.toAuthJSON()});// user found, return that user
    } else {
        return res.status(422).json(err);
    }
  });
});

router.get('/auth/googleplus', passport.authenticate('google', { scope: [
  'https://www.googleapis.com/auth/plus.login',
  'https://www.googleapis.com/auth/plus.profile.emails.read'
]}));
router.get('/auth/googleplus/callback',
  passport.authenticate('google',{
  successRedirect : 'http://localhost:4000/#!/auth/sociallogin',
  failureRedirect: '/' }));

router.get('/auth/github', passport.authenticate('github'));
router.get('/auth/github/callback',
  passport.authenticate('github',{
  successRedirect : 'http://localhost:4000/#!/auth/sociallogin',
  failureRedirect: '/' }));

module.exports = router;
