'use strict';

jQuery( document ).ready(function() {
    jQuery(".btn-pref .btn").click(function () {
        jQuery(".btn-pref .btn").removeClass("btn-primary").addClass("btn-default");
        // $(".tab").addClass("active"); // instead of this do the below
        jQuery(this).removeClass("btn-default").addClass("btn-primary");
    });
});

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.home',
  'myApp.summoner',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}]);
