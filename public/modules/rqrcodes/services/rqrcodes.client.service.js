'use strict';

//Rqrcodes service used to communicate Rqrcodes REST endpoints
angular.module('rqrcodes').factory('Rqrcodes', ['$resource',
	function($resource) {
		return $resource('rqrcodes/:rqrcodeId', { rqrcodeId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);