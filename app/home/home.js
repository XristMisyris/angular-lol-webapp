'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['$scope', '$interval', '$http', '$location', function( $scope, $interval, $http, $location) {

        $scope.regionList = [
            {name: "NA" , value: "na" },
            {name: "EUW" , value: "euw" },
            {name: "EUNE" , value: "eune" },
            {name: "BR" , value: "br" },
            {name: "LAN" , value: "lan" },
            {name: "LAS" , value: "las" },
            {name: "OCE" , value: "oce" },
            {name: "KR" , value: "kr" },
            {name: "TR" , value: "tr" },
            {name: "RU" , value: "ru" }
        ];

        $scope.selRegion = $scope.regionList[0];

        $scope.searchSummoner = function(){
            var data = { region: $scope.selRegion.value.toLowerCase(), name: $scope.summonerName.toLowerCase() };
            $location.path('/summoner/' + data.region + '/' + data.name);
        }

}]);