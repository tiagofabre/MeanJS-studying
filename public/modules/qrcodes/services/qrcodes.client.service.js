'use strict';

//Qrcodes service used to communicate Qrcodes REST endpoints
angular.module('qrcodes').factory('Qrcodes', ['$resource',
	function($resource) {
		return $resource('qrcodes/:qrcodeId', { qrcodeId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);