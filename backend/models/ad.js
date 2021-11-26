var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var AdSchema = new mongoose.Schema({
  // adId: {
  //     type: String,
  //     required: true
  // }, 

  fname: {
    type: String,
   
  },
  lname: {
    type: String,
  
},

description: {
  type: String,
 
  },
  tags: {
    type: String,
   
  },

  catogery: {
    type: String,
    
  },

  ageGroup: {
    type: String,
   
  },
 
  url: {
      type: String,
    
  }



});



var Ad = mongoose.model('Ad', AdSchema);
module.exports = Ad;