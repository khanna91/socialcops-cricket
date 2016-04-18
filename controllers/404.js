'use strict';

angular.module('app').
	controller('ErrorCtrl', ['$scope', 'contentService', function($scope, contentService) {
		console.log('Page Not Found');
	}
]);