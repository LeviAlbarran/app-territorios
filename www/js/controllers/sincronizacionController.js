app.controller('sincronizacionController',
   [ '$scope',
    '$ionicActionSheet',
    '$timeout',
    '$compile',
    '$location',
    '$stateParams',
    '$ionicModal',
    '$ionicPopup',
    '$rootScope',
    'directionService',
    'territoriosService',
    'usuariosService',
    'directionTMPService',      
    'localstorageService',
    function(
      $scope,
      $ionicActionSheet,
      $timeout,
      $compile,
      $location,
      $stateParams,
      $ionicModal,
      $ionicPopup,
      $rootScope,
      directionService,
      territoriosService,
      usuariosService,
      directionTMPService,      
      localstorageService
      ) {
      $scope.dataSincronizacion = {};
      
      if (localStorage.getItem('dataSincronizacion')) {
        $scope.dataSincronizacion = JSON.parse(localStorage.getItem('dataSincronizacion'));
        console.log($scope.dataSincronizacion);
      }
      
      $scope.buttonSync = function(){
        console.log($scope.dataSincronizacion);
        localstorageService.sincronizacion('post').ejecutar($scope.dataSincronizacion, function (data) {
            console.log(data);
            localStorage.removeItem('dataSincronizacion');
            $scope.getDirecciones();
        }, function(error){
          console.log(error);

        });
          

/*        if ($scope.direccionesNuevas){
        directionService.todasDirecciones('post').ejecutar($scope.direccionesNuevas, function (data) {
            console.log(data);
            localStorage.removeItem('direccionesNuevas')
            $scope.getDirecciones();
          }, function(error){ 
            console.log(error);
          })
        }else{
          $scope.getDirecciones();
        }*/

      };

      $scope.getDirecciones = function(){
        var arrayDirecciones = [];
         directionService.todasDirecciones('get').ejecutar(function (data) {
            console.log(data);
            arrayDirecciones = data;
            directionTMPService.todasDirecciones('get').ejecutar(function (data) {
              console.log(data);
              arrayDirecciones = arrayDirecciones.concat(data)
              localStorage.setItem('direccionesSync', JSON.stringify(arrayDirecciones));    
            }, function(error){ 
              console.log(error);
            });
          }, function(error){ 
            console.log(error);
          });
      }

    }]);

