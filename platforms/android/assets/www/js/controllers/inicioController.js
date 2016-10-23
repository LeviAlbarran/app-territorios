app.controller('inicioController',
  [ '$scope',
    '$ionicActionSheet',
    '$timeout',
    '$compile',
    
    '$stateParams',
    '$ionicModal',
    '$ionicPopup',
    '$rootScope',
    'territoriosService',
    function(
      $scope,
      $ionicActionSheet,
      $timeout,
      $compile,
     
      $stateParams,
      $ionicModal,
      $ionicPopup,
      $rootScope,
      territoriosService
      ) {
 console.log("ad");
      $scope.login = function(){
        console.log("login");
        $cordovaOauth.google(" 197876690363-7edo6dfkpob9eupl44ivsr1fjunk5chf.apps.googleusercontent.com ", ["levianderson.laal@gmail.com"]).then(function(result) {
        console.log("Response Object -> " + JSON.stringify(result));
        }, function(error) {
            console.log("Error -> " + error);
        });

      }
    }]);

