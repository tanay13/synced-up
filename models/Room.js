var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var room = new Schema({
  name: String,
});

var Room = mongoose.model('Room', room);

module.exports = Room;
