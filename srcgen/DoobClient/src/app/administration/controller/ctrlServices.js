'use strict';
angular.module('Doob.administration')
.controller('ctrlServicesChoose',['$scope', '$rootScope', 'ServiceServices', 'dialogs', '$modal', 'services', 'itemEdit',  '$modalInstance',
function($scope, $rootScope, ServiceServices, dialogs, $modal, services, itemEdit, $modalInstance){
   $scope.propsServices = ['SUri', 'SMethod'];
    
    $scope.items=[];
    $scope.flagMultiple = true;
    $scope.services = services;
    $scope.loaded = false;

    /*$scope.callServer = function getData(tableState) {
        if(!$scope.loaded && $scope.items.length === 0) {
                $scope.isLoading = true;
                $scope.loaded = true;
                ServiceServices.query(function(items) {
                    $scope.items=items;
                    $scope.isLoading = false;
                });
        }
    };*/

    $scope.callServer = function getData(tableState) {
        $scope.isLoading = true;
        console.log(tableState);
        ServiceServices.allPagingSearch(
            1+(tableState.pagination.number?tableState.pagination.start/tableState.pagination.number:0),
            null,
            tableState.sort.predicate,
            tableState.sort.reverse,
            tableState.search.predicateObject,
            function(items) {
            if(items && items.data){
                if(tableState.pagination.start===0){
                    $scope.items=[];
                }
                $scope.items.push.apply($scope.items,items.data);
                /*new ServiceUtil().fromNumberToEnumList($scope.items,$scope.model,false);*/
            }
            $scope.isLoading = false;
        });
    };
                
    //$scope.callServer();
    
    $scope.uncheck = function (item) {
       var index = $scope.services.map(function(it) { return it.id; }).indexOf(item.id);
       if(index !== -1) {
           var indexRemove = itemEdit.services.map(function(it) { return it.id; }).indexOf(item.id);
            itemEdit.services.splice(indexRemove, 1);
       } else {
           itemEdit.services.push(item);
       }        
    };
    
    $scope.cancel=function(){
        $modalInstance.dismiss();
    };
    
    $scope.choose=function(){
        $modalInstance.close($scope.services);
    };    
    
}]);    	
