const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const movieSchema = new Schema({
    name: {
       type: String,
       required: true
    },
    rating: {
       type: Number,
       required: true
    },
    producer: {
       type: String,
       required: true
   }
});
module.exports = mongoose.model('Movie', movieSchema);