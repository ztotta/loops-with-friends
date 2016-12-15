(function() {

  angular.module('loopsApp')
         .factory('authToken', authToken);

  authToken.$inject = ["$window"];

  // ========================== //
  // === AUTH TOKEN FACTORY === //
  // ========================== //
  function authToken($window) {
    var authTokenFactory = {};

    // Get the token out of local storage;
    authTokenFactory.getToken = function() {
      return $window.localStorage.getItem('token');
    };

    // Sets token or clears token.
    // If a token is passed, set the token.
    // If there is no token, clear it from local storage:
    authTokenFactory.setToken = function(token) {
      if (token) {
        $window.localStorage.setItem('token', token);
      } else {
        $window.localStorage.removeItem('token');
      }
    };

    return authTokenFactory;
  }
})();
