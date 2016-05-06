var app = angular.module('App', ['ngMaterial', 'ngMap']);
app.controller('MyController', function(NgMap) {
  NgMap.getMap().then(function(map) {

    console.log(map.getCenter());
    console.log('markers', map.markers);
    console.log('shapes', map.shapes);
  });
});
app.directive('homeView', function(){
  return {
    restrict: 'E',
    templateUrl: 'containers/home/homeView.html'
  };
});
// app.initialize();
