'use strict';

//Setting up route
angular.module('rqrcode').config(['$stateProvider',
	function($stateProvider) {
		// Rqrcode state routing
		$stateProvider.
		state('rqrcode', {
			url: '/rqrc',
			templateUrl: 'modules/rqrcode/views/rqrview.client.view.html'
		});
	}
]);