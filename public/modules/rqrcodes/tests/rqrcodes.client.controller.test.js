'use strict';

(function() {
	// Rqrcodes Controller Spec
	describe('Rqrcodes Controller Tests', function() {
		// Initialize global variables
		var RqrcodesController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Rqrcodes controller.
			RqrcodesController = $controller('RqrcodesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Rqrcode object fetched from XHR', inject(function(Rqrcodes) {
			// Create sample Rqrcode using the Rqrcodes service
			var sampleRqrcode = new Rqrcodes({
				name: 'New Rqrcode'
			});

			// Create a sample Rqrcodes array that includes the new Rqrcode
			var sampleRqrcodes = [sampleRqrcode];

			// Set GET response
			$httpBackend.expectGET('rqrcodes').respond(sampleRqrcodes);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.rqrcodes).toEqualData(sampleRqrcodes);
		}));

		it('$scope.findOne() should create an array with one Rqrcode object fetched from XHR using a rqrcodeId URL parameter', inject(function(Rqrcodes) {
			// Define a sample Rqrcode object
			var sampleRqrcode = new Rqrcodes({
				name: 'New Rqrcode'
			});

			// Set the URL parameter
			$stateParams.rqrcodeId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/rqrcodes\/([0-9a-fA-F]{24})$/).respond(sampleRqrcode);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.rqrcode).toEqualData(sampleRqrcode);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Rqrcodes) {
			// Create a sample Rqrcode object
			var sampleRqrcodePostData = new Rqrcodes({
				name: 'New Rqrcode'
			});

			// Create a sample Rqrcode response
			var sampleRqrcodeResponse = new Rqrcodes({
				_id: '525cf20451979dea2c000001',
				name: 'New Rqrcode'
			});

			// Fixture mock form input values
			scope.name = 'New Rqrcode';

			// Set POST response
			$httpBackend.expectPOST('rqrcodes', sampleRqrcodePostData).respond(sampleRqrcodeResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Rqrcode was created
			expect($location.path()).toBe('/rqrcodes/' + sampleRqrcodeResponse._id);
		}));

		it('$scope.update() should update a valid Rqrcode', inject(function(Rqrcodes) {
			// Define a sample Rqrcode put data
			var sampleRqrcodePutData = new Rqrcodes({
				_id: '525cf20451979dea2c000001',
				name: 'New Rqrcode'
			});

			// Mock Rqrcode in scope
			scope.rqrcode = sampleRqrcodePutData;

			// Set PUT response
			$httpBackend.expectPUT(/rqrcodes\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/rqrcodes/' + sampleRqrcodePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid rqrcodeId and remove the Rqrcode from the scope', inject(function(Rqrcodes) {
			// Create new Rqrcode object
			var sampleRqrcode = new Rqrcodes({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Rqrcodes array and include the Rqrcode
			scope.rqrcodes = [sampleRqrcode];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/rqrcodes\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleRqrcode);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.rqrcodes.length).toBe(0);
		}));
	});
}());