(function() {
  "use strict";

  angular
    .module("loopsApp")
    .controller("LoginController", LoginController);

  LoginController.$inject = ["$state", "userDataService", "$log", "authService", "$http"];

  function LoginController($state, userDataService, $log, authService, $http) {
    var vm = this;

    vm.login       = login;
    vm.isLoggedIn  = authService.isLoggedIn;
    vm.currentUser = userDataService.user;

    // Form data for login
    vm.loginData;

    function login() {
      authService.login(vm.loginData.email, vm.loginData.password)
        .then(function(res) {
					if (!res.data.user) { 
						$state.go('login'); 
						return;
					}
          $log.log("res.data: ", res.data.user);
					vm.currentUser = res.data.user;
          $state.go('hello');
        }, function(errRes) {
						console.error('Error logging user in.', errRes);
						$state.go('login');
					});
    };

  }

})();
