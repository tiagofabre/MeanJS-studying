'use strict';

//Setting up route
angular.module('qrcodes').config(['$stateProvider',
	function($stateProvider) {
		// Qrcodes state routing
		$stateProvider.
		state('qrcode', {
			url: '/qrcode',
			templateUrl: 'modules/qrcodes/views/qrview.client.view.html'
		}).
		state('listQrcodes', {
			url: '/qrcodes',
			templateUrl: 'modules/qrcodes/views/list-qrcodes.client.view.html'
		}).
		state('createQrcode', {
			url: '/qrcodes/create',
			templateUrl: 'modules/qrcodes/views/create-qrcode.client.view.html'
		}).
		state('viewQrcode', {
			url: '/qrcodes/:qrcodeId',
			templateUrl: 'modules/qrcodes/views/view-qrcode.client.view.html'
		}).
		state('editQrcode', {
			url: '/qrcodes/:qrcodeId/edit',
			templateUrl: 'modules/qrcodes/views/edit-qrcode.client.view.html'
		});
	}
]);