var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
// var Date = require('date');

var GestureSchema = new mongoose.Schema({
  matId: {
      type: String,
      required: true
  },
  gestureDetected: {
      type: String,
      required: true
  },
  gesturePerformed: {
      type: String,
      required: true
  },
  time: {
    type : Number, 
    default: Date.now
  }
});



var Gesture = mongoose.model('Gesture', GestureSchema);
module.exports = Gesture;