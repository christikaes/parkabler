// TODO: I could see this broken up into separate components
// * The mainMap component that contains everything
// * A component just for the searching and places api
// * A component that just adds the markers to the map
// * A component that adds the location information to the map

var mainMap = angular.module('mainMap', ['ngMaterial','ngMap', 'firebase']);

mainMap.controller('mainMapController', function(NgMap, $firebaseArray){
  console.log("CONTROLLER!!!")
  var ref = new Firebase("https://parkable.firebaseio.com/markers");

  this.markers = $firebaseArray(ref);
  this.test = this.markers.length;

  // TODO: How do deal with this? https://johnpapa.net/angularjss-controller-as-and-the-vm-variable/
  var vm = this;

  // Markers
  // TODO: dynamicMarkers and MarkerClusterer don't sync with firebase
   vm.dynMarkers = [];
   NgMap.getMap().then(function(map) {
     vm.map = map;
     for (var i=0; i<vm.markers.length; i++) {
      //  console.log(vm.markers[i])
       var latLng = new google.maps.LatLng(vm.markers[i].lat, vm.markers[i].lng);
      //  vm.dynMarkers.push(new google.maps.Marker({position:latLng}));
     }
    //  vm.markerClusterer = new MarkerClusterer(map, vm.dynMarkers, {});

    // places
    // TODO: maybe write our own directive for this: http://stackoverflow.com/questions/30274617/google-maps-autocomplete-with-material-design
    vm.placeChanged = function() {
      console.log("PLACE CHANGED")
      vm.place = this.getPlace();
      console.log(vm.place)
      console.log('location', vm.place.geometry.location);
      vm.map.setCenter(vm.place.geometry.location);
    }
    if(navigator.geolocation) {
      console.log("GOOD")
    }else {
      console.log("BAD")
    }

    // Center to current position on load
    navigator.geolocation.getCurrentPosition(function(r){
        var latLng = new google.maps.LatLng(r.coords.latitude, r.coords.longitude);
        vm.map.setCenter(latLng);
    }, function(){
      console.log("error")
    });

   });
});

mainMap.directive('mainMapView', function(){
  return {
    restrict: 'E',
    templateUrl: 'components/mainMap/mainMapView.html',
    controller: 'mainMapController',
    controllerAs: 'vm'
  };
});

var app = angular.module("sampleApp", ["firebase"]);
