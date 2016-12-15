(function() {

  angular.module('loopsApp')
         .factory('stationService', stationService);

  stationService.$inject = ["$http", "$q", "authToken", "userDataService", "$state", "$window"];

  // =============================== //
  // === STATION SERVICE FACTORY === //
  // =============================== //
  function stationService($http, $q, authToken, userDataService, $state, $window) {

    // Create station factory object:
    var stationFactory = {};
		
		stationFactory.email    = "";
		stationService.station  = {};
		stationService.stations = [];
		stationService.loopOn   = false;
		
    // Return station factory object:
    return stationFactory;
  }

})();