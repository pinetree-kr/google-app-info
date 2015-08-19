'use strict';

//Setting up route
angular.module('gai').config(['$stateProvider',
	function($stateProvider, TEST) {
		// Google app info state routing
		$stateProvider.
		state('gai', {
			url: '/gai',
			templateUrl: 'modules/gai/views/gai.client.view.html'
		});
	}
])
.run(['Menus', function(Menus){
	Menus.addMenuItem('topbar', 'Google App Info.', 'gai', 'item', '/gai');
}])
;