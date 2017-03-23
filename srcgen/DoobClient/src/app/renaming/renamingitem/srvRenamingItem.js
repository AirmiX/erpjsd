'use strict';

angular.module('Doob.renaming').factory('ServiceRenamingItem', ['restResource', function ($restResource) {
	var ServiceRenamingItem = $restResource('/renaming/renamingitems');
  	return ServiceRenamingItem;
}]);