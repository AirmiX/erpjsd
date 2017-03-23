'use strict';

angular.module('Doob.stockmanagement').factory('ServiceExpensesAccountAssignment', ['restResource', function ($restResource) {
	var ServiceExpensesAccountAssignment = $restResource('/stockmanagement/expensesaccountassignments');
  	return ServiceExpensesAccountAssignment;
}]);