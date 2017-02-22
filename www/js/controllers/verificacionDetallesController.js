app.controller('verificacionDetallesController',
   [ '$scope',
    '$ionicActionSheet',
    '$timeout',
    '$compile',
    
    '$stateParams',
    '$ionicModal',
    '$ionicPopup',
    '$rootScope',
    'directionService',
    'directionTMPService',
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
      directionService,
      directionTMPService,
     
      zonasService,
      territoriosService
      ) {
      console.log($stateParams.idDireccion);
      /*
      zonasService.todasZonas('get').ejecutar(function (data) {
          $scope.zonas = data;
          //console.log($scope.direcciones);
        }, function (error) {
          alert(error);
          alert('Ha ocurrido un error');
        });
      */
  

      $ionicModal.fromTemplateUrl('templates/modalMarcarDireccion.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
          $scope.modal = modal;
        });



$scope.showModalMarcarDireccion = function(){

      var myLatlng = { lat: 10.5732857, lng: -71.6487104 };
      var latitud =10.5732857;
      var longitud = -71.6487104;
      var zoom = 10;
        if ($scope.direccion.lat && $scope.direccion.lng) {
          latitud = $scope.direccion.lat;
          longitud = $scope.direccion.lng;
          zoom=18;
        };

        var mapOptions = {
            center: new google.maps.LatLng(latitud, longitud),
            zoom: zoom,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            navigationControl: true,
            streetViewControl: true,

            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.TOP_LEFT
            },
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_CENTER
            },
            scaleControl: true,
            streetViewControl: true,
            streetViewControlOptions: {
                position: google.maps.ControlPosition.RIGHT_CENTER
            }

        };
       $scope.modal.show();
      console.log("ready");
      $scope.mapDireccion = new google.maps.Map(document.getElementById('mapMarcar'), mapOptions);
      google.maps.event.addListener($scope.mapDireccion, 'rightclick', function(event) {
                console.log(event.latLng);
                var lat = event.latLng.lat();
                var lng = event.latLng.lng();
                $scope.direccion.lat = lat;
                $scope.direccion.lng = lng;
      });

      var input = document.getElementById('place-input-direccion');
      var searchBox = new google.maps.places.SearchBox(input);
      $scope.mapDireccion.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
      $scope.mapDireccion.addListener('bounds_changed', function() {
        searchBox.setBounds($scope.mapDireccion.getBounds());
      });

      var markers = [];
      searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
          return;
        }

     var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        $scope.mapDireccion.fitBounds(bounds);
      });


 
      $scope.toggle();  
}


    $scope.marcarAqui = function(){
      positionCenter = $scope.mapDireccion.getCenter();
      console.log(positionCenter);
      var lat = positionCenter.lat();
      var lng = positionCenter.lng();
      console.log(lat);
      console.log(lng);
      $scope.direccion.lat = lat;
      $scope.direccion.lng = lng;
      $scope.modal.hide();
      $scope.toggle();
    };

   $scope.toggle = function () {
      $scope.state = !$scope.state;
    };






       directionTMPService.unaDireccion('get', $stateParams.idDireccion).ejecutar(function (data) {
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
                                      directionTMPService.unaDireccion('delete', $stateParams.idDireccion).ejecutar(function (data) {
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
            direccionModifier = JSON.stringify($scope.direccion);
            console.log(direccionModifier);


             var modificarDireccionPopup = $ionicPopup.confirm({
                          title: 'Modificar Direccion',
                          template: 'Seguro que desea modificar este Registro'
                      }); 

              modificarDireccionPopup.then(function(res) {
                                 if(res) {
                                      directionTMPService.unaDireccion('put', $stateParams.idDireccion).ejecutar(direccionModifier, function (data) {
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

    territoriosService.todosTerritorios('get').ejecutar(function (data) {
        $scope.territorios = data;
        //console.log($scope.direcciones);
      }, function (error) {
        alert(error);
        alert('Ha ocurrido un error');
      });



    }]);

