app.controller('nuevaZonaController',
   [ '$scope',
    '$ionicActionSheet',
    '$timeout',
    '$compile',
    
    '$stateParams',
    '$ionicModal',
    '$ionicPopup',
    '$rootScope',
    '$stateParams',
    'zonasService',
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
      zonasService
      ) {
 
    $scope.newZona = {
       'nombre' : '',
       'territorio' : ''
    };
   $scope.guardarZona = function(zona) {
        zona = JSON.stringify($scope.newZona);
        console.log(zona);

        zonasService.todasZonas('post').ejecutar(zona, function (data) {
                             var instructionsPopup = $ionicPopup.alert({
                              title: 'Zona Agregada',
                              template: ''
                            });
                             history.back(1);
                        }, function (error) {
                            alert(error);
                            alert('Ha ocurrido un error');
                      });
     //   $scope.locationsObj.savedLocations.push($scope.newTerritorio);
      };



    }]);
