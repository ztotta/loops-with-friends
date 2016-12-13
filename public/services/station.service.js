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
		
		stationFactory.email = "";

    // return station factory object
    return stationFactory;
  }

})();