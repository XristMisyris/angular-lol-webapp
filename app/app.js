'use strict';

var findWithAttr = null;
var makeGameModeLabel = null;

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.home',
  'myApp.summoner',
  'myApp.version',
  'ngLoadingSpinner'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}])

.filter('reverse', function() {
    return function(items) {
        return items.slice().reverse();
    };
})

.filter('secondToMin', function(){
    return function(time) {
        var minutes = Math.floor(time / 60);
        var seconds = time - minutes * 60;
        return minutes + "m " + seconds + "s";
    };
})

.controller('AppCtrl', ['$rootScope', '$location', '$routeParams', function( $rootScope, $location, $routeParams) {
    $rootScope.data = {summonerName : ""};
    $rootScope.data = {selRegion : ""};

    $rootScope.regionList = [
        {name: "NA"},
        {name: "EUW"},
        {name: "EUNE"},
        {name: "BR"},
        {name: "LAN"},
        {name: "LAS"},
        {name: "OCE"},
        {name: "KR"},
        {name: "TR"},
        {name: "RU"}
    ];

    $rootScope.searchSummoner = function(){
        console.log($rootScope);
        var data = { region: $rootScope.data.selRegion.name.toLowerCase(), name: $rootScope.data.summonerName.toLowerCase() };
        $location.path('/summoner/' + data.region + '/' + data.name);
    }

    var findIndex = function(key){
        var array = $rootScope.regionList;

        for ( var i = 0; i < array.length; i++ ){
            if (array[i].name == key){
                return i;
            }
        }
    }

    if ($routeParams.region)
        $rootScope.data.selRegion = $rootScope.regionList[findIndex($routeParams.region.toUpperCase())];
    else
        $rootScope.data.selRegion = $rootScope.regionList[0];

}])

.run(['$rootScope', function($rootScope){

    findWithAttr = function(arr, attr, value){
        for(var i = 0; i < arr.length; i++){
            if(arr[i].key == value) return arr[i];
        }
    }

    makeGameModeLabel = function(mode, queue){
        mode = mode.charAt(0).toUpperCase() + mode.slice(1).toLowerCase();
        switch (queue) {
            case "NORMAL_5x5_BLIND":
                queue = "Normal 5v5 Blind Pick";
                break;

            case "NORMAL_5x5_DRAFT":
                queue = "Normal 5v5 Draft Pick";
                break;

            case "RANKED_SOLO_5x5":
                queue = "Ranked Solo 5v5";
                break;

            case "RANKED_PREMADE_5x5":
                queue = "Ranked Premade 5v5";
                break;

            case "RANKED_PREMADE_3x3":
                queue = "Ranked Premade 3v3";
                break;

            case "RANKED_TEAM_3x3":
                queue = "Ranked Team 3v3";
                break;

            case "RANKED_TEAM_5x5":
                queue = "Ranked Team 5v5";
                break;

            case "ARAM_5x5":
                queue = "ARAM";
                break;

            default:
                queue;
            };

            return mode + " - " + queue;
        }
}])

.service("ChampionService", function(){

    this.setArray = function(championObject){
        var array = [];

        angular.forEach(Object.keys(championObject), function(champName){
            array.push(championObject[champName]);
        })

        var championList = array;

        return championList;
    }

})