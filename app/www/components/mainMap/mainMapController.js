var mainMap = angular.module('mainMap', ['ngMaterial','ngMap', 'firebase']);

mainMap.controller('mainMapController', function(NgMap, $firebaseArray){
  console.log("CONTROLLER!!!")
  var ref = new Firebase("https://parkable.firebaseio.com/markers");

  this.markers = $firebaseArray(ref);
  this.test = this.markers.length;

  var vm = this;


   vm.dynMarkers = [];
   NgMap.getMap().then(function(map) {
     vm.map = map;
     for (var i=0; i<vm.markers.length; i++) {
       console.log(vm.markers[i])
       var latLng = new google.maps.LatLng(vm.markers[i].lat, vm.markers[i].lng);
      //  vm.dynMarkers.push(new google.maps.Marker({position:latLng}));
     }
    //  vm.markerClusterer = new MarkerClusterer(map, vm.dynMarkers, {});



      vm.placeChanged = function() {
        console.log("PLACE CHANGED")
        vm.place = this.getPlace();
        console.log(vm.place)
        console.log('location', vm.place.geometry.location);
        vm.map.setCenter(vm.place.geometry.location);
      }
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
