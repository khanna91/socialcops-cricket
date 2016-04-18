/* ============================================================
 * File: app.js
 * Configure global module dependencies. Page specific modules
 * will be loaded on demand using ocLazyLoad
 * ============================================================ */

'use strict';

angular.module('app', [
    'ui.router',
    'ui.utils',
    'oc.lazyLoad',
    'ngSanitize',
    'angularUtils.directives.dirPagination'    
]);

angular.module('app').factory("contentService",['$http',function($http){
    var handleSuccess = function(response) {
        return response;
    }

    var handleError = function(error) {
        window.location = '#/404';
    }

   	return {
        getData: function(source) {
            return $http.get(source).then(handleSuccess, handleError);
        },

        getWithData: function(source, data) {
            return $http.get(source, {
                params: data
            }).then(handleSuccess, handleError);
        },

        postData: function(source, data) {
            return $http.post(source, data).then(handleSuccess, handleError);
        }       
   	}
}]);

angular.module('app').filter('capitalize', function() {
    return function(input, all) {
        var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
        return (!!input) ? input.replace(reg, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
    }
});

/* ============================================================
 * Directive: pgTab
 * Makes Bootstrap Tabs compatible with AngularJS and add sliding
 * effect for tab transitions. 
 * ============================================================ */

angular.module('app')
    .directive('pgTab', ['$parse', function($parse) {
        return {
            link: function(scope, element, attrs) {
                var slide = attrs.slide;
                var onShown = $parse(attrs.onShown);
                // Sliding effect for tabs
                $(element).on('show.bs.tab', function(e) {
                    e = $(e.target).parent().find('a[data-toggle=tab]');

                    var hrefCurrent = e.attr('href');

                    if ($(hrefCurrent).is('.slide-left, .slide-right')) {
                        $(hrefCurrent).addClass('sliding');

                        setTimeout(function() {
                            $(hrefCurrent).removeClass('sliding');
                        }, 100);
                    }
                });

                $(element).on('shown.bs.tab', {
                    onShown: onShown
                }, function(e) {
                    if (e.data.onShown) {
                        e.data.onShown(scope);
                    }
                });

                $(element).click(function(e) {
                    e.preventDefault();
                    $(element).tab('show');
                });
            }
        };
    }]);
