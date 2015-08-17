'use strict';

angular.module('google-app-info')
.filter('checkEmptyObject', 
	function() {
		return function(input) {
			return !angular.equals({}, input);
		};
	}
);