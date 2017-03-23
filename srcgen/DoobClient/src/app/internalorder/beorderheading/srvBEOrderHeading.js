'use strict';

angular.module('Doob.internalorder').factory('ServiceBEOrderHeading', ['restResource', function ($restResource) {
	var ServiceBEOrderHeading = $restResource('/internalorder/beorderheadings');
  	return ServiceBEOrderHeading;
}]);