'use strict';

angular.module( 'Doob', [
    'templates-app',
    'templates-common',
    'Doob.common',
    'Doob.administration',
     'Doob.commonbusinessentities',
     'Doob.humanresources',
     'Doob.internalorder',
     'Doob.stock',
     'Doob.corporation',
     'Doob.user',
     'Doob.procurement',
     'Doob.initialization',
     'Doob.productionrequest',
     'Doob.sellingprice',
     'Doob.productiondata',
     'Doob.stockmanagement',
     'Doob.logical',
     'Doob.procurementplan',
     'Doob.order',
     'Doob.renaming',
     'Doob.customerrequest',
     'Doob.capacitymanagement',
     'Doob.environment',
     'Doob.internalinvoice',
    'ui.router',
    'ngAnimate',
    'ui.bootstrap',
    'helpers',
    'resources.localization',
    'resources.security',
    'resources.users',
    'resources.serviceGroups',
    'oitozero.ngSweetAlert',
    'toaster',
    'cgNotify',
    'angularMoment'
])

/*.config(['$stateProvider','$urlRouterProvider', '$httpProvider', function myAppConfig ( $stateProvider, $urlRouterProvider, $httpProvider ) {
    //$urlRouterProvider.otherwise( '/home' );
    $httpProvider.interceptors.push(function ($q) {
        return {
            'request': function (config) {
                //redirect requests for server app
                if(config.url.lastIndexOf('SERVER', 0) === 0){
                    //remove SERVER from url
                    config.url = 'http://localhost:8080/DoobIISServer/api' + config.url.substring(6);
                }
                return config || $q.when(config);
            }
        };
    });
}])*/

.factory('errorInterceptor', ['$q', '$rootScope', '$location', '$injector',
    function ($q, $rootScope, $location, $injector) {
        return {
            request: function (config) {
                if(config.url.lastIndexOf('SERVER', 0) === 0){
                    //remove SERVER from url
                    config.url = 'http://localhost:8081/DoobIISServer/api' + config.url.substring(6);
                }
                return config || $q.when(config);
            },
            requestError: function(request){
                return $q.reject(request);
            },
            response: function (response) {
                return response || $q.when(response);
            },
            responseError: function (response) {
                if (response && response.status === 401) {
                  var Security = $injector.get('Security');
                  // The request bounced because it was not authorized
                  Security.logout();
                }
                return $q.reject(response);
            }
        };
}])



.config(['$httpProvider','$routeProvider', '$locationProvider', function ($httpProvider,$routeProvider, $locationProvider) {
  $routeProvider.otherwise({redirectTo:'/login'});
  $httpProvider.interceptors.push('errorInterceptor');
}])

.factory('$exceptionHandler', ['$injector', function($injector) {

    var $location;

    return function(exception, cause) {
        $location = $location || $injector.get('$location');
        //TODO check what to do when exception happens
        //$location.path('/login');
        console.log(exception.stack);
    };
}])

.run( function run () {
})

.controller( 'AppCtrl',['$scope', '$window','$location', '$rootScope', 'Localization', 'Security', 'SweetAlert', 'toaster', function AppCtrl ( $scope, $window, $location, $rootScope, Localization, Security, SweetAlert, toaster ) {

    $scope.languages = [{code: 'en', name: 'English'},{code: 'sr', name: 'Serbian'}];
    $rootScope.langSelected = 'en';

    $scope.setSelected = function(lang){$rootScope.langSelected = lang.code; };


    $rootScope.localization = Localization;
    $rootScope.sweetAlert = SweetAlert;
    $rootScope.toaster = toaster;
    $rootScope.swalOptions = {
                title: 'Are you sure?',
                text: 'Your will not be able to recover this item!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#8cc8e6',
                cancelButtonColor: '#ededed',
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                closeOnConfirm: true,
                closeOnCancel: true };
    $rootScope.toaster.options = {
            'debug': false,
            'newestOnTop': false,
            'positionClass': 'toast-top-center',
            'closeButton': true,
            'toastClass': 'animated fadeInDown',
        };
    $rootScope.deleteConfirmationDialog = function(deleteItem) {
      $rootScope.sweetAlert.swal('Good job!', 'You clicked the button!', 'success');
    };

    $scope.$on('$locationChangeStart', function(event) { //na promenu rute inicijalizuj funkcije koje idu na then!
      Security.hasServiceGroupInit();
      });
      $scope.logout = Security.logout;

    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        if ( angular.isDefined( toState.data.pageTitle ) ) {
            $scope.pageTitle = toState.data.pageTitle + ' | Doob' ;
        }
    });

    //Proverava koja je ruta aktivna da bi postavio stavku menije da bude aktivna.
    $scope.isActive = function(route) {
        return route === $location.path();
    };

    //postavi logovanog korisnika na reboot aplikacije
  if(!$rootScope.currentUser||Object.keys($rootScope.currentUser).length === 0){
    var cu = Security.getCurrentUser();
    if(!cu.username){

      cu.then(function (result) {
        if(result.length === 0) {
            $location.path('/login');
        }
        $rootScope.currentUser = result[0];
         //$location.path('/login');
      });
    }
    else{
        $rootScope.currentUser = cu;
    }

  }

  $window.onbeforeunload = function (evt) {
   //$scope.logout();
  };

}])

;