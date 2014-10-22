'use strict';

// Qrcodes controller
angular.module('qrcodes').controller('QrcodesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Qrcodes',
	function($scope, $stateParams, $location, Authentication, Qrcodes ) {
		$scope.authentication = Authentication;

		// Create new Qrcode
		$scope.create = function() {
			// Create new Qrcode object
			var qrcode = new Qrcodes ({
				name: this.name
				url: this.url
			});

			// Redirect after save
			qrcode.$save(function(response) {
				$location.path('qrcodes/' + response._id);

				// Clear form fields
				$scope.name = '';
				$scope.url = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Qrcode
		$scope.remove = function( qrcode ) {
			if ( qrcode ) { qrcode.$remove();

				for (var i in $scope.qrcodes ) {
					if ($scope.qrcodes [i] === qrcode ) {
						$scope.qrcodes.splice(i, 1);
					}
				}
			} else {
				$scope.qrcode.$remove(function() {
					$location.path('qrcodes');
				});
			}
		};

		// Update existing Qrcode
		$scope.update = function() {
			var qrcode = $scope.qrcode ;

			qrcode.$update(function() {
				$location.path('qrcodes/' + qrcode._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Qrcodes
		$scope.find = function() {
			$scope.qrcodes = Qrcodes.query();
		};

		// Find existing Qrcode
		$scope.findOne = function() {
			$scope.qrcode = Qrcodes.get({ 
				qrcodeId: $stateParams.qrcodeId
			});
		};
	}
]);