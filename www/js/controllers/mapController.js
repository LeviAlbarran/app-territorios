app.controller('MapController',
  [ '$scope',
    '$ionicActionSheet',
    '$timeout',
    '$compile',
    '$cordovaGeolocation',
    '$stateParams',
    '$ionicModal',
    '$ionicPopup',
    '$rootScope',
    'directionService',
   
    'InstructionsService',
    "leafletMarkerEvents",
    function(
      $scope,
      $ionicActionSheet,
      $timeout,
      $compile,
      $cordovaGeolocation,
      $stateParams,
      $ionicModal,
      $ionicPopup,
      $rootScope,
      directionService,
      InstructionsService,
      leafletMarkerEvents
      ) {


  $scope.locationsObj = {};

  $scope.locationsObj.savedLocations = [
    {
      nombre : "Salon del Reino",
      lat : 10.6544082,
      lng : -71.6996923,
      visitas:{
        publicador:"Levi"
      }
    }
  ];




   directionService.todasDirecciones('get').ejecutar(function (data) {
                           console.log(data);
                          // console.log(data.length);
                          for (i = 0; i < data.length; i++) {  
                           $scope.locationsObj.savedLocations.push(data[i]);
                           console.log(data[i]);
                           $scope.goTo($scope.locationsObj.savedLocations.length - 1);

                          }
                          console.log($scope.locationsObj)

                        }, function (error) {
                            alert(error);
                            alert('Ha ocurrido un error');
                      });

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

      $scope.locate();

           $scope.map = {
          defaults: {
            //tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
            maxZoom: 18,
            zoomControlPosition: 'bottomleft'
          },
          markers : {},
          awesomeMarkerIcon: {
                    type: 'awesomeMarker',
                    icon: 'tag',
                    markerColor: 'red'
                },
          events: {
            map: {
              enable: ['context'],
              logic: 'emit'
            }
          },

           layers: {
                    baselayers: {
                        googleTerrain: {
                            name: 'Calles',
                            layerType: 'ROADMAP',
                            type: 'google'
                        },
                        googleHybrid: {
                          name: 'Terreno',
                          layerType: 'HYBRID',
                          type: 'google'
                      }
                    }
                }

        
           
          
        };

        $scope.goTo(0);

      });


      var Location = function() {
        if ( !(this instanceof Location) ) return new Location();
        this.lat  = "";
        this.lng  = "";
        this.nombre = "";
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
       */
      $scope.$on('leafletDirectiveMap.contextmenu', function(event, locationEvent){
        $scope.newLocation = new Location();
        $scope.newLocation.lat = locationEvent.leafletEvent.latlng.lat;
        $scope.newLocation.lng = locationEvent.leafletEvent.latlng.lng;
        $scope.modal.show();
      });

      $scope.saveLocation = function() {
        direccion = JSON.stringify($scope.newLocation);
        console.log(direccion);

        directionService.todasDirecciones('post').ejecutar(direccion, function (data) {
                           console.log(data); 
                            $scope.locationsObj.savedLocations.push($scope.newLocation);
                            $scope.modal.hide();
                            $scope.goTo($scope.locationsObj.savedLocations.length - 1);
                        }, function (error) {
                            alert(error);
                            alert('Ha ocurrido un error');
                      });



     //   $scope.locationsObj.savedLocations.push($scope.newLocation);
       
      };


  $scope.eliminarLocation = function(idDireccion) {
       
        console.log(idDireccion);

        directionService.unaDireccion('delete', idDireccion).ejecutar(function (data) {
                            console.log('eliminado'); 
                           console.log(data); 
                            }, function (error) {
                            alert(error);
                            alert('Ha ocurrido un error');
                      });



     //   $scope.locationsObj.savedLocations.push($scope.newLocation);
       
      };



      $scope.modifierLocation = function() {
      
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



     //   $scope.locationsObj.savedLocations.push($scope.newLocation);
       
      };


      /**
       * Center map on specific saved location
       * @param locationKey
       */
      $scope.goTo = function(locationKey) {

        var location = $scope.locationsObj.savedLocations[locationKey];


        $scope.map.center  = {
          lat : location.lat,
          lng : location.lng,
          zoom : 15
        };

        html= '<div id="compilar"><b>'+location.nombre+'</b><br></div>';
        
        if(location._id){

          idLocationText=location._id.substr(21);
          $scope.map.markers[locationKey] = {
              
     
          lat:location.lat,
          lng:location.lng,
          message: html,
          focus: true,
          draggable: false,
          label: {
                  message: idLocationText,
                     options: {
                            noHide: true
                      }
                  }
          
        };
        }else{    
        $scope.map.markers[locationKey] = {
              
     
          lat:location.lat,
          lng:location.lng,
          message: html,
          focus: true,
          draggable: false
          
        };
        }
      
      

      };

        $scope.events = {
                markers: {
                    enable: leafletMarkerEvents.getAvailableEvents(),
                }
            };

            var markerEvents = leafletMarkerEvents.getAvailableEvents();
            for (var k in markerEvents){
                var eventName = 'leafletDirectiveMarker.' + markerEvents[k];
                $scope.$on(eventName, function(event, args){

                 if (event.name == 'leafletDirectiveMarker.contextmenu'){
                  console.log(k);
                    console.log(args);
                    
                    var PosicionArrayDir=args.modelName;
                    $scope.show(PosicionArrayDir);
                    //alert(event.name);
                 }

                });
            }

          $scope.show = function(PosicionArrayDir) {
             var location=$scope.locationsObj.savedLocations[PosicionArrayDir]; //Ubicar posicion en el arreglo que contione toda la informacion de la direccion         
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
                        //Modificar
                        $scope.idModifierDireccion = location._id;
                        $scope.modifierLocation.nombre = location.nombre;
                        $scope.modifierLocation.comentarios = location.comentarios;
                        $scope.modifierLocation.direccion = location.direccion;
                        $scope.modifierLocation.lat = location.lat;
                        $scope.modifierLocation.lng = location.lng;
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
                          $scope.eliminarLocation(location._id); //enviar el _id mongo para eliminar
                          $scope.locationsObj.savedLocations.splice(PosicionArrayDir); //eliminar del arreglo que contiene la informacion tomando en cuenta la posiscion dentro el mismo
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





      /**
       * Center map on user's current position
       */
      $scope.locate = function(){

        $cordovaGeolocation
          .getCurrentPosition()
          .then(function (position) {
            $scope.map.center.lat  = position.coords.latitude;
            $scope.map.center.lng = position.coords.longitude;
            $scope.map.center.zoom = 15;

            $scope.map.markers.now = {
              lat:position.coords.latitude,
              lng:position.coords.longitude,
              message: "Tu estás aqui",
              focus: true,
              draggable: false
            };

          }, function(err) {
            // error
            console.log("Localizacion error!");
            console.log(err);
          });

      };
   
    }]);
