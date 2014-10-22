'use strict';

(function() {
	// Qrcodes Controller Spec
	describe('Qrcodes Controller Tests', function() {
		// Initialize global variables
		var QrcodesController,
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

			// Initialize the Qrcodes controller.
			QrcodesController = $controller('QrcodesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Qrcode object fetched from XHR', inject(function(Qrcodes) {
			// Create sample Qrcode using the Qrcodes service
			var sampleQrcode = new Qrcodes({
				name: 'New Qrcode'
			});

			// Create a sample Qrcodes array that includes the new Qrcode
			var sampleQrcodes = [sampleQrcode];

			// Set GET response
			$httpBackend.expectGET('qrcodes').respond(sampleQrcodes);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.qrcodes).toEqualData(sampleQrcodes);
		}));

		it('$scope.findOne() should create an array with one Qrcode object fetched from XHR using a qrcodeId URL parameter', inject(function(Qrcodes) {
			// Define a sample Qrcode object
			var sampleQrcode = new Qrcodes({
				name: 'New Qrcode'
			});

			// Set the URL parameter
			$stateParams.qrcodeId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/qrcodes\/([0-9a-fA-F]{24})$/).respond(sampleQrcode);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.qrcode).toEqualData(sampleQrcode);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Qrcodes) {
			// Create a sample Qrcode object
			var sampleQrcodePostData = new Qrcodes({
				name: 'New Qrcode'
			});

			// Create a sample Qrcode response
			var sampleQrcodeResponse = new Qrcodes({
				_id: '525cf20451979dea2c000001',
				name: 'New Qrcode'
			});

			// Fixture mock form input values
			scope.name = 'New Qrcode';

			// Set POST response
			$httpBackend.expectPOST('qrcodes', sampleQrcodePostData).respond(sampleQrcodeResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Qrcode was created
			expect($location.path()).toBe('/qrcodes/' + sampleQrcodeResponse._id);
		}));

		it('$scope.update() should update a valid Qrcode', inject(function(Qrcodes) {
			// Define a sample Qrcode put data
			var sampleQrcodePutData = new Qrcodes({
				_id: '525cf20451979dea2c000001',
				name: 'New Qrcode'
			});

			// Mock Qrcode in scope
			scope.qrcode = sampleQrcodePutData;

			// Set PUT response
			$httpBackend.expectPUT(/qrcodes\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/qrcodes/' + sampleQrcodePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid qrcodeId and remove the Qrcode from the scope', inject(function(Qrcodes) {
			// Create new Qrcode object
			var sampleQrcode = new Qrcodes({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Qrcodes array and include the Qrcode
			scope.qrcodes = [sampleQrcode];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/qrcodes\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleQrcode);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.qrcodes.length).toBe(0);
		}));
	});
}());