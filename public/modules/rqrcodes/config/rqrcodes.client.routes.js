'use strict';

//Setting up route
angular.module('rqrcodes').config(['$stateProvider',
	function($stateProvider) {
		// Rqrcodes state routing
		$stateProvider.
		state('listRqrcodes', {
			url: '/rqrcodes',
			templateUrl: 'modules/rqrcodes/views/list-rqrcodes.client.view.html'
		}).
		state('createRqrcode', {
			url: '/rqrcodes/create',
			templateUrl: 'modules/rqrcodes/views/create-rqrcode.client.view.html'
		}).
		state('viewRqrcode', {
			url: '/rqrcodes/:rqrcodeId',
			templateUrl: 'modules/rqrcodes/views/view-rqrcode.client.view.html'
		}).
		state('editRqrcode', {
			url: '/rqrcodes/:rqrcodeId/edit',
			templateUrl: 'modules/rqrcodes/views/edit-rqrcode.client.view.html'
		});
	}
]);