'use strict';

angular.module('Doob.commonbusinessentities').config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/commonbusinessentities/classificationarchives', {
	    templateUrl:'commonbusinessentities/classificationarchive/tmplClassificationArchiveView.tpl.html',
	    controller:'ctrlClassificationArchive'
    })
    .when('/commonbusinessentities/identifications', {
	    templateUrl:'commonbusinessentities/identification/tmplIdentificationView.tpl.html',
	    controller:'ctrlIdentification'
    })
    .when('/commonbusinessentities/characteristictypes', {
	    templateUrl:'commonbusinessentities/characteristictype/tmplCharacteristicTypeView.tpl.html',
	    controller:'ctrlCharacteristicType'
    })
    .when('/commonbusinessentities/characteristicsregistrys', {
	    templateUrl:'commonbusinessentities/characteristicsregistry/tmplCharacteristicsRegistryView.tpl.html',
	    controller:'ctrlCharacteristicsRegistry'
    })
    .when('/commonbusinessentities/characteristics', {
	    templateUrl:'commonbusinessentities/characteristic/tmplCharacteristicView.tpl.html',
	    controller:'ctrlCharacteristic'
    })
    .when('/commonbusinessentities/regulatives', {
	    templateUrl:'commonbusinessentities/regulative/tmplRegulativeView.tpl.html',
	    controller:'ctrlRegulative'
    })
    .when('/commonbusinessentities/classifications', {
	    templateUrl:'commonbusinessentities/classification/tmplClassificationView.tpl.html',
	    controller:'ctrlClassification'
    })
    .when('/commonbusinessentities/measurementunits', {
	    templateUrl:'commonbusinessentities/measurementunit/tmplMeasurementUnitView.tpl.html',
	    controller:'ctrlMeasurementUnit'
    })
    .when('/commonbusinessentities/identificationarchives', {
	    templateUrl:'commonbusinessentities/identificationarchive/tmplIdentificationArchiveView.tpl.html',
	    controller:'ctrlIdentificationArchive'
    })
    .when('/commonbusinessentities/identificationhassynonimforpartners', {
	    templateUrl:'commonbusinessentities/identificationhassynonimforpartner/tmplIdentificationHasSynonimForPartnerView.tpl.html',
	    controller:'ctrlIdentificationHasSynonimForPartner'
    })
    .when('/commonbusinessentities/rfpassignments', {
	    templateUrl:'commonbusinessentities/rfpassignment/tmplRFPAssignmentView.tpl.html',
	    controller:'ctrlRFPAssignment'
    })
    ;
}]);