'use strict';

// Configuring the Articles module
angular.module('rqrcodes').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Rqrcodes', 'rqrcodes', 'dropdown', '/rqrcodes(/create)?');
		Menus.addSubMenuItem('topbar', 'rqrcodes', 'List Rqrcodes', 'rqrcodes');
		Menus.addSubMenuItem('topbar', 'rqrcodes', 'New Rqrcode', 'rqrcodes/create');
	}
]);