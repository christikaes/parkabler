var app = angular.module('header', ['ngMaterial']);

app.controller('helpDialogController', function($mdDialog){
  this.cancel = function(){
    $mdDialog.cancel();
  }
})

app.controller('headerController', function($mdDialog){
  this.showMenu = false;
  this.showHelp = function (e) {
    $mdDialog.show({
      controller: 'helpDialogController',
      controllerAs: 'helpDialogCtrl',
      templateUrl: 'components/header/helpDialogView.html',
      parent : angular.element(document.body),
      targetEvent: e,
      clickOutsideToClose: true,
      fullscreen: false // TODO: true for mobile
    })
  }
})

app.directive('headerView', function(){
  return {
    restrict: 'E',
    templateUrl: 'components/header/headerView.html',
    controller: 'headerController',
    controllerAs: 'headerCtrl'
  };
});
