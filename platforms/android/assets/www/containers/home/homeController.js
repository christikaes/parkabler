var app = angular.module('App', ['ngMaterial', 'ngMap']);
app.controller('MyController', function(NgMap) {
  NgMap.getMap().then(function(map) {

    console.log(map.getCenter());
    console.log('markers', map.markers);
    console.log('shapes', map.shapes);
  });
});
app.directive('test', function(){
  return {
    restrict: 'E',
    // template:"<h1>HI</h1>"
    templateUrl: 'containers/home/homeView.html'
  };
});
// app.initialize();
