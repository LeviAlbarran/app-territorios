app.controller('territoriosController',
   [ '$scope',
    '$ionicActionSheet',
    '$timeout',
    '$compile', 
    '$stateParams',
    '$ionicModal',
    '$ionicPopup',
    '$rootScope',
    '$auth',
    'territoriosService',
    'usuariosService',
    
    function(
      $scope,
      $ionicActionSheet,
      $timeout,
      $compile,
      $stateParams,
      $ionicModal,
      $ionicPopup,
      $rootScope,
      $auth,
      territoriosService,
      usuariosService      
      ) {


    var auth = $auth.getPayload();
    console.log(auth);

   usuariosService.unUsuario('get', auth.sub).ejecutar(function (data) {
                           console.log(data);
                           $scope.permisos= data.permisos.territorios; 
                           $scope.getPermisosTerritorios(data);
                        }, function (error) {
                            alert(error);
                            alert('Ha ocurrido un error');
                      });


arrayTerritorios=[];
$scope.getPermisosTerritorios = function(permisos){
    territoriosService.todosTerritorios('get').ejecutar(function (data) {
                      console.log(data);
                      var todosTerritorios = data;
                      console.log($scope.permisos);
                      if (permisos.nivel== 1) {
                           $scope.territorios= todosTerritorios;           
                         }else{
                          for (var j = 0; j < $scope.permisos.length; j++) {                     
                              for (var i = 0; i < todosTerritorios.length; i++) {
                                  if($scope.permisos[j]==todosTerritorios[i]._id){  
                                  arrayTerritorios.push({_id: todosTerritorios[i]._id, nombre: todosTerritorios[i].nombre});
                                  } 
                              }                          
                           };
                          console.log(arrayTerritorios);
                          $scope.territorios= arrayTerritorios;
                         }
                        
                        }, function (error) {
                            alert(error);
                            alert('Ha ocurrido un error');
                      });
    }


    }]);

