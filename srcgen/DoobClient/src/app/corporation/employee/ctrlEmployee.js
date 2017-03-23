'use strict';

angular.module('Doob.corporation')


.controller('ctrlEmployee',['$scope', '$rootScope', '$modal', 'dialogs', 'CheckSelected', 'ServiceEmployee',
    function($scope, $rootScope, $modal, dialogs, CheckSelected, ServiceEmployee) {

	// main entity (employee) properties names and labels
	$scope.itemDefinition = {
		label: 'corporation.employee',
		properties: [
			{ label: 'ePersonellNumber', name:'EPersonellNumber', inTable:  true  },
			{ label: 'eName', name:'EName', inTable:  true  },
			{ label: 'eLastName', name:'ELastName', inTable:  true  },
			{ label: 'eJobTitle', name:'EJobTitle', inTable:  false  },
			{ label: 'eEmail', name:'EEmail', inTable:  false  },
			{ label: 'eBirthName', name:'EBirthName', inTable:  false  },
			{ label: 'eDateOfBirth', name:'EDateOfBirth', inTable:  true  },
			{ label: 'eNationality', name:'ENationality', inTable:  false  },
			{ label: 'eUsername', name:'EUsername', inTable:  false  },
			{ label: 'eStreet', name:'EStreet', inTable:  false  },
			{ label: 'eTelephone', name:'ETelephone', inTable:  false  },
			{ label: 'eAccountNumber', name:'EAccountNumber', inTable:  false  },
			{ label: 'eEmploymentType', name:'EEmploymentType', inTable:  false  },
			{ label: 'eEmploymentWay', name:'EEmploymentWay', inTable:  false  },
			{ label: 'eWorkExpirienceYY', name:'EWorkExpirienceYY', inTable:  false  },
			{ label: 'eWorkExpirienceMM', name:'EWorkExpirienceMM', inTable:  false  },
			{ label: 'eWorkExpirienceDD', name:'EWorkExpirienceDD', inTable:  false  },
			{ label: 'eWorkExpirienceFRAYY', name:'EWorkExpirienceFRAYY', inTable:  false  },
			{ label: 'eWorkExpirienceFRAMM', name:'EWorkExpirienceFRAMM', inTable:  false  },
			{ label: 'eWorkExpirienceFRADD', name:'EWorkExpirienceFRADD', inTable:  false  },
			{ label: 'eEmploymentEntryDate', name:'EEmploymentEntryDate', inTable:  false  },
			{ label: 'eEmploymentDateOfLeaving', name:'EEmploymentDateOfLeaving', inTable:  false  },
			{ label: 'eEmploymentEndReason', name:'EEmploymentEndReason', inTable:  false  },
			{ label: 'eEmploymentLimitation', name:'EEmploymentLimitation', inTable:  false  },
			{ label: 'eMaritialStatus', name:'EMaritialStatus', inTable:  false  },
			{ label: 'eSingleParent', name:'ESingleParent', inTable:  false  },
			{ label: 'eBloodType', name:'EBloodType', inTable:  false  },
			{ label: 'eBloodDonor', name:'EBloodDonor', inTable:  false  },
			{ label: 'eShiftWork', name:'EShiftWork', inTable:  false  },
			{ label: 'eWorkingTime', name:'EWorkingTime', inTable:  false  },
			{ label: 'eWorkingAbility', name:'EWorkingAbility', inTable:  false  },
			{ label: 'eWorkingAbilityChangeDate', name:'EWorkingAbilityChangeDate', inTable:  false  },
			{ label: 'eWeaklyWorkingHours', name:'EWeaklyWorkingHours', inTable:  false  },
			{ label: 'eHolidayEntitlement', name:'EHolidayEntitlement', inTable:  false  },
			{ label: 'eAnnualWageGross', name:'EAnnualWageGross', inTable:  false  },
			{ label: 'eNumberOfWages', name:'ENumberOfWages', inTable:  false  },
			{ label: 'eMonthlyWageGross', name:'EMonthlyWageGross', inTable:  false  },
			{ label: 'eTaxIdentificationNumber', name:'ETaxIdentificationNumber', inTable:  false  },
			{ label: 'eTaxOfficeNumber', name:'ETaxOfficeNumber', inTable:  false  },
			{ label: 'eTaxClass', name:'ETaxClass', inTable:  false  },
			{ label: 'eChildAllowance', name:'EChildAllowance', inTable:  false  },
			{ label: 'eConffesion', name:'EConffesion', inTable:  false  },
			{ label: 'eHealthInsurance', name:'EHealthInsurance', inTable:  false  },
			{ label: 'eSocialInsuranceNumber', name:'ESocialInsuranceNumber', inTable:  false  },
			{ label: 'eInsuranceGroupKeyHealthInsurance', name:'EInsuranceGroupKeyHealthInsurance', inTable:  false  },
			{ label: 'eInsuranceGroupKeyPensionInsurance', name:'EInsuranceGroupKeyPensionInsurance', inTable:  false  },
			{ label: 'eInsuranceGroupKeyUnemploymentInsurance', name:'EInsuranceGroupKeyUnemploymentInsurance', inTable:  false  },
			{ label: 'eInsuranceGroupKeyNursingCareInsurance', name:'EInsuranceGroupKeyNursingCareInsurance', inTable:  false  },
		]
	};

	// organizationUnits with properties names and labels
	$scope.organizationUnitsDefinition = {
		label: 'corporation.organizationUnit',
		properties : [
			{ label: 'oUIdentificationCode', name:'OUIdentificationCode' },
			{ label: 'oUName', name:'OUName' },
		]
	};
	// schoolDegree with properties names and labels
	$scope.schoolDegreeDefinition = {
		label: 'humanresources.schoolDegree',
		properties : [
			{ label: 'sDCode', name:'SDCode' },
			{ label: 'sDName', name:'SDName' },
		]
	};
	// countryOfBirth with properties names and labels
	$scope.countryOfBirthDefinition = {
		label: 'environment.mVCountry',
		properties : [
		]
	};
	// nationality with properties names and labels
	$scope.nationalityDefinition = {
		label: 'humanresources.nationality',
		properties : [
			{ label: 'nNationality', name:'NNationality' },
		]
	};
	// gender with properties names and labels
	$scope.genderDefinition = {
		label: 'initialization.gender',
		properties : [
			{ label: 'gName', name:'GName' },
		]
	};
	// address with properties names and labels
	$scope.addressDefinition = {
		label: 'environment.address',
		properties : [
		]
	};
	// workstation with properties names and labels
	$scope.workstationDefinition = {
		label: 'humanresources.workstation',
		properties : [
			{ label: 'wOrdinalNumber', name:'WOrdinalNumber' },
			{ label: 'wName', name:'WName' },
			{ label: 'wNumberOfPerformers', name:'WNumberOfPerformers' },
		]
	};
	// authority with properties names and labels
	$scope.authorityDefinition = {
		label: 'humanresources.authority',
		properties : [
			{ label: 'aCode', name:'ACode' },
			{ label: 'aName', name:'AName' },
		]
	};
	// finalDegree with properties names and labels
	$scope.finalDegreeDefinition = {
		label: 'humanresources.finalDegree',
		properties : [
			{ label: 'fDCode', name:'FDCode' },
			{ label: 'fDName', name:'FDName' },
		]
	};
	// academicTitle with properties names and labels
	$scope.academicTitleDefinition = {
		label: 'humanresources.academicTitle',
		properties : [
			{ label: 'aTName', name:'ATName' },
		]
	};
	// orderHeadings with properties names and labels
	$scope.orderHeadingsDefinition = {
		label: 'order.orderHeading',
		properties : [
			{ label: 'oHDocumentNumber', name:'OHDocumentNumber' },
			{ label: 'oHCreationDate', name:'OHCreationDate' },
			{ label: 'oHOrderNumberOfBuyer', name:'OHOrderNumberOfBuyer' },
			{ label: 'oHOrderDate', name:'OHOrderDate' },
			{ label: 'oHPaymentPeriodBuyer', name:'OHPaymentPeriodBuyer' },
		]
	};
	// bankAccounts with properties names and labels
	$scope.bankAccountsDefinition = {
		label: 'corporation.bankAccount',
		properties : [
			{ label: 'bAAccountNumber', name:'BAAccountNumber' },
		]
	};
	// technologicalUnits with properties names and labels
	$scope.technologicalUnitsDefinition = {
		label: 'capacitymanagement.availabilityTechnologicalUnits',
		properties : [
			{ label: 'aTUOrdinalNumber', name:'ATUOrdinalNumber' },
			{ label: 'aTUStartDate', name:'ATUStartDate' },
			{ label: 'aTUCapacityChange', name:'ATUCapacityChange' },
		]
	};
	// specializations with properties names and labels
	$scope.specializationsDefinition = {
		label: 'humanresources.specialization',
		properties : [
			{ label: 'sOrdinalNumber', name:'SOrdinalNumber' },
			{ label: 'sDescription', name:'SDescription' },
		]
	};
	// assitantOfAccountables with properties names and labels
	$scope.assitantOfAccountablesDefinition = {
		label: 'stock.stockroom',
		properties : [
			{ label: 'sCode', name:'SCode' },
			{ label: 'sName', name:'SName' },
			{ label: 'sFullName', name:'SFullName' },
			{ label: 'sType', name:'SType' },
			{ label: 'sConditions', name:'SConditions' },
		]
	};
	// users with properties names and labels
	$scope.usersDefinition = {
		label: 'user.appUser',
		properties : [
			{ label: 'uIdentificationCode', name:'UIdentificationCode' },
		]
	};
	// accountables with properties names and labels
	$scope.accountablesDefinition = {
		label: 'stock.stockroom',
		properties : [
			{ label: 'sCode', name:'SCode' },
			{ label: 'sName', name:'SName' },
			{ label: 'sFullName', name:'SFullName' },
			{ label: 'sType', name:'SType' },
			{ label: 'sConditions', name:'SConditions' },
		]
	};
	// familyMembers with properties names and labels
	$scope.familyMembersDefinition = {
		label: 'humanresources.familyMember',
		properties : [
			{ label: 'fMOrdinalNumber', name:'FMOrdinalNumber' },
			{ label: 'fMRelationship', name:'FMRelationship' },
			{ label: 'fMName', name:'FMName' },
			{ label: 'fMLastName', name:'FMLastName' },
			{ label: 'fMDateOfBirth', name:'FMDateOfBirth' },
			{ label: 'fMEmployment', name:'FMEmployment' },
			{ label: 'fMIsDependent', name:'FMIsDependent' },
			{ label: 'fMInsurance', name:'FMInsurance' },
		]
	};
	// works with properties names and labels
	$scope.worksDefinition = {
		label: 'capacitymanagement.workOn',
		properties : [
		]
	};

	// fill table with data
	$scope.items = [];
	$scope.loaded = false;
	var getEmployees = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceEmployee.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
			});
		}
	};
	getEmployees();

	// table selection logic
	$scope.itemEdit = null;

	$scope.selection = function(item, index) {
		if(item.isSelected) {
			if($scope.itemEdit !== null) {
				var index1 = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
				$scope.items[index1].isSelected = false;
			}
			item.$getEager(function(item) {
				$scope.itemEdit = item;
			});
		} else {
			$scope.itemEdit = null;
			item.isSelected = false;
		}
	};

	$scope.$watch('EmployeeCollection', function() {
		$scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.EmployeeCollection, $scope.items);
	});

	// Remove button
	$scope.remove = function(item) {
		$rootScope.sweetAlert.swal($rootScope.swalOptions, function(isConfirm) {
			if(isConfirm) {
				item.$remove(function() {
					var removeIndex = $scope.items.map(function(it) { return it.id; }).indexOf(item.id);
					$scope.items.splice(removeIndex, 1);
					$scope.itemEdit = null;
					$rootScope.deleteConfirmationDialog();
				});
			}
			window.onkeydown = null;
			window.onfocus = null;
		});
	};

	// New/Update dialog
	$scope.openEditDialog = function(isNew) {
		$modal.open(
		{
			backdrop: 'static',
			keyboard : false,
			templateUrl: 'corporation/employee/tmplEmployeeEdit.tpl.html',
			size: 'lg',
			windowClass: 'hmodal-info',
			controller: 'ctrlEmployeeEdit',
			resolve: {
				itemEdit: function() {
					if(isNew) {
						return new ServiceEmployee();
					} else {
						return $scope.itemEdit;
					}
				},
				organizationUnitsDefinition: function() {
					return $scope.organizationUnitsDefinition;
				},
				schoolDegreeDefinition: function() {
					return $scope.schoolDegreeDefinition;
				},
				countryOfBirthDefinition: function() {
					return $scope.countryOfBirthDefinition;
				},
				nationalityDefinition: function() {
					return $scope.nationalityDefinition;
				},
				genderDefinition: function() {
					return $scope.genderDefinition;
				},
				addressDefinition: function() {
					return $scope.addressDefinition;
				},
				workstationDefinition: function() {
					return $scope.workstationDefinition;
				},
				authorityDefinition: function() {
					return $scope.authorityDefinition;
				},
				finalDegreeDefinition: function() {
					return $scope.finalDegreeDefinition;
				},
				academicTitleDefinition: function() {
					return $scope.academicTitleDefinition;
				},
				orderHeadingsDefinition: function() {
					return $scope.orderHeadingsDefinition;
				},
				bankAccountsDefinition: function() {
					return $scope.bankAccountsDefinition;
				},
				technologicalUnitsDefinition: function() {
					return $scope.technologicalUnitsDefinition;
				},
				specializationsDefinition: function() {
					return $scope.specializationsDefinition;
				},
				assitantOfAccountablesDefinition: function() {
					return $scope.assitantOfAccountablesDefinition;
				},
				usersDefinition: function() {
					return $scope.usersDefinition;
				},
				accountablesDefinition: function() {
					return $scope.accountablesDefinition;
				},
				familyMembersDefinition: function() {
					return $scope.familyMembersDefinition;
				},
				worksDefinition: function() {
					return $scope.worksDefinition;
				},
			}
		})
		.result.then(function(result) {
			if(!angular.isDefined(result.id)) {
				ServiceEmployee.saveCustom('stockmanagement/employees', result, function(savedObject) {
					$scope.items.unshift(savedObject);
					if($scope.itemEdit !== null) {
						var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
						$scope.items[index].isSelected = false;
					}
					$scope.itemEdit = angular.extend(savedObject);
					$scope.items[0].isSelected = true;
				});
			 } else {
				 ServiceEmployee.updateCustom('stockmanagement/employees/'+result.id, result, function(savedObject) {
					$scope.itemEdit = angular.extend(savedObject);
					var index = $scope.items.map(function(it) { return it.id; }).indexOf(savedObject.id);
					for(var key in result) {
						$scope.items[index][key] = savedObject[key];
					}
					$scope.items[index].isSelected = true;
				 });
			 }
		});
	};
}])


.controller('ctrlEmployeeEdit',['$scope', 'Localization', '$modal', '$modalInstance', 'dialogs',
	'ServiceEmployee', 'ServiceOrganizationUnit', 'ServiceSchoolDegree', 'ServiceMVCountry', 'ServiceNationality', 'ServiceGender', 'ServiceAddress', 'ServiceWorkstation', 'ServiceAuthority', 'ServiceFinalDegree', 'ServiceAcademicTitle', 'ServiceOrderHeading', 'ServiceBankAccount', 'ServiceAvailabilityTechnologicalUnits', 'ServiceSpecialization', 'ServiceStockroom', 'ServiceAppUser', 'ServiceFamilyMember', 'ServiceWorkOn',   'organizationUnitsDefinition',  'schoolDegreeDefinition',  'countryOfBirthDefinition',  'nationalityDefinition',  'genderDefinition',  'addressDefinition',  'workstationDefinition',  'authorityDefinition',  'finalDegreeDefinition',  'academicTitleDefinition',  'orderHeadingsDefinition',  'bankAccountsDefinition',  'technologicalUnitsDefinition',  'specializationsDefinition',  'assitantOfAccountablesDefinition',  'usersDefinition',  'accountablesDefinition',  'familyMembersDefinition',  'worksDefinition',   'itemEdit',
function($scope, Localization, $modal, $modalInstance, dialogs,
	ServiceEmployee, ServiceOrganizationUnit, ServiceSchoolDegree, ServiceMVCountry, ServiceNationality, ServiceGender, ServiceAddress, ServiceWorkstation, ServiceAuthority, ServiceFinalDegree, ServiceAcademicTitle, ServiceOrderHeading, ServiceBankAccount, ServiceAvailabilityTechnologicalUnits, ServiceSpecialization, ServiceStockroom, ServiceAppUser, ServiceFamilyMember, ServiceWorkOn,  organizationUnitsDefinition,  schoolDegreeDefinition,  countryOfBirthDefinition,  nationalityDefinition,  genderDefinition,  addressDefinition,  workstationDefinition,  authorityDefinition,  finalDegreeDefinition,  academicTitleDefinition,  orderHeadingsDefinition,  bankAccountsDefinition,  technologicalUnitsDefinition,  specializationsDefinition,  assitantOfAccountablesDefinition,  usersDefinition,  accountablesDefinition,  familyMembersDefinition,  worksDefinition,  itemEdit) {

	// dialog mode
	$scope.mode = 'edit';

	// original item state
	var original = angular.copy(itemEdit);
	// item state
	$scope.itemEdit = angular.copy(original);

	// organizationUnits with properties
	$scope.organizationUnitsDefinition = organizationUnitsDefinition;
	// schoolDegree with properties
	$scope.schoolDegreeDefinition = schoolDegreeDefinition;
	// countryOfBirth with properties
	$scope.countryOfBirthDefinition = countryOfBirthDefinition;
	// nationality with properties
	$scope.nationalityDefinition = nationalityDefinition;
	// gender with properties
	$scope.genderDefinition = genderDefinition;
	// address with properties
	$scope.addressDefinition = addressDefinition;
	// workstation with properties
	$scope.workstationDefinition = workstationDefinition;
	// authority with properties
	$scope.authorityDefinition = authorityDefinition;
	// finalDegree with properties
	$scope.finalDegreeDefinition = finalDegreeDefinition;
	// academicTitle with properties
	$scope.academicTitleDefinition = academicTitleDefinition;
	// orderHeadings with properties
	$scope.orderHeadingsDefinition = orderHeadingsDefinition;
	// bankAccounts with properties
	$scope.bankAccountsDefinition = bankAccountsDefinition;
	// technologicalUnits with properties
	$scope.technologicalUnitsDefinition = technologicalUnitsDefinition;
	// specializations with properties
	$scope.specializationsDefinition = specializationsDefinition;
	// assitantOfAccountables with properties
	$scope.assitantOfAccountablesDefinition = assitantOfAccountablesDefinition;
	// users with properties
	$scope.usersDefinition = usersDefinition;
	// accountables with properties
	$scope.accountablesDefinition = accountablesDefinition;
	// familyMembers with properties
	$scope.familyMembersDefinition = familyMembersDefinition;
	// works with properties
	$scope.worksDefinition = worksDefinition;

	// datepicker logic

	// date properties
	$scope.openedEDateOfBirth = false;
	$scope.openedEEmploymentEntryDate = false;
	$scope.openedEEmploymentDateOfLeaving = false;
	$scope.openedEEmploymentLimitation = false;
	$scope.openedEWorkingAbilityChangeDate = false;

	$scope.open = function($event, opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope[opened] = true;
	};



	// Choose organizationUnits
	$scope.openChooseOrganizationUnitsDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/employee/tmplOrganizationUnitChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlOrganizationUnitChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.organizationUnits)){
						return $scope.itemEdit.organizationUnits;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.organizationUnits = angular.copy(result);
		});
    };


	// Choose schoolDegree
	$scope.openChooseSchoolDegreeDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'humanresources/employee/tmplSchoolDegreeChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlSchoolDegreeChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.schoolDegree)){
						return $scope.itemEdit.schoolDegree;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.schoolDegree = angular.copy(result);
		});
    };


	// Choose countryOfBirth
	$scope.openChooseCountryOfBirthDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'environment/employee/tmplMVCountryChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlMVCountryChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.countryOfBirth)){
						return $scope.itemEdit.countryOfBirth;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.countryOfBirth = angular.copy(result);
		});
    };


	// Choose nationality
	$scope.openChooseNationalityDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'humanresources/employee/tmplNationalityChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlNationalityChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.nationality)){
						return $scope.itemEdit.nationality;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.nationality = angular.copy(result);
		});
    };


	// Choose gender
	$scope.openChooseGenderDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'initialization/employee/tmplGenderChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlGenderChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.gender)){
						return $scope.itemEdit.gender;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.gender = angular.copy(result);
		});
    };


	// Choose address
	$scope.openChooseAddressDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'environment/employee/tmplAddressChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlAddressChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.address)){
						return $scope.itemEdit.address;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.address = angular.copy(result);
		});
    };


	// Choose workstation
	$scope.openChooseWorkstationDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'humanresources/employee/tmplWorkstationChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlWorkstationChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.workstation)){
						return $scope.itemEdit.workstation;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.workstation = angular.copy(result);
		});
    };


	// Choose authority
	$scope.openChooseAuthorityDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'humanresources/employee/tmplAuthorityChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlAuthorityChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.authority)){
						return $scope.itemEdit.authority;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.authority = angular.copy(result);
		});
    };


	// Choose finalDegree
	$scope.openChooseFinalDegreeDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'humanresources/employee/tmplFinalDegreeChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlFinalDegreeChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.finalDegree)){
						return $scope.itemEdit.finalDegree;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.finalDegree = angular.copy(result);
		});
    };


	// Choose academicTitle
	$scope.openChooseAcademicTitleDialog = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'humanresources/employee/tmplAcademicTitleChoose.tpl.html',
            size: 'lg',
            controller: 'ctrlAcademicTitleChoose',
            windowClass: 'hmodal-info',
            resolve: {
				itemEdit: function() {
					if(angular.isDefined($scope.itemEdit.academicTitle)){
						return $scope.itemEdit.academicTitle;
					}
				}
			}
		}).result.then(function(result) {
			$scope.itemEdit.academicTitle = angular.copy(result);
		});
    };


    $scope.specializationEdit = null;

    // specializations table selection logic
    $scope.specializationSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.specializationEdit !== null) {
                var index1 = $scope.itemEdit.specializations.map(function(it) { return it.id; }).indexOf($scope.specializationEdit.id);
                $scope.itemEdit.specializations[index1].isSelected = false;
            }
            $scope.specializationEdit = item;
        } else {
            $scope.specializationEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit specializations dialog
    $scope.openSpecializationEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'humanresources/employee/tmplSpecializationEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlSpecializationEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceSpecialization();
                    } else {
                        return $scope.specializationEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.specializations)) {
                    $scope.itemEdit.specializations = [];
                }
                $scope.itemEdit.specializations.unshift(result);
                for(i in $scope.itemEdit.specializations) {
                    $scope.itemEdit.specializations[i].isSelected = false;
                }
                $scope.specializationEdit = angular.extend(result);
                $scope.itemEdit.specializations[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.specializations) {
                    $scope.itemEdit.specializations[i].isSelected = false;
                }
                $scope.specializationEdit = angular.extend(result);
                var index = $scope.itemEdit.specializations.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.specializations[index][key] = result[key];
                }
                $scope.itemEdit.specializations[index].isSelected = true;
            }
        });
    };

    $scope.removeSpecialization = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.specializations.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.specializations[removeIndex].deleted = true;
        });
    };


    $scope.familyMemberEdit = null;

    // familyMembers table selection logic
    $scope.familyMemberSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.familyMemberEdit !== null) {
                var index1 = $scope.itemEdit.familyMembers.map(function(it) { return it.id; }).indexOf($scope.familyMemberEdit.id);
                $scope.itemEdit.familyMembers[index1].isSelected = false;
            }
            $scope.familyMemberEdit = item;
        } else {
            $scope.familyMemberEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit familyMembers dialog
    $scope.openFamilyMemberEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'humanresources/employee/tmplFamilyMemberEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlFamilyMemberEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceFamilyMember();
                    } else {
                        return $scope.familyMemberEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.familyMembers)) {
                    $scope.itemEdit.familyMembers = [];
                }
                $scope.itemEdit.familyMembers.unshift(result);
                for(i in $scope.itemEdit.familyMembers) {
                    $scope.itemEdit.familyMembers[i].isSelected = false;
                }
                $scope.familyMemberEdit = angular.extend(result);
                $scope.itemEdit.familyMembers[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.familyMembers) {
                    $scope.itemEdit.familyMembers[i].isSelected = false;
                }
                $scope.familyMemberEdit = angular.extend(result);
                var index = $scope.itemEdit.familyMembers.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.familyMembers[index][key] = result[key];
                }
                $scope.itemEdit.familyMembers[index].isSelected = true;
            }
        });
    };

    $scope.removeFamilyMember = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.familyMembers.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.familyMembers[removeIndex].deleted = true;
        });
    };


    $scope.workOnEdit = null;

    // works table selection logic
    $scope.workOnSelection = function(item, index) {
        if(item.isSelected) {
            if($scope.workOnEdit !== null) {
                var index1 = $scope.itemEdit.works.map(function(it) { return it.id; }).indexOf($scope.workOnEdit.id);
                $scope.itemEdit.works[index1].isSelected = false;
            }
            $scope.workOnEdit = item;
        } else {
            $scope.workOnEdit = null;
            item.isSelected = false;
        }
    };

    // New/Edit works dialog
    $scope.openWorkOnEditDialog = function(isNew) {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'capacitymanagement/employee/tmplWorkOnEdit.tpl.html',
            size: 'lg',
            controller: 'ctrlWorkOnEdit',
            windowClass: 'hmodal-info',
            resolve: {
                itemEdit: function() {
                    if(isNew) {
                        return new ServiceWorkOn();
                    } else {
                        return $scope.workOnEdit;
                    }
                }
            }
        }).result.then(function(result) {
            var i;
            if(isNew) {
                if(!angular.isDefined($scope.itemEdit.works)) {
                    $scope.itemEdit.works = [];
                }
                $scope.itemEdit.works.unshift(result);
                for(i in $scope.itemEdit.works) {
                    $scope.itemEdit.works[i].isSelected = false;
                }
                $scope.workOnEdit = angular.extend(result);
                $scope.itemEdit.works[0].isSelected = true;
            }
            else {
                for(i in $scope.itemEdit.works) {
                    $scope.itemEdit.works[i].isSelected = false;
                }
                $scope.workOnEdit = angular.extend(result);
                var index = $scope.itemEdit.works.map(function(it) { return it.id; }).indexOf(result.id);
                for(var key in result) {
                    $scope.itemEdit.works[index][key] = result[key];
                }
                $scope.itemEdit.works[index].isSelected = true;
            }
        });
    };

    $scope.removeWorkOn = function(item) {
        var dialog = dialogs.confirm('Please confirm', 'Are you sure you want to delete item?');
        dialog.result.then(function(btn) {
            var removeIndex = $scope.itemEdit.works.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.itemEdit.works[removeIndex].deleted = true;
        });
    };


	// Save Button
	$scope.save = function() {
		correctDateTime($scope.itemEdit.EDateOfBirth);
		correctDateTime($scope.itemEdit.EEmploymentEntryDate);
		correctDateTime($scope.itemEdit.EEmploymentDateOfLeaving);
		correctDateTime($scope.itemEdit.EEmploymentLimitation);
		correctDateTime($scope.itemEdit.EWorkingAbilityChangeDate);
	   //	delete $scope.itemEdit.isSelected;
        var item;
        var i;
        for(i in $scope.itemEdit.orderHeadings) {
    		item = $scope.itemEdit.orderHeadings[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.bankAccounts) {
    		item = $scope.itemEdit.bankAccounts[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.technologicalUnits) {
    		item = $scope.itemEdit.technologicalUnits[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.assitantOfAccountables) {
    		item = $scope.itemEdit.assitantOfAccountables[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.users) {
    		item = $scope.itemEdit.users[i];
    		delete item.isSelected;
    	}
        for(i in $scope.itemEdit.accountables) {
    		item = $scope.itemEdit.accountables[i];
    		delete item.isSelected;
    	}
		$modalInstance.close($scope.itemEdit);
	};

    var correctDateTime = function(date) {
        if(date instanceof Date && date !== '') {
            date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        }
    };

	$scope.canSave = function() {
		var item = $scope.itemEdit;
		return                 item.EPersonellNumber  &&                 item.EName  &&                 item.ELastName  &&                 item.EDateOfBirth  ;
	};

	// Clear and Close buttons
	$scope.revert = function() {
		$scope.itemEdit = angular.copy(original);
	};

	$scope.canRevert = function() {
		return !angular.equals($scope.itemEdit, original);
	};

	$scope.cancel = function() {
		$modalInstance.dismiss();
	};

}])


.controller('ctrlEmployeeChoose', ['$scope','ServiceEmployee', 'dialogs', '$modal', '$modalInstance', 'itemEdit',
function($scope, ServiceEmployee, dialogs, $modal,  $modalInstance, itemEdit) {

    // entity with properties
    $scope.itemDefinition = {
        label: 'corporation.employee',
        properties: [
            { label: 'ePersonellNumber', name:'EPersonellNumber', inTable:  true  },
            { label: 'eName', name:'EName', inTable:  true  },
            { label: 'eLastName', name:'ELastName', inTable:  true  },
            { label: 'eJobTitle', name:'EJobTitle', inTable:  false  },
            { label: 'eEmail', name:'EEmail', inTable:  false  },
            { label: 'eBirthName', name:'EBirthName', inTable:  false  },
            { label: 'eDateOfBirth', name:'EDateOfBirth', inTable:  true  },
            { label: 'eNationality', name:'ENationality', inTable:  false  },
            { label: 'eUsername', name:'EUsername', inTable:  false  },
            { label: 'eStreet', name:'EStreet', inTable:  false  },
            { label: 'eTelephone', name:'ETelephone', inTable:  false  },
            { label: 'eAccountNumber', name:'EAccountNumber', inTable:  false  },
            { label: 'eEmploymentType', name:'EEmploymentType', inTable:  false  },
            { label: 'eEmploymentWay', name:'EEmploymentWay', inTable:  false  },
            { label: 'eWorkExpirienceYY', name:'EWorkExpirienceYY', inTable:  false  },
            { label: 'eWorkExpirienceMM', name:'EWorkExpirienceMM', inTable:  false  },
            { label: 'eWorkExpirienceDD', name:'EWorkExpirienceDD', inTable:  false  },
            { label: 'eWorkExpirienceFRAYY', name:'EWorkExpirienceFRAYY', inTable:  false  },
            { label: 'eWorkExpirienceFRAMM', name:'EWorkExpirienceFRAMM', inTable:  false  },
            { label: 'eWorkExpirienceFRADD', name:'EWorkExpirienceFRADD', inTable:  false  },
            { label: 'eEmploymentEntryDate', name:'EEmploymentEntryDate', inTable:  false  },
            { label: 'eEmploymentDateOfLeaving', name:'EEmploymentDateOfLeaving', inTable:  false  },
            { label: 'eEmploymentEndReason', name:'EEmploymentEndReason', inTable:  false  },
            { label: 'eEmploymentLimitation', name:'EEmploymentLimitation', inTable:  false  },
            { label: 'eMaritialStatus', name:'EMaritialStatus', inTable:  false  },
            { label: 'eSingleParent', name:'ESingleParent', inTable:  false  },
            { label: 'eBloodType', name:'EBloodType', inTable:  false  },
            { label: 'eBloodDonor', name:'EBloodDonor', inTable:  false  },
            { label: 'eShiftWork', name:'EShiftWork', inTable:  false  },
            { label: 'eWorkingTime', name:'EWorkingTime', inTable:  false  },
            { label: 'eWorkingAbility', name:'EWorkingAbility', inTable:  false  },
            { label: 'eWorkingAbilityChangeDate', name:'EWorkingAbilityChangeDate', inTable:  false  },
            { label: 'eWeaklyWorkingHours', name:'EWeaklyWorkingHours', inTable:  false  },
            { label: 'eHolidayEntitlement', name:'EHolidayEntitlement', inTable:  false  },
            { label: 'eAnnualWageGross', name:'EAnnualWageGross', inTable:  false  },
            { label: 'eNumberOfWages', name:'ENumberOfWages', inTable:  false  },
            { label: 'eMonthlyWageGross', name:'EMonthlyWageGross', inTable:  false  },
            { label: 'eTaxIdentificationNumber', name:'ETaxIdentificationNumber', inTable:  false  },
            { label: 'eTaxOfficeNumber', name:'ETaxOfficeNumber', inTable:  false  },
            { label: 'eTaxClass', name:'ETaxClass', inTable:  false  },
            { label: 'eChildAllowance', name:'EChildAllowance', inTable:  false  },
            { label: 'eConffesion', name:'EConffesion', inTable:  false  },
            { label: 'eHealthInsurance', name:'EHealthInsurance', inTable:  false  },
            { label: 'eSocialInsuranceNumber', name:'ESocialInsuranceNumber', inTable:  false  },
            { label: 'eInsuranceGroupKeyHealthInsurance', name:'EInsuranceGroupKeyHealthInsurance', inTable:  false  },
            { label: 'eInsuranceGroupKeyPensionInsurance', name:'EInsuranceGroupKeyPensionInsurance', inTable:  false  },
            { label: 'eInsuranceGroupKeyUnemploymentInsurance', name:'EInsuranceGroupKeyUnemploymentInsurance', inTable:  false  },
            { label: 'eInsuranceGroupKeyNursingCareInsurance', name:'EInsuranceGroupKeyNursingCareInsurance', inTable:  false  },
        ]
    };

	$scope.items = [];
	$scope.itemEdit = {};

	// fill table with data
	$scope.loaded = false;
	var getEmployees = function() {
		if(!$scope.loaded && $scope.items.length === 0) {
			$scope.isLoading = true;
			ServiceEmployee.query(function(data) {
				$scope.items = data;
				$scope.isLoading = false;
				$scope.loaded = true;
				if(angular.isDefined(itemEdit)) {
					var index = $scope.items.map(function(it) { return it.id; }).indexOf(itemEdit.id);
					$scope.itemEdit = $scope.items[index];
					$scope.lastId = itemEdit.id;
				}
				else {
					$scope.itemEdit = {};
					$scope.lastId = -1;
				}
			});
		}
	};
	getEmployees();

	$scope.check = function(item) {
		if ($scope.lastId !== item.id) {
			$scope.itemEdit = item;
			$scope.lastId = item.id;
		}
		else {
			$scope.itemEdit = {};
			$scope.lastId = -1;
		}
	};

	$scope.choose = function() {
		$modalInstance.close($scope.itemEdit);
	};

	$scope.cancel = function() {
		$modalInstance.dismiss();
	};

}])
;