'use strict';
angular.module('resources.security',[
	'resources.login',
	'resources.serviceGroups',
	'resources.services',
	'resources.users'
])
.factory('Security', ['$rootScope', '$location', 'Login',  '$q', '$resource',  'Users', 'ServiceGroups', 'Services',
	function($rootScope, $location, Login, $q, $resource, Users, ServiceGroups, Services){

	var service = {	

		sg : {}, 
		
		currentUser : {},

		login: function(credentials, success, failure) {
			service.currentUser = Login.save(JSON.stringify(credentials));
			service.currentUser.$promise.then(function (result) {
				$rootScope.currentUser = service.currentUser;
				success();
			},
			function (error) {
				failure(error);
			});
		},
		
		getCurrentUser: function(){
			if(!service.currentUser || Object.keys(service.currentUser).length === 0){//da li je recnik dict prazan: Object.keys(dict).length === 0
				service.currentUser = Users.getSelf(); 
			}
			return service.currentUser;
		},
		
		logout: function() {
			$location.path('/login');
			service.sg = {};
			service.currentUser={};
			$rootScope.currentUser = {};
			Users.callCustomGet('user/appUsers/logout').then(function(data){
				
			});
			
			/*$resource('/DoobIISServer/api/user/appUsers/logout').get();
			$location.path('/login');*/
		},
		
		getServiceGroups: function() {
			if(!service.sg || service.sg.length===0){
				service.sg = ServiceGroups.getSelf(); 
			}
			return service.sg;
		},
		
		hasServiceGroupInit:function () {
			if(!service.sg || !service.sg.length || service.sg.length===0){
				Services.getSelf().then(function (data) {			
					service.sg = data;
					$rootScope.hasServiceGroup = function (servicePath, serviceMethod) {
						for (var i = 0; i < data.length; i=i+1) {
							if ((data[i].SUri === servicePath) && (data[i].SMethod === serviceMethod)) {
								return true;
							}
						}
						return false;					
					};
				});
			}
			else{
				$rootScope.hasServiceGroup = function (servicePath, serviceMethod) {
						for (var i = 0; i < service.sg.length; i=i+1) {
							if ((service.sg[i].SUri === servicePath) && (service.sg[i].SMethod === serviceMethod)) {
								return true;
							}
						}
						return false;					
				};									
			}
		}
/*
		getAllServiceGroups:function(){
			var deferred = $q.defer();
			ServiceGroups.getSelf().then(function (data) {
				deferred.resolve(date);
			});			
			return deferred.promise;
		}*/
	};
	return service;	
}]);