app.controller('usuariosController',
   [ '$scope',
    '$ionicActionSheet',
    '$timeout',
    '$compile',
    
    '$stateParams',
    '$ionicModal',
    '$ionicPopup',
    
    'usuariosService',
    function(
      $scope,
      $ionicActionSheet,
      $timeout,
      $compile,
     
      $stateParams,
      $ionicModal,
      $ionicPopup,
      usuariosService
      ) {




   usuariosService.todosUsuarios('get').ejecutar(function (data) {
                           console.log(data);
                          $scope.usuarios=data;

                        }, function (error) {
                            alert(error);
                             console.log(error);
                            alert('Ha ocurrido un error');
                      });

    }]);

