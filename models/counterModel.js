var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var counterSchema = new Schema({
	'type' : String,
	'count' : Number
});

module.exports = mongoose.model('counter', counterSchema);
