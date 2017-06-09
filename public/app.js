angular.module('myApp', [])
    .controller('MainCtrl', ['$scope', '$http', '$interval', function ($scope, $http, $interval) {
        
        $scope.cpuData = [];
        $scope.memoryData = [];
        $scope.showCPUChart = true;
        $scope.showMemoryChart = "";
        $scope.loadData = function () {
            $http.get('/api').then(function (response) {
                $scope.cpuData.push([response.data.time, response.data.cpuUsage])
                $scope.memoryData.push([response.data.time, response.data.memoryUsage])
            })
        }
        $scope.startLoading = function () {
            promise = $interval($scope.loadData, 1000)
        }
        $scope.stopLoading = function () {
            $interval.cancel(promise);
        }
    }])
    .directive('chart', function () {
        return {
            restrict: 'E',
            template: '<div></div>',
            scope: {
                data: '=',
                title: '@'
            },
            link: function (scope, element) {
                scope.$watchCollection('data', function (newValue, oldValue) {
                    Highcharts.chart(element[0], {
                        title: {
                            text: scope.title
                        },
                        xAxis: {
                            type: 'datetime',
                            dateTimeLabelFormats: {
                                second: '%H:%M:%S'
                            }
                        },
                        series: [{
                            data: newValue
                        }]
                    });
                })
            }
        };
    })