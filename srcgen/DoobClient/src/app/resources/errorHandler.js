'use strict';
angular.module('errorhandler', ['resources.localization'])
.factory('ErrorHandler', ['Localization', '$rootScope', function (Localization, $rootScope) {
  var ErrorHandler = {};
  
  //mapping of server response error strings to localization message keys
  var errorMessages = {
    'rsp_unknown_error': 'common.error.unknown',
    'rsp_not_loged_in': 'common.error.notLogged',
    'rsp_no_permission': 'common.error.noPermission',
    'rsp_wrong_password': 'common.error.wrongPassword',
    'rsp_login_failed': 'common.error.loginFailed',
    'default': 'common.error.unknown'    
  };

  ErrorHandler.handle = function(data) {    
    var message;
    if (data !== null) {
        if(data.status && data.status===401){
          return;
        }
        //if message is not specified, display default message
        var errordata = data.data || 'default';
        message = errorMessages[errordata];
        if (message === undefined) { 
          message = errorMessages['default']; 
        }
        //alert(Localization.getMessage(message)); 
        //$rootScope.toaster.error(Localization.getMessage(message));
        $rootScope.sweetAlert.swal(Localization.getMessage('common.error'), Localization.getMessage(message), 'error',
        function() {
              window.onkeydown = null;
              window.onfocus = null;
        });
    }   
  };

  return ErrorHandler;
}]);    