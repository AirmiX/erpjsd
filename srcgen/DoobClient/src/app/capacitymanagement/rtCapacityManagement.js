'use strict';

angular.module('Doob.capacitymanagement').config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/capacitymanagement/alternativeworkcenterstepss', {
	    templateUrl:'capacitymanagement/alternativeworkcentersteps/tmplAlternativeWorkCenterStepsView.tpl.html',
	    controller:'ctrlAlternativeWorkCenterSteps'
    })
    .when('/capacitymanagement/workons', {
	    templateUrl:'capacitymanagement/workon/tmplWorkOnView.tpl.html',
	    controller:'ctrlWorkOn'
    })
    .when('/capacitymanagement/rates', {
	    templateUrl:'capacitymanagement/rate/tmplRateView.tpl.html',
	    controller:'ctrlRate'
    })
    .when('/capacitymanagement/technologicalunits', {
	    templateUrl:'capacitymanagement/technologicalunit/tmplTechnologicalUnitView.tpl.html',
	    controller:'ctrlTechnologicalUnit'
    })
    .when('/capacitymanagement/workcenterstepss', {
	    templateUrl:'capacitymanagement/workcentersteps/tmplWorkCenterStepsView.tpl.html',
	    controller:'ctrlWorkCenterSteps'
    })
    .when('/capacitymanagement/countrycurrencys', {
	    templateUrl:'capacitymanagement/countrycurrency/tmplCountryCurrencyView.tpl.html',
	    controller:'ctrlCountryCurrency'
    })
    .when('/capacitymanagement/technicalcharacteristicproductionequipments', {
	    templateUrl:'capacitymanagement/technicalcharacteristicproductionequipment/tmplTechnicalCharacteristicProductionEquipmentView.tpl.html',
	    controller:'ctrlTechnicalCharacteristicProductionEquipment'
    })
    .when('/capacitymanagement/alternativeworkcenters', {
	    templateUrl:'capacitymanagement/alternativeworkcenter/tmplAlternativeWorkCenterView.tpl.html',
	    controller:'ctrlAlternativeWorkCenter'
    })
    .when('/capacitymanagement/balanceresources', {
	    templateUrl:'capacitymanagement/balanceresource/tmplBalanceResourceView.tpl.html',
	    controller:'ctrlBalanceResource'
    })
    .when('/capacitymanagement/currencys', {
	    templateUrl:'capacitymanagement/currency/tmplCurrencyView.tpl.html',
	    controller:'ctrlCurrency'
    })
    .when('/capacitymanagement/availabilityworkcenters', {
	    templateUrl:'capacitymanagement/availabilityworkcenter/tmplAvailabilityWorkCenterView.tpl.html',
	    controller:'ctrlAvailabilityWorkCenter'
    })
    .when('/capacitymanagement/assets', {
	    templateUrl:'capacitymanagement/asset/tmplAssetView.tpl.html',
	    controller:'ctrlAsset'
    })
    .when('/capacitymanagement/availabilitytechnologicalunitss', {
	    templateUrl:'capacitymanagement/availabilitytechnologicalunits/tmplAvailabilityTechnologicalUnitsView.tpl.html',
	    controller:'ctrlAvailabilityTechnologicalUnits'
    })
    ;
}]);