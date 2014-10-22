'use strict';

// Rqrcodes controller
angular.module('rqrcodes').controller('RqrcodesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Rqrcodes',
	function($scope, $stateParams, $location, Authentication, Rqrcodes ) {
		$scope.authentication = Authentication;

		// Create new Rqrcode
		$scope.create = function() {
			// Create new Rqrcode object
			var rqrcode = new Rqrcodes ({
				name: this.name
			});

			// Redirect after save
			rqrcode.$save(function(response) {
				$location.path('rqrcodes/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Rqrcode
		$scope.remove = function( rqrcode ) {
			if ( rqrcode ) { rqrcode.$remove();

				for (var i in $scope.rqrcodes ) {
					if ($scope.rqrcodes [i] === rqrcode ) {
						$scope.rqrcodes.splice(i, 1);
					}
				}
			} else {
				$scope.rqrcode.$remove(function() {
					$location.path('rqrcodes');
				});
			}
		};

		// Update existing Rqrcode
		$scope.update = function() {
			var rqrcode = $scope.rqrcode ;

			rqrcode.$update(function() {
				$location.path('rqrcodes/' + rqrcode._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Rqrcodes
		$scope.find = function() {
			$scope.rqrcodes = Rqrcodes.query();
		};

		// Find existing Rqrcode
		$scope.findOne = function() {
			$scope.rqrcode = Rqrcodes.get({ 
				rqrcodeId: $stateParams.rqrcodeId
			});
		};
	}
]);