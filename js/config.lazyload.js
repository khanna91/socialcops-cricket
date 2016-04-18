/* ============================================================
 * File: config.lazyload.js
 * Configure modules for ocLazyLoader. These are grouped by 
 * vendor libraries. 
 * ============================================================ */

angular.module('app')
    .config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
            modules: [{
                    name: 'chart',
                    files: [
                        'js/amcharts/pie.js',
                        'js/amcharts/serial.js',
                        'js/amcharts/themes/light.js',
                        'js/amcharts/themes/dark.js'
                    ]
                }
            ]
        });
    }]);