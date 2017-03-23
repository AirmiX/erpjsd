'use strict';

angular.module('Doob.stockmanagement').factory('ServiceRequestForProposalItem', ['restResource', function ($restResource) {
	var ServiceRequestForProposalItem = $restResource('/stockmanagement/requestforproposalitems');
  	return ServiceRequestForProposalItem;
}]);