app.controller('nuevoTerritorioController',
   [ '$scope',
    '$ionicActionSheet',
    '$timeout',
    '$compile',
    
    '$stateParams',
    '$ionicModal',
    '$ionicPopup',
    '$rootScope',
    '$stateParams',
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
      $stateParams,
      territoriosService
      ) {
 
 $scope.newTerritorio = {
    'nombre' : ''
  };


   $scope.guardarTerritorio = function(territorio) {
        territorio = JSON.stringify($scope.newTerritorio);
        console.log(territorio);

        territoriosService.todosTerritorios('post').ejecutar(territorio, function (data) {
                             var instructionsPopup = $ionicPopup.alert({
                              title: 'Territorio Agregado',
                              template: ''
                            });
                        }, function (error) {
                            alert(error);
                            alert('Ha ocurrido un error');
                      });
     //   $scope.locationsObj.savedLocations.push($scope.newTerritorio);
      };



    }]);
