'use strict';

angular.module('gai').controller('GAIController', ['$scope', '$http', 'Apps',
	function($scope, $http, Apps) {
		$scope.submit = function(form){
			if(form.$valid){
				getAppInfo();
			}
		};
		$scope.package = {};
		$scope.packages = [];
		
		var getAppInfo = function(){
			Apps.get({
				package:$scope.pkgName,
			},function(data){
				$scope.package = data;
			},function(err){
				$scope.package = {};
			});
		};

		var getApps = function(){
			Apps.getAll({
				page:1,
				per_page:2
			},function(data){
				$scope.packages = data;
			},function(err){
				$scope.packages = [];
			});
		};
		getApps();
	}
]);