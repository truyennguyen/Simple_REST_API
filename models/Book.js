'use strict';

var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({
	name: {type: String, require: true},
	author: { type: String, default: "anonymous"},
	price: {type: String, default: "0"},
	timeStamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Book', bookSchema);