var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Emotions = require('../models/emotions')
var Demography = require('../models/demography')
var Gesture = require('../models/gesture')

var fs = require('fs');
var spawn = require("child_process").spawn;
var { Parser } = require('json2csv');
// GET route for homepage
router.get('/', function (req, res, next) {
  return res.sendFile(path.join(__dirname + '/views/index.html'));
});

// post route for updating emotions data
router.post('/emotions', async function (req, res, next) {

  // return res.json({success: true})
  // console.log(req.body.faceParams)
  let emotions = req.body.faceParams.map(o => {
    o['userId'] = req.body.userId
    return o
  })

  console.log(emotions)

  const result = await Emotions.create(emotions)
  return res.json({ success: true, data: result })
  // Emotions.create(req.body.emotions, function (error, user) {
  //   if (error) {
  //     return next(error);
  //   } else {
  //     req.session.userId = user._id;
  //     return res.redirect('/profile');
  //   }
  // });
})

let values = {
  matId: '',
  gesturePerformed: ''
}

router.post('/setDetails', (req, res) => {
  values = {
    matId: req.body.matId,
    gesturePerformed: req.body.gesturePerformed
  }
  res.set('Access-Control-Allow-Origin', '*');
  return res.json({ success: true, value: values })
})

router.post('/gestures', async (req, res, next) => {
  // const gesture = new Gesture(req.body.gesture)
  let obj = {
    ...req.body.gesture,
    ...values
  }
  console.log(obj)
  // return res.json({data: obj})
  const results = await Gesture.create(obj)
  // res.set('Access-Control-Allow-Origin', '*');
  res.json({ success: true, data: results })
})

router.post('/getAdUrl', (req, res, next) => {
  const json2csvParser = new Parser();
  console.log('came here')
  if (req.body.type == 'demography') {
    console.log('came here demography')

    const csv = json2csvParser.parse(req.body.demography);
    console.log(csv)
    // fs.save()
    // console.log(csv)
    fs.writeFile("/home/hicup/Documents/ad-recommendation/backend/test.csv", csv, function (err) {
      if (err) {
        console.log(err);
      }
      console.log("The file was saved!");
      run(req, res, next)
      // res.json({ success: true, data: csv })
    });
    // console.log('came here')

  } else if (req.body.type == 'facialFeatures') {
    console.log('facial features')
    let params = req.body.faceParams.map(f => ({
      'smile': f.smile, 'innerBrowRaise': f.innerBrowRaise, 'browRaise': f.browRaise, 'browFurrow': f.browFurrow,
       'noseWrinkle': f.noseWrinkle, 'upperLipRaise': f.upperLipRaise, 'lipCornerDepressor': f.lipCornerDepressor, 'chinRaise': f.chinRaise,
       'lipPucker': f.lipPucker, 'lipPress': f.lipPress, 'lipSuck': f.lipSuck, 'mouthOpen': f.mouthOpen, 'smirk': f.smirk, 'eyeClosure': f.eyeClosure,'lidTighten': f.lidTighten, 'jawDrop': f.jawDrop, 'dimpler': f.dimpler, 'eyeWiden': f.eyeWiden,
       'cheekRaise': f.cheekRaise, 'lipStretch': f.lipStretch
    }))
    const csv = json2csvParser.parse(params);
    console.log(csv)
    fs.writeFile("/home/hicup/Documents/ad-recommendation/backend/facialFeatures.csv", csv, function (err) {
      if (err) {
        console.log(err);
      }
      console.log("The file was saved!");
      run(req, res, next)
      // res.json({ success: true, data: csv })
    });
  } else if (req.body.type == 'ensemble') {
    // console.log('ensemble')
    // console.log('facial features')
    let params = req.body.faceParams.map(f => ({
      'joy': f.joy, 'sadness': f.sadness, 'disgust': f.disgust, 'contempt': f.contempt,
       'anger': f.anger, 'fear': f.fear, 'surprise': f.surprise, 'valence': f.valence, 'engagement': f.engagement, 'smile': f.smile, 'innerBrowRaise': f.innerBrowRaise, 'browRaise': f.browRaise, 'browFurrow': f.browFurrow,
       'noseWrinkle': f.noseWrinkle, 'upperLipRaise': f.upperLipRaise, 'lipCornerDepressor': f.lipCornerDepressor, 'chinRaise': f.chinRaise,
       'lipPucker': f.lipPucker, 'lipPress': f.lipPress, 'lipSuck': f.lipSuck, 'mouthOpen': f.mouthOpen, 'smirk': f.smirk, 'eyeClosure': f.eyeClosure,'lidTighten': f.lidTighten, 'jawDrop': f.jawDrop, 'dimpler': f.dimpler, 'eyeWiden': f.eyeWiden,
       'cheekRaise': f.cheekRaise, 'lipStretch': f.lipStretch, 'age': req.body.demography[0].age, 'gender': req.body.demography[0].gender
    }))
    const csv = json2csvParser.parse(params);
    console.log(csv)
    fs.writeFile("/home/hicup/Documents/ad-recommendation/backend/ensemble.csv", csv, function (err) {
      if (err) {
        console.log(err);
      }
      console.log("The file was saved!");
      run(req, res, next)
      // res.json({ success: true, data: csv })
    });
  } else {
    console.log('else')
  }
  
  // return res.json({success: true, data: []})
})

function run(req, res, next){
  var py = spawn('bash', ['/home/hicup/Documents/ad-recommendation/backend/run.sh', 1, req.body.type]);
  var data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  var dataString = '';

  py.stdout.on('data', function (data) {
    dataString += data.toString();
  });
  py.stdout.on('end', function () {
    
    let val = parseInt(dataString.trim())
    let adNo = ''
    if(val == 0){
      adNo = 'CVPKs9xdCMc'
    }else if(val == 1){
      adNo = 'BJsGdi6X0v4'
    }else if(val == 2){
      adNo = 'FOsw_VpNQFA'
    }else{
      adNo = '8KeLjw0NWe8'
    }
    res.json({
      success: true,
      data: adNo
    })
  });
  py.stdin.write(JSON.stringify(data));
  py.stdin.end();

}

router.get('/gestures', async (req, res, next) => {
  let results = []
  if (req.query.matId) {

    results = await Gesture.find({ matId: req.query.matId })

  } else {
    results = await Gesture.find()
  }
  // res.set('Access-Control-Allow-Origin', '*');
  let count = {
    total: results.length,
    tap: 0,
    left: 0,
    right: 0
  }

  results.forEach(r => {
    if (r) {
      if (r.gesturePerformed == 'tap') {
        count.tap = count.tap + 1
      }
      if (r.gesturePerformed == 'left') {
        count.left = count.left + 1
      }
      if (r.gesturePerformed == 'right') {
        count.right = count.right + 1
      }
    }
  })
  return res.json({ success: true, count, data: results })

})

router.post('/demography', async function (req, res, next) {

  console.log('came heere')
  let obj = {
    userId: req.body.userId,
    images: req.body.images
  }
  console.log(obj)

  const result = await Demography.create(obj)
  return res.json({ success: true, data: result })
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