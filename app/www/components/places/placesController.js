var app = angular.module('places', ['ngMaterial']);

// Using http://stackoverflow.com/questions/30274617/google-maps-autocomplete-with-material-design

app.controller('placesController', ['$scope', '$mdDialog', '$q', '$http', function($scope, $mdDialog, $q, $http){

  vm = this;
  vm.gmapsService = new google.maps.places.AutocompleteService();
  vm.geocoder = new google.maps.Geocoder();

  vm.search = search;
  // vm.searchText = "test"
  // vm.selectedItem = ""

  function search(address) {
    if(!address) {
      console.log("No input")
      return [];
    }
    var deferred = $q.defer();
    console.log(deferred)
    getResults(address).then(
      function (predictions) {
        var results = [];
        for (var i = 0, prediction; prediction = predictions[i]; i++) {
          console.log(prediction)
          console.log(prediction.geometry)
          results.push({
            description: prediction.description,
            id: prediction.place_id
          });
        }
        deferred.resolve(results);
      }
    );
   return deferred.promise;
   }

  function getResults(address) {
    var deferred = $q.defer();
    vm.gmapsService.getQueryPredictions({input: address}, function (data) {
      deferred.resolve(data);
    });
    console.log(deferred)
    return deferred.promise;
  }

  this.selectedItemChange = function(item) {
    vm.geocoder.geocode({'placeId': item.id}, function(results, status) {
      console.log(results)
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          $scope.$emit('changeCenter',results[0].geometry.location);
        } else {
          console.log('No results found');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    });
  }
}])

app.directive('placesView', function(){
  return {
    restrict: 'E',
    templateUrl: 'components/places/placesView.html',
    controller: 'placesController',
    controllerAs: 'vm'
  };
});
