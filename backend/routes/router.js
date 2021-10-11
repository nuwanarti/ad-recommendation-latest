var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Emotions = require('../models/emotions')
var Demography = require('../models/demography')
// GET route for homepage
router.get('/', function (req, res, next) {
  return res.sendFile(path.join(__dirname + '/views/index.html'));
});

// post route for updating emotions data
router.post('/emotions', async function(req, res, next){

  // return res.json({success: true})
  // console.log(req.body.faceParams)
  let emotions = req.body.faceParams.map(o => {
    o['userId'] = req.body.userId
    return o
  })

  console.log(emotions)

  const result = await Emotions.create(emotions)
  return res.json({success: true, data: result})
  // Emotions.create(req.body.emotions, function (error, user) {
  //   if (error) {
  //     return next(error);
  //   } else {
  //     req.session.userId = user._id;
  //     return res.redirect('/profile');
  //   }
  // });
})

router.post('/demography', async function(req, res, next){

  console.log('came heere')
  let obj = {
    userId: req.body.userId,
    images: req.body.images
  }
  console.log(obj)

  const result = await Demography.create(obj)
  return res.json({success: true, data: result})
})

//POST route for updating data
router.post('/', function (req, res, next) {
  
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Password doesn\'t match!');
    err.status = 400;
    res.send('Password doesn\'t match!');
    return next(err);
  }

  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
    }

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });

  } else if (req.body.logemail && req.body.logpassword) {
    User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password!');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });
  } else {
    var err = new Error('All fields are required!');
    err.status = 400;
    return next(err);
  }
})



// GET route to redirect to '/profile' page after registering
router.get('/profile', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          return res.send('<h2>Your name: </h2>' + user.username + '<h2>Your email: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
        }
      }
    });
});

// GET for logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

module.exports = router;