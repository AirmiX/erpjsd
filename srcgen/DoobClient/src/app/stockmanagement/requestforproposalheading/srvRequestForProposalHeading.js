'use strict';

angular.module('Doob.stockmanagement').factory('ServiceRequestForProposalHeading', ['restResource', function ($restResource) {
	var ServiceRequestForProposalHeading = $restResource('/stockmanagement/requestforproposalheadings');
  	return ServiceRequestForProposalHeading;
}]);