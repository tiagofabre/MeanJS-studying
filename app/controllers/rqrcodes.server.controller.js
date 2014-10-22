'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Rqrcode = mongoose.model('Rqrcode'),
	_ = require('lodash');

/**
 * Create a Rqrcode
 */
exports.create = function(req, res) {
	var rqrcode = new Rqrcode(req.body);
	rqrcode.user = req.user;

	rqrcode.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(rqrcode);
		}
	});
};

/**
 * Show the current Rqrcode
 */
exports.read = function(req, res) {
	res.jsonp(req.rqrcode);
};

/**
 * Update a Rqrcode
 */
exports.update = function(req, res) {
	var rqrcode = req.rqrcode ;

	rqrcode = _.extend(rqrcode , req.body);

	rqrcode.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(rqrcode);
		}
	});
};

/**
 * Delete an Rqrcode
 */
exports.delete = function(req, res) {
	var rqrcode = req.rqrcode ;

	rqrcode.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(rqrcode);
		}
	});
};

/**
 * List of Rqrcodes
 */
exports.list = function(req, res) { Rqrcode.find().sort('-created').populate('user', 'displayName').exec(function(err, rqrcodes) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(rqrcodes);
		}
	});
};

/**
 * Rqrcode middleware
 */
exports.rqrcodeByID = function(req, res, next, id) { Rqrcode.findById(id).populate('user', 'displayName').exec(function(err, rqrcode) {
		if (err) return next(err);
		if (! rqrcode) return next(new Error('Failed to load Rqrcode ' + id));
		req.rqrcode = rqrcode ;
		next();
	});
};

/**
 * Rqrcode authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.rqrcode.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};