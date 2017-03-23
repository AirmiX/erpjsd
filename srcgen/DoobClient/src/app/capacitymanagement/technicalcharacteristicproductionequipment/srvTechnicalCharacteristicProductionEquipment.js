'use strict';

angular.module('Doob.capacitymanagement').factory('ServiceTechnicalCharacteristicProductionEquipment', ['restResource', function ($restResource) {
	var ServiceTechnicalCharacteristicProductionEquipment = $restResource('/capacitymanagement/technicalcharacteristicproductionequipments');
  	return ServiceTechnicalCharacteristicProductionEquipment;
}]);