'use strict';

angular.module('Doob.initialization').factory('ServiceSourceAttention', ['restResource', function ($restResource) {
	var ServiceSourceAttention = $restResource('/initialization/sourceattentions');
  	return ServiceSourceAttention;
}]);