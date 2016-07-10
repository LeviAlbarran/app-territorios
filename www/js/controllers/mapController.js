app.controller('MapController',
  [ '$scope',
    '$ionicActionSheet',
    '$ionicLoading',
    '$timeout',
    '$compile',
    '$cordovaGeolocation',
    '$stateParams',
    '$ionicModal',
    '$ionicPopup',
    '$rootScope',
    'directionService',
    'territoriosService',
    'zonasService',
    'InstructionsService',
  
    function(
      $scope,
      $ionicActionSheet,
      $ionicLoading,
      $timeout,
      $compile,
      $cordovaGeolocation,
      $stateParams,
      $ionicModal,
      $ionicPopup,
      $rootScope,
      directionService,
      territoriosService,
      zonasService,
      InstructionsService

      ) {


  $scope.locationsObj = {};

  $scope.locationsObj.savedLocations = [];
  



    
  //      var myLatlng = new google.maps.LatLng(10.5732857, -71.6487104);
       var myLatlng = { lat: 10.5732857, lng: -71.6487104 };
 
        var mapOptions = {
            center: new google.maps.LatLng(10.5732857, -71.6487104),
            zoom: 18,
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
 
 

     //  $scope.verDireciones();
     //  $scope.locate(); 

    

angular.element(document).ready(function () {
      console.log("sad");
      $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
      

          google.maps.event.addListener($scope.map, 'rightclick', function(event) {

                console.log(event.latLng);
                var lat = event.latLng.lat();
                var lng = event.latLng.lng();
                $scope.newLocation = new Location();
                $scope.newLocation.lat = lat;
                $scope.newLocation.lng = lng;
                $scope.modal.show();
              


          });

 });

    $scope.marcarAqui = function(){
       positionCenter = $scope.map.getCenter();
      console.log(positionCenter);
      var lat = positionCenter.lat();
      var lng = positionCenter.lng();
      console.log(lat);
      console.log(lng);
      $scope.newLocation = new Location();
      $scope.newLocation.lat = lat;
      $scope.newLocation.lng = lng;
      $scope.toggle();
      $scope.modal.show();
    };

   $scope.toggle = function () {
      $scope.state = !$scope.state;
    };

 $scope.marker = [];

$scope.toggleMostrarDirecciones = function(){
  if($scope.toggleMostrarDirecciones.checked){
      // $scope.showLoanding();
      $scope.verDireciones();
     // $scope.hideLoanding();
  }else{
  
    console.log($scope.marker)
   for (var k = 1; k < $scope.marker.length; k++) {
    $scope.marker[k].setMap(null);
  }

      $scope.locationsObj.savedLocations.splice(0);
      
  }
};


$scope.showLoanding = function() {
    $ionicLoading.show({
      template: '<ion-spinner icon="android"></ion-spinner>'
    }).then(function(){
       console.log("The loading indicator is now displayed");
    });
  };


  $scope.hideLoanding = function(){
    $ionicLoading.hide().then(function(){
       console.log("The loading indicator is now hidden");
    });
  };



   zonasService.todasZonas('get').ejecutar(function (data) {
                           console.log(data);
                          $scope.zonas=data;

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

$scope.verDireciones = function () {  
   directionService.todasDirecciones('get').ejecutar(function (data) {
                           console.log(data);
                          // console.log(data.length);
                          for (i = 0; i < data.length; i++) {  
                           $scope.locationsObj.savedLocations.push(data[i]);
                            

                           console.log(i)
                           console.log(data[i]);                   
                           $scope.marcarDirecciones(i);

                          }
                          console.log($scope.locationsObj)

                        }, function (error) {
                            alert(error);
                            alert('Ha ocurrido un error');
                      });
};
  

      $scope.$on("$stateChangeSuccess", function() {

        $scope.locations = $scope.locationsObj.savedLocations;
        $scope.newLocation;

        if(!InstructionsService.instructions.newLocations.seen) {

          var instructionsPopup = $ionicPopup.alert({
            title: 'Agregar Dirección',
            template: InstructionsService.instructions.newLocations.text
          });
          instructionsPopup.then(function(res) {
            InstructionsService.instructions.newLocations.seen = true;
            });

        }


       

      });


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


      //Modal Agregar
      $ionicModal.fromTemplateUrl('templates/addLocation.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
          $scope.modal = modal;
        });

      //Modal Modificar
      $ionicModal.fromTemplateUrl('templates/modifierLocation.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
          $scope.modalModifier = modal;
        });

      /**
       * Detect user long-pressing on map to add new location
       
      $scope.$on('leafletDirectiveMap.contextmenu', function(event, locationEvent){
        $scope.newLocation = new Location();
        $scope.newLocation.lat = locationEvent.leafletEvent.latlng.lat;
        $scope.newLocation.lng = locationEvent.leafletEvent.latlng.lng;
        $scope.modal.show();
      });
*/
      $scope.saveLocation = function() {
        direccion = JSON.stringify($scope.newLocation);
        console.log(direccion);
        console.log($scope.locationsObj.savedLocations);
        directionService.todasDirecciones('post').ejecutar(direccion, function (data) {
                           console.log(data); 
                            $scope.locationsObj.savedLocations.push($scope.newLocation);
                            $scope.modal.hide();
                            $scope.marcarDirecciones($scope.locationsObj.savedLocations.length -1);
                        }, function (error) {
                            alert(error);
                            alert('Ha ocurrido un error');
                      });



     //   $scope.locationsObj.savedLocations.push($scope.newLocation);
       
      };


  $scope.eliminarLocation = function(idDireccion, j) {
       
          //  $scope.marker[j].setMap(null);

        directionService.unaDireccion('delete', idDireccion).ejecutar(function (data) {
                            console.log('eliminado'); 
                            console.log(data); 
                              for (var k = 1; k < $scope.marker.length; k++) {
                                $scope.marker[k].setMap(null);
                              }
                              $scope.locationsObj.savedLocations.splice(0);                                  
                              $scope.verDireciones();

                           
                            }, function (error) {
                            alert(error);
                            alert('Ha ocurrido un error');
                      });



     //   $scope.locationsObj.savedLocations.push($scope.newLocation);
       
      };


      $scope.submitModifierLocation = function() {
           direccionModifier = JSON.stringify($scope.modifierLocation);
        console.log(direccionModifier);

        directionService.unaDireccion('put', $scope.idModifierDireccion).ejecutar(direccionModifier, function (data) {
                           console.log('modificado')
                           console.log(data);
                              $scope.locationsObj.savedLocations.splice(0);                                  
                              $scope.verDireciones(); 
                            $scope.modalModifier.hide();
                    
                        }, function (error) {
                            console.log(error);
                            alert('Ha ocurrido un error');
                      });
      };

/*       $scope.modifierLocation = function() {
    
        direccionModifier = JSON.stringify($scope.modifierLocation);
        console.log(direccionModifier);

        directionService.unaDireccion('put', $scope.idModifierDireccion).ejecutar(direccionModifier, function (data) {
                           console.log('modificado')
                           console.log(data); 
                            $scope.modalModifier.hide();
                    
                        }, function (error) {
                            console.log(error);
                            alert('Ha ocurrido un error');
                      });

*/

     //   $scope.locationsObj.savedLocations.push($scope.newLocation);
       
   //   };


      /**
       * Center map on specific saved location
       * @param locationKey
       */
        
infowindow = new google.maps.InfoWindow({
                content: "loading..."
            });


      
      var j = 0;
      $scope.marcarDirecciones = function(locationKey) {
        
          j = j + 1
          var location = $scope.locationsObj.savedLocations[locationKey];
          console.log(location);
          var latitud = parseFloat(location.lat.toFixed(14));
          var longitud = parseFloat(location.lng.toFixed(14));
          console.log(latitud);
          console.log(longitud);
          var locationMarker = {lat: latitud, lng: longitud};

          //$scope.contentString = location.nombre;
            infowindow = new google.maps.InfoWindow({
            content: location.nombre
          });

          var label;
          if(location.id){
            label = location.id;
          }
          else{
            label = ".";
          }


         $scope.marker[j] = new google.maps.Marker({
                position: locationMarker,
                map: $scope.map,
                title: location.nombre,
                label: " " +location.id + " ",
                animation: google.maps.Animation.DROP
              });

         $scope.marker[j].setMap($scope.map);

      /*  $scope.marker[j].addListener('click', function() {
            $scope.infowindow.open($scope.map, $scope.marker[j]);
          });
*/
          google.maps.event.addListener($scope.marker[j], "click", function () {
              //  alert(this.html);
                infowindow.setContent(location.nombre);
                infowindow.open($scope.map, this);
            });

          
          google.maps.event.addListener($scope.marker[j], 'rightclick', function() {
             console.log(location);         
             $scope.show(location, j);
          });

        }
       

  


          $scope.show = function(location, j) {
      //      var location=$scope.locationsObj.savedLocations[PosicionArrayDir]; //Ubicar posicion en el arreglo que contione toda la informacion de la direccion         
             // Show the action sheet
             var hideSheet = $ionicActionSheet.show({
               buttons: [
                 { text: 'Modificar' },
                 { text: 'Eliminar' }
               ],
              // destructiveText: 'Eliminar',
               titleText: '¿Que desea Hacer?',
               cancelText: 'Cancelar',
               cancel: function() {
                    // add cancel code..
                  },
               buttonClicked: function(index) {
                switch (index) {
                    case 0:
                        $scope.modifierLocation = {};
                        //Modificar
                        $scope.idModifierDireccion = location._id;
                        $scope.modifierLocation.id = location.id;
                        $scope.modifierLocation.territorio = location.territorio;
                        $scope.modifierLocation.genero = location.genero;
                        $scope.modifierLocation.edificacion = location.edificacion;
                        $scope.modifierLocation.zona = location.zona;
                        $scope.modifierLocation.condicion = location.condicion;
                        $scope.modifierLocation.publicador = location.publicador;
                        $scope.modifierLocation.nombre = location.nombre;
                        $scope.modifierLocation.comentarios = location.comentarios;
                        $scope.modifierLocation.direccion = location.direccion;
                        $scope.modifierLocation.lat = location.lat;
                        $scope.modifierLocation.lng = location.lng;
                        // console.log(modifierLocation.id);
                        $scope.modalModifier.show();

                    break;
                    case 1:
                        //Eliminar
                        var eliminarDireccionPopup = $ionicPopup.confirm({
                          title: 'Eliminar Registro',
                          template: 'Seguro que desea eliminar este Registro'
                      }); 
                        eliminarDireccionPopup.then(function(res) {
                         if(res) {
                         console.log(location._id);
                          $scope.eliminarLocation(location._id, j); //enviar el _id mongo para eliminar
                          //$scope.locationsObj.savedLocations.splice(PosicionArrayDir); //eliminar del arreglo que contiene la informacion tomando en cuenta la posiscion dentro el mismo
                         
                          $scope.locate(); //Volver a localizarme
                         

                         } else {
                           console.log('cancelado');
                         }
                       });
                    break;
                } 
                 return true;
               }
             });

             // For example's sake, hide the sheet after two seconds
             $timeout(function() {
               hideSheet();
             }, 5000);

           }; 

    


       $scope.goTo= function(locationKey){
        console.log(locationKey);
         var location = $scope.locationsObj.savedLocations[locationKey];
         console.log(location)
             $scope.marker[locationKey].setAnimation(google.maps.Animation.BOUNCE);
        $scope.map.setCenter(new google.maps.LatLng(location.lat, location.lng));

       };


      $scope.locate = function(){

        $cordovaGeolocation
          .getCurrentPosition()
          .then(function (position) {

            var myPosition = {lat: position.coords.latitude, lng: position.coords.longitude};
            console.log(myPosition);
            $scope.markerMyPosition = new google.maps.Marker({
                position: myPosition,
                map: $scope.map,
                title: 'Tu estas Aqui',
                 icon: './images/marker_myposition.png'
              });

         $scope.map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));

          }, function(err) {
            // error
            console.log("Localizacion error!");
            console.log(err);
          });

      };
   
    }]);
