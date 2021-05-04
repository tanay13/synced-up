var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var video = new Schema({
  url: String,
  size: Number,
  originalname: String,
  createdIn: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
    },
  },
});

var Video = mongoose.model('Video', video);

module.exports = Video;
