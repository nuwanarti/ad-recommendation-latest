var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

var EmotionSchema = new mongoose.Schema({
  timestamp: {
    type: Number,
    required: true
  },
  userId: {
    type: String,
    required: true,
  },
  anger: {
    type: Number,
    required: false,
  },
  attention: {
    type: Number,
    required: false,
  },
  browFurrow: {
    type: Number,
    required: false,
  },
  browRaise: {
    type: Number,
    required: false,
  },
  cheekRaise: {
    type: Number,
    required: false,
  },
  chinRaise: {
    type: Number,
    required: false,
  },
  contempt: {
    type: Number,
    required: false,
  },
  dimpler: {
    type: Number,
    required: false,
  },
  disgust: {
    type: Number,
    required: false,
  },
  engagement: {
    type: Number,
    required: false,
  },
  eyeClosure: {
    type: Number,
    required: false,
  },
  eyeWiden: {
    type: Number,
    required: false,
  },
  fear: {
    type: Number,
    required: false,
  },
  innerBrowRaise: {
    type: Number,
    required: false,
  },
  jawDrop: {
    type: Number,
    required: false,
  },
  joy: {
    type: Number,
    required: false,
  },
  lidTighten: {
    type: Number,
    required: false,
  },
  lipCornerDepressor: {
    type: Number,
    required: false,
  },
  lipPress: {
    type: Number,
    required: false,
  },
  lipPucker: {
    type: Number,
    required: false,
  },
  lipStretch: {
    type: Number,
    required: false,
  },
  lipSuck: {
    type: Number,
    required: false,
  },
  mouthOpen: {
    type: Number,
    required: false,
  },
  noseWrinkle: {
    type: Number,
    required: false,
  },
  sadness: {
    type: Number,
    required: false,
  },
  smile: {
    type: Number,
    required: false,
  },
  smirk: {
    type: Number,
    required: false,
  },
  surprise: {
    type: Number,
    required: false,
  },
  upperLipRaise: {
    type: Number,
    required: false,
  },
  valence: {
    type: Number,
    required: false,
  },
});

// Hashing password before saving it to the database
// EmotionSchema.pre("save", function (next) {
//   var user = this;
//   bcrypt.hash(user.password, 10, function (err, hash) {
//     if (err) {
//       return next(err);
//     }
//     user.password = hash;
//     next();
//   });
// });

var Emotions = mongoose.model("Emotions", EmotionSchema);
module.exports = Emotions;
