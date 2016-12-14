(function() {
  "use strict";

  angular
      .module("loopsApp")
      .controller("HelloController", HelloController);

  HelloController.$inject = ["$state", "userDataService", "$log", "authService", "stationService", "$stateParams", "$http"];

  function HelloController($state, userDataService, $log, authService, stationService, $stateParams, $http) {
    var vm = this;

		vm.stationService    = stationService;
		vm.userDataService   = userDataService;
		
		vm.getStations      = getStations;
		vm.postStation      = postStation;
		vm.goToStation      = goToStation;
		vm.deleteStation    = deleteStation;
		
		getStations();
		function getStations() {
		 $http.get('/api/users/' + userDataService.user._id).then(function(response) {
				vm.stationService.stations = response.data.userStations
			}, function(errRes) {
				console.error('Error retrieving station.', errRes);
			});
		}
		
	 function postStation() {
		$http.post('/api/stations', {
			name: ['Convoluted','Knotted','Looping','Curling', 'Whorling', 'Twirling', 'Swirling'][Math.floor(7 * Math.random())] + '-' + ['Jackal','Hyena','Swordsmith','Pangolin','Muskrat','Canyon','Arch', 'Archduke', 'Baron'][Math.floor(9 * Math.random())] + Math.floor(Math.random() * (99 - 10)) + 10,
			user: userDataService.user._id
		})
			.then(function(response) {
				$http.put('/api/users/' + userDataService.user._id, {stationId: response.data._id})
					.then(function(response) {
						vm.stationService.stations = response.data.userStations;
						console.log(response.data)
						$state.go('station', {id: response.data.userStations[response.data.userStations.length-1]._id});
					});
			})
    }
		
		function goToStation(stationId) {
			$state.go('station', {id: stationId})
		}
		
		function deleteStation(id) {
			$http.delete('/api/stations/' + id).then(function(response) {
					getStations();
			}, function(errRes) {
				console.error('Error deleting station.', errRes);
			})
		 }

//			vm.$state = $state;
		}

})();
