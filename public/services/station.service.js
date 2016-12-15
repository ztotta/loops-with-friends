(function() {

  angular.module('loopsApp')
         .factory('stationService', stationService);

  stationService.$inject = ["$http", "$q", "authToken", "userDataService", "$state", "$window"];

  //||||||||||||||||||||||||||--
  // STATION SERVICE FACTORY
  //||||||||||||||||||||||||||--
  function stationService($http, $q, authToken, userDataService, $state, $window) {

    // create station factory object
    var stationFactory = {};
		
		stationFactory.email    = "";
		stationService.station  = {};
		stationService.stations = [];
		stationService.loopOn   = false;
		
    // return station factory object
    return stationFactory;
  }

})();