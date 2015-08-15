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

.run(['$rootScope', function($rootScope){
    findWithAttr = function(arr, attr, value){
        for(var i = 0; i < arr.length; i++){
            if(arr[i].key == value) return arr[i];
        }
    }

    makeGameModeLabel = function(mode, queue){
        mode = mode.charAt(0).toUpperCase() + mode.slice(1).toLowerCase();
        switch (queue) {
            case "RANKED_SOLO_5x5":
                queue = "Solo Queue";
                break;

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