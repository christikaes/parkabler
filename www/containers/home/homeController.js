var app = angular.module('App', ['ngMaterial', 'ngMap', 'header', 'add', 'mainMap', 'places']);

app.directive('homeView', function(){
  return {
    restrict: 'E',
    templateUrl: 'containers/home/homeView.html'
  };
});
