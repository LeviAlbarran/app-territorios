app.controller('direccionesDetallesController',
   [ '$scope',
    '$ionicActionSheet',
    '$timeout',
    '$compile',
    
    '$stateParams',
    '$ionicModal',
    '$ionicPopup',
    '$rootScope',
    'directionService',
    function(
      $scope,
      $ionicActionSheet,
      $timeout,
      $compile,
     
      $stateParams,
      $ionicModal,
      $ionicPopup,
      $rootScope,
      directionService
      ) {
      console.log($stateParams.idDireccion);

       directionService.unaDireccion('get', $stateParams.idDireccion).ejecutar(function (data) {
                           console.log(data);
                          $scope.direccion=data;

                        }, function (error) {
                            alert(error);
                            alert('Ha ocurrido un error');
                      });

      $scope.eliminarDireccion = function() {  
             var eliminarDireccionPopup = $ionicPopup.confirm({
                          title: 'Eliminar Registro',
                          template: 'Seguro que desea eliminar este Registro'
                      }); 

              eliminarDireccionPopup.then(function(res) {
                                 if(res) {
                                      directionService.unaDireccion('delete', $stateParams.idDireccion).ejecutar(function (data) {
                                           console.log(data);
                                            var instructionsPopup = $ionicPopup.alert({
                                              title: 'Direccion Eliminada',
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

      $scope.modificarDireccion = function() {  
            direccionModifier = JSON.stringify($scope.territorio);
            console.log(direccionModifier);


             var modificarZonaPopup = $ionicPopup.confirm({
                          title: 'Modificar Direccion',
                          template: 'Seguro que desea modificar este Registro'
                      }); 

              modificarDireccionPopup.then(function(res) {
                                 if(res) {
                                      directionService.unaDireccion('put', $stateParams.idDireccion).ejecutar(direccionModifier, function (data) {
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

