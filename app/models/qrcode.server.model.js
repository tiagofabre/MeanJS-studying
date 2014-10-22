'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Qrcode Schema
 */
var QrcodeSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Qrcode name',
		trim: true
	},
	url:{
		type: String,
		default: '',
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

mongoose.model('Qrcode', QrcodeSchema);