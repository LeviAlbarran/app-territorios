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
		'directionTMPService',
		'territoriosService',
		'localstorageService',
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
			directionTMPService,
			territoriosService,
			localstorageService,
			zonasService,
			InstructionsService

			) {

	$scope.locationsObj = {}; //objetos direcciones
	$scope.locationsObj.savedLocations = [];	//array direcciones
	console.log($rootScope.usuario);
	$rootScope.usuario.sync=true; //sincronizar?

	angular.element(document).ready(function () { //init
			var myLatlng = { lat: 10.5732857, lng: -71.6487104 };
			var mapOptions = {
						center: new google.maps.LatLng(10.6417, -71.6295),
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
		 	$scope.mapTerritorios = new google.maps.Map(document.getElementById('map'), mapOptions);
			google.maps.event.addListener($scope.mapTerritorios, 'rightclick', function(event) {
								console.log(event.latLng);
								var lat = event.latLng.lat();
								var lng = event.latLng.lng();
								$scope.newLocation = new Location();
								$scope.newLocation.lat = lat;
								$scope.newLocation.lng = lng;
								$scope.modal.show();    
			});
			var input = document.getElementById('place-input');
			var searchBox = new google.maps.places.SearchBox(input);
			$scope.mapTerritorios.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
			$scope.mapTerritorios.addListener('bounds_changed', function() {
				searchBox.setBounds($scope.mapTerritorios.getBounds());
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
				$scope.mapTerritorios.fitBounds(bounds);
			});

			$scope.verDireciones();
			$scope.locate();
 });


		$scope.marcarAqui = function(){
			positionCenter = $scope.mapTerritorios.getCenter();
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
			$scope.verDireciones();
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



	 territoriosService.todosTerritorios('get').ejecutar(function (data) {
													 console.log(data);
													$scope.territorios=data;

												}, function (error) {
														alert(error);
														alert('Ha ocurrido un error');
											});

$scope.direccionesSync=[];

$scope.verDireciones = function () {  
	if ($rootScope.usuario.sync) {
		$scope.direccionesSync = JSON.parse(localStorage.getItem('direccionesSync'));
		console.log($scope.direccionesSync);
		var todasDirecciones = $scope.direccionesSync;
		for (var i = 0; i < todasDirecciones.length; i++) {  
			$scope.locationsObj.savedLocations.push(todasDirecciones[i]);														 
			if (todasDirecciones[i].lat && todasDirecciones[i].lng) {                  
				$scope.marcarDirecciones(i);
			};
		}

	}else{ 
	 directionService.todasDirecciones('get').ejecutar(function (data) {
												//   console.log(data);
													// console.log(data.length);
													var todasDirecciones = data;
													for (var i = 0; i < data.length; i++) {  
													 $scope.locationsObj.savedLocations.push(data[i]);														
											//     console.log(i)
													 //console.log(data[i]); 
													 if (data[i].lat && data[i].lng) {                  
														 $scope.marcarDirecciones(i);
													 };

													}
												 // $scope.hideLoanding();
													console.log($scope.locationsObj)
												directionTMPService.todasDirecciones('get').ejecutar(function (data) {
														console.log(data);
													// console.log(data.length);
													for (var i = 0; i < data.length; i++) {
													var posicion = todasDirecciones.length + i;
													 $scope.locationsObj.savedLocations.push(data[i]);
													 if (data[i].lat && data[i].lng) {                  
														 $scope.marcarDirecciones(posicion);
													 };
													}
												 // $scope.hideLoanding();
													console.log($scope.locationsObj)

												}, function (error) {
														console.log(error);
														alert('Ha ocurrido un error');
											});


												}, function (error) {
														console.log(error);
														alert('Ha ocurrido un error');
											});
	 }
};
	

			$scope.$on("$stateChangeSuccess", function() {

				$scope.locations = $scope.locationsObj.savedLocations;
				$scope.newLocation;

				if(!InstructionsService.instructions.newLocations.seen) {
/*
					var instructionsPopup = $ionicPopup.alert({
						title: 'Agregar Dirección',
						template: InstructionsService.instructions.newLocations.text
					});
					instructionsPopup.then(function(res) {
						InstructionsService.instructions.newLocations.seen = true;
						});
*/
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
					//console.log(direccion);
				 // console.log($scope.locationsObj.savedLocations);
		if ($rootScope.usuario.nivel==1) {
			 if ($rootScope.usuario.sync) {
					localstorageService.direcciones('guardar', [$scope.newLocation]);
				}else{
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
				}
			}else{
				if ($rootScope.usuario.sync) {
					localstorageService.direccionesTMP('guardar', [$scope.newLocation]);
				}else{
				$scope.requestDireccionTemporal('post', 'Agregado', 'newLocation');
				}
			}
			 //   $scope.locationsObj.savedLocations.push($scope.newLocation);
 	};

		


	$scope.eliminarLocation = function(direccion, j) {
					//  $scope.marker[j].setMap(null);
				if ($rootScope.usuario.sync) {
					if (direccion.id) {
						console.log(direccion.id);
						localstorageService.direcciones('eliminar', [direccion]);
						console.log($scope.direccionesSync);
						var position = 	$scope.direccionesSync.map(function(element){ return element._id; }).indexOf(direccion._id);
						$scope.direccionesSync.splice(position, 1);
						console.log($scope.direccionesSync);
						localStorage.setItem('direccionesSync', JSON.stringify($scope.direccionesSync))
						for (var k = 1; k < $scope.marker.length; k++) {
							$scope.marker[k].setMap(null);
						}
						$scope.locationsObj.savedLocations.splice(0);                                  
															
						$scope.verDireciones();

					}else{
						localstorageService.direccionesTMP("eliminar", [direccion]);
						var position = 	$scope.direccionesSync.map(function(element){ return element._id; }).indexOf(direccion._id);
						$scope.direccionesSync.splice(position, 1);
						localStorage.setItem('direccionesSync', JSON.stringify($scope.direccionesSync))
						for (var k = 1; k < $scope.marker.length; k++) {
							$scope.marker[k].setMap(null);
						}
						$scope.locationsObj.savedLocations.splice(0);                                  														
						$scope.verDireciones();
					}
				}else{
					if (direccion.id) {
						directionService.unaDireccion('delete', direccion._id).ejecutar(function (data) {
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
					}else{
						directionTMPService.unaDireccion('delete', direccion._id).ejecutar(function (data) {
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
					}
			}
		 //   $scope.locationsObj.savedLocations.push($scope.newLocation);
			};


		$scope.submitModifierLocation = function() {
			 direccionModifier = JSON.stringify($scope.modifierLocation);
			console.log(direccionModifier);
			if ($rootScope.usuario.nivel==1) {
				if ($rootScope.usuario.sync) {
					if ($scope.modifierLocation.id) {
						localstorageService.direcciones('modificar', [$scope.modifierLocation]);
					}
					else{
						localstorageService.direccionesTMP('modificar', [$scope.modifierLocation]);
					}
					var position = $scope.direccionesSync.map(function(element){return element._id;}).indexOf($scope.modifierLocation._id);
					$scope.direccionesSync[position] = $scope.modifierLocation;
					localStorage.setItem('direccionesSync', JSON.stringify($scope.direccionesSync))
					for (var k = 1; k < $scope.marker.length; k++) {
							$scope.marker[k].setMap(null);
					}
					$scope.locationsObj.savedLocations.splice(0);                                  														
					$scope.verDireciones();
					$scope.modalModifier.hide();
				
				}else{
					if ($scope.modifierLocation.id) {
					directionService.unaDireccion('put', $scope.modifierLocation._id).ejecutar(direccionModifier, function (data) {
													 console.log('modificado')
													 console.log(data);
															for (var k = 1; k < $scope.marker.length; k++) {
																$scope.marker[k].setMap(null);
															}
															$scope.locationsObj.savedLocations.splice(0);
															$scope.verDireciones(); 
														$scope.modalModifier.hide();
										
												}, function (error) {
														console.log(error);
														alert('Ha ocurrido un error');
											});
					}else{
						directionTMPService.unaDireccion('put', $scope.modifierLocation._id).ejecutar(direccionModifier, function (data) {
													 console.log('modificado')
													 console.log(data);
															for (var k = 1; k < $scope.marker.length; k++) {
																$scope.marker[k].setMap(null);
															}
															$scope.locationsObj.savedLocations.splice(0);
															$scope.verDireciones(); 
														$scope.modalModifier.hide();
										
												}, function (error) {
														console.log(error);
														alert('Ha ocurrido un error');
											});
					}
				}
			}else{
					if ($rootScope.usuario.sync) {
						if ($scope.modifierLocation.user) {
							localstorageService.direccionesTMP('modificar', [$scope.modifierLocation]);
						}else{
							localstorageService.direccionesTMP('guardar', [$scope.modifierLocation]);
						}
					}else{
						if ($scope.modifierLocation.user) {
							$scope.requestDireccionTemporal('put', 'Agregado', '');
						}else{
							$scope.requestDireccionTemporal('post', 'Modificado', 'modifierLocation');
						}
					}
				}
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
			 //   console.log(location);
					var latitud = parseFloat(location.lat.toFixed(14));
					var longitud = parseFloat(location.lng.toFixed(14));
			 //   console.log(latitud);
			 //   console.log(longitud);
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
								map: $scope.mapTerritorios,
								title: location.nombre,
								//label: " " +location.id + " ",
								animation: google.maps.Animation.DROP,
								icon: image
							});

				 $scope.marker[j].setMap($scope.mapTerritorios);

			/*  $scope.marker[j].addListener('click', function() {
						$scope.infowindow.open($scope.mapTerritorios, $scope.marker[j]);
					});
*/
					google.maps.event.addListener($scope.marker[j], "click", function () {
							//  alert(this.html);
								infowindow.setContent(location.nombre);
								infowindow.open($scope.mapTerritorios, this);
						});

					
					google.maps.event.addListener($scope.marker[j], 'dblclick', function() {
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
											if($rootScope.auth.verificacion.modificar==false) {
													var modificarPopup = $ionicPopup.alert({
														title: 'Sin permiso!',
														template: 'No posee permisos para modificar, consulte con el encargado de territorios'
													});       
												}
												else{
													$scope.modifierLocation = {};
													//Modificar
													$scope.idModifierDireccion = location._id;
													$scope.modifierLocation._id = location._id;
													$scope.modifierLocation.id = location.id;
													$scope.modifierLocation.numero = location.numero;
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
													$scope.modifierLocation.user = location.user;
													$scope.modifierLocation.change = location.change;
													// console.log(modifierLocation.id);
													$scope.modalModifier.show();
													};
											
										break;
										case 1:
												//Eliminar
											if ($rootScope.auth.verificacion.eliminar == false) {
												var eliminarPopup = $ionicPopup.alert({
														title: 'Sin permiso!',
														template: 'No posee permisos para eliminar, consulte con el encargado de territorios'
													});
											}else{
														var eliminarDireccionPopup = $ionicPopup.confirm({
															title: 'Eliminar Registro',
															template: 'Seguro que desea eliminar este Registro'
													
													}); 
														eliminarDireccionPopup.then(function(res) {
														 if(res) {
														 console.log(location._id);
															$scope.eliminarLocation(location, j); //enviar el _id mongo para eliminar
															//$scope.locationsObj.savedLocations.splice(PosicionArrayDir); //eliminar del arreglo que contiene la informacion tomando en cuenta la posiscion dentro el mismo
														 
															$scope.locate(); //Volver a localizarme
														 

														 } else {
															 console.log('cancelado');
														 }
													 });

												}
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

				$scope.search = null;
				var lastLocation = null;

			 $scope.goTo= function(idDireccion){

				
				console.log($scope.search);
				$scope.search = "";
				console.log(idDireccion);
				console.log(lastLocation);

						if(lastLocation==null){
							 }
						else{
							 $scope.marker[lastLocation].setAnimation(null);
							}
				

				for (var i = 0; $scope.locationsObj.savedLocations.length > i; i++) {
					if ($scope.locationsObj.savedLocations[i]._id == idDireccion) {

						var location = $scope.locationsObj.savedLocations[i];
						k= i+1
						$scope.marker[k].setAnimation(google.maps.Animation.BOUNCE);
						$scope.mapTerritorios.setCenter(new google.maps.LatLng(location.lat, location.lng));
						console.log(location);
						
				
						lastLocation = i;

					};
				};        
 
			 };

			 $scope.markerMyPosition;
			$scope.locate = function(){
				if ($scope.markerMyPosition) {
					$scope.markerMyPosition.setMap(null);
				};
				$scope.markerMyPosition;

															
				$cordovaGeolocation
					.getCurrentPosition()
					.then(function (position) {

						var myPosition = {lat: position.coords.latitude, lng: position.coords.longitude};
						console.log(myPosition);
						$scope.markerMyPosition = new google.maps.Marker({
								position: myPosition,
								map: $scope.mapTerritorios,
								title: 'Tu estas Aqui',
								 icon: './images/marker_myposition.png'
							});

				 $scope.mapTerritorios.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));

					}, function(err) {
						// error
						console.log("Localizacion error!");
						console.log(err);
					});

			};


			$scope.requestDireccionTemporal = function(method, change, modal){
					if (method=='put') {
							$scope.modifierLocation.user = $rootScope.usuario._id;
							$scope.modifierLocation.change = change;
							direccionModifier = JSON.stringify($scope.modifierLocation);
							console.log(direccionModifier);

				directionTMPService.unaDireccion('put', $scope.idModifierDireccion).ejecutar(direccionModifier, function (data) {
								console.log('modificado')
								console.log(data);
								for (var k = 1; k < $scope.marker.length; k++) {
									$scope.marker[k].setMap(null);
								}
							$scope.locationsObj.savedLocations.splice(0);
							$scope.verDireciones(); 
							$scope.modalModifier.hide();
									 
							}, function (error) {
							 console.log(error);
							 alert('Ha ocurrido un error');
							});

					}else if(method=='post'){ 
					console.log($rootScope.usuario._id)
					//CORREGIR
				 var direccion = {};
					if (modal=='newLocation') {
					$scope.newLocation.user = $rootScope.usuario._id;
					$scope.newLocation.change = change;
					direccion = JSON.stringify($scope.newLocation); 
					}else if (modal=='modifierLocation') {
						$scope.modifierLocation.user = $rootScope.usuario._id;
						$scope.modifierLocation.change = change;
						direccion = JSON.stringify($scope.modifierLocation); 
					}


					console.log(direccion);      
					
					directionTMPService.todasDirecciones('post').ejecutar(direccion, function (data) {                  
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

					}


			}
	 
		}]);
