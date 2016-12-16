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
//					if (!res.data.user) { 
//						$state.go('login'); 
//						return;
//					}
          if (authService.isLoggedIn()) {
						$log.log("res.data: ", res.data.user);
						vm.currentUser = res.data.user;
						$state.go('hello');
						vm.loginMessage = null;
					} else {
						vm.loginMessage = "Wrong email password combo. Try again!"
					}
        }, function(err) {
						console.error('Error logging user in.', err);
						$state.go('login');
					});
    };

  }

})();
