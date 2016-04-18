angular.module('app')
    .controller('AppCtrl', ['$scope', function($scope) {
    	// App globals
        $scope.app = {
            name: 'SocialCops',
            description: 'Cricket Score Board',
            author: 'Rahul Khanna',
            mode: 'Development'
        }

        $scope.app.searchItem = '';

        $scope.app.searchModal = function() {
        	$('#searchModal').modal();
        }
    }
]);