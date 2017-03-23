'use strict';

angular.module('Doob.humanresources').config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/humanresources/occupations', {
	    templateUrl:'humanresources/occupation/tmplOccupationView.tpl.html',
	    controller:'ctrlOccupation'
    })
    .when('/humanresources/workstationdemands', {
	    templateUrl:'humanresources/workstationdemand/tmplWorkstationDemandView.tpl.html',
	    controller:'ctrlWorkstationDemand'
    })
    .when('/humanresources/academictitles', {
	    templateUrl:'humanresources/academictitle/tmplAcademicTitleView.tpl.html',
	    controller:'ctrlAcademicTitle'
    })
    .when('/humanresources/specializations', {
	    templateUrl:'humanresources/specialization/tmplSpecializationView.tpl.html',
	    controller:'ctrlSpecialization'
    })
    .when('/humanresources/schooldegrees', {
	    templateUrl:'humanresources/schooldegree/tmplSchoolDegreeView.tpl.html',
	    controller:'ctrlSchoolDegree'
    })
    .when('/humanresources/workstationdescriptions', {
	    templateUrl:'humanresources/workstationdescription/tmplWorkstationDescriptionView.tpl.html',
	    controller:'ctrlWorkstationDescription'
    })
    .when('/humanresources/nationalitys', {
	    templateUrl:'humanresources/nationality/tmplNationalityView.tpl.html',
	    controller:'ctrlNationality'
    })
    .when('/humanresources/finaldegrees', {
	    templateUrl:'humanresources/finaldegree/tmplFinalDegreeView.tpl.html',
	    controller:'ctrlFinalDegree'
    })
    .when('/humanresources/workstations', {
	    templateUrl:'humanresources/workstation/tmplWorkstationView.tpl.html',
	    controller:'ctrlWorkstation'
    })
    .when('/humanresources/occupationdemands', {
	    templateUrl:'humanresources/occupationdemand/tmplOccupationDemandView.tpl.html',
	    controller:'ctrlOccupationDemand'
    })
    .when('/humanresources/familymembers', {
	    templateUrl:'humanresources/familymember/tmplFamilyMemberView.tpl.html',
	    controller:'ctrlFamilyMember'
    })
    .when('/humanresources/jobcatalogs', {
	    templateUrl:'humanresources/jobcatalog/tmplJobCatalogView.tpl.html',
	    controller:'ctrlJobCatalog'
    })
    .when('/humanresources/occupationdescriptions', {
	    templateUrl:'humanresources/occupationdescription/tmplOccupationDescriptionView.tpl.html',
	    controller:'ctrlOccupationDescription'
    })
    .when('/humanresources/authoritys', {
	    templateUrl:'humanresources/authority/tmplAuthorityView.tpl.html',
	    controller:'ctrlAuthority'
    })
    .when('/humanresources/otherqualifications', {
	    templateUrl:'humanresources/otherqualification/tmplOtherQualificationView.tpl.html',
	    controller:'ctrlOtherQualification'
    })
    ;
}]);