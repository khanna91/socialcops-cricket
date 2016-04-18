angular.module('app').config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider',
    function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
        $urlRouterProvider
            .otherwise('/');

        $stateProvider.state('home', {
            url: "/",
            templateUrl: "tpl/home.html",
            controller: 'HomeCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'controllers/home.js'
                    ]);
                }]
            }
        })
        .state('profile', {
            url: "/profile/:slug",
            templateUrl: "tpl/profile.html",
            controller: 'ProfileCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'chart'
                    ], {
                        insertBefore: '#lazyload_placeholder'
                    })
                    .then(function() {
                        return $ocLazyLoad.load('controllers/profile.js');
                    });
                }]
            }
        })
        .state('error', {
            url: "/404",
            templateUrl: "tpl/404.html",
            controller: 'ErrorCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'controllers/404.js'
                    ]);
                }]
            }
        })
    }
]);