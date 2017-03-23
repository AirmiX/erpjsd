'use strict';

angular.module('Doob.renaming').factory('ServiceRenaming', ['restResource', function ($restResource) {
	var ServiceRenaming = $restResource('/renaming/renamings');
  	return ServiceRenaming;
}]);