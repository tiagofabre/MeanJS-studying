'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Rqrcode Schema
 */
var RqrcodeSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Qrcode name',
		trim: true
	},
	url:{
		type: String,
		default: '',
		required: 'Please fill Qrcode url',
		trim: true
	},
	qrId:{
		type: String,
		default: '',
		trim: true,
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Rqrcode', RqrcodeSchema);