'use strict';

angular.module('Doob.corporation').factory('ServiceWorkCalendar', ['restResource', function ($restResource) {
	var ServiceWorkCalendar = $restResource('/corporation/workcalendars');
  	return ServiceWorkCalendar;
}]);