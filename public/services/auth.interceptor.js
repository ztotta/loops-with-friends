(function() {

  angular.module('loopsApp')
         .factory('authInterceptor', authInterceptor);

  authInterceptor.$inject = ["$q", "$location", "authToken"];

  // ================================ //
  // === AUTH INTERCEPTOR FACTORY === //
  // ================================ //
  function authInterceptor($q, $location, authToken) {
    var interceptorFactory = {};

    // This will happen on all HTTP requests:
    interceptorFactory.request = function(config) {

      // Grab the token:
      var token = authToken.getToken();

      // If the token exists, add it to the header as x-access-token:
      if (token) config.headers['x-access-token'] = token;

      return config;
    };

    // Happens on response errors:
    interceptorFactory.responseError = function(response) {

      // If our server returns a 403 forbidden response:
      if (response.status == 403) {
        authToken.setToken();
        $location.path('/');
      }

      // Return the errors from the server as a promise:
      return $q.reject(response);
    };

    return interceptorFactory;
  }

})();
