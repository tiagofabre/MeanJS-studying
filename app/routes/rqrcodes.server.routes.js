'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var rqrcodes = require('../../app/controllers/rqrcodes');

	// Rqrcodes Routes
	app.route('/rqrcodes')
		.get(rqrcodes.list)
		.post(users.requiresLogin, rqrcodes.create);

	app.route('/rqrcodes/:rqrcodeId')
		.get(rqrcodes.read)
		.put(users.requiresLogin, rqrcodes.hasAuthorization, rqrcodes.update)
		.delete(users.requiresLogin, rqrcodes.hasAuthorization, rqrcodes.delete);

	// Finish by binding the Rqrcode middleware
	app.param('rqrcodeId', rqrcodes.rqrcodeByID);
};