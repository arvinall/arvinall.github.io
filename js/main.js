angular.module("allrhythmicprose", [])
.controller('main', function($scope, $http) {
  $scope.load = function(tname){
    $http.get("md/" + tname + ".md")
    .success(function(response) {document.getElementById("res").innerHTML = markdown.toHTML(response)})
  }

  $http.get("js/details.json")
  .success(function(response) {
    $scope.details = response
  })

})
