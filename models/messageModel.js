var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var messageSchema = new Schema({
	'type' : String,
	'request' : String,
	'response' : Date,
	'request_time' : Date,
	'response_time' : Date,
	'data' : String,
	'message_data' : String
});

module.exports = mongoose.model('message', messageSchema);
