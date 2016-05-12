app.factory('LocationsService', [ function() {


  var locationsObj = {};

  locationsObj.savedLocations = [
    {
      nombre : "Donato Bari",
      lat : 10.6544082,
      lng : -71.6996923
    }
  ];


  return locationsObj;

}]);