app.controller('miPerfilController',
   [ '$scope',
    '$ionicActionSheet',
    '$timeout',
    '$compile',
    
    '$stateParams',
    '$ionicModal',
    '$ionicPopup',
    '$rootScope',
    'usuariosService',
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
      usuariosService,
      territoriosService
      ) {
      console.log($stateParams.idUsuario);

       usuariosService.unUsuario('get', $rootScope.miUsuario._id).ejecutar(function (data) {
                           console.log(data);
                          $scope.usuario=data;

                        }, function (error) {
                            alert(error);
                            alert('Ha ocurrido un error');
                      });

  

      $scope.modificarUsuario = function() {  
            usuarioModifier = JSON.stringify($scope.usuario);
            console.log(usuarioModifier);


             var modificarUsuarioPopup = $ionicPopup.confirm({
                          title: 'Guardar',
                          template: 'Seguro que desea modificar su perfil?'
                      }); 

              modificarUsuarioPopup.then(function(res) {
                                 if(res) {
                                      usuariosService.unUsuario('put', $rootScope.miUsuario._id).ejecutar(usuarioModifier, function (data) {
                                           console.log(data);
                                           var instructionsPopup = $ionicPopup.alert({
                                              title: 'Su perfil ha sido modificado exitosamente!',
                                              template: 'Si desea ver los cambios inicie sesion nuevamente'
                                            });

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

