'use strict';

angular.module('Doob.procurementplan').config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/procurementplan/planningperiods', {
	    templateUrl:'procurementplan/planningperiod/tmplPlanningPeriodView.tpl.html',
	    controller:'ctrlPlanningPeriod'
    })
    ;
}]);