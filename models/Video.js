var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var video = new Schema({
  url: String,
  filename: String
});

var Video = mongoose.model('Video', video );

module.exports = Video