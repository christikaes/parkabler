var mainMap = angular.module('mainMap', ['ngMaterial','ngMap', 'firebase']);

mainMap.controller('mainMapController', function(NgMap, $firebaseArray){
  console.log("CONTROLLER!!!")
  var ref = new Firebase("https://parkable.firebaseio.com/markers");

  this.markers = $firebaseArray(ref);
  this.test = this.markers.length;

  NgMap.getMap().then(function(map) {
    console.log(map.getCenter());
    console.log('markers', map.markers);
    console.log('shapes', map.shapes);
  });
});

mainMap.directive('mainMapView', function(){
  return {
    restrict: 'E',
    templateUrl: 'components/mainMap/mainMapView.html',
    controller: 'mainMapController',
    controllerAs: 'mainmap'
  };
});



var app = angular.module("sampleApp", ["firebase"]);
