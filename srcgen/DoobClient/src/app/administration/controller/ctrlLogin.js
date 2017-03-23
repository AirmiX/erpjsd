'use strict';
angular.module( 'Doob.administration',[/*, [
  'ngRoute',
  //'plusOne',
  'ngResource',
  'resources.login',
  'resources.security',*/
  'errorhandler',
  'resources.login',
  'resources.security'])

.controller( 'ctrlLogin', ['$scope', '$location', 'Login', 
  'Security', 'ErrorHandler', '$rootScope',
  function( $scope, $location, Login, Security,
     ErrorHandler, $rootScope) {

  $scope.submitLoginForm = function() {
    var formData = $scope.loginForm;
    Security.login(formData, function(){ 
      $location.path('/');
      /*$rootScope.toaster.info('Welcome to Doob ERP Solution');*/}, 
      function(data){
        ErrorHandler.handle(data);
        $location.path('/login');
      });    
    };

}]);

