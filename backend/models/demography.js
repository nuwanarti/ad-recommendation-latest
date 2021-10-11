var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var DemographySchema = new mongoose.Schema({
  userId: {
      type: String,
      required: true
  },
  images: {
      type: Array,
      required: true
  }
});



var Demography = mongoose.model('Demography', DemographySchema);
module.exports = Demography;