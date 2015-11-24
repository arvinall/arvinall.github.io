var title;
angular.module("allrhythmicprose", ['ngRoute'])
.controller('main', function($scope, $http) {

  $http.get("js/details.json")
  .success(function(response) {
    $scope.details = response
  })

}).controller('loadNote', function($scope, $routeParams, $http) {
  $http.get("md/" + $routeParams.NoteID + ".md")
  .success(function(response) {
    document.getElementById("res").innerHTML = markdown.toHTML(response)
  })
}).controller('loadHome', function($scope, $routeParams, $http) {
  $http.get("md/" + "home" + ".md")
  .success(function(response) {
    document.getElementById("res").innerHTML = markdown.toHTML(response)
  })
})
.config(function($routeProvider) {
  $routeProvider
   .when('/note/:NoteID', {
    templateUrl: 'ShowNote.html',
    controller: 'loadNote'
  }).when('/home', {
    templateUrl: 'ShowNote.html',
    controller: 'loadHome'
  }).when('/', {
    redirectTo: '/home'
  })
})
