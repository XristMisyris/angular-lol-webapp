'use strict';

var findWithAttr = null;

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

.run(['$rootScope', function($rootScope){
    findWithAttr = function(arr, attr, value){
        for(var i = 0; i < arr.length; i++){
            if(arr[i].key == value) return arr[i];
        }
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