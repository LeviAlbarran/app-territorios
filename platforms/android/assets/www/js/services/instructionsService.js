app.factory('InstructionsService', [ function() {

  var instructionsObj = {};

  instructionsObj.instructions = {
    newLocations : {
      text : 'Dejar presionado para agregar una direccion',
      seen : false
    }
  };

  return instructionsObj;

}]);