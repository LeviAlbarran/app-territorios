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
    'directionService',
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
      pdfService
      ) {
      console.log($stateParams.idTerritorios);

       directionService.direccionesTerritorio('get', $stateParams.idTerritorios).ejecutar(function (data) {
                        $scope.infopdf= data;
                               
                         
                        }, function (error) {
                            alert(error);
                            alert('Ha ocurrido un error');
                      });


       territoriosService.unTerritorio('get', $stateParams.idTerritorios).ejecutar(function (data) {
                           console.log(data);
                          $scope.territorio=data;

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

       $ionicModal.fromTemplateUrl('templates/modalAsignarDirecciones.html', {
            scope: $scope,
            animation: 'slide-in-up'
          }).then(function(modal) {
              $scope.modalAsignarDirecciones = modal;

            });
        $ionicModal.fromTemplateUrl('templates/modalVerDireccion.html', {
            scope: $scope,
            animation: 'slide-in-up'
          }).then(function(modal) {
              $scope.modalVerDireccion = modal;

            });


$scope.buttonVerDireccion= function(idDireccion){
      console.log(idDireccion);
      directionService.unaDireccion('get', idDireccion).ejecutar(function (data) {                    
                          $scope.direccionSeleccionada=data;
                          console.log($scope.direccionSeleccionada);
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
                    label: " " +data.id + " ",
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

$scope.buttonOcultarModal= function(){

      $scope.direcciones;
      var saveTerritoriosAnteriores;
      $scope.modalAsignarDirecciones.hide();
}

$scope.direcciones;  

      

var saveTerritoriosAnteriores;

      $scope.checkboxChangeTerritorio = function(idDireccion, position){


        console.log($scope.direcciones[position].checked);
        console.log($scope.direcciones[position]);

/*        if  ($scope.direcciones[position].territorio ==! "" || $scope.direcciones[position].territorio ==! null || $scope.direcciones[position].territorio ==! $stateParams.idTerritorios) {

            saveTerritoriosAnteriores.position = position;
            saveTerritoriosAnteriores._id = $scope.direcciones[position]._id;
            saveTerritoriosAnteriores.territorio = $scope.direcciones[position].territorio;
            saveTerritoriosAnteriores.nombreTerritorio = $scope.direcciones[position].nombreTerritorio;
            console.log(saveTerritoriosAnteriores);            

        };*/


        if($scope.direcciones[position].checked == true){
            delete $scope.direcciones[position].checked;
            delete $scope.direcciones[position].nombreTerritorio;
            $scope.direcciones[position].territorio = $stateParams.idTerritorios;

            directionService.unaDireccion('put', idDireccion).ejecutar($scope.direcciones[position], function (data) {
                           console.log('modificado');
                           console.log(data);

                          $scope.direcciones[position].checked = true;
                          $scope.direcciones[position].nombreTerritorio = $scope.territorio.nombre;
                
                    
                        }, function (error) {
                            console.log(error);
                            alert('Ha ocurrido un error');
                      });
        }
        else{
              if($scope.direcciones[position].territorio == saveTerritoriosAnteriores[position].territorio){
                $scope.direcciones[position].territorio = '';
              }
              else{
                $scope.direcciones[position].territorio = saveTerritoriosAnteriores[position].territorio;

              }

     /*       $scope.direcciones[position].territorio = saveTerritoriosAnteriores[position].territorio;
            console.log($scope.direcciones[position].territorio);
            console.log(saveTerritoriosAnteriores[position].territorio);
*/
            delete $scope.direcciones[position].checked;
            delete $scope.direcciones[position].nombreTerritorio;

            directionService.unaDireccion('put', idDireccion).ejecutar($scope.direcciones[position], function (data) {
                           console.log('modificado');
                           console.log(data);

                          
                    
                        }, function (error) {
                            console.log(error);
                            alert('Ha ocurrido un error');
                      });
        }

       

     

      }


      $scope.buttonAsignarDirecciones = function (){


directionService.listDirecciones('get').ejecutar(function (data) {
                           
          $scope.direcciones=data;
          console.log($scope.direcciones);
          for (var i = 0; i < $scope.direcciones.length; i++) {
            var position =  $scope.infopdf.map(function(element){ return element.territorio}).indexOf($scope.direcciones[i].territorio);                
            if (position>=0) {
              $scope.direcciones[i].checked =  true;
            }

           var position2 =  $scope.territorios.map(function(element){ return element._id}).indexOf($scope.direcciones[i].territorio);                
            if (position2>=0) {
              $scope.direcciones[i].nombreTerritorio = $scope.territorios[position2].nombre;
            }
          }
          
 
/*                        
       territoriosService.todosTerritorios('get').ejecutar(function (data) {
                           console.log(data);
                          //$scope.territorio=data;
                          for (i = 0; i < $scope.direcciones.length; i++) {
                            //console.log($scope.direcciones[i]);
                            for (j = 0; j < data.length; j++) {  
                              //console.log(data[j]);
                             if ($scope.direcciones[i].territorio == data[j]._id) {
                              $scope.direcciones[i].nombreTerritorio = data[j].nombre;
                              
                                if ($scope.direcciones[i].territorio== $stateParams.idTerritorios) {
                                  $scope.direcciones[i].checked = true; 
                                }

                             // console.log($scope.direcciones[i]);     
                               }


                            }

                          }
                           saveTerritoriosAnteriores=$scope.direcciones;
                          console.log($scope.direcciones);

                        }, function (error) {
                            alert(error);
                            alert('Ha ocurrido un error');
                      });
  */       
          $scope.modalAsignarDirecciones.show();
          }, function (error) {
              alert(error);
              alert('Ha ocurrido un error');
          });
      };   

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



    // Initialize the modal view.
    $ionicModal.fromTemplateUrl('pdf-viewer.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modalpdf = modal;
    });

$scope.imprimirDirecciones =  function(){ 
    /*    var dataPdf = $scope.infopdf;

        pdfService.createPdf(dataPdf, false)
                        .then(function(pdf) {
                            var blob = new Blob([pdf], {type: 'application/pdf'});
                            $scope.pdfUrl = URL.createObjectURL(blob);

                            // Display the modal view
                            $scope.modalpdf.show();
                        });
*/
    var d = new Date();
    var hoy = d.getDate();
    var mes = d.getMonth();
    var anio = d.getFullYear();
    var fechaHoy =  hoy +"/"+ mes + "/" + anio;                   
    console.log($scope.infopdf);
    var doc = new jsPDF();
    var hlinea= 0;
   for (var j = 0; j < $scope.infopdf.length; j++) {
    if(!$scope.infopdf[j].genero){
      $scope.infopdf[j].genero = '';
    }
    if(!$scope.infopdf[j].nombre){
      $scope.infopdf[j].nombre = '_________________________';
    }

    if(!$scope.infopdf[j].zona){
      $scope.infopdf[j].zona = '_________';
    }
    if(!$scope.infopdf[j].publicador){
      $scope.infopdf[j].publicador = '___________';
    }
    if(!$scope.infopdf[j].telefono){
      $scope.infopdf[j].telefono = '___________';
    }
    if(!$scope.infopdf[j].edificacion){
      $scope.infopdf[j].edificacion = '___________';
    }
    if(!$scope.infopdf[j].telefono){
      $scope.infopdf[j].telefono = '___________';
    }
    if(!$scope.infopdf[j].condicion){
      $scope.infopdf[j].condicion = '___________';
    }


    doc.setFontSize(12);
   // console.log(j);
    doc.text(15, 10 + hlinea,  $scope.infopdf[j].id + ' - ' + $scope.infopdf[j].genero + ' '+ $scope.infopdf[j].nombre);
    //doc.text(30, 10,'Nombre: ' + );
    doc.setFontSize(8);
    doc.text(23, 16 + hlinea, 'Zona: ' + $scope.infopdf[j].zona);
    doc.text(80, 16 + hlinea, 'Condicion: ' + $scope.infopdf[j].condicion);
    doc.text(140, 16 + hlinea, 'Telefono: ' + $scope.infopdf[j].numero);
    
    doc.text(15, 21 + hlinea, 'Edificacion: ' + $scope.infopdf[j].edificacion);
    doc.text(137, 21 + hlinea, 'Publicador: ' + $scope.infopdf[j].publicador);

    var splitcomment = doc.splitTextToSize($scope.infopdf[j].direccion, 150);
    //console.log($scope.infopdf[j].direccion);
    //console.log(splitcomment);
    for (var x = 0; x < splitcomment.length; x++) {
      if (x == 0) {
        doc.text(17, 26 + hlinea, 'Direccion: ' + splitcomment[0]);
      }
      else{
       doc.text(17, 26 + hlinea + 3,  splitcomment[1]);   
      }
    }

    var splitcomment = doc.splitTextToSize($scope.infopdf[j].comentarios, 150);
    for (var x = 0; x < splitcomment.length; x++) {
      if (x == 0) {
        doc.text(15, 33 + hlinea, 'Observaciones: ' + splitcomment[0]);
      }
      else{
       doc.text(15, 33 + hlinea + 3,  splitcomment[1]);   
      }
    }



    doc.setFontSize(7);
    doc.text(95, 40 + hlinea, 'Simbolos   V - vuelva    O - ocupado(a)    NC -  no interesado(a)   |   Impreso el: ' + fechaHoy);
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
        margin: {top: 43 + hlinea, left: 15},
        theme: 'grid'
        //addPageContent: function(data) {
        //    doc.text("Header", 40, 30);
        //}
    });

  var hlinea = hlinea + 130;

  if( j % 2 == 0 ) {
      doc.addPage();
    console.log("add page"); 
          var columns = [
    {title: "Fecha", dataKey: "fecha"},
    {title: "Hora", dataKey: "hora"}, 
    {title: "Sim.", dataKey: "sim"}, 
    {title: "Publicador", dataKey: "publicador"},
    {title: "Observaciones", dataKey: "observaciones"}  
   ];
    var rows = [];
    for (var k = 0; k < 16; k++) {
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
        margin: {top: 15 + 130 , left: 15},
        theme: 'grid'
        //addPageContent: function(data) {
        //    doc.text("Header", 40, 30);
        //}
    });

      doc.addPage();
      hlinea=0;
  }
        
  }

    doc.autoPrint();  // <<--------------------- !!
    doc.output('dataurlnewwindow');
   


    };

$scope.descargarPdf = function(){
   var dataPdf = $scope.infopdf;

        pdfService.createPdf(dataPdf, true)
                        .then(function(pdf) {
                        console.log('imprimiendo');
                        });

    }

    }]);

