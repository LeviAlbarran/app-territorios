app.controller('zonasController',
   [ '$scope',
    '$ionicActionSheet',
    '$timeout',
    '$compile',
    
    '$stateParams',
    '$ionicModal',
    '$ionicPopup',
    
    'zonasService',
    function(
      $scope,
      $ionicActionSheet,
      $timeout,
      $compile,
     
      $stateParams,
      $ionicModal,
      $ionicPopup,
      zonasService
      ) {




   zonasService.todasZonas('get').ejecutar(function (data) {
                           console.log(data);
                          $scope.zonas=data;

                        }, function (error) {
                            alert(error);
                                                       console.log(error);
                            alert('Ha ocurrido un error');
                      });

    }]);

