app.controller('territoriosDetallesController',
   [ '$scope',
    '$ionicActionSheet',
    '$timeout',
    '$compile',
    
    '$stateParams',
    '$ionicModal',
    '$ionicPopup',
    '$rootScope',
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
      territoriosService
      ) {
      console.log($stateParams.idTerritorios);

       territoriosService.unTerritorio('get', $stateParams.idTerritorios).ejecutar(function (data) {
                           console.log(data);
                          $scope.territorio=data;

                        }, function (error) {
                            alert(error);
                            alert('Ha ocurrido un error');
                      });

      $scope.eliminarTerritorio = function() {  
             var eliminarTerritorioPopup = $ionicPopup.confirm({
                          title: 'Eliminar Registro',
                          template: 'Seguro que desea eliminar este Registro'
                      }); 

              eliminarTerritorioPopup.then(function(res) {
                                 if(res) {
                                      territoriosService.unTerritorio('delete', $stateParams.idTerritorios).ejecutar(function (data) {
                                           console.log(data);
                                            var instructionsPopup = $ionicPopup.alert({
                                              title: 'Territorio Eliminado',
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

      $scope.modificarTerritorio = function() {  
            territorioModifier = JSON.stringify($scope.territorio);
            console.log(territorioModifier);


             var modificarTerritorioPopup = $ionicPopup.confirm({
                          title: 'Modificar Registro',
                          template: 'Seguro que desea modificar este Registro'
                      }); 

              modificarTerritorioPopup.then(function(res) {
                                 if(res) {
                                      territoriosService.unTerritorio('put', $stateParams.idTerritorios).ejecutar(territorioModifier, function (data) {
                                           console.log(data);
                                           var instructionsPopup = $ionicPopup.alert({
                                              title: 'Territorio Modificado',
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

