const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
       type: String,
       required: true
    },
    email: {
       type: String,
       required: true
    },
    password: {
       type: String,
       required: true
   },
   isAdmin:{
    type:String,
    required:false,
    default:false
   }

});
module.exports = mongoose.model('User', userSchema);