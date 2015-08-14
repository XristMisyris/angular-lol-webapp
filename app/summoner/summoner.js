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

    var ajaxData = {region: $routeParams.region, name: $routeParams.name };
    //if we don't champion data cache, tell backend to return it
    ajaxData.getChampionList = (Object.keys(ChampionService.championList).length == 0) ? true : false;

        console.log(ajaxData);

    $scope.checkResult = function(matches) {
        if ( matches.participants[0].stats.winner == true )
            return 'winner';
        else
            return 'looser';
    };

    $http.post('engine.php?method=route', { class : "RiotAPI", function : "getData", data : ajaxData }).
        then(function(response) {

            var id = response.data.id;

            //cache Champion Details if it was requested
            if(ajaxData.getChampionList) ChampionService.setChampionList(response.data.championList.data);

            angular.forEach(response.data.league[id],function(league){
                if (league.queue === "RANKED_SOLO_5x5"){
                    response.data.soloQ = league;
                }
                if (league.queue === "RANKED_TEAM_5x5"){
                    response.data.rankedTeam = league;
                }
            });

            $scope.summoner = response.data;
            console.log(response);
            console.log($scope.summoner);
        });

        jQuery( document ).ajaxComplete(function() {
            jQuery(".btn-pref .btn").click(function () {
                jQuery(".btn-pref .btn").removeClass("btn-primary").addClass("btn-default");
                jQuery(this).removeClass("btn-default").addClass("btn-primary");
            });
        });

}]);