'use strict';

angular.module('gai')
.filter('checkEmptyObject',
	function() {
		return function(input) {
			return !angular.equals({}, input);
		};
	}
)
.filter('timeFormat',
	function(){
		return function(input){
			return moment(input).format('YYYY년 MM월 DD');
		};
	}
)
;