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
//		vm.getStations = getStations;

    // Form data for login
    vm.loginData;

    function login() {
      authService.login(vm.loginData.email, vm.loginData.password)
        .then(function(res) {
          $log.log(res.data);
          $state.go('homePage');
        });
    };
		
//		getStations();
//		function getStations() {
//      $http.get('/api/stations').then(function(response) {
//        vm.stations = response.data;
//      }, function(errRes) {
//        console.error('Error retrieving stations.', errRes);
//      });
//    };

  }

})();
