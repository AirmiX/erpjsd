'use strict';

angular.module('Doob.productiondata').factory('ServiceStepUserManual', ['restResource', function ($restResource) {
	var ServiceStepUserManual = $restResource('/productiondata/stepusermanuals');
  	return ServiceStepUserManual;
}]);