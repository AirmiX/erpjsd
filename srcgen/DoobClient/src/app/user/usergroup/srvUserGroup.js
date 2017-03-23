'use strict';

angular.module('Doob.user').factory('ServiceUserGroup', ['restResource', function ($restResource) {
	var ServiceUserGroup = $restResource('/user/usergroups');
  	return ServiceUserGroup;
}]);