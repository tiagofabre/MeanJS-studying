'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Qrcode = mongoose.model('Qrcode'),
	_ = require('lodash');

/**
 * Create a Qrcode
 */
exports.create = function(req, res) {
	var qrcode = new Qrcode(req.body);
	qrcode.user = req.user;

	qrcode.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(qrcode);
		}
	});
};

/**
 * Show the current Qrcode
 */
exports.read = function(req, res) {
	res.jsonp(req.qrcode);
};

/**
 * Update a Qrcode
 */
exports.update = function(req, res) {
	var qrcode = req.qrcode ;

	qrcode = _.extend(qrcode , req.body);

	qrcode.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(qrcode);
		}
	});
};

/**
 * Delete an Qrcode
 */
exports.delete = function(req, res) {
	var qrcode = req.qrcode ;

	qrcode.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(qrcode);
		}
	});
};

/**
 * List of Qrcodes
 */
exports.list = function(req, res) { Qrcode.find().sort('-created').populate('user', 'displayName').exec(function(err, qrcodes) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(qrcodes);
		}
	});
};

/**
 * Qrcode middleware
 */
exports.qrcodeByID = function(req, res, next, id) { Qrcode.findById(id).populate('user', 'displayName').exec(function(err, qrcode) {
		if (err) return next(err);
		if (! qrcode) return next(new Error('Failed to load Qrcode ' + id));
		req.qrcode = qrcode ;
		next();
	});
};

/**
 * Qrcode authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.qrcode.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};