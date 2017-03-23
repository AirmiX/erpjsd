'use strict';

angular.module('Doob.initialization').factory('ServiceTaskType', ['restResource', function ($restResource) {
	var ServiceTaskType = $restResource('/initialization/tasktypes');
  	return ServiceTaskType;
}]);