'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var qrcodes = require('../../app/controllers/qrcodes');

	// Qrcodes Routes
	app.route('/qrcodes')
		.get(qrcodes.list)
		.post(users.requiresLogin, qrcodes.create);

	app.route('/qrcodes/:qrcodeId')
		.get(qrcodes.read)
		.put(users.requiresLogin, qrcodes.hasAuthorization, qrcodes.update)
		.delete(users.requiresLogin, qrcodes.hasAuthorization, qrcodes.delete);

	// Finish by binding the Qrcode middleware
	app.param('qrcodeId', qrcodes.qrcodeByID);
};