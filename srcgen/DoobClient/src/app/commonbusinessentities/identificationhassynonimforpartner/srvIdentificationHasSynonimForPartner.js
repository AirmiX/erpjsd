'use strict';

angular.module('Doob.commonbusinessentities').factory('ServiceIdentificationHasSynonimForPartner', ['restResource', function ($restResource) {
	var ServiceIdentificationHasSynonimForPartner = $restResource('/commonbusinessentities/identificationhassynonimforpartners');
  	return ServiceIdentificationHasSynonimForPartner;
}]);