'use strict';

angular.module('app').
	controller('HomeCtrl', ['$scope', 'contentService', function($scope, contentService) {
		$scope._home = {
			model : {},
			bind : {
				"matchType" : "All matches genres",
				"currentPage" : 1,
				"pageSize" : 6
			},
			methods : {
				fetchData : function() {
					contentService.getData('api/player-list.json').then(function(response) {
			            $scope._home.model.players = response.data;
			        });
			        contentService.getData('api/update.json').then(function(response) {
			            $scope._home.model.updates = response.data;
			        });
				},

				changeMatch : function(type) {
					$scope._home.bind.matchType = type;
				}
			}
		}

		$scope._home.methods.fetchData();
	}
]);