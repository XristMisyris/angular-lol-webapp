'use strict';

angular.module('myApp.summoner', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/summoner/:region/:name', {
    templateUrl: 'summoner/summoner.html',
    controller: 'SummonerCtrl'
  });
}])

.controller('SummonerCtrl', ['$scope', '$routeParams', '$log', '$http', 'ChampionService', function($scope, $routeParams, $log, $http, ChampionService) {
	$scope.url = $routeParams.region + "/" + $routeParams.name;

    $scope.checkResult = function(matches) {
        if ( matches.participants[0].stats.winner == true )
            return 'winner';
        else
            return 'looser';
    };

    $scope.inGameInfo = function($id){
        $routeParams.id = $id;
        $http.post('engine.php?method=route', { class : "RiotAPI", function : "getInGameInfo", data : $routeParams }).
            then(function(response) {


                if ( response.data.participants ){
                    angular.forEach(response.data.participants, function(participant){
                        var championArray = $scope.championList;
                        var summonersArray = $scope.summonerSpells;

                        participant.championImage = findWithAttr( championArray, 'key', participant.championId).image.full;
                        participant.championName = findWithAttr( championArray, 'key', participant.championId).name;

                        participant.spell1Id = findWithAttr( summonersArray, 'key', participant.spell1Id).image.full;
                        participant.spell2Id = findWithAttr( summonersArray, 'key', participant.spell2Id).image.full;
                    })
                }
                else
                    $scope.summoner.nogame = true;

                $scope.summoner.current = response.data;
                console.log(response);
                console.log($scope);


            }, function(response) {
                console.log('error');
            });
    }

    $http.post('engine.php?method=route', { class : "RiotAPI", function : "getData", data : $routeParams }).
        then(function(response) {

            var id = response.data.id;

            if ( response.data.league ) {
                angular.forEach(response.data.league[id], function (league) {
                    if (league.queue === "RANKED_SOLO_5x5") {
                        response.data.soloQ = league;
                    }
                    if (league.queue === "RANKED_TEAM_5x5") {
                        response.data.rankedTeam = league;
                    }
                });
            }

            if(response.data.history.matches){
                angular.forEach(response.data.history.matches, function(match){
                    var championArray = $scope.championList = ChampionService.setArray(response.data.championList.data);
                    var summonersArray = $scope.summonerSpells = ChampionService.setArray(response.data.summonerSpells.data);

                    match.championImage = findWithAttr( championArray, 'key', match.participants[0].championId).image.full;
                    match.championName = findWithAttr( championArray, 'key', match.participants[0].championId).name;

                    match.spell1Id = findWithAttr( summonersArray, 'key', match.participants[0].spell1Id).image.full;
                    match.spell2Id = findWithAttr( summonersArray, 'key', match.participants[0].spell2Id).image.full;

                    match.gameLabel = makeGameModeLabel(match.matchMode, match.queueType);
                })
            }

            $scope.summoner = response.data;
            console.log($scope);
            console.log(response);

        });

        jQuery( ".container" ).load(function() {
            console.log("now");
            jQuery(".btn-pref .btn").click(function () {
                jQuery(".btn-pref .btn").removeClass("btn-primary").addClass("btn-default");
                jQuery(this).removeClass("btn-default").addClass("btn-primary");
            });
        });

}]);