app.controller('direccionesController',
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
    'localstorageService',
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
      localstorageService,
      zonasService,
      pdfService
      ) {


  $ionicModal.fromTemplateUrl('pdf-viewer.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modalpdf = modal;
    });


   territoriosService.todosTerritorios('get').ejecutar(function (data) {
                           console.log(data);
                          $scope.territorios=data;

                        }, function (error) {
                            alert(error);
                            alert('Ha ocurrido un error');
                      });

$scope.verDirecciones = function(){ 
    directionService.listDirecciones('get').ejecutar(function (data) {
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
      /*  directionService.todasDirecciones('get').ejecutar(function (data) {
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
                      });*/

      directionService.ultimaDireccion('get').ejecutar(function (data) {
   console.log(data);
    $scope.newLocation.id = data[0].id + 1;
    direccion = JSON.stringify($scope.newLocation); 
    console.log(direccion);                        
       directionService.todasDirecciones('post').ejecutar(direccion, function (data) {
            console.log(data); 
            $scope.locationsObj.savedLocations; 
            for (var k = 1; k < $scope.marker.length; k++) {
              $scope.marker[k].setMap(null);
            }
            $scope.locationsObj.savedLocations.splice(0);                                                               
            $scope.verDireciones(); 
            $scope.modal.hide();
          }, function (error) {
            console.log(error);
            alert('Ha ocurrido un error');
          });
        },
    function(error){
      console.log(error);
      alert(error);
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
                      /*    for (var i = 0; i < $scope.zonas.length; i++) {
                            if ($scope.direccionSeleccionada.zona== $scope.zonas[i]._id) {
                              $scope.direccionSeleccionada.zona = $scope.zonas[i].nombre;
                            }
                          };
                        */  
                          
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
/*        var dataPdf = $scope.infopdf;

        pdfService.createPdf(dataPdf, false)
                        .then(function(pdf) {
                            var blob = new Blob([pdf], {type: 'application/pdf'});
                            $scope.pdfUrl = URL.createObjectURL(blob);

                            // Display the modal view
                            $scope.modalpdf.show();
                        });*/
    var d = new Date();
    var hoy = d.getDate();
    var mes = d.getMonth();
    var anio = d.getFullYear();
    var fechaHoy =  hoy +"/"+ mes + "/" + anio;                   
    console.log($scope.infopdf);
    var doc = new jsPDF();
        if(!$scope.infopdf[0].genero){
      $scope.infopdf[0].genero = '';
    }
    if(!$scope.infopdf[0].nombre){
      $scope.infopdf[0].nombre = '_________________________';
    }

    if(!$scope.infopdf[0].zona){
      $scope.infopdf[0].zona = '_________';
    }
    if(!$scope.infopdf[0].publicador){
      $scope.infopdf[0].publicador = '___________';
    }
    if(!$scope.infopdf[0].telefono){
      $scope.infopdf[0].telefono = '___________';
    }
    if(!$scope.infopdf[0].edificacion){
      $scope.infopdf[0].edificacion = '___________';
    }
    if(!$scope.infopdf[0].telefono){
      $scope.infopdf[0].telefono = '___________';
    }
    if(!$scope.infopdf[0].condicion){
      $scope.infopdf[0].condicion = '___________';
    }


    doc.setFontSize(12);
    doc.text(15, 10,  $scope.infopdf[0].id + ' - ' + $scope.infopdf[0].genero + '. '+ $scope.infopdf[0].nombre);
    //doc.text(30, 10,'Nombre: ' + );
    doc.setFontSize(8);
    doc.text(23, 16, 'Zona: ' + $scope.infopdf[0].zona);
    doc.text(80, 16, 'Condicion: ' + $scope.infopdf[0].condicion);
    doc.text(140, 16, 'Telefono: ' + $scope.infopdf[0].numero);
    
    doc.text(15, 21, 'Edificacion: ' + $scope.infopdf[0].edificacion);
    doc.text(137, 21, 'Publicador: ' + $scope.infopdf[0].publicador);

    var splitcomment = doc.splitTextToSize($scope.infopdf[j].direccion, 150);
    console.log($scope.infopdf[0].direccion);
    console.log(splitcomment);
    for (var x = 0; x < splitcomment.length; x++) {
      if (x == 0) {
        doc.text(17, 26 + hlinea, 'Direccion: ' + splitcomment[0]);
      }
      else{
       doc.text(17, 26 + hlinea + 3,  splitcomment[1]);   
      }
    }
    var splitcomment = doc.splitTextToSize($scope.infopdf[0].comentarios, 150);
    for (var x = 0; x < splitcomment.length; x++) {
      if (x == 0) {
        doc.text(15, 33 + hlinea, 'Observaciones: ' + splitcomment[0]);
      }
      else{
       doc.text(15, 33 + hlinea + 3,  splitcomment[1]);   
      }
    }
    doc.setFontSize(7);
    doc.text(95, 40, 'Simbolos   V - vuelva    O - ocupado(a)    NC -  no interesado(a)   |   Impreso el: ' + fechaHoy);
    doc.setFontSize(7);

    var columns = [
    {title: "Fecha", dataKey: "fecha"},
    {title: "Hora", dataKey: "hora"}, 
    {title: "Sim.", dataKey: "sim"}, 
    {title: "Publicador", dataKey: "publicador"},
    {title: "Observaciones", dataKey: "observaciones"}  
    ];
    var rows = [];
    for (var i = 0; i < 14; i++) {
      rows.push({"fecha": '', "hora": "", "sim": "", "publicador": "", "observaciones": "" });
    }

    doc.autoTable(columns, rows, {
        styles: {fontSize: 5, rowHeight: 5, lineColor: 0},
        headerStyles: {fillColor: 200, cellPadding: 1, rowHeight: 6, fontStyle: 'bold', textColor: 0,  lineWidth: 0.2, lineColor: 0, fontSize: 7, overflow :'linebreak'},
        columnStyles: {
            fecha: {columnWidth: 17},
            hora: {columnWidth: 17},
            sim: {columnWidth: 10},
            publicador: {columnWidth: 36},
            observaciones: {columnWidth: 100}
        },
        margin: {top: 43, left: 15},
        theme: 'grid'
        //addPageContent: function(data) {
        //    doc.text("Header", 40, 30);
        //}
    });
  
    doc.addPage();
    var columns = [
    {title: "Fecha", dataKey: "fecha"},
    {title: "Hora", dataKey: "hora"}, 
    {title: "Sim.", dataKey: "sim"}, 
    {title: "Publicador", dataKey: "publicador"},
    {title: "Observaciones", dataKey: "observaciones"}  
   ];
    var rows = [];
    for (var i = 0; i < 16; i++) {
      rows.push({"fecha": '', "hora": "", "sim": "", "publicador": "", "observaciones": "" });
    }
  
    doc.autoTable(columns, rows, {
        styles: {fontSize: 5, rowHeight: 5, lineColor: 0},
        headerStyles: {fillColor: 200, cellPadding: 1, rowHeight: 6, fontStyle: 'bold', textColor: 0,  lineWidth: 0.2, lineColor: 0, fontSize: 7, overflow :'linebreak'},
        columnStyles: {
            fecha: {columnWidth: 17},
            hora: {columnWidth: 17},
            sim: {columnWidth: 10},
            publicador: {columnWidth: 36},
            observaciones: {columnWidth: 100}
        },
        margin: {top: 15, left: 15},
        theme: 'grid'
        //addPageContent: function(data) {
        //    doc.text("Header", 40, 30);
        //}
    });
    

    doc.autoPrint();  // <<--------------------- !!
    doc.output('dataurlnewwindow');
   
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

