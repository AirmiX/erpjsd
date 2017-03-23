'use strict';

angular.module('Doob.common')
.controller('ctrlGeneralEdit',['$scope','$injector','$filter','ServiceUtil', 'Localization',
function($scope,$injector,$filter,ServiceUtil, Localization){
	/*$scope.model=$scope.model;
	$scope.all=$scope.all;
	$scope.current=$scope.current;
	$scope.modalInstance=$scope.modalInstance;*/
    
    $scope.localization = Localization;
    
	$scope.errors={};

	$scope.initializeRelationships=function(){
		//initialize relationships
		if($scope.model.relationships) {
			for(var ind=0;ind<$scope.model.relationships.length;ind=ind+1){
				if(!$scope.itemEdit[$scope.model.relationships[ind].name]){
					if($scope.model.relationships[ind].type==='one'){
						$scope.itemEdit[$scope.model.relationships[ind].name]={};
						$scope.originalItem[$scope.model.relationships[ind].name]={};
					}
					if($scope.model.relationships[ind].type==='many'){
						$scope.itemEdit[$scope.model.relationships[ind].name]=[];
						$scope.originalItem[$scope.model.relationships[ind].name]=[];
					}
				}			
			}
		}
	};

	/*$scope.numberToEnum=function(item,model){
		for(var ind=0;ind<model.fields.length;ind=ind+1){
			if(model.fields[ind].enumValues){
				//if field is empty
				if(!item[model.fields[ind].name]){
					item[model.fields[ind].name]=model.fields[ind].enumValues[0];
				}
			}			
		}
	};*/

	$scope.initializeObjects=function(){
		$scope.initializeRelationships();
		/*new ServiceUtil().fromNumberToEnum($scope.itemEdit,$scope.model,true);
		$scope.numberToEnum($scope.itemEdit,$scope.model);*/
	};

	$scope.removeEmptyObjects=function(){
		if(angular.isDefined($scope.model.relationships)) {
			for(var ind=0;ind<$scope.model.relationships.length;ind=ind+1){
				if($scope.model.relationships[ind].type==='one'){
					if(!($scope.itemEdit[$scope.model.relationships[ind].name].id)){
						$scope.itemEdit[$scope.model.relationships[ind].name]=null;
						$scope.originalItem[$scope.model.relationships[ind].name]=null;
					}
				}
			}
		}
	};

	$scope.inizializeBoolean=function(){
		for(var ind=0;ind<$scope.model.fields.length;ind=ind+1){
			if($scope.model.fields[ind].type==='checkbox'){
				if(!$scope.itemEdit[$scope.model.fields[ind].name]){
					$scope.itemEdit[$scope.model.fields[ind].name]=false;
				}
			}
		}
	};

	$scope.prepareToSave=function(){
		$scope.removeEmptyObjects();
		$scope.inizializeBoolean();
		/*new ServiceUtil().fromEnumToNumber($scope.itemEdit,$scope.model,true);*/
	};

	$scope.validationType={
		integer:{
			regexp:'^(?:(?:^[1-9][0-9]*)|0)?$',
			message:'The field has to be integer'
		},
		double:{
			regexp:'^(?:[0-9]+\\.?[0-9]*)?$',
			message:'The field has to be double'
		}
	};

	$scope.validateKey=function(field){
		if(field.key) {
			for(var ind=0;ind<$scope.model.fields.length;ind=ind+1){
				if($scope.model.fields[ind].key && $scope.itemEdit[$scope.model.fields[ind].name]) {
					return true;
				}
			}
		}

	};

	$scope.validate=function(){
		$scope.valid=true;
		for(var ind=0;ind<$scope.model.fields.length;ind=ind+1){
				var field=$scope.model.fields[ind];
				if(field.validation.required){
					if((!$scope.itemEdit[field.name] || $scope.itemEdit[field.name].length===0) && field.type!=='checkbox'){
						$scope.errors[field.name]='The filed is required';
						$scope.valid=false;
					}else{
						$scope.errors[field.name]=undefined;
					}
				}
				if(field.customValidation){
					for(var valInd=0;valInd<field.customValidation.length;valInd=valInd+1){
						if(!new RegExp(field.validation.customValidation[valInd].regexp)
							.test($scope.itemEdit[field.name])){
							$scope.errors[field.name]=field.validation.customValidation[valInd].message;
							$scope.valid=false;
						}else{
							$scope.errors[field.name]=undefined;
						}
					}
				}
				if($scope.validationType[field.validation.vType]){
					if($scope.itemEdit[field.name]){
						if(!new RegExp($scope.validationType[field.validation.vType].regexp)
							.test($scope.itemEdit[field.name])){
							$scope.errors[field.name]=$scope.validationType[field.validation.vType].message;
							$scope.valid=false;
						}else{
							$scope.errors[field.name]=undefined;
						}
					}
				}
				if(field.dateFormat){
					if($scope.itemEdit[field.name]){
						$scope.itemEdit[field.name] = $filter('date')($scope.itemEdit[field.name], field.dateFormat);
						if(!$scope.itemEdit[field.name]){
							$scope.errors[field.name]='Bad date format ('+field.dateFormat+')';
							$scope.valid=false;
						}else{
							$scope.errors[field.name]=undefined;
						}
					}
				}

			}
			if($scope.validpk.valid === false) {
				$scope.valid=false;
			}
		return $scope.valid;
	};

	$scope.validpk = {valid:true};
	$scope.valid=false;

	$scope.service=$injector.get($scope.model.serviceName);
	if(!$scope.current){
		$scope.current=new $scope.service();
	}

	if($scope.model && $scope.current){
		$scope.originalItem=angular.copy($scope.current);
		$scope.itemEdit=angular.copy($scope.current);
		$scope.initializeObjects();

		if($scope.originalItem.id){
			$scope.originalItem.$getEager(function(item){
				$scope.originalItem=angular.copy(item);
				$scope.itemEdit=angular.copy(item);
				$scope.initializeObjects();
			});
			$scope.save=function(){
				if($scope.validate()){
					$scope.prepareToSave();
					$scope.itemEdit.$update(function(item){
						/*$scope.numberToEnum(item,$scope.model);*/
						angular.copy(item,$scope.current);
						$scope.current.isSelected=true;
						$scope.modalInstance.close();
					});
				}
			};
		}else{
			$scope.save=function(){
				if($scope.validate()){
					$scope.prepareToSave();
					$scope.itemEdit.$save(function(savedObject){
						/*$scope.numberToEnum(savedObject,$scope.model);*/
						$scope.all.push(savedObject);
						$scope.current.isSelected=true;
						$scope.modalInstance.close();
					});	
				}
			};
		}
	}
	
	$scope.cancel=function(){
		$scope.modalInstance.close();
	};

	$scope.undoChanges=function(){
		$scope.itemEdit=angular.copy($scope.originalItem);
	};

}]);
