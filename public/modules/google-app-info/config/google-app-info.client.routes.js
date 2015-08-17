'use strict';

//Setting up route
angular.module('google-app-info').config(['$stateProvider',
	function($stateProvider, TEST) {
		// Google app info state routing
		$stateProvider.
		state('google-app-info', {
			url: '/google-app-info',
			templateUrl: 'modules/google-app-info/views/googleappinfo.client.view.html'
		});
	}
])
.run(['Menus', function(Menus){
	Menus.addMenuItem('topbar', 'App Info.', 'google-app-info', 'item', '/google-app-info');
}])
;