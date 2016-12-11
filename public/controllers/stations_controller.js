(function() {
  "use strict";

  angular
      .module("loopsApp")
      .controller("StationsController", StationsController);

  StationsController.$inject = ["$state", "userDataService", "$log", "$http"];

  function StationsController($state, userDataService, $log, $http) {
    var vm = this;

    vm.user = userDataService.user;

    vm.stations = [];
		vm.station = {};

    vm.newStation = {
      name: ['Convoluted','Knotted','Looping','Curling', 'Whorling', 'Twirling', 'Swirling'][Math.floor(7 * Math.random())] + '-' + ['Jackal','Hyena','Swordsmith','Pangolin','Muskrat','Canyon','Arch', 'Archduke', 'Baron'][Math.floor(9 * Math.random())] + Math.floor(Math.random() * (99 - 10)) + 10
    };

    vm.editStation = {
      name: "",
      category: ""
    };

    vm.getStations      = getStations;
    vm.getStation       = getStation;
    vm.deleteStation    = deleteStation;
    vm.updateStation    = updateStation;
    vm.updateStation    = updateStation;
    vm.postStation      = postStation;
    vm.resetEditForm 		= resetEditForm;

    vm.getStations();
//		vm.getStation();

    function getStations() {
      $http.get('/api/stations').then(function(response) {
        vm.stations = response.data;
      }, function(errRes) {
        console.error('Error retrieving stations.', errRes);
      });
    }
		
		function getStation(station) {
      $http.get('/api/stations/' + station._id).then(function(response) {
        vm.station = response.data;
				console.log(response.data)
				$state.go('station', { id: response.data._id })
      }, function(errRes) {
        console.error('Error retrieving station.', errRes);
      });
    }

    function deleteStation(id) {
      $http.delete('/api/stations/' + id).then(function(response) {
        console.log(response);
      }, function(errRes) {
        console.error('Error deleting station.', errRes);
      }).then(getStations);
    }

    function postStation() {
      $http.post('/api/stations', vm.newStation)
        .then(getStations)
        .then(function(response) {
          vm.newStation = {
            name: ['Convoluted','Knotted','Looping','Curling', 'Whorling', 'Twirling', 'Swirling'][Math.floor(7 * Math.random())] + '-' + ['Jackal','Hyena','Swordsmith','Pangolin','Muskrat','Canyon','Arch', 'Archduke', 'Baron'][Math.floor(9 * Math.random())] + Math.floor(Math.random() * (99 - 10)) + 10
          };
					$state.go('station');
        });
    }

    function updateStation(id) {
      $http.put('/api/stations/' + id, vm.editStation).then(function(response) {
        vm.editStation = {
          name: "",
          category: ""
        };
      }, function(errRes) {
        console.log('Error updating station.', errRes);
      }).then(getStations);
    }

    function resetEditForm() {
      vm.stationCategory = '';
      vm.stationName = '';
      vm.editStation = {
        name: "",
        category: ""
      };
    }

  }

})();
