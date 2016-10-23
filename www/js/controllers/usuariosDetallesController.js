app.controller('usuariosDetallesController',
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
      $ionicModal.fromTemplateUrl('templates/modalAsignarTerritorios.html', {
            scope: $scope,
            animation: 'slide-in-up'
          }).then(function(modal) {
              $scope.modalAsignarTerritorios = modal;

            });
       $scope.niveles = [{
        id:1,
        nombre: "Administrador"
       },{
        id:3,
        nombre:"Usuario"
       }]

   territoriosService.todosTerritorios('get').ejecutar(function(data){
    console.log(data);
    $scope.territorios = data;

   }, function (error){
      console.log(error);
      alert('Ha ocurrido un error');
   });




      $scope.buttonAsignarTerritorios = function (){

        $scope.modalAsignarTerritorios.show();
        for (var i = 0; i < $scope.territorios.length; i++) {
           $scope.territorios[i].permiso = false;
        };
        for (var i = 0; i < $scope.territorios.length; i++) {
            for (var j = 0; j < $scope.usuario.permisos.territorios.length; j++) {   
               if ($scope.territorios[i]._id == $scope.usuario.permisos.territorios[j]) {
                $scope.territorios[i].permiso = true;
                }
              }
        };
        console.log($scope.territorios);
      }

      $scope.checkboxChangeTerritorio =  function (id, permisos){
        if (permisos) {
          permisos==false;
        };
        console.log(id);
        console.log(permisos);
        if (permisos==false) {
              var posicion = $scope.usuario.permisos.territorios.indexOf(id);
              console.log(posicion);
              if (0>posicion) {
                  $scope.usuario.permisos.territorios.push(id);
                  console.log($scope.usuario);
                  $scope.getPermisoTerritorio();
                };
          }
         else if(permisos==true) {
             for (var j = 0; j < $scope.usuario.permisos.territorios.length; j++) {   
               if (id==$scope.usuario.permisos.territorios[j]) {
                  $scope.usuario.permisos.territorios.splice(j,1);
                  console.log($scope.usuario);
                  $scope.getPermisoTerritorio();
               }
            };
         }

      }

$scope.getPermisoTerritorio = function(){
          console.log($scope.usuario);
          usuarioModifier = JSON.stringify($scope.usuario);
          usuariosService.unUsuario('put', $stateParams.idUsuario).ejecutar(usuarioModifier, function (data) {
              console.log(data);
           }, function (error) {
                alert(error);
                alert('Ha ocurrido un error');
          });

}




       usuariosService.unUsuario('get', $stateParams.idUsuario).ejecutar(function (data) {
                           console.log(data);
                          $scope.usuario=data;

                        }, function (error) {
                            alert(error);
                            alert('Ha ocurrido un error');
                      });

     $scope.toggle = function () {
        $scope.state = !$scope.state;
      };

      $scope.eliminarUsuario = function() {  
             var eliminarUsuarioPopup = $ionicPopup.confirm({
                          title: 'Eliminar Registro',
                          template: 'Seguro que desea eliminar este Registro'
                      }); 

              eliminarUsuarioPopup.then(function(res) {
                                 if(res) {
                                      usuariosService.unUsuario('delete', $stateParams.idUsuario).ejecutar(function (data) {
                                           console.log(data);
                                            var instructionsPopup = $ionicPopup.alert({
                                              title: 'Usuario Eliminado',
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

      $scope.modificarUsuario = function() {  
            usuarioModifier = JSON.stringify($scope.usuario);
            console.log(usuarioModifier);


             var modificarUsuarioPopup = $ionicPopup.confirm({
                          title: 'Modificar Usuario',
                          template: 'Seguro que desea modificar este Registro'
                      }); 

              modificarUsuarioPopup.then(function(res) {
                                 if(res) {
                                      usuariosService.unUsuario('put', $stateParams.idUsuario).ejecutar(usuarioModifier, function (data) {
                                           console.log(data);
                                           var instructionsPopup = $ionicPopup.alert({
                                              title: 'Usuario Modificada',
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

