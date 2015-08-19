'use strict';

angular.module('gai').factory('GAIService', ['$http',
	function($http) {
		return {
			getAll: function(options){
				var page = options.page || 1;
				var per_page = options.per_page || 5;
				return $http.get('/gai', {
					page: page,
					per_page: per_page
				});
			},
			get: function(packageName){
				return $http.get('/gai/'+packageName);
			}
		};
	}
])
.factory('Apps',['$resource',
	function($resource){
		return $resource('/gai/:package', {
			package: '@package'
		}, {
			getAll: {
				method: 'GET',
				isArray: true
			},
			get: {
				method: 'GET',
				isArray: false
			}
		});
	}
])
	;