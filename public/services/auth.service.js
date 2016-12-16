(function() {

  angular.module('loopsApp')
         .factory('authService', authService);

  authService.$inject = ["$http", "$q", "authToken", "userDataService", "$state", "$window"];

  // ============================ //
  // === AUTH SERVICE FACTORY === //
  // ============================ //
  function authService($http, $q, authToken, userDataService, $state, $window) {

    // Create auth factory object:
    var authFactory = {};

    // Log a user in:
    authFactory.login = function(email, password) {

      // Return the promise object and its data:
      return $http.post('/api/login', {
        email: 			 email,
        password:    password
      })
        .then(function(data) {
          if (data.data.success) {
						authToken.setToken(data.data.token);

						// Set userDataService.user to the logged in user:
						userDataService.user = data.data.user;
						console.log("Check it out: ", userDataService.user);
						return data;
					} else {
						return new Error(data.data.message);
					}
        }, function(err) {
					console.log(err);
					$state.go('login');
				});
    };

    // Log a user out by clearing the token:
    authFactory.logout = function() {
      // Clear the token:
      authToken.setToken();

      // Return to homepage:
      $state.go('homePage');
    };

    // Check if a user is logged in.
    // Checks if there is a local token:
    authFactory.isLoggedIn = function() {
      if (authToken.getToken())
        return true;
      else
        return false;
    };

    // Get the logged in user:
    authFactory.setUser = function() {
      var token = authToken.getToken().split('.')[1];
      var user = JSON.parse($window.atob(token));
      userDataService.user = user;
      return user;
    };

    // Return auth factory object:
    return authFactory;
  }

})();
