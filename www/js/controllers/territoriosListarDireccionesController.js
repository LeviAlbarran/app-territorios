app.controller('territoriosListarDireccionesController',
   [ '$scope',
    '$ionicActionSheet',
    '$timeout',
    '$compile',
    
    '$stateParams',
    '$ionicModal',
    '$ionicPopup',
    '$rootScope',
    'territoriosService',
    'directionService',
    'zonasService',
    'pdfService',
    function(
      $scope,
      $ionicActionSheet,
      $timeout,
      $compile,
     
      $stateParams,
      $ionicModal,
      $ionicPopup,
      $rootScope,
      territoriosService,
      directionService,
      zonasService,
      pdfService
      ) {

  console.log($stateParams.idTerritorios);

  $ionicModal.fromTemplateUrl('pdf-viewer.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modalpdf = modal;
    });

  zonasService.todasZonas('get').ejecutar(function (data) {
    $scope.zonas = data;
    //console.log($scope.direcciones);
  }, function (error) {
    alert(error);
    alert('Ha ocurrido un error');
  });

   territoriosService.todosTerritorios('get').ejecutar(function (data) {
                           console.log(data);
                          $scope.territorios=data;
                          var posicion = $scope.territorios.map(function(element){return element._id;}).indexOf($stateParams.idTerritorios);
console.log(posicion);
                          $scope.nombreTerritorio = $scope.territorios[posicion].nombre;

                        }, function (error) {
                            alert(error);
                            alert('Ha ocurrido un error');
                      });

$scope.verDirecciones = function(){ 
directionService.direccionesTerritorio('get', $stateParams.idTerritorios).ejecutar(function (data) {
                $scope.direcciones = data;
                //$scope.infopdf = data;
                console.log($scope.direcciones);
                        }, function (error) {
                            alert(error);
                            alert('Ha ocurrido un error');
                      });
};
      $scope.verDirecciones();
 
        $ionicModal.fromTemplateUrl('templates/modalVerDireccion.html', {
            scope: $scope,
            animation: 'slide-in-up'
          }).then(function(modal) {
              $scope.modalVerDireccion = modal;

            });


      $ionicModal.fromTemplateUrl('templates/addLocation.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
          $scope.modal = modal;
        });

      $scope.saveLocation = function() {
       // direccion = JSON.stringify($scope.newLocation);
        //console.log(direccion);
       // console.log($scope.locationsObj.savedLocations);
        directionService.todasDirecciones('get').ejecutar(function (data) {
                           //console.log(data); 
                          var last = 0;
                           for (var i = 0; i < data.length; i++) {
                             if (data[i].id>last) {
                               last = data[i].id;
                              };
                           };
                            $scope.newLocation.id = last + 1;
                             direccion = JSON.stringify($scope.newLocation);
                             console.log(direccion);
                            directionService.todasDirecciones('post').ejecutar(direccion, function (data) {
                                 console.log(data); 
                                  $scope.verDirecciones();
                                  $scope.modal.hide();
                              }, function (error) {
                                  alert(error);
                                  alert('Ha ocurrido un error');
                            });
                        }, function (error) {
                            alert(error);
                            alert('Ha ocurrido un error');
                      });

      };

var Location = function() {
        if ( !(this instanceof Location) ) return new Location();
        this.lat  = "";
        this.lng  = "";
        this.nombre = "";
        this.genero = "";
        this.condicion = "";
        this.zona = "";
        this.publicador = "";
        this.comentarios = "";
        this.territorio = "";
        this.id = "";
        
      };

    $scope.buttonNuevaDireccion = function(){
      $scope.newLocation = new Location();
      $scope.modal.show();
    };


$scope.infopdf=[];
$scope.buttonVerDireccion= function(idDireccion){
      console.log(idDireccion);
      directionService.unaDireccion('get', idDireccion).ejecutar(function (data) {                    
                          $scope.direccionSeleccionada=data;
                          for (var i = 0; i < $scope.territorios.length; i++) {
                            if ($scope.direccionSeleccionada.territorio== $scope.territorios[i]._id) {
                              $scope.direccionSeleccionada.territorio = $scope.territorios[i].nombre;
                            }
                          };
                          for (var i = 0; i < $scope.zonas.length; i++) {
                            if ($scope.direccionSeleccionada.zona== $scope.zonas[i]._id) {
                              $scope.direccionSeleccionada.zona = $scope.zonas[i].nombre;
                            }
                          };
                          
                          
                          console.log($scope.direccionSeleccionada);
                          $scope.infopdf[0] = data; //para imprimir
                          console.log($scope.infopdf);
                          var latitud = parseFloat(data.lat.toFixed(14));
                          var longitud = parseFloat(data.lng.toFixed(14));
                          var image = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2238%22%20height%3D%2238%22%20viewBox%3D%220%200%2038%2038%22%3E%0A%0A%3Cpath%20fill%3D%22%23ff0000%22%20fill-opacity%3D%220.50%22%20stroke%3D%22%23000000%22%20stroke-width%3D%221.3%22%20d%3D%22M34.305%2016.234c0%208.83-15.148%2019.158-15.148%2019.158S3.507%2025.065%203.507%2016.1c0-8.505%206.894-14.304%2015.4-14.304%208.504%200%2015.398%205.933%2015.398%2014.438z%22%2F%3E%0A%0A%3Ctext%20transform%3D%22translate(19%2018.5)%22%20fill%3D%22%23fff%22%20style%3D%22font-family%3A%20Arial%2C%20sans-serif%3Bfont-weight%3Abold%3Btext-align%3Acenter%3B%22%20font-size%3D%2212%22%20text-anchor%3D%22middle%22%3E'+data.id+'%3C%2Ftext%3E%0A%3C%2Fsvg%3E';

                            var direccionLatlng = { lat: latitud, lng: longitud };
 
                            var mapOptions = {
                            center: new google.maps.LatLng(latitud, longitud),
                            zoom: 15,
                            mapTypeId: google.maps.MapTypeId.ROADMAP,
                            navigationControl: true,
                            streetViewControl: true,

                            mapTypeControl: true,
                        
                           zoomControl: true,
                        
                          scaleControl: true,
                          streetViewControl: true,
                          };
   
                   $scope.mapDireccion = new google.maps.Map(document.getElementById('mapDireccion'), mapOptions);
                    $scope.marker = new google.maps.Marker({
                     position: direccionLatlng,
                    map: $scope.mapDireccion,
                    title: location.nombre,
                   // label: " " +data.id + " ",
                    animation: google.maps.Animation.DROP,
                    icon: image
                    });

                    $scope.marker.setMap($scope.mapDireccion);


                        }, function (error) {
                            alert(error);
                            alert('Ha ocurrido un error');
                      });

      $scope.modalVerDireccion.show();
}





$scope.imprimirDirecciones =  function(){ 
        var dataPdf = $scope.infopdf;

        pdfService.createPdf(dataPdf, false)
                        .then(function(pdf) {
                            var blob = new Blob([pdf], {type: 'application/pdf'});
                            $scope.pdfUrl = URL.createObjectURL(blob);

                            // Display the modal view
                            $scope.modalpdf.show();
                        });
    };




$scope.descargarPdf = function(){
   var dataPdf = $scope.infopdf;
        console.log(dataPdf);
        pdfService.createPdf(dataPdf, true)
                        .then(function(pdf) {
                        console.log('imprimiendo');
                        });

}

  

    }]);

