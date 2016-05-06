var app = angular.module('add', ['ngMaterial']);
app.controller('addController', function($mdBottomSheet){
  this.showAdd = function(){
    $mdBottomSheet.show({
      templateUrl: 'components/add/addViewSheet.html',
      controller: 'AddViewSheetController'
    });
  }
});

app.directive('addView', function(){
  return {
    restrict: 'E',
    templateUrl: 'components/add/addView.html'
  };
});

app.controller('AddViewSheetController', function(){
  this.type = "Residential"
  this.print = function(){
    console.log(this)
  }
});
