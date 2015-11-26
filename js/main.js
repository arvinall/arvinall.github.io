angular.module("allrhythmicprose", ['ngRoute'])
.controller('list', function($scope, $http) {

  $http.get("js/details.json")
  .success(function(response) {
    $scope.details = response
  })

}).controller('loadNote', function($scope, $routeParams, $http) {
  $http.get("md/" + $routeParams.NoteID + ".md")
  .success(function(response) {
    document.getElementById("res").innerHTML = markdown.toHTML(response)
    $scope.noteRes = document.getElementById("res").firstChild.innerHTML
    $scope.noteLink = window.location.href
  })
}).controller('loadHome', function($scope, $routeParams, $http) {
  $http.get("md/" + "home" + ".md")
  .success(function(response) {
    document.getElementById("res").innerHTML = markdown.toHTML(response)
  })
}).controller("mobileNav", function($scope){
  $scope.MobileNavButtonVal = false
  $scope.ToggleTheNav = function(){
    if(!$scope.MobileNavButtonVal)$scope.MobileNavButtonVal = true
    else $scope.MobileNavButtonVal = false
  }
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
