app.controller('territoriosDireccionesController',
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
  

$scope.imprimir = function(){
//  var content = window.document.getElementById("containerMap"); // get you map details
//var newWindow = window.open(); // open a new window
//newWindow.document.write(content.innerHTML); // write the map into the new window
//newWindow.document.getElementById("mapDirecciones").style.height = "400px";
//newWindow.document.getElementById("mapDirecciones").style.width = "700px";
//newWindow.print(); $("containerMap").printElement();
window.print();
}

    
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

       var directionsDisplay = new google.maps.DirectionsRenderer;
       var directionsService = new google.maps.DirectionsService;
    


angular.element(document).ready(function () {
      console.log("sad");

      

      $scope.map = new google.maps.Map(document.getElementById('mapDirecciones'), mapOptions);
      directionsDisplay.setMap($scope.map);
 
/*
  var sydneyLoc = new google.maps.LatLng(10.5732857, -71.6487104); 
var drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [
        //google.maps.drawing.OverlayType.MARKER,
        //google.maps.drawing.OverlayType.CIRCLE,
        google.maps.drawing.OverlayType.POLYGON,
        //google.maps.drawing.OverlayType.POLYLINE,
        //google.maps.drawing.OverlayType.RECTANGLE
      ]
    }
  });

  drawingManager.setMap($scope.map);


  google.maps.event.addListener(drawingManager, 'polygoncomplete', function (polygon) {

    for (var i = 1; i < $scope.marker.length; i++) {
      if(google.maps.geometry.poly.containsLocation($scope.marker[i].getPosition(), polygon) == true) {
          console.log('is located inside your polygon');
       }
    };
  });
*/



  // al dejar por un tiempo pulsado en el mapa se crea la direccion nueva direccion   
/*
          google.maps.event.addListener($scope.map, 'rightclick', function(event) {

                console.log(event.latLng);
                var lat = event.latLng.lat();
                var lng = event.latLng.lng();
                $scope.newLocation = new Location();
                $scope.newLocation.lat = lat;
                $scope.newLocation.lng = lng;
                $scope.modal.show();
           


          });
  */ 
  $scope.locate();
  $scope.verDireciones();

 });




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
   directionService.direccionesTerritorio('get', $stateParams.idTerritorios).ejecutar(function (data) {
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

        
infowindow = new google.maps.InfoWindow({
                content: "loading..."
            });


      $scope.marker = [];
      var j = 0;
      $scope.marcarDirecciones = function(locationKey) {
        
          j = j + 1
          var location = $scope.locationsObj.savedLocations[locationKey];
          console.log(location);
          if (location.lat && location.lng) {
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


//var image='<svg width="36" height="33" xmlns="http://www.w3.org/2000/svg"><g><title>background</title><rect fill="none" id="canvas_background" height="35" width="38" y="-1" x="-1" text-align="center"/><g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid" text-align="center"><rect fill="url(#gridpattern)" stroke-width="0" y="0" x="0" height="100%" width="100%" text-align="center"/> </g> </g> <g><title>Layer 1</title><path id="svg_1" d="m17.812927,1.460289c-9.11084,0 -16.503174,3.930481 -16.503174,8.781288c0,4.850937 16.503174,21.218704 16.503174,21.218704s16.496857,-16.367767 16.496857,-21.218704c0,-4.850807 -7.38559,-8.781288 -16.496857,-8.781288zm0,12.978355c-4.357422,0 -7.888947,-1.877716 -7.888947,-4.197067s3.531525,-4.196877 7.888947,-4.196877s7.882324,1.879784 7.882324,4.196877s-3.531433,4.197067 -7.882324,4.197067z" stroke-width="1.5" stroke="#000000" fill="#ff0000" text-align="center"/><ellipse ry="7.5" rx="11" id="svg_3" cy="11.5" cx="17.5" stroke-width="1.5" stroke="#ff0000" fill="#ff0000" text-align="center"/><ellipse ry="0.5" id="svg_4" cy="209.5" cx="222.5" stroke-width="1.5" stroke="#ff0000" fill="#ff0000" text-align="center"/><text font-weight="bold" xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="NaN" text-align="center" id="svg_5" y="15.5" x="3.5" stroke-width="0" stroke="#000000" fill="#ffffff">'+location.id+'</text></g></svg>'; 
var image = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2238%22%20height%3D%2238%22%20viewBox%3D%220%200%2038%2038%22%3E%0A%0A%3Cpath%20fill%3D%22%23ff0000%22%20fill-opacity%3D%220.50%22%20stroke%3D%22%23000000%22%20stroke-width%3D%221.3%22%20d%3D%22M34.305%2016.234c0%208.83-15.148%2019.158-15.148%2019.158S3.507%2025.065%203.507%2016.1c0-8.505%206.894-14.304%2015.4-14.304%208.504%200%2015.398%205.933%2015.398%2014.438z%22%2F%3E%0A%0A%3Ctext%20transform%3D%22translate(19%2018.5)%22%20fill%3D%22%23fff%22%20style%3D%22font-family%3A%20Arial%2C%20sans-serif%3Bfont-weight%3Abold%3Btext-align%3Acenter%3B%22%20font-size%3D%2212%22%20text-anchor%3D%22middle%22%3E'+location.id+'%3C%2Ftext%3E%0A%3C%2Fsvg%3E';
 //var image = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2238%22%20height%3D%2238%22%20viewBox%3D%220%200%2038%2038%22%3E%3Cpath%20fill%3D%22%23808080%22%20stroke%3D%22%23ccc%22%20stroke-width%3D%22.5%22%20d%3D%22M34.305%2016.234c0%208.83-15.148%2019.158-15.148%2019.158S3.507%2025.065%203.507%2016.1c0-8.505%206.894-14.304%2015.4-14.304%208.504%200%2015.398%205.933%2015.398%2014.438z%22%2F%3E%3Ctext%20transform%3D%22translate%2819%2018.5%29%22%20fill%3D%22%23fff%22%20style%3D%22font-family%3A%20Arial%2C%20sans-serif%3Bfont-weight%3Abold%3Btext-align%3Acenter%3B%22%20font-size%3D%2212%22%20text-anchor%3D%22middle%22%3E' + location.id + '%3C%2Ftext%3E%3C%2Fsvg%3E';

         $scope.marker[j] = new google.maps.Marker({
                position: locationMarker,
                map: $scope.map,
                title: location.nombre,
               // label: " " +location.id + " ",
                animation: google.maps.Animation.DROP,
                icon: image
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

          
          google.maps.event.addListener($scope.marker[j], 'dblclick', function() {
             console.log(location);         
             $scope.show(location, j);
          });
        }

          //findNearestPlace(latitud, longitud);
        }
       



          $scope.show = function(location, j) {
      //      var location=$scope.locationsObj.savedLocations[PosicionArrayDir]; //Ubicar posicion en el arreglo que contione toda la informacion de la direccion         
             // Show the action sheet
             var hideSheet = $ionicActionSheet.show({
               buttons: [
                 { text: 'Ver Detalles' },
                 { text: 'Ultimas Visitas' },
                 { text: 'Realizar Visita' },
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

                    case 2:

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

      var myPosition;
      $scope.markerMyPosition;

      $scope.locate = function(){
        $scope.markerMyPosition;
        if ($scope.markerMyPosition) {
          $scope.markerMyPosition.setMap(null);
        };
        $cordovaGeolocation
          .getCurrentPosition()
          .then(function (position) {

             myPosition = {lat: position.coords.latitude, lng: position.coords.longitude};
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


function rad(x) {return x*Math.PI/180;}

 function find_closest_marker () {
  $scope.locate();
  console.log('aqui');
    var lat = myPosition.lat;
    var lng = myPosition.lng;
    var R = 6371; // radius of earth in km
    var distances = [];
    var closest = -1;
    for( i=0;i<$scope.locationsObj.savedLocations.length; i++ ) {
      var location = $scope.locationsObj.savedLocations[i];
      console.log(location);
        var mlat = $scope.locationsObj.savedLocations[i].lat;
        var mlng = $scope.locationsObj.savedLocations[i].lng;
        var dLat  = rad(mlat - lat);
        var dLong = rad(mlng - lng);
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(rad(lat)) * Math.cos(rad(lat)) * Math.sin(dLong/2) * Math.sin(dLong/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        distances[i] = d;
        if ( closest == -1 || d < distances[closest] ) {
            closest = i;
        }
    }


  var selectedMode = 'DRIVING';

  directionsService.route({

    origin: {lat: lat, lng: lng},  // Haight.
    destination: {lat: $scope.locationsObj.savedLocations[closest].lat, lng: $scope.locationsObj.savedLocations[closest].lng},  // Ocean Beach.
    travelMode: google.maps.TravelMode[selectedMode]
  }, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      console.log(response);
      directionsDisplay.setOptions({ preserveViewport: true });
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });

    //alert($scope.locationsObj.savedLocations[closest].nombre);
}

var gps; 
  $scope.toggleGPS = function(){
  if($scope.toggleGPS.checked){
    gps = window.setInterval(find_closest_marker,5000); 

  }else{
    gps = window.clearInterval(gps);
      console.log("no");
  }
};


     
    }]);
