'use strict';

angular.module('Doob.initialization').factory('ServiceUrgentStatus', ['restResource', function ($restResource) {
	var ServiceUrgentStatus = $restResource('/initialization/urgentstatuss');
  	return ServiceUrgentStatus;
}]);