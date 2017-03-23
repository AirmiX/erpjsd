'use strict';

angular.module('Doob.common').config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/', {
	  	templateUrl:'common/util/mainPage.tpl.html'
  	});
}]);
