(function() {
  "use strict";

  angular
      .module("loopsApp")
      .controller("MainController", MainController);

  MainController.$inject = ["$state", "userDataService", "$log", "authService", "stationService", "$stateParams", "$http"];

  function MainController($state, userDataService, $log, authService, stationService, $stateParams, $http) {
    var vm = this;

    vm.userService        = userDataService;
    vm.logout             = authService.logout;
    vm.isLoggedIn         = authService.isLoggedIn;
		vm.stationService     = stationService;
		vm.userInvite         = userInvite;
		vm.checkParams        = checkParams;
		vm.station            = stationService.station;

		
		function checkParams() {
			if ($stateParams.id) {
				return true
			}
		}
		
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
