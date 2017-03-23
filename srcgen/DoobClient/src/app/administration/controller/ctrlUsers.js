'use strict';
angular.module('Doob.administration')
.controller('ctrlUsers',['$scope', '$rootScope', 'ServiceUsers', 'dialogs', '$modal', 'CheckSelected',
function($scope, $rootScope, ServiceUsers, dialogs, $modal, CheckSelected){
    
    
    $scope.propsUser = ['UIdentificationCode', 'UUsername'];
    $scope.propsUserGroups = ['UGIdentificationCode', 'UGName'];
    
    $scope.items=[];
    $scope.mode = 'details';
    $scope.flagMultiple = false; 
    $scope.loaded = false;
    $scope.callServer = function getData(tableState) {
        if(!$scope.loaded && $scope.items.length === 0) {
                $scope.isLoading = true;
                $scope.loaded = true;
                ServiceUsers.query(function(items) {
                    $scope.items=items;
                    $scope.isLoading = false;
                });
        }
    };
                
    $scope.callServer();
    $scope.itemEdit = null;
    $scope.selection = function(item, index) {
                if(item.isSelected) {
                    if($scope.itemEdit !== null) {
                        var index1 = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
                        $scope.items[index1].isSelected = false;
                    }
                    item.$getEager(function (item) {
                        $scope.itemEdit = item;                     
                    });
                } else {                
                    $scope.itemEdit  = null;
                    item.isSelected = false;                 
                }            
    };
    
    $scope.$watch('showDisplay', function () {
      $scope.itemEdit = CheckSelected.checkSelectedInTable($scope.itemEdit, $scope.showDisplay, $scope.prices);
    });

    $scope.remove=function(item){
        /*var dlg = dialogs.confirm('Please confirm', 'Are you sure you want to delete item ' + item.UIdentificationCode + ' ' + item.UUsername + ' ?');
        dlg.result.then(function(btn) {
            var removeIndex = $scope.items.map(function(it) { return it.id; }).indexOf(item.id);
            $scope.items.splice(removeIndex, 1);
            item.$remove();
            $scope.itemEdit  = null;
        });*/ 
        $rootScope.sweetAlert.swal($rootScope.swalOptions,
          function (isConfirm) {
            if (isConfirm) {
                item.$remove(function(){
                    var removeIndex = $scope.items.map(function(it) { return it.id; }).indexOf(item.id);
                    $scope.items.splice(removeIndex, 1);
                    $scope.itemEdit = null;
                    $rootScope.deleteConfirmationDialog(item.UIdentificationCode + ' ' + item.UUsername);
                  }
                );
            }
            window.onkeydown = null;
            window.onfocus = null;
        });
    };

    $scope.openEditDialog=function(isNew){       
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'administration/template/tmpUsersEdit.tpl.html', 
            size: 'lg',
            windowClass: 'hmodal-info',
            controller: 'ctrlUsersEdit',
            resolve: {
                    isNew: function() {
                        return isNew;                   
                    },
                    selectedItem: function () {
                        if(!isNew) {
                            return $scope.itemEdit;
                        } else {
                            return new ServiceUsers();
                        }
                    }                    
            }
        }).result.then(function(result) {
            
           if(!angular.isDefined(result.id)) {
                ServiceUsers.saveCustom( 'user/appUsers', result, function(savedObject){
                    $scope.items.unshift(savedObject);
                    if($scope.itemEdit !== null) {
                        var index = $scope.items.map(function(it) { return it.id; }).indexOf($scope.itemEdit.id);
                        $scope.items[index].isSelected = false;
                    }
                    $scope.itemEdit = angular.extend(savedObject);
                    $scope.items[0].isSelected = true;
                }); 
           } else {
                delete $scope.itemEdit.isSelected;
               ServiceUsers.updateCustom( '/user/appUsers/'+result.id, result, function(savedObject){                    
                    $scope.itemEdit = angular.extend(savedObject);                                                                              
                    var index = $scope.items.map(function(it) { return it.id; }).indexOf(savedObject.id);
                    for (var key in result) {                    
                        $scope.items[index][key] = savedObject[key];
                    }                                  
                    $scope.items[index].isSelected = true;
                   
                });
           }
        });               
    };
 
}])

.controller('ctrlUsersEdit',['$scope', 'ServiceUsers', 'ServiceUserGroups', 'ServiceLanguage',  '$modal', 'isNew', '$modalInstance', 'selectedItem', '$filter',
function($scope, ServiceUsers, ServiceUserGroups, ServiceLanguage, $modal, isNew, $modalInstance, selectedItem, $filter) {
    $scope.mode = 'edit';
    $scope.propsUserGroups = ['UGIdentificationCode', 'UGName'];
    $scope.undoChanges=function(){
        $scope.itemEdit=angular.copy(selectedItem);
        if(!isNew)  {
            $scope.itemEdit.UPassword = 'passtest';
        }
    };

    

    ServiceLanguage.query(function(items) {
            $scope.itemLanguages=items; 
            if(!isNew) {
                var index = $scope.itemLanguages.map(function(it) { return it.id; }).indexOf(selectedItem.language.id);
                $scope.itemEdit.language = $scope.itemLanguages[index];
                
            }
        });
    
    $scope.undoChanges();
    $scope.userGroups = [];
    if(isNew)  {        
        ServiceUsers.callCustomGet('user/appUsers/max').then(function(item) {
            $scope.itemEdit.UIdentificationCode = item.max+1;
            selectedItem.UIdentificationCode = item.max+1;
        });
    }else {
        
        for(var i=0;i<selectedItem.userGroups.length;i=i+1) {
            $scope.userGroups.push(selectedItem.userGroups[i]);
        } 
        $scope.itemEdit.UPassword = 'passtest';
    }

    $scope.cancel=function(){
        $modalInstance.dismiss();
    };

    $scope.save=function(){
           $modalInstance.close($scope.itemEdit);     
    };

    $scope.openChooseDialogUserGroups = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'administration/template/tmpUserGroupsView.tpl.html', 
            size: 'lg',
            controller: 'ctrlUserGroupsChoose',
            windowClass: 'hmodal-info',
            resolve : {
                userGroups: function () {
                    return $scope.userGroups;
                },
                itemEdit: function () {
                    return $scope.itemEdit;
                }
            }
        }).result.then(function(result) {
            $scope.itemEdit.userGroups = result;
        });
    };

    $scope.openChooseDialogEmployee = function() {
        $modal.open({
            backdrop: 'static',
            keyboard : false,
            templateUrl: 'corporation/template/tmplEmployeeView.tpl.html', 
            size: 'lg',
            controller: 'ctrlEmployeeChoose',
            windowClass: 'hmodal-info',
            resolve : {
                employee: function () {
                    return $scope.itemEdit.employee;
                }
            }
        }).result.then(function(result) {
            $scope.itemEdit.employee = {};
            $scope.itemEdit.employee = angular.copy(result);
            delete $scope.itemEdit.employee.isSelected;
        });
    };
}])

.controller('ctrlChangePass', ['$scope', 'ServiceUsers', '$location',
  function($scope, ServiceUsers, $location) {  
  $scope.pass = {}; //helper object for password validation

  var back = function() {
    $location.path('/');
  };

  $scope.save = function() {
    var successcb = function() {
      //alert($scope.localization.getMessage('administration.users.passwordChanged'));
      $scope.sweetAlert.swal($scope.localization.getMessage('common.success'), $scope.localization.getMessage('administration.users.passwordChanged'), 'success');
      back();
    };

    var errorcb = function() {
      //alert($scope.localization.getMessage('administration.users.passwordNotChanged'));
      $scope.sweetAlert.swal($scope.localization.getMessage('common.error'), $scope.localization.getMessage('administration.users.passwordNotChanged'), 'error');
    };

    ServiceUsers.saveCustom('user/appUsers/changePassword', 
      {'currentPassword':$scope.pass.oldPassword, 
       'newPassword':$scope.pass.newPassword
      }, successcb, errorcb);   
  };

  $scope.cancel = function() {
    back();
  };
}])

;	
