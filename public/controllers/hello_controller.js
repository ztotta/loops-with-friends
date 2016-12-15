(function() {
  "use strict";

  angular
      .module("loopsApp")
      .controller("HelloController", HelloController);

  HelloController.$inject = ["$state", "userDataService", "$log", "authService", "stationService", "$stateParams", "$http"];

  function HelloController($state, userDataService, $log, authService, stationService, $stateParams, $http) {
    var vm = this;

		// === CONTROLLER SERVICES === //
		vm.stationService    = stationService;
		vm.userDataService   = userDataService;
		
		// === CONTROLLER FUNCTIONS === //
		vm.getStations      = getStations;
		vm.postStation      = postStation;
		vm.goToStation      = goToStation;
		vm.deleteStation    = deleteStation;
		
		// Grabs the user's available stations to list:
		getStations();
		function getStations() {
		 $http.get('/api/users/' + userDataService.user._id).then(function(response) {
			 console.log(response.data.userStations)
				vm.stationService.stations = response.data.userStations
			}, function(errRes) {
				console.error('Error retrieving station.', errRes);
			});
		}
		
	// Creates a new station with a randomized name:	
	function postStation() {
		$http.post('/api/stations', {
			name: ['Convoluted','Knotted','Looping','Curling', 'Whorling', 'Twirling', 'Swirling'][Math.floor(7 * Math.random())] + '-' + ['Jackal','Hyena','Swordsmith','Pangolin','Muskrat','Canyon','Arch', 'Archduke', 'Baron'][Math.floor(9 * Math.random())] + Math.floor(Math.random() * (99 - 10)) + 10,
			user: userDataService.user._id
		})
			// Adds that station ID to the user's array of stationIds:
			.then(function(response) {
				$http.put('/api/users/' + userDataService.user._id, {stationId: response.data._id})
					.then(function(response) {
						vm.stationService.stations = response.data.userStations;
						// Sends the user to the newly created station:
						$state.go('station', {id: response.data.userStations[response.data.userStations.length-1]._id});
					});
			})
    }
		
		// Takes the user to the station they selected from their list:
		function goToStation(stationId) {
			$state.go('station', {id: stationId})
		}
		
		// Removes the station ID from the user's array of stationIds:
		function deleteStation(id) {
			$http.put('/api/users/stations/' + userDataService.user._id, {stationId: id})
					.then(function(response) {
						vm.stationService.stations = response.data.userStations;
					});
		 }

//			vm.$state = $state;
		}

})();
