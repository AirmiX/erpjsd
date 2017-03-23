'use strict';

angular.module('Doob.common')
.factory('restResource', ['$resource', '$rootScope', 'ErrorHandler',  function($resource, $rootScope, ErrorHandler){
    
	function RestResourceFactory(collectionName) {
		
    var thenFactoryMethod = function(resourcePromise, successcb, errorcb, isVoid) {
    var scb = successcb || angular.noop;
    var ecb = errorcb || defaultErrorCb; //if errorcb is not specified, set default errorcb

    return resourcePromise.$promise.then(function (data) { //on success
        var result;
        if (!isVoid) { //if rest returns bean object or an array of bean objects
          var isArray = data instanceof Array;
          if (isArray) {
            result = [];
            for (var i = 0; i < data.length; i=i+1) {
            result.push(new Resource(data[i])); //fill ret val array object
            }	
          } else if(data.data && data.data instanceof Array){
            result = {};
            result.data = [];
            result.count = data.count;
            for (var j = 0; j < data.data.length; j=j+1) {
              result.data.push(new Resource(data.data[j])); //fill ret val array object
            } 
          } else {
            result = new Resource(data); //if not array, create a single resource instance
          }
        } 
        scb(result); //call success callback
        return result;
      }, function (data) { //on error	
        ecb(data);
        return undefined;
      });
    };  

    var defaultErrorCb = function(data) {
      //ErrorHandler.handle(data);
      //$rootScope.toaster.error('Error');
      //$rootScope.sweetAlert.swal('Cancelled', 'Your imaginary file is safe :)', 'error');
      ErrorHandler.handle(data);
    }; 
   
    var Resource = function (data) {
      angular.extend(this, data);
    };	
    
    Resource.query = function (cb, errorcb) { 
		var resourceCaller = $resource('SERVER/' + collectionName + '/');
		return thenFactoryMethod(resourceCaller.query(), cb, errorcb);
    };

    //query to be passed to paging functions
    var pagingQuery = {
      query: {
            method: 'GET',
            transformResponse: function (data, headers) { //when transforming the response, the total count of sent elements is taken from a header
              var retVal = {};
              if (data && data.length > 0) {
                try{
                  retVal.data = JSON.parse(data);
                }
                catch(err){
                  //console.log(err.stack);
                }
              } else {
                retVal.data = [];
              }
              if(headers().count){              
                retVal.count = headers().count;
              }
              return retVal; 
            }
        }
    };

    Resource.getCollectionName = function(){
      return collectionName;
    };


    Resource.allPaging = function (page, search, sort, sortDirection, cb, errorcb) {
      var resourceCaller = $resource('SERVER/' + collectionName,
        {page:page, search:search, sort:sort, sortDirection:sortDirection},
         pagingQuery);
      
      return thenFactoryMethod(resourceCaller.query(), cb, errorcb);
    };

    Resource.allPagingSearch = function (page, search, sort, sortDirection, searchParamMap, cb, errorcb) {
      var params = {page:page, search:search, sort:sort, sortDirection:sortDirection};
      for (var property in searchParamMap) {
        if (searchParamMap.hasOwnProperty(property)) {
          params['s_'+property] = searchParamMap[property];
        }
      }
      var resourceCaller = $resource('SERVER/' + collectionName,
          params, pagingQuery);    
      
      return thenFactoryMethod(resourceCaller.query(), cb, errorcb);
    };    

    Resource.allCount = function (search, cb, errorcb) {
      var resourceCaller = $resource('SERVER/' + collectionName + '/count', {searchParam:search});
      return thenFactoryMethod(resourceCaller.get(), cb, errorcb);
    };
    
    Resource.callCustomQuery = function (path, cb, errorcb, parameters) {
      var resourceCaller = $resource('SERVER/' + path + '/', parameters);
      return thenFactoryMethod(resourceCaller.query(), cb, errorcb);
    };

    Resource.callCustomPagingQuery = function (path, page, search, sort, sortDirection, cb, errorcb) {
      var resourceCaller = $resource('SERVER/' + path, 
        {page:page, search:search, sort:sort, sortDirection:sortDirection}, 
         pagingQuery);
      return thenFactoryMethod(resourceCaller.query(), cb, errorcb);
    };

    //paging by custom query and search params defined separately by fields
    Resource.callCustomPagingSearchQuery = function (path, page, search, 
      sort, sortDirection, searchParamMap, cb, errorcb) {
      var params = {page:page, search:search, sort:sort, sortDirection:sortDirection};
      for (var property in searchParamMap) {
        if (searchParamMap.hasOwnProperty(property)) {
          params[property] = searchParamMap[property];
        }
      }
      var resourceCaller = $resource('SERVER/' + path, 
        params, pagingQuery);
      return thenFactoryMethod(resourceCaller.query(), cb, errorcb);
    };

    Resource.callCustomGet = function (path, cb, errorcb) {
      var resourceCaller = $resource('SERVER/' + path + '/');
      return thenFactoryMethod(resourceCaller.get(), cb, errorcb);
    };

    Resource.callCustomGetWithParameters = function (path, parameters, cb, errorcb) {
      var resourceCaller = $resource('SERVER/' + path + '/', parameters);
      return thenFactoryMethod(resourceCaller.get(), cb, errorcb);
    };

    Resource.getById = function (id, successcb, errorcb) {
		var resourceCaller = $resource('SERVER/' + collectionName + '/' + id);
		return thenFactoryMethod(resourceCaller.get(), successcb, errorcb);
    };

    Resource.getSelf = function (successcb, errorcb) {
      var resourceCaller = $resource('SERVER/' + collectionName + '/self');
      return thenFactoryMethod(resourceCaller.query(), successcb, errorcb);
    };

    Resource.findBy = function(searchValue, successcb, errorcb) {
      var resourceCaller = $resource('SERVER/' + collectionName + '/search?searchParam=' + searchValue);
      return thenFactoryMethod(resourceCaller.query(), successcb, errorcb);
    };

    Resource.updateCustom = function (url, data, successcb, errorcb) {
      var resourceCaller = $resource('SERVER/' + url, 
        {}, 
        { 'update': { method:'PUT' } });
      return thenFactoryMethod(resourceCaller.update(data), successcb, errorcb);
    };

    Resource.saveCustom = function (url, data, successcb, errorcb) {
      var resourceCaller = $resource('SERVER/' + url);
      return thenFactoryMethod(resourceCaller.save(data), successcb, errorcb);
    };
    
    Resource.prototype.$getEager = function (successcb, errorcb) {
      var resourceCaller = $resource('SERVER/' + collectionName + '/' +this.$id()+ '/eager');
      return thenFactoryMethod(resourceCaller.get(), successcb, errorcb);
    };
	
    //instance methods

    Resource.prototype.$id = function () {
      return this.id;
    };

    Resource.prototype.$save = function (successcb, errorcb) {
      var resourceCaller = $resource('SERVER/' + collectionName + '/');
      return thenFactoryMethod(resourceCaller.save(this), successcb, errorcb);
    };

    Resource.prototype.$update = function (successcb, errorcb) {	
      var resourceCaller = $resource('SERVER/' + collectionName + '/' + this.$id(), {}, {
        'update': { method:'PUT' }
      });
      return thenFactoryMethod(resourceCaller.update(this), successcb, errorcb);
    };

    Resource.prototype.$remove = function (successcb, errorcb) {
      var resourceCaller = $resource('SERVER/' + collectionName + '/' + this.$id());
      return thenFactoryMethod(resourceCaller.remove(), successcb, errorcb, true);
    };

    Resource.prototype.$saveOrUpdate = function (savecb, updatecb, errorSavecb, errorUpdatecb) {
      if (this.$id()) {
        return this.$update(updatecb, errorUpdatecb);
      } else {
        return this.$save(savecb, errorSavecb);
      }
    };

    return Resource;
  }
  return RestResourceFactory;
}]);
