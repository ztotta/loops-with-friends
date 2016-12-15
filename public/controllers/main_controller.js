(function() {
  "use strict";

  angular
      .module("loopsApp")
      .controller("MainController", MainController);

  MainController.$inject = ["$state", "userDataService", "$log", "authService", "stationService", "$stateParams", "$http", "$scope"];

  function MainController($state, userDataService, $log, authService, stationService, $stateParams, $http, $scope) {
    var vm = this;

		// === CONTROLLER SERVICES === //
    vm.userService        = userDataService;
		vm.stationService     = stationService;
		
		// === CONTROLLER FUNCTIONS === //
    vm.logout             = authService.logout;
    vm.isLoggedIn         = authService.isLoggedIn;
		vm.userInvite         = userInvite;
		vm.checkParams        = checkParams;
		vm.loopToggle         = loopToggle;
		
		// === CONTROLLER OBJ/ARR/BOOL === //
		vm.station            = stationService.station;

		// If the user is at a station, the email/note-key footer ng-show's:
		function checkParams() {
			if ($stateParams.id) {
				return true
			}
		}
		
		// Turns off loop if user exits page without stopping it manually:
		function loopToggle() {
			if (vm.stationService.loopOn) {
				vm.stationService.loopOn = !vm.stationService.loopOn;
					setTimeout(() => {
						// Clears the metronome from the instrument panels:
						vm.stationService.station.stationInstruments.forEach((instr) => {
							for (var k = 0; k < 64; k++) {
								instr.steps[k].metronome = false;	
							};	
						});
						// Resets loop to 'on' for when the user enters the next station:
						vm.stationService.loopOn = !vm.stationService.loopOn;
						$scope.$apply();
					}, 400)
			}	
		};
		
		// Adds station ID to the invited user's stationIds array:
		function userInvite() {
			$http.put('/api/users/invite/' + vm.stationService.email, {stationId: vm.stationService.station._id, email: vm.stationService.email})
				.then(function(response) {
					console.log("response: ", response)
					stationService.email = response.data.message;
				});
		}
		
    vm.$state = $state;
  }

})();
