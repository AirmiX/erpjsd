'use strict';

angular.module('Doob.productiondata').config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/productiondata/productionprocesss', {
	    templateUrl:'productiondata/productionprocess/tmplProductionProcessView.tpl.html',
	    controller:'ctrlProductionProcess'
    })
    .when('/productiondata/stepusermanuals', {
	    templateUrl:'productiondata/stepusermanual/tmplStepUserManualView.tpl.html',
	    controller:'ctrlStepUserManual'
    })
    .when('/productiondata/steptimeanalysiss', {
	    templateUrl:'productiondata/steptimeanalysis/tmplStepTimeAnalysisView.tpl.html',
	    controller:'ctrlStepTimeAnalysis'
    })
    .when('/productiondata/products', {
	    templateUrl:'productiondata/product/tmplProductView.tpl.html',
	    controller:'ctrlProduct'
    })
    .when('/productiondata/stepsclassifications', {
	    templateUrl:'productiondata/stepsclassification/tmplStepsClassificationView.tpl.html',
	    controller:'ctrlStepsClassification'
    })
    .when('/productiondata/productionprocesstypes', {
	    templateUrl:'productiondata/productionprocesstype/tmplProductionProcessTypeView.tpl.html',
	    controller:'ctrlProductionProcessType'
    })
    .when('/productiondata/consumablesuppliess', {
	    templateUrl:'productiondata/consumablesupplies/tmplConsumableSuppliesView.tpl.html',
	    controller:'ctrlConsumableSupplies'
    })
    .when('/productiondata/productionprocessstepss', {
	    templateUrl:'productiondata/productionprocesssteps/tmplProductionProcessStepsView.tpl.html',
	    controller:'ctrlProductionProcessSteps'
    })
    .when('/productiondata/steptools', {
	    templateUrl:'productiondata/steptool/tmplStepToolView.tpl.html',
	    controller:'ctrlStepTool'
    })
    .when('/productiondata/controldemandss', {
	    templateUrl:'productiondata/controldemands/tmplControlDemandsView.tpl.html',
	    controller:'ctrlControlDemands'
    })
    .when('/productiondata/workcenters', {
	    templateUrl:'productiondata/workcenter/tmplWorkCenterView.tpl.html',
	    controller:'ctrlWorkCenter'
    })
    .when('/productiondata/structuralcomponentss', {
	    templateUrl:'productiondata/structuralcomponents/tmplStructuralComponentsView.tpl.html',
	    controller:'ctrlStructuralComponents'
    })
    ;
}]);