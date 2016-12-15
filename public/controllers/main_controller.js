(function() {
  "use strict";

  angular
      .module("loopsApp")
      .controller("MainController", MainController);

  MainController.$inject = ["$state", "userDataService", "$log", "authService", "stationService", "$stateParams", "$http", "$scope"];

  function MainController($state, userDataService, $log, authService, stationService, $stateParams, $http, $scope) {
    var vm = this;

    vm.userService        = userDataService;
    vm.logout             = authService.logout;
    vm.isLoggedIn         = authService.isLoggedIn;
		vm.stationService     = stationService;
		vm.userInvite         = userInvite;
		vm.checkParams        = checkParams;
		vm.loopToggle         = loopToggle;
		vm.station            = stationService.station;

		
		function checkParams() {
			if ($stateParams.id) {
				return true
			}
		}
		
		function loopToggle() {
			vm.stationService.loopOn = !vm.stationService.loopOn;
				setTimeout(() => {
					vm.stationService.station.stationInstruments.forEach((instr) => {
						for (var k = 0; k < 64; k++) {
							instr.steps[k].metronome = false;	
						};	
					});
					$scope.$apply();
				}, 400)
		};
		
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
