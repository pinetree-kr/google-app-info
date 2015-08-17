'use strict';

angular.module('google-app-info').controller('GoogleAppInfoController', ['$scope', '$http',
	function($scope, $http) {
		$scope.submit = function(form){
			if(form.$valid){
				getAppInfo();
			}
		};
		$scope.package = {};

		var getAppInfo = function(){
			$http.get('/gai/'+$scope.pkgName)
			.success(function(data){
				$scope.package = data;
			})
			.error(function(err){
				$scope.package = {};
			});
		};
	}
]);