'use strict';

angular.module('myApp.summoner', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/summoner/:region/:name', {
    templateUrl: 'summoner/summoner.html',
    controller: 'SummonerCtrl'
  });
}])

.controller('SummonerCtrl', ['$scope', '$routeParams', '$log', '$http', function($scope, $routeParams, $log, $http) {
	$scope.url = $routeParams.region + "/" + $routeParams.name;

    $scope.matchHistory = function () {
        if (!$scope.History) {
            $http.post('engine.php?method=route', {class: "RiotApi", function: "getHistory", data: $routeParams}).
                then(function (response) {
                    $scope.History = response.data.matches;
                });
        }
    };

    $scope.checkResult = function(matches) {
        if ( matches.participants[0].stats.winner == true )
            return 'winner';
        else
            return 'looser';
    };

    $http.post('engine.php?method=route', { class : "RiotApi", function : "getLeague", data : $routeParams }).
        then(function(response) {
            console.log(response);

            var id = response.data.id;
            var playedSoloQ = false;
            var playedTeamQ = false;

            $scope.profile = response.data;
            $scope.soloQ = {entries:[{division: ""}], tier: "UNRANKED"};
            $scope.rankedTeam = {entries:[{division: ""}], tier: "UNRANKED"};

            angular.forEach(response.data.league[id],function(league){
                if (league.queue === "RANKED_SOLO_5x5"){
                    playedSoloQ = true;
                    $scope.soloQ = league;
                }
                if (league.queue === "RANKED_TEAM_5x5"){
                    playedTeamQ = true;
                    $scope.rankedTeam = league;
                }
            });

        });
}]);