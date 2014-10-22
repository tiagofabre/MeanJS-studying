'use strict';

// Configuring the Articles module
angular.module('qrcodes').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Qrcodes', 'qrcodes', 'dropdown', '/qrcodes(/create)?');
		Menus.addSubMenuItem('topbar', 'qrcodes', 'List Qrcodes', 'qrcodes');
		Menus.addSubMenuItem('topbar', 'qrcodes', 'New Qrcode', 'qrcodes/create');
	}
]);