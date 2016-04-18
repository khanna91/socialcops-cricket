'use strict';

angular.module('app').
	controller('ProfileCtrl', ['$scope', '$stateParams', 'contentService', function($scope, $stateParams, contentService) {
		var chart = {
			option1 : {
				"type": "serial",
			    "theme": "light",
			    "marginRight": 40,
			    "marginLeft": 40,
			    "autoMarginOffset": 20,
			    "mouseWheelZoomEnabled":true,
			    "dataDateFormat": "YYYY-MM-DD",
			    "valueAxes": [{
			        "id": "v1",
			        "axisAlpha": 0,
			        "position": "left",
			        "ignoreAxisWidth":true
			    }],
			    "balloon": {
			        "borderThickness": 1,
			        "shadowAlpha": 0
			    },
			    "path" : "./",
			    "graphs": [{
			        "id": "g1",
			        "bullet": "round",
			        "bulletBorderAlpha": 1,
			        "bulletColor": "#FFFFFF",
			        "bulletSize": 5,
			        "hideBulletsCount": 50,
			        "lineThickness": 2,
			        "title": "red line",
			        "useLineColorForBulletBorder": true,
			        "valueField": "runs",
			        "balloonText": "<span style='font-size:13px;'>Runs : [[value]]<br/>V/S : [[versus]]</span>"
			    }],
			    "chartScrollbar": {
			        "graph": "g1",
			        "oppositeAxis":false,
			        "offset":30,
			        "scrollbarHeight": 80,
			        "backgroundAlpha": 0,
			        "selectedBackgroundAlpha": 0.1,
			        "selectedBackgroundColor": "#888888",
			        "graphFillAlpha": 0,
			        "graphLineAlpha": 0.5,
			        "selectedGraphFillAlpha": 0,
			        "selectedGraphLineAlpha": 1,
			        "autoGridCount":true,
			        "color":"#AAAAAA"
			    },
			    "chartCursor": {
			        "pan": true,
			        "valueLineEnabled": true,
			        "valueLineBalloonEnabled": true,
			        "cursorAlpha":1,
			        "cursorColor":"#258cbb",
			        "limitToGraph":"g1",
			        "valueLineAlpha":0.2
			    },
			    "valueScrollbar":{
			      "oppositeAxis":false,
			      "offset":50,
			      "scrollbarHeight":10
			    },
			    "categoryField": "date",
			    "categoryAxis": {
			        "parseDates": true,
			        "dashLength": 1,
			        "minorGridEnabled": true
			    },
			    "export": {
			        "enabled": false
			    },
			     "legends" : {
			     	"useGraphSettings": true
			    },
			    "responsive": {
				    "enabled": true
				}
			},

			option2 : {
				"type": "pie",
  				"theme": "light",
  				"valueField": "value",
				"titleField": "order",
				"outlineAlpha": 0.4,
				"depth3D": 15,
				"balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
				"angle": 30,
				"export": {
				"enabled": true
				},
				"legend": {
				 	"align": "left"
				},
				"colors": ["#FF6600", "#FCD202", "#B0DE09"],
				"responsive": {
				    "enabled": true
				}
			}
		}

		$scope._profile = {
			model : {},
			methods : {
				fetchData : function() {
					contentService.getData('api/'+$stateParams.slug+'.json').then(function(response) {
			            $scope._profile.model = response.data;
			        });
			        contentService.getData('api/chart.json').then(function(response) {
			            var dataSrc1 = response.data.batting_summary;
			            var dataSrc2 = response.data.bowling_summary;
			            var dataSrc3 = response.data.wicket_summary;

			            $scope._profile.methods.renderChart(dataSrc1, dataSrc2, dataSrc3);
			        });
				},

				renderChart : function(dataSrc1, dataSrc2, dataSrc3) {
					var batting_chart_data = angular.copy(chart.option1);
					batting_chart_data.dataProvider = dataSrc1;
					var batting_chart = AmCharts.makeChart( "batting-chart", batting_chart_data);

					var bowling_chart_data = angular.copy(chart.option1);
					bowling_chart_data.dataProvider = dataSrc2;
					bowling_chart_data.graphs[0].balloonText = "<span style='font-size:13px;'>[[description]]</span>";
					bowling_chart_data.graphs[0].valueField = "wickets";
					var bowling_chart = AmCharts.makeChart( "bowling-chart", bowling_chart_data);

					var wicket_chart_data = angular.copy(chart.option2);
					wicket_chart_data.dataProvider = dataSrc3;
					var wicket_chart = AmCharts.makeChart( "wicket-chart", wicket_chart_data);
				}
			}
		}

		$scope._profile.methods.fetchData();
	}
]);