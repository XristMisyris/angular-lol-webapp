'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['$scope', '$interval', '$http' , function( $scope, $interval , $http ) {

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

            var data = {region : $scope.selRegion.value.toLowerCase() , name: $scope.summonerName.toLowerCase() };

            $http.post('engine.php?method=route', { class : "RiotApi", function : "getLeague", data : data }).
                then(function(response) {
                    console.log(response);
                    var id = [];
                    angular.forEach(Object.keys(response.data), function(smnr){
                        id.push(smnr);
                    });
                    $scope.leagueData = response.data[id[0]][0]["entries"];
                    $scope.hide = true;
                });
        }

}]);