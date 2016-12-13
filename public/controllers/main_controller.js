(function() {
  "use strict";

  angular
      .module("loopsApp")
      .controller("MainController", MainController);

  MainController.$inject = ["$state", "userDataService", "$log", "authService", "stationService", "$stateParams"];

  function MainController($state, userDataService, $log, authService, stationService, $stateParams) {
    var vm = this;

    vm.userService = userDataService;
    vm.logout      = authService.logout;
    vm.isLoggedIn  = authService.isLoggedIn;
		vm.stationService = stationService;
		vm.userInvite =  userInvite;
		vm.checkParams = checkParams;

		
		function checkParams() {
			if ($stateParams.id) {
				return true
			}
		}
		
		function userInvite() {
			return console.log(vm.stationService.email);
			$http.put('/api/users/invite/' + vm.stationService.email, {stationId: vm.station._id, email: vm.stationService.email})
				.then(function(response) {
					console.log("inviteUser response: ", response);
				});
		}
		
    vm.$state = $state;
  }

})();
