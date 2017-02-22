app.controller('dashboardController',
   [ '$scope',
    '$ionicActionSheet',
    '$timeout',
    '$compile',
    '$location',
    '$stateParams',
    '$ionicModal',
    '$ionicPopup',
    '$rootScope',
    'directionService',
    'zonasService',
    function(
      $scope,
      $ionicActionSheet,
      $timeout,
      $compile,
      $location,
      $stateParams,
      $ionicModal,
      $ionicPopup,
      $rootScope,
      directionService,
      zonasService
      ) {

      var arrayNativos = [];
      var arrayDescendientes = [];
      var arrayOtros = [];
      var arrayNativosFecha = [];
      var arrayDescendientesFecha = [];
      var arrayOtrosFecha = [];
/*      directionService.todasDireccionesOrdenFecha('get').ejecutar(function(data){
        console.log(data);

        $scope.direcciones= data;
        for(var i = 0; i< $scope.direcciones.length; i++){
          var date = new Date($scope.direcciones[i].fecha);
         // console.log(date);
          var month = date.getMonth();
          var fecha = Date.UTC(date.getFullYear(), month, date.getDate());
         
          if ($scope.direcciones[i].condicion == 'Descendiente') {
              
              var positionNativo = arrayNativosFecha.indexOf(fecha);
           //   console.log('positionNativo'+ positionNativo);    
              if (positionNativo<0) {
                arrayNativos.push([fecha, 1])
                arrayNativosFecha.push(fecha)        
              }else{
                arrayNativos[positionNativo][1] = arrayNativos[positionNativo][1] + 1;
              };

          }else if($scope.direcciones[i].condicion == 'Nativo'){
              var positionDescendiente = arrayDescendientesFecha.indexOf(fecha);
            //  console.log('positionDescendiente'+ positionDescendiente);    
              if (positionDescendiente<0) {
                arrayDescendientes.push([fecha, 1]);
                arrayDescendientesFecha.push(fecha);
                console.log(arrayDescendientesFecha);
        
              }else{
                arrayDescendientes[positionDescendiente][1] = arrayDescendientes[positionDescendiente][1] + 1;
              };
          }else{
           var positionOtros = arrayOtrosFecha.indexOf(fecha);
         //  console.log('positionOtros'+ positionOtros);    
              if (positionOtros<0) {
                arrayOtros.push([fecha, 1]);
                arrayOtrosFecha.push(fecha);        
              }else{
                arrayOtros[positionOtros][1] = arrayOtros[positionOtros][1] + 1;
              };
          }
        }
          console.log(arrayNativos);
          console.log(arrayDescendientes);
          console.log(arrayOtros);         
          arrayNativos.sort(function (a, b) { 
          return a[0] > b[0] ? 1 : -1;
              });
          arrayDescendientes.sort(function (a, b) {
          return a[0] > b[0] ? 1 : -1;
            });
          arrayOtros.sort(function (a, b) {
          return a[0] > b[0] ? 1 : -1;
            });
    
          $scope.graficoDirecciones();
      }, function (error) {
        console.log(error);
        if (error.status == 403) {
          $location.path("/");
        }else{
        alert('Ha ocurrido un error');
        }
      });
*/

$scope.graficoDirecciones = function(){ 
       $('#graphDirecciones').highcharts({
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Extranjeros Registrados'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                        'Puede hacer zoom en el grafico para mas detalle' : ''
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Cantidad'
                }
            },
            legend: {
                enabled: true
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },

            series: [{
            name: 'Nativos',
            // Define the data points. All series have a dummy year
            // of 1970/71 in order to be compared on the same x axis. Note
            // that in JavaScript, months start at 0 for January, 1 for February etc.
            data: arrayNativos
        }, {
            name: 'Descendientes',
            data: arrayDescendientes
        }, {
            name: 'Otros',
            data: arrayOtros
        }]
        });
}

    }]);

