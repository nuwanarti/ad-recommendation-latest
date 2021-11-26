var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Emotions = require('../models/emotions')
var Demography = require('../models/demography')
var Ad = require('../models/ad')

var fs = require('fs');
var spawn = require("child_process").spawn;
var { Parser } = require('json2csv');

var ethers = require('ethers');

const MNEMONIC = 'coffee vibrant analyst leg orbit chunk brass prosper address bright grape velvet camera knife crazy excess symptom column fine web train market nature orphan' // put your recovery phrase here // process.env.MNEMONIC
const CONTRACT_ADDRESS = '0xE755048989A48D4a489C2caD8f9cb5E421eF604d' // put your wallet id here '0x0Ee0B9a5c440b6b70c8cb95E2982cE4BbC010aE2'
const ABI = [
    'function setValue(string value)',
    'function value() public view returns (string)'
]

router.get('/get', async (req, res) => {
    const provider = ethers.getDefaultProvider('rinkeby')
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider)
    try {
        const value = await contract.value()
        res.send(value)
    } catch (e) {
        res.send(e)
    }
})

router.post('/set', async (req, res) => {
    const provider = ethers.getDefaultProvider('rinkeby')
    const wallet = ethers.Wallet.fromMnemonic(MNEMONIC).connect(provider)
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet)
    try {
        await contract.setValue(req.body.data)
        res.send('OK')
    } catch (e) {
        res.send(e)
    }
})


// GET route for homepage
router.get('/', function (req, res, next) {
  return res.sendFile(path.join(__dirname + '/views/index.html'));
});


router.get('/users', async (req, res, next) => {
  // console.log('came here')
  // return res.json({success: true})
  const users = await User.find();
  res.json({success: true, users, count: users.length})

})


router.get('/ads', async (req, res, next) => {
  const ads = await Ad.find();
  res.json({success: true, ads, count: ads.length})
})

router.post('/ads', async(req, res, next) => {
  const ad = new Ad(req.body.ad)
  const saved = await ad.save()
  res.json({success: true, data: saved})
})


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
    console.log('data ' + data)
    dataString += data.toString();
  });
  py.stdout.on('end', function () {
    
    let val = parseInt(dataString.trim())
    console.log('val ' + val)
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