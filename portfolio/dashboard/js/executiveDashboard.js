/***
 * Created by Revathy Sindhu Chellapandian
 *
 * Excerpt of the actual script that handles AJAX requests for the
 * Executive Dashboard view.
 */
(function () {
    var executiveDashboardApp = angular.module('executiveDashboardApp', ['angular-flot']);

    executiveDashboardApp.constant('BASE_URI', 'http://localhost:3001/services/api/v1');

    /***
     * Angular service to handle XML, JSON conversions
     * TODO: Move to standalone angular module (Utils) for reuse
     */
    executiveDashboardApp.factory("XmlJsonService", function () {
        var x2js = new X2JS();

        function jsonToXml(jsonObject) {
            return x2js.json2xml_str(jsonObject);
        }

        function xmlToJson(xmlString) {
            return x2js.xml_str2json(xmlString);
        }

        return {
            jsonToXml: jsonToXml,
            xmlToJson: xmlToJson
        };
    });

    /***
     * Angular service to handle API Calls
     * TODO: Move to standalone angular module (API) for reuse
     */
    executiveDashboardApp.service('apiService', ['$q', '$http', 'XmlJsonService', 'BASE_URI', function ($q, $http, XmlJsonService, BASE_URI) {
        var apiGet = function (uriSuffix) {
            var deferred = $q.defer();
            var uri = BASE_URI + uriSuffix;
            $http.get(uri).success(function (data, status, headers, config) {
                var jsonData = null;
                if (angular.isDefined(data) && angular.isString(data)) {
                    jsonData = XmlJsonService.xmlToJson(data)
                }
                deferred.resolve(jsonData);
            }).error(function (data, status, headers, config) {
                deferred.reject(data);
            });

            return deferred.promise;
        };

        return {
            get: apiGet
        }
    }]);

    /***
     * Service to get income details.
     * Note: Modified with mock data for portfolio purposes - actual API calls commented.
     */
    executiveDashboardApp.service('incomeService', ['$q', 'apiService', function ($q, apiService) {
        var getIncomeSummary = function (period) {
            var deferred = $q.defer();
            if (!period) {
                period = 'weekly';
            }

            /*
            apiService.get('/income/summary/' + period).then(function (data) {
                deferred.resolve(data);
            }, function (error) {
                deferred.reject(error);
            });
            */

            // Disabling actual service call above and mocking data instead
            deferred.resolve({
                summary: {
                    period: period,
                    currency: '$',
                    totalIncome: 4886200,
                    percentageChange: 98
                }
            });

            return deferred.promise;
        };

        return {
            getIncomeSummary: getIncomeSummary
        };
    }]);

    /***
     * Service to get order details including summary and report information.
     * Note: Modified with mock data for portfolio purposes - actual API calls commented.
     */
    executiveDashboardApp.service('ordersService', ['$q', 'apiService', function ($q, apiService) {
        var getOrdersSummary = function (period) {
            var deferred = $q.defer();
            if (!period) {
                period = 'weekly';
            }

            /*
             apiService.get('/orders/summary/' + period).then(function (data) {
             deferred.resolve(data);
             }, function (error) {
             deferred.reject(error);
             });
             */

            // Disabling actual service call above and mocking data instead
            deferred.resolve({
                summary: {
                    period: period,
                    orders: 27580,
                    percentageChange: 20
                }
            });

            return deferred.promise;
        };

        var getOrdersReport = function (period) {
            var deferred = $q.defer();
            if (!period) {
                period = 'monthly';
            }

            /*
             apiService.get('/orders/report/' + period).then(function (data) {
             deferred.resolve(data);
             }, function (error) {
             deferred.reject(error);
             });
             */

            // Disabling actual service call above and mocking data instead
            var paymentsData = [
                [getTime(2016, 1, 1), 7],
                [getTime(2016, 1, 2), 6],
                [getTime(2016, 1, 3), 4],
                [getTime(2016, 1, 4), 8],
                [getTime(2016, 1, 5), 9],
                [getTime(2016, 1, 6), 7],
                [getTime(2016, 1, 7), 5],
                [getTime(2016, 1, 8), 4],
                [getTime(2016, 1, 9), 7],
                [getTime(2016, 1, 10), 8],
                [getTime(2016, 1, 11), 9],
                [getTime(2016, 1, 12), 6],
                [getTime(2016, 1, 13), 4],
                [getTime(2016, 1, 14), 5],
                [getTime(2016, 1, 15), 11],
                [getTime(2016, 1, 16), 8],
                [getTime(2016, 1, 17), 8],
                [getTime(2016, 1, 18), 11],
                [getTime(2016, 1, 19), 11],
                [getTime(2016, 1, 20), 6],
                [getTime(2016, 1, 21), 6],
                [getTime(2016, 1, 22), 8],
                [getTime(2016, 1, 23), 11],
                [getTime(2016, 1, 24), 13],
                [getTime(2016, 1, 25), 7],
                [getTime(2016, 1, 26), 9],
                [getTime(2016, 1, 27), 9],
                [getTime(2016, 1, 28), 8],
                [getTime(2016, 1, 29), 5],
                [getTime(2016, 1, 30), 8],
                [getTime(2016, 1, 31), 25]
            ];

            var ordersData = [
                [getTime(2016, 1, 1), 800],
                [getTime(2016, 1, 2), 500],
                [getTime(2016, 1, 3), 600],
                [getTime(2016, 1, 4), 700],
                [getTime(2016, 1, 5), 500],
                [getTime(2016, 1, 6), 456],
                [getTime(2016, 1, 7), 800],
                [getTime(2016, 1, 8), 589],
                [getTime(2016, 1, 9), 467],
                [getTime(2016, 1, 10), 876],
                [getTime(2016, 1, 11), 689],
                [getTime(2016, 1, 12), 700],
                [getTime(2016, 1, 13), 500],
                [getTime(2016, 1, 14), 600],
                [getTime(2016, 1, 15), 700],
                [getTime(2016, 1, 16), 786],
                [getTime(2016, 1, 17), 345],
                [getTime(2016, 1, 18), 888],
                [getTime(2016, 1, 19), 888],
                [getTime(2016, 1, 20), 888],
                [getTime(2016, 1, 21), 987],
                [getTime(2016, 1, 22), 444],
                [getTime(2016, 1, 23), 999],
                [getTime(2016, 1, 24), 567],
                [getTime(2016, 1, 25), 786],
                [getTime(2016, 1, 26), 666],
                [getTime(2016, 1, 27), 888],
                [getTime(2016, 1, 28), 900],
                [getTime(2016, 1, 29), 178],
                [getTime(2016, 1, 30), 555],
                [getTime(2016, 1, 31), 993]
            ];

            deferred.resolve({
                report: {
                    period: period,
                    ordersData: ordersData,
                    paymentsData: paymentsData,
                    ordersSummary: {
                        orders: 6346,
                        percentageChange: 48
                    },
                    ordersSummaryLast: {
                        orders: 4422 ,
                        percentageChange: 60
                    },
                    incomeSummary: {
                        currency: '$',
                        totalIncome: 91804,
                        percentageChange: -12}
                }
            });

            return deferred.promise;
        };
        // Included just for mocking data
        function getTime(year, month, day) {
            return new Date(year, month - 1, day).getTime();
        }

        return {
            getOrdersSummary: getOrdersSummary,
            getOrdersReport: getOrdersReport
        };
    }]);

    /***
     * Service to get visits information.
     * Note: Modified with mock data for portfolio purposes - actual API calls commented.
     */
    executiveDashboardApp.service('visitsService', ['$q', 'apiService', function ($q, apiService) {
        var getVisitsSummary = function (period) {
            var deferred = $q.defer();
            if (!period) {
                period = 'today';
            }

            /*
             apiService.get('/visits/summary/' + period).then(function (data) {
             deferred.resolve(data);
             }, function (error) {
             deferred.reject(error);
             });
             */

            // Disabling actual service call above and mocking data instead
            deferred.resolve({
                summary: {
                    period: period,
                    visits: 106120,
                    percentageChange: -2
                }
            });

            return deferred.promise;
        };

        return {
            getVisitsSummary: getVisitsSummary
        };
    }]);

    /***
     * Service to get likes information.
     * Note: Modified with mock data for portfolio purposes - actual API calls commented.
     */
    executiveDashboardApp.service('likesService', ['$q', 'apiService', function ($q, apiService) {
        var getLikesSummary = function (period) {
            var deferred = $q.defer();
            if (!period) {
                period = 'today';
            }

            /*
             apiService.get('/likes/summary/' + period).then(function (data) {
             deferred.resolve(data);
             }, function (error) {
             deferred.reject(error);
             });
             */

            // Disabling actual service call above and mocking data instead
            deferred.resolve({
                summary: {
                    period: period,
                    likes: 1108,
                    percentageChange: -11
                }
            });

            return deferred.promise;
        };

        return {
            getLikesSummary: getLikesSummary
        };
    }]);

    /***
     * Income Summary Controller
     */
    executiveDashboardApp.controller('incomeController', ['$scope', 'incomeService', function ($scope, incomeService) {
        $scope.period = 'annual';

        incomeService.getIncomeSummary($scope.period).then(
            function(data){
                $scope.incomeSummary = data;
                $scope.isIncomeUp = data.summary.percentageChange >= 0;
            },
            function(error){
                $scope.error = error;
            }
        );

    }]);

    /***
     * Orders Summary Controller
     */
    executiveDashboardApp.controller('ordersController', ['$scope', 'ordersService', function ($scope, ordersService) {
        $scope.period = 'annual';

        ordersService.getOrdersSummary($scope.period).then(
            function(data){
                $scope.ordersSummary = data;
                $scope.isOrdersUp =  data.summary.percentageChange >= 0;
            },
            function(error){
                $scope.error = error;
            }
        );
    }]);

    /***
     * Visits Summary Controller
     */
    executiveDashboardApp.controller('visitsController', ['$scope', 'visitsService', function ($scope, visitsService) {
        $scope.period = 'today';

        visitsService.getVisitsSummary($scope.period).then(
            function(data){
                $scope.visitsSummary = data;
                $scope.isVisitsUp =  data.summary.percentageChange >= 0;
            },
            function(error){
                $scope.error = error;
            }
        );
    }]);

    /***
     * Likes Summary Controller
     */
    executiveDashboardApp.controller('likesController', ['$scope', 'likesService', function ($scope, likesService) {
        $scope.period = 'today';

        likesService.getLikesSummary($scope.period).then(
            function(data){
                $scope.likesSummary = data;
                $scope.isLikesUp =  data.summary.percentageChange >= 0;
            },
            function(error){
                $scope.error = error;
            }
        );
    }]);

    /***
     * Orders Report Controller
     */
    executiveDashboardApp.controller('ordersChartController', ['$scope', 'ordersService', function ($scope, ordersService) {
        $scope.period = 'monthly';

        ordersService.getOrdersReport($scope.period).then(
            function(data){
                $scope.ordersReport = data;
                $scope.isOrdersUp = data.report.ordersSummary.percentageChange >= 0;;
                $scope.isOrdersLastUp =  data.report.ordersSummaryLast.percentageChange >= 0;
                $scope.isIncomeUp = data.report.incomeSummary.percentageChange >= 0;
                $scope.dataset = [
                    {
                        label: "Number of orders",
                        grow:{stepMode:"linear"},
                        data: data.report.ordersData,
                        color: "#1ab394",
                        bars: {
                            show: true,
                            align: "center",
                            barWidth: 24 * 60 * 60 * 600,
                            lineWidth: 0
                        }

                    },
                    {
                        label: "Payments",
                        grow:{stepMode:"linear"},
                        data: data.report.paymentsData,
                        yaxis: 2,
                        color: "#464f88",
                        lines: {
                            lineWidth: 1,
                            show: true,
                            fill: true,
                            fillColor: {
                                colors: [
                                    {
                                        opacity: 0.2
                                    },
                                    {
                                        opacity: 0.2
                                    }
                                ]
                            }
                        },
                        splines: {
                            show: false,
                            tension: 0.6,
                            lineWidth: 1,
                            fill: 0.1
                        },
                    }
                ];


                $scope.options = {
                    xaxis: {
                        mode: "time",
                        tickSize: [3, "day"],
                        tickLength: 0,
                        axisLabel: "Date",
                        axisLabelUseCanvas: true,
                        axisLabelFontSizePixels: 12,
                        axisLabelFontFamily: 'Arial',
                        axisLabelPadding: 10,
                        color: "#838383"
                    },
                    yaxes: [
                        {
                            position: "left",
                            max: 1070,
                            color: "#838383",
                            axisLabelUseCanvas: true,
                            axisLabelFontSizePixels: 12,
                            axisLabelFontFamily: 'Arial',
                            axisLabelPadding: 3
                        },
                        {
                            position: "right",
                            clolor: "#838383",
                            axisLabelUseCanvas: true,
                            axisLabelFontSizePixels: 12,
                            axisLabelFontFamily: ' Arial',
                            axisLabelPadding: 67
                        }
                    ],
                    legend: {
                        noColumns: 1,
                        labelBoxBorderColor: "#000000",
                        position: "nw"
                    },
                    grid: {
                        hoverable: false,
                        borderWidth: 0,
                        color: '#838383'
                    }
                };

            },
            function(error){
                $scope.error = error;
            }
        );
    }]);



})();