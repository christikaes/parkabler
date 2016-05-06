var app = angular.module('header', ['ngMaterial']);
app.directive('headerView', function(){
  return {
    restrict: 'E',
    templateUrl: 'components/header/headerView.html'
  };
});
