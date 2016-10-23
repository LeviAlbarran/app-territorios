app.controller('zonasDetallesController',
   [ '$scope',
    '$ionicActionSheet',
    '$timeout',
    '$compile',
    
    '$stateParams',
    '$ionicModal',
    '$ionicPopup',
    '$rootScope',
    'zonasService',
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
      zonasService,
      territoriosService
      ) {
      console.log($stateParams.idZona);

       zonasService.unaZona('get', $stateParams.idZona).ejecutar(function (data) {
                           console.log(data);
                          $scope.zona=data;

                        }, function (error) {
                            alert(error);
                            alert('Ha ocurrido un error');
                      });

   territoriosService.todosTerritorios('get').ejecutar(function (data) {
                           console.log(data);
                          $scope.territorios=data;

                        }, function (error) {
                            alert(error);
                            alert('Ha ocurrido un error');
                      });




      $scope.eliminarZona = function() {  
             var eliminarZonaPopup = $ionicPopup.confirm({
                          title: 'Eliminar Registro',
                          template: 'Seguro que desea eliminar este Registro'
                      }); 

              eliminarZonaPopup.then(function(res) {
                                 if(res) {
                                      zonasService.unaZona('delete', $stateParams.idZona).ejecutar(function (data) {
                                           console.log(data);
                                            var instructionsPopup = $ionicPopup.alert({
                                              title: 'Zona Eliminada',
                                              template: ''
                                            });
                                           history.back(1);

                                        }, function (error) {
                                            alert(error);
                                            alert('Ha ocurrido un error');
                                      });
                        

                                 } else {
                                   console.log('cancelado');
                                 }

                 });
           }  

      $scope.modificarZona = function() {  
            zonaModifier = JSON.stringify($scope.territorio);
            console.log(zonaModifier);


             var modificarZonaPopup = $ionicPopup.confirm({
                          title: 'Modificar Zona',
                          template: 'Seguro que desea modificar este Registro'
                      }); 

              modificarZonaPopup.then(function(res) {
                                 if(res) {
                                      zonasService.unaZona('put', $stateParams.idZona).ejecutar(zonaModifier, function (data) {
                                           console.log(data);
                                           var instructionsPopup = $ionicPopup.alert({
                                              title: 'Zona Modificada',
                                              template: ''
                                            });

                                           history.back(1);
                                        }, function (error) {
                                            alert(error);
                                            alert('Ha ocurrido un error');
                                      });
                        

                                 } else {
                                   console.log('cancelado');
                                 }

                 });
           }



    }]);

